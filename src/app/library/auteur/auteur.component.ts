import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuteurService } from './auteur.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Livre } from '../interfaces/livre.interface';
import { LivreService } from '../livre/livre.service';
import { ErrorDialogComponent } from 'src/app/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LibraryService } from '../library.service';
import { SaveDialogComponent } from 'src/app/save-dialog/save-dialog.component';
import { FindDialogComponent } from '../find-dialog/find-dialog.component';

@Component({
  selector: 'app-auteur',
  templateUrl: './auteur.component.html',
  styleUrls: [
    './auteur.component.scss',
    '../library.component.scss'
  ]
})
export class AuteurComponent implements OnInit, OnDestroy, OnChanges {

  livres: Livre[] = []

  livreDisplayedColumns = ['livre_id', 'isbn', 'titre']

  constructor (
    private formBuilder: FormBuilder,
    private libraryService: LibraryService,
    private auteurService: AuteurService,
    private livreService: LivreService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Change detected.');
  }

  auteurGroupForm!: FormGroup

  auteurForm = () => {
    this.auteurGroupForm = this.formBuilder.group({
      nom: [this.auteurService.auteur.nom, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{2,}/)]],
      prenom: [this.auteurService.auteur.prenom, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{2,}/)]],
    })
  }

  ngOnInit(): void {

    this.libraryService.selected = 3

    this.auteurForm()

    this.activeRoute.queryParamMap.subscribe((params: any) => {

      if (params && params.get("id")) {
        this.auteurService.auteur.id = +params.get("id")
      }

      if (this.auteurService.auteur.id === null) {
        this.auteurService.setAuteur({
          id: 0,
          nom: '',
          prenom: ''
        })
      }

      if (this.auteurService.auteur.id !== 0) {

        this.auteurService.getAuteurById(this.auteurService.auteur.id!).subscribe({
          next: (res: any) => {
            this.auteurService.setAuteur(res)
            this.getLivres(this.auteurService.auteur.id!)
            this.auteurForm()
          },
          error: (error: { error: { message: any; }; }) => {
            this.dialog.open(ErrorDialogComponent, {
              data: {
                message1: `Lecture en base de l'auteur Id : ${this.auteurService.auteur.id}`,
                message2: error.error.message
              }
            })
              },
          complete () {
            console.log('getbyid auteur complete')
          }
        })

      }

    })

  }

  getLivres(id: number) {

    this.livreService.getLivresByAuteurId(this.auteurService.auteur.id!).subscribe({
      next: (res: any) => {
        this.livres = res
      },
      error: (error: { error: { message: any; }; }) => {
        this.dialog.open(ErrorDialogComponent, {
          data: {
            message1: `Lecture en base des livres de l'auteur Id : ${id}`,
            message2: error.error.message
          }
        })
      },
      complete () {
        console.log('getbyid auteur complete')
      }
    })

  }

  ngOnDestroy(): void {
    if (this.auteurService.modified = this.checkIsAuteurModified()) {
      this.auteurService.auteur.nom = this.auteurGroupForm.get("nom")!.value
      this.auteurService.auteur.prenom = this.auteurGroupForm.get("prenom")!.value
    }
  }

  checkIsAuteurModified () {
    return (this.auteurService.modified ||
      (this.auteurService.auteur.nom !== this.auteurGroupForm.get("nom")!.value ||
      this.auteurService.auteur.prenom !== this.auteurGroupForm.get("prenom")!.value)
    )
  }

  getAuteurId = (): number => {
    return this.auteurService.auteur.id!
  }

  reinit = () => {

    if (this.checkIsAuteurModified()) {

      const dialogRef = this.dialog.open(SaveDialogComponent, {
        data: {
          message1: `Voulez-vous enregistrer les données modifiées ?`,
          message2: ''
        }
      })

      dialogRef.afterClosed().subscribe(result => {

        if (result !== 'Annuler') {
          if (result === 'Enregistrer') {
            this.auteurSauvegarder()
          }
          this.auteurReinit()
        }

      });

    } else {

      this.auteurReinit()

    }

  }

  auteurReinit = () => {
    this.auteurService.setAuteur({
      id: 0,
      nom: '',
      prenom: ''
    })
    this.livres = []
    this.auteurForm()
  }

  auteurSauvegarder = () => {

    this.auteurService.auteur.nom = this.auteurGroupForm.get("nom")!.value
    this.auteurService.auteur.prenom = this.auteurGroupForm.get("prenom")!.value

    if (this.auteurService.auteur.id === 0) {

      this.auteurService.postAuteur(this.auteurService.auteur).subscribe({
        next: (res: any) => {
          this.auteurService.auteur.id = res
        },
        error: (error: { error: { message: any; }; }) => {
          this.dialog.open(ErrorDialogComponent, {
            data: {
              message1: `Création auteur de Nom : ${this.auteurService.auteur.nom} ${this.auteurService.auteur.prenom}`,
              message2: error.error.message
            }
          })
        },
        complete () {
          console.log('Sauvegarde post auteur complete')
        } 
      })

      this.auteurReinit()

    } else {

      this.auteurService.putAuteurById(this.auteurService.auteur).subscribe({
        next: (res: any) => {
          console.log('ok')
        },
        error: (error: { error: { message: any; }; }) => {
          this.dialog.open(ErrorDialogComponent, {
            data: {
              message1: `Maj auteur Id : ${this.auteurService.auteur.id}`,
              message2: error.error.message
            }
          })
        },
        complete () {
          console.log('Sauvegarde put auteur complete')
        }
      })

    }

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
      console.log(result)
      if (result !== null) {
        this.livres = [...this.livres, result]
      }

    });

  }

}
