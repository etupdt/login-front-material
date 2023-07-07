import { Component } from '@angular/core';
import { FindDialogComponent } from '../find-dialog/find-dialog.component';
import { ErrorDialogComponent } from 'src/app/error-dialog/error-dialog.component';
import { SaveDialogComponent } from 'src/app/save-dialog/save-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibraryService } from '../library.service';
import { ExemplaireService } from '../exemplaire/exemplaire.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AdherentService } from '../adherent/adherent.service';
import { EmpruntService } from './emprunt.service';
import { Exemplaire } from '../interfaces/exemplaire.interface';
import { LivreService } from '../livre/livre.service';
import { Livre } from '../interfaces/livre.interface';
import { Emprunt } from '../interfaces/emprunt.interface';
import { Status } from '../interfaces/status.interface';
import { Adherent } from '../interfaces/adherent.interface';
import { ExemplaireLight } from '../interfaces/exemplaireLight.interface';

@Component({
  selector: 'app-emprunt',
  templateUrl: './emprunt.component.html',
  styleUrls: [
    './emprunt.component.scss',
    '../library.component.scss'
  ]
})
export class EmpruntComponent {

  dateEmprunt?: Date
  dateRetour?: Date

  exemplaires?: Exemplaire[] = []
  exemplairesLight: ExemplaireLight[] = []
  livre: Livre = {
    id: 0,
    titre: ''
  }
  exemplaireSelected?: number
  adherentSelected?: number

  adherents: Adherent[] = []

  statuts: Status[] = [
    Status.DISPONIBLE,
    Status.LOUE,
    Status.ARCHIVE
  ]

  livreDisplayedColumns = ['id', 'isbn', 'titre']

