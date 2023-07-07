import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LivreService } from './livre.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuteurService } from '../auteur/auteur.service';
import { Stock } from '../interfaces/stock.interface';
import { Usure } from '../interfaces/usure.interface';
import { Exemplaire } from '../interfaces/exemplaire.interface';
import { LibraryService } from '../library.service';
import { ErrorDialogComponent } from 'src/app/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SaveDialogComponent } from 'src/app/save-dialog/save-dialog.component';
import { ExemplaireService } from '../exemplaire/exemplaire.service';
import { Status } from '../interfaces/status.interface';
import { EmpruntService } from '../emprunt/emprunt.service';
import { ExemplaireLight } from '../interfaces/exemplaireLight.interface';

@Component({
  selector: 'app-livre',
  templateUrl: './livre.component.html',
  styleUrls: [
    './livre.component.scss',
    '../library.component.scss'
  ]
})
export class LivreComponent implements OnInit {

  auteurSelected?: number = 0
  livreSelected?: number = 0
  statutSelected?: number = 0

  exemplaires: Exemplaire[] = []
  exemplairesLight: ExemplaireLight[] = []
  stocks!: Stock[]
  usures!: Usure[]

  statuts: Status[] = [
    Status.DISPONIBLE,
    Status.LOUE,
    Status.ARCHIVE
  ]


  exemplaireDisplayedColumns = ['id', 'stock', 'usure', 'statut', 'suppr']

