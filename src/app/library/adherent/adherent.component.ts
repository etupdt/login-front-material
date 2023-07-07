import { Component } from '@angular/core';
import { Emprunt } from '../interfaces/emprunt.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibraryService } from '../library.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AdherentService } from './adherent.service';
import { ErrorDialogComponent } from 'src/app/error-dialog/error-dialog.component';
import { EmpruntService } from '../emprunt/emprunt.service';

@Component({
  selector: 'app-adherent',
  templateUrl: './adherent.component.html',
  styleUrls: [
    './adherent.component.scss',
    '../library.component.scss'
  ]
})
export class AdherentComponent {

  emprunts: Emprunt[] = []

  empruntDisplayedColumns = ['id', 'titre', 'exemplaire', 'date', 'retour', 'modify']

  constructor (
    private formBuilder: FormBuilder,
    private libraryService: LibraryService,
    private adherentService: AdherentService,
    private empruntService: EmpruntService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  adherentGroupForm!: FormGroup

  adherentForm = () => {
    this.adherentGroupForm = this.formBuilder.group({
      nom: [this.adherentService.adherent.nom, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{2,}/)]],
      prenom: [this.adherentService.adherent.prenom, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{2,}/)]],
      telephone: [this.adherentService.adherent.telephone, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{2,}/)]],
      email: [this.adherentService.adherent.email, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{2,}/)]],
      caution: [this.adherentService.adherent.caution, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{2,}/)]],
    })
  }

  ngOnInit(): void {

    this.libraryService.selected = 5

    this.adherentForm()

    this.activeRoute.queryParamMap.subscribe((params: any) => {

      if (params && params.get("id")) {
        this.adherentService.adherent.id = +params.get("id")
      }

      if (this.adherentService.adherent.id === null) {
        this.adherentService.setAdherent({
          id: 0,
          nom: '',
          prenom: '',
          telephone: '',
          email: '',
          caution: false
        })
      }

      if (this.adherentService.adherent.id !== 0) {

        this.adherentService.getAdherentById(this.adherentService.adherent.id!).subscribe({
          next: (res: any) => {
            this.adherentService.setAdherent(res)
            this.getEmprunts(this.adherentService.adherent.id!)
            this.adherentForm()
          },
          error: (error: { error: { message: any; }; }) => {
            this.dialog.open(ErrorDialogComponent, {
              data: {
                message1: `Lecture en base de l'adherent Id : ${this.adherentService.adherent.id}`,
                message2: error.error.message
              }
            })
              },
          complete () {
            console.log('getbyid adherent complete')
          }
        })

      }

    })

  }

  getEmprunts(id: number) {

    this.empruntService.getEmpruntsByAdherentId(id).subscribe({
      next: (res: any) => {
        this.emprunts = res
        console.log('emprunts', this.emprunts)

        console.log('emprunts', id)
      },
      error: (error: { error: { message: any; }; }) => {
        this.dialog.open(ErrorDialogComponent, {
          data: {
            message1: `Lecture en base des emprunts de l'adherent Id : ${id}`,
            message2: error.error.message
          }
        })
      },
      complete () {
        console.log('getbyadherentid emprunts complete')
      }
    })

  }

  ngOnDestroy(): void {
    if (this.adherentService.modified = this.checkIsAdherentModified()) {
      this.adherentService.adherent.nom = this.adherentGroupForm.get("nom")!.value
      this.adherentService.adherent.prenom = this.adherentGroupForm.get("prenom")!.value
      this.adherentService.adherent.telephone = this.adherentGroupForm.get("telephone")!.value
      this.adherentService.adherent.email = this.adherentGroupForm.get("email")!.value
      this.adherentService.adherent.caution = this.adherentGroupForm.get("caution")!.value
    }
  }

  checkIsAdherentModified () {
    return (this.adherentService.modified ||
      (this.adherentService.adherent.nom !== this.adherentGroupForm.get("nom")!.value ||
      this.adherentService.adherent.prenom !== this.adherentGroupForm.get("prenom")!.value ||
      this.adherentService.adherent.telephone !== this.adherentGroupForm.get("telephone")!.value ||
      this.adherentService.adherent.email !== this.adherentGroupForm.get("email")!.value ||
      this.adherentService.adherent.caution !== this.adherentGroupForm.get("caution")!.value
      )
    )
  }

  getAdherentId = (): number => {
    return this.adherentService.adherent.id!
  }

  reinit = () => {

    if (this.checkIsAdherentModified()) {

      const dialogRef = this.dialog.open(ErrorDialogComponent, {
        data: {
          message1: `Voulez-vous enregistrer les données modifiées ?`,
          message2: ''
        }
      })

      dialogRef.afterClosed().subscribe(result => {

        if (result !== 'Annuler') {
          if (result === 'Enregistrer') {
            this.adherentSauvegarder()
          }
          this.adherentReinit()
        }

      });

    } else {

      this.adherentReinit()

    }

  }

  adherentReinit = () => {
    this.adherentService.setAdherent({
      id: 0,
      nom: '',
      prenom: '',
      telephone: '',
      email: '',
      caution: false
    })
    this.emprunts = []
    this.adherentForm()
  }

  adherentSauvegarder = () => {

    this.adherentService.adherent.nom = this.adherentGroupForm.get("nom")!.value
    this.adherentService.adherent.prenom = this.adherentGroupForm.get("prenom")!.value
    this.adherentService.adherent.telephone = this.adherentGroupForm.get("telephone")!.value
    this.adherentService.adherent.email = this.adherentGroupForm.get("email")!.value
    this.adherentService.adherent.caution = this.adherentGroupForm.get("caution")!.value

    if (this.adherentService.adherent.id === 0) {

      this.adherentService.postAdherent(this.adherentService.adherent).subscribe({
        next: (res: any) => {
          this.adherentService.adherent.id = res
        },
        error: (error: { error: { message: any; }; }) => {
          this.dialog.open(ErrorDialogComponent, {
            data: {
              message1: `Création adherent de Nom : ${this.adherentService.adherent.nom} ${this.adherentService.adherent.prenom}`,
              message2: error.error.message
            }
          })
        },
        complete () {
          console.log('Sauvegarde post adherent complete')
        }
      })

      this.adherentReinit()

    } else {

      this.adherentService.putAdherentById(this.adherentService.adherent).subscribe({
        next: (res: any) => {
          console.log('ok')
        },
        error: (error: { error: { message: any; }; }) => {
          this.dialog.open(ErrorDialogComponent, {
            data: {
              message1: `Maj adherent Id : ${this.adherentService.adherent.id}`,
              message2: error.error.message
            }
          })
        },
        complete () {
          console.log('Sauvegarde put adherent complete')
        }
      })

    }

  }
/*
  navigateTo = (dest: number) => {
    this.router.navigate([this.libraryService.setSelected(dest)])
  }*/

  navigateTo = (dest: number, id?: number) => {
    this.router.navigate([this.libraryService.setSelected(dest)], {queryParams: {id: id}})
  }

}