  constructor (
    private formBuilder: FormBuilder,
    private libraryService: LibraryService,
    private adherentService: AdherentService,
    private livreService: LivreService,
    private exemplaireService: ExemplaireService,
    private empruntService: EmpruntService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  empruntGroupForm!: FormGroup

  empruntForm = () => {
    this.empruntGroupForm = this.formBuilder.group({
      dateEmprunt: ["", [Validators.pattern(/[0-9\/]{2,}/)]],
      dateRetour: "",  //["", [Validators., Validators.pattern(/[0-9\/]*/)]],
      titre: ["", [Validators.required, Validators.pattern(/[0-9a-zA-Z]{2,}/)]],
      exemplaire: ["", [Validators.required, Validators.pattern(/[0-9]{1,}/)]],
      adherent: ["", [Validators.required, Validators.pattern(/[0-9]{1,}/)]]
    })
  }

  setValueEmpruntForm = () => {

    console.log('livre avant', this.livre)
    const adherent = this.adherents.find(a => a.id === this.adherentSelected)
    const exemplaire = this.exemplaires?.find(e => e.id === this.exemplaireSelected)
    console.log('livre apres', this.livre)
    this.empruntGroupForm.setValue({
      dateEmprunt: this.dateEmprunt ? this.dateEmprunt : '',
      dateRetour: this.dateRetour ? this.dateRetour : '',
      titre: this.livre.titre ? this.livre.titre : '',
      exemplaire: this.exemplaireSelected ? this.exemplaireSelected : '',
      adherent: this.adherentSelected ? this.adherentSelected : ''
    })
  }

  ngOnInit(): void {

    this.libraryService.selected = 6

    this.getAdherents()

    this.empruntForm()

    this.activeRoute.queryParamMap.subscribe((params: any) => {

      if (params && params.get("id")) {
        console.log('toto')
        this.empruntService.emprunt.id = +params.get("id")
      }

      if (this.empruntService.emprunt.id === 0) {
        console.log('emp', this.empruntService.emprunt)

        this.dateEmprunt = this.empruntService.emprunt.dateEmprunt
        this.dateRetour = this.empruntService.emprunt.dateRetour
        this.livre = this.empruntService.emprunt.exemplaire?.livre!
        this.getExemplaires(this.livre.id!)
        this.exemplaireSelected = this.empruntService.emprunt.exemplaire?.id
        this.adherentSelected = this.empruntService.emprunt.adherent?.id

        this.setValueEmpruntForm()

      }

      if (!this.empruntService.emprunt.id) {
        this.empruntReinit()
        this.setValueEmpruntForm()
      }


      if (this.empruntService.emprunt.id !== 0) {

        this.empruntService.getEmpruntById(this.empruntService.emprunt.id!).subscribe({
          next: (res: any) => {

            this.empruntService.setEmprunt(res)

            this.dateEmprunt = this.empruntService.emprunt.dateEmprunt
            this.dateRetour = this.empruntService.emprunt.dateRetour
            this.livre = res.exemplaire?.livre!
            this.getExemplaires(this.livre.id!)
            this.exemplaireSelected = res.exemplaire.exemple_id
            this.adherentSelected = res.adherent.adherent_id

            this.setValueEmpruntForm()

          },
          error: (error: { error: { message: any; }; }) => {
            this.dialog.open(ErrorDialogComponent, {
              data: {
                message1: `Lecture en base de l'emprunt Id : ${this.empruntService.emprunt.id}`,
                message2: error.error.message
              }
            })
          },
          complete () {
            console.log('getbyid emprunt complete')
          }
        })

      }

    })

  }

  ngOnDestroy(): void {
    if (this.empruntService.modified = this.checkIsEmpruntModified()) {
      this.empruntService.emprunt.dateEmprunt = this.empruntGroupForm.get("dateEmprunt")!.value
      this.empruntService.emprunt.dateRetour = this.empruntGroupForm.get("dateRetour")!.value
      this.empruntService.emprunt.exemplaire = {id: this.exemplaireSelected, livre: this.livre}
      this.empruntService.emprunt.adherent = {id: this.adherentSelected}
    }
  }

  getAdherentsFromService = () => {
    return this.adherents
  }

  checkIsEmpruntModified = () => {
    return (this.empruntService.modified ||
      (
        this.empruntService.emprunt.dateEmprunt !== this.empruntGroupForm.get("dateEmprunt")!.value ||
        this.empruntService.emprunt.dateRetour !== this.empruntGroupForm.get("dateRetour")!.value ||
        this.empruntService.emprunt.exemplaire!.livre!.titre !== this.livre.titre ||
        this.empruntService.emprunt.exemplaire!.id !== this.exemplaireSelected ||
        this.empruntService.emprunt.adherent?.id !== this.adherentSelected
      )
    )
  }

  getEmprunt = (): Emprunt => {
    return this.empruntService.emprunt
  }

  findExemplaire = (exemple_id?: number) => {
    return this.exemplaires?.find(exemplaire => exemplaire.id === exemple_id)
  }

  reinit = () => {

    if (this.checkIsEmpruntModified()) {

      const dialogRef = this.dialog.open(SaveDialogComponent, {
        data: {
          message1: `Voulez-vous enregistrer les données modifiées ?`,
          message2: ''
        }
      })

      dialogRef.afterClosed().subscribe(result => {

        if (result !== 'Annuler') {
          if (result === 'Enregistrer') {
            this.empruntSauvegarder()
          }
          this.empruntReinit()
        }

      });

    } else {

      this.empruntReinit()

    }

  }

  empruntReinit = () => {

    this.empruntService.init()

    this.dateEmprunt = undefined
    this.dateRetour = undefined
    this.exemplaires = []
    this.livre = {
      id: 0,
      titre: ''
    }
    this.exemplaireSelected = undefined
    this.adherentSelected = undefined

    this.setValueEmpruntForm()

  }

  empruntSauvegarder = () => {

    this.empruntService.emprunt.dateEmprunt = this.empruntGroupForm.get("dateEmprunt")!.value
    this.empruntService.emprunt.dateRetour = this.empruntGroupForm.get("dateRetour")!.value
    this.empruntService.emprunt.exemplaire = {id: this.exemplaireSelected, livre: this.livre}
    this.empruntService.emprunt.adherent = {id: this.adherentSelected}

    if (this.empruntService.emprunt.id === 0) {

      this.empruntService.postEmprunt(this.empruntService.emprunt).subscribe({
        next: (res: any) => {
          this.empruntService.emprunt.id = res
        },
        error: (error: { error: { message: any; }; }) => {
          this.dialog.open(ErrorDialogComponent, {
            data: {
              message1: `Création emprunt de Date : ${this.empruntService.emprunt.dateEmprunt}`,
              message2: error.error.message
            }
          })
        },
        complete () {
          console.log('Sauvegarde post emprunt complete')
        }
      })

//      this.empruntReinit()

    } else {

      this.empruntService.putEmpruntById(this.empruntService.emprunt).subscribe({
        next: (res: any) => {
          console.log('ok')
        },
        error: (error: { error: { message: any; }; }) => {
          this.dialog.open(ErrorDialogComponent, {
            data: {
              message1: `Maj emprunt Id : ${this.empruntService.emprunt.id}`,
              message2: error.error.message
            }
          })
        },
        complete () {
          console.log('Sauvegarde put emprunt complete')
        }
      })

    }

  }

  getExemplaires(livre_id: number) {

    this.exemplaireService.getExemplairesByLivreId(livre_id).subscribe({
      next: (res: any) => {
//        this.exemplaires = res
        let exemplaires: ExemplaireLight[] = []

        res.forEach((exemplaire: any) => {

          let sortie: ExemplaireLight = {
            id: exemplaire[0],
            usure_id: exemplaire[1],
            stock_id: exemplaire[2],
            livre_id: exemplaire[3],
            archive: exemplaire[4],
            statut: this.statuts[exemplaire[5]]
          }

          exemplaires.push(sortie)

        })


        this.exemplairesLight = exemplaires

      },
      error: (error: { error: { message: any; }; }) => {
        this.dialog.open(ErrorDialogComponent, {
          data: {
            message1: `Lecture en base des exemplaires du livre Id : ${livre_id}`,
            message2: error.error.message
          }
        })
      },
      complete () {
        console.log('getbyLivreid exemplaires complete')
      }
    })

  }

  getAdherents() {

    this.adherentService.getAdherents().subscribe({
      next: (res: any) => {
        this.adherents = res
      },
      error: (error: { error: { message: any; }; }) => {
        this.dialog.open(ErrorDialogComponent, {
          data: {
            message1: `Lecture en base des adherents`,
            message2: error.error.message
          }
        })
      },
      complete () {
        console.log('get adherents complete')
      }
    })

  }

  navigateTo = (dest: number) => {
    this.router.navigate([this.libraryService.setSelected(dest)])
  }

  selectLivre = () => {

    const dialogRef = this.dialog.open(FindDialogComponent, {
      data: {
        message: `Recherche composant`,
        query: this.livreService.getLivresByKeyWord.bind(this.livreService),
        fields: this.livreDisplayedColumns,
        entity: 'Livre'
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('result', result)
      if (result) {
        this.livre = result
        this.getExemplaires(result.livre_id)
        this.empruntGroupForm.patchValue({
          titre: result.titre,
          exemplaire: ""
        });
      }

    });

  }

}