  constructor (
    private formBuilder: FormBuilder,
    private libraryService: LibraryService,
    private livreService: LivreService,
    private exemplaireService: ExemplaireService,
    private empruntService: EmpruntService,
    private auteurService: AuteurService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  livreGroupForm!: FormGroup

  ExemplairesGroupForm!: FormGroup[]

  livreForm = () => {
    this.livreGroupForm = this.formBuilder.group({
      isbn: [this.livreService.livre.isbn, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{2,}/)]],
      titre: [this.livreService.livre.titre, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{2,}/)]],
    })

    this.livreSelected = this.livreService.livre.id
    this.auteurSelected = this.livreService.livre.auteur!.id
  }

  ngOnInit(): void {

    this.libraryService.selected = 1

    this.livreForm()

    this.auteurService.getAuteursFromBdd()

    this.getStocks()

    this.activeRoute.queryParamMap.subscribe((params: any) => {

      if (params && params.get("id")) {
        this.livreService.livre.id = +params.get("id")
      }

      if (this.livreService.livre.id === null) {
        this.livreService.setLivre({
          id: 0,
          isbn: '',
          titre: ''
        })
      }

      if (this.livreService.livre.id !== 0) {

        this.livreService.getLivreById(this.livreService.livre.id!).subscribe({
          next: (res: any) => {
            this.livreService.setLivre(res)
            this.getExemplaires(this.livreService.livre.id)
          },
          error: (error: { error: { message: any; }; }) => {
            this.dialog.open(ErrorDialogComponent, {
              data: {
                message1: `Lecture du livre Id : ${this.livreService.livre.id}`,
                message2: error.error.message
              }
            })
          },
          complete () {
            console.log('getbyid livre complete')
          }
        })

      }

    })

  }

  ngOnDestroy(): void {
    if (this.livreService.modified = this.checkIsLivreModified()) {
      this.livreService.livre.isbn = this.livreGroupForm.get("isbn")!.value
      this.livreService.livre.titre = this.livreGroupForm.get("titre")!.value
      this.livreService.livre.auteur!.id = this.auteurSelected
    }
  }

  getExemplairesFromService = () => {
    return this.exemplaires
  }

  getAuteursFromService = () => {
    return this.auteurService.auteurs
  }

  getExemplaires(id?: number) {


    this.exemplaireService.getExemplairesByLivreId(id!).subscribe({
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
        this.livreForm()

      },
      error: (error: { error: { message: any; }; }) => {
        this.dialog.open(ErrorDialogComponent, {
          data: {
            message1: `Lecture des exemplaires du livre Id : ${this.livreService.livre.id}`,
            message2: error.error.message
          }
        })
      },
      complete () {
        console.log('getexemplairesbylivreid livre complete')
      }
    })

  }

  getStocks() {

    this.livreService.getStocks().subscribe({
      next: (res: any) => {
        this.stocks = res
        console.log('stocks', this.stocks)
        this.getUsures()
      },
      error: (error: { error: { message: any; }; }) => {
        this.dialog.open(ErrorDialogComponent, {
          data: {
            message1: `Lecture des libellés des stocks`,
            message2: error.error.message
          }
        })
  },
      complete () {
        console.log('getbyid stocks complete')
      }
    })

  }

  getUsures() {

    this.livreService.getUsures().subscribe({
      next: (res: any) => {
        this.usures = res
        console.log('usures', this.usures)
      },
      error: (error: { error: { message: any; }; }) => {
        this.dialog.open(ErrorDialogComponent, {
          data: {
            message1: `Lecture des libellés d'usure`,
            message2: error.error.message
          }
        })
  },
      complete () {
        console.log('getbyid usures complete')
      }
    })

  }

  livreSauvegarder = () => {

    this.livreService.livre.isbn = this.livreGroupForm.get("isbn")!.value
    this.livreService.livre.titre = this.livreGroupForm.get("titre")!.value

    this.livreService.livre.auteur!.id = this.auteurSelected

    if (this.livreService.livre.id === 0) {

      this.livreService.postLivre(this.livreService.livre).subscribe({
        next: (res: any) => {
          this.livreService.livre.id = res
          this.exemplaires.filter((exemplaire) => !exemplaire.delete)
          .forEach((exemplaire) => {
            exemplaire.livre = {id: res}
            if (exemplaire.id !== 0)
              this.updateExemplaireInBdd(exemplaire)
            else
              this.addExemplaireInBdd(exemplaire)
          })
        },
        error: (error: { error: { message: any; }; }) => {
          this.dialog.open(ErrorDialogComponent, {
            data: {
              message1: `Création du livre de titre : ${this.livreService.livre.titre}`,
              message2: error.error.message
            }
          })
        },
        complete () {
          console.log('Sauvegarde post livre complete')
        }
      })

    } else {

      this.livreService.putLivreById(this.livreService.livre).subscribe({
        next: (res: any) => {
          this.exemplaires
          .filter(exemplaire => (!exemplaire.delete || (exemplaire.id !== null && exemplaire.id !== 0)))
          .forEach((exemplaire) => {
            if (exemplaire.delete) {
              console.log('delete exemplaire', exemplaire.id)
              this.deleteExemplaireInBdd(exemplaire.id!)
            } else if (exemplaire.id !== 0) {
              console.log('update exemplaire', exemplaire.id)
              this.updateExemplaireInBdd(exemplaire)
            } else {
              console.log('add exemplaire', exemplaire.id)
              this.addExemplaireInBdd(exemplaire)
            }
          })
        },
        error: (error: { error: { message: any; }; }) => {
          this.dialog.open(ErrorDialogComponent, {
            data: {
              message1: `Suppression du livre Id : ${this.livreService.livre.id}`,
              message2: error.error.message
            }
          })
      },
        complete () {
          console.log('Sauvegarde put livre complete')
        }
      })

    }

  }

  checkIsLivreModified () {
    return (this.livreService.modified ||
      (this.livreService.livre.isbn !== this.livreGroupForm.get("isbn")!.value ||
      this.livreService.livre.titre !== this.livreGroupForm.get("titre")!.value ||
      this.livreService.livre.auteur!.id !== this.auteurSelected)
    )
  }

  reinit = () => {

    if (this.checkIsLivreModified()) {

      const dialogRef = this.dialog.open(SaveDialogComponent, {
        data: {
          message1: `Voulez-vous enregistrer les données modifiées ?`,
          message2: ''
        }
      })

      dialogRef.afterClosed().subscribe(result => {

        if (result !== 'Annuler') {
          if (result === 'Enregistrer') {
            this.livreSauvegarder()
          }
          this.livreReinit()
        }

      });

    } else {

      this.livreReinit()

    }

  }

  livreReinit = () => {

    this.livreService.setLivre({
      id: 0,
      isbn: '',
      titre: '',
      auteur: {
        id: 0,
        nom: '',
        prenom: ''
      }
    })
    this.exemplaires = []
    this.livreForm()
  }

  addExemplaireInBdd = (exemplaire: Exemplaire) => {

    this.exemplaireService.postExemplaire(exemplaire).subscribe({
      next: (res: any) => {
        this.getExemplaires(this.livreService.livre.id)
      },
      error: (error: { error: { message: any; }; }) => {
        this.dialog.open(ErrorDialogComponent, {
          data: {
            message1: `Création d'un nouvel exmplaire du livre Id : ${this.livreService.livre.id}`,
            message2: error.error.message
          }
        })
      },
      complete () {
        console.log('Sauvegarde post exemplaire complete')
      }
    })

  }

  updateExemplaireInBdd = (exemplaire: Exemplaire) => {

    console.log('exemplaire', exemplaire)

    this.exemplaireService.putExemplaireById(exemplaire).subscribe({
      next: (res: any) => {
        console.log('maj exemplaire', exemplaire)
//        this.getExemplaires(this.livreService.livre.id)
      },
      error: (error: { error: { message: any; }; }) => {
        this.dialog.open(ErrorDialogComponent, {
          data: {
            message1: `Modification d'un exemplaire du livre Id : ${this.livreService.livre.id}`,
            message2: error.error.message
          }
        })
      },
      complete () {
        console.log('Sauvegarde post exemplaire complete')
      }
    })

  }

  deleteExemplaireInBdd = (id: number) => {
    console.log('delete exemplaire demandée', id)
    this.exemplaireService.deleteExemplaireById(id).subscribe({
      next: (res: any) => {
        console.log('delete exemplaire ok', id)
      },
      error: (error: { error: { message: any; }; }) => {
        this.dialog.open(ErrorDialogComponent, {
          data: {
            message1: `Suppression d'un exemplaire du livre Id : ${this.livreService.livre.id}`,
            message2: error.error.message
          }
        })
      },
      complete () {
        console.log('Sauvegarde post exemplaire complete')
      }
    })

  }

  addExemplaire = () => {
    this.exemplaires = [...this.exemplaires, {
      id: 0,
      livre: this.livreService.livre,
      stock: {id: 1},
      usure: {id: 1},
      archive: false
    }]
  }

  deleteExemplaire = (indexExemplaire: number) => {

    console.log('indexExemplaire', indexExemplaire)

    let index = 0
    let sortie: Exemplaire[] = []

    this.exemplaires
      .forEach((e: Exemplaire) => {
        if (!e.delete) {
          if (index === indexExemplaire) {
            e.delete = true
          }
          index++
        }
        sortie.push(e)
      })

      this.exemplaires = sortie

  }

  rentExemplaire = (exemplaire: Exemplaire) => {

    console.log('indexExemplaire', exemplaire.id)

//    if (this.empruntService.emprunt.exemplaire!.livre!.id === 0) {
    this.empruntService.emprunt.exemplaire!.livre = this.livreService.livre
    this.empruntService.emprunt.exemplaire!.id = exemplaire.id
    this.navigateTo(6, 0)
//    }

  }

  navigateTo = (dest: number, id?: number) => {
    this.router.navigate([this.libraryService.setSelected(dest)], {queryParams: {id: id}})
  }

}
