import { Component, OnInit } from '@angular/core';
import { LivreService } from '../livre/livre.service';
import { Router } from '@angular/router';
import { LibraryService } from '../library.service';
import { ExemplaireService } from '../exemplaire/exemplaire.service';

@Component({
  selector: 'app-livres',
  templateUrl: './livres.component.html',
  styleUrls: ['./livres.component.scss']
})
export class LivresComponent implements OnInit {

  errorMessage: string = ''

  length!: number
  pageSize!: number
  pageIndex: number = 0

  spinner: string = 'cache'

  constructor (
    private livreService: LivreService,
    private exemplaireService: ExemplaireService,
    private libraryService: LibraryService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.libraryService.selected = 0

    this.getLivresFromBdd()

  }

  navigateTo = (dest: number, id?: Number) => {

    this.router.navigate([this.libraryService.setSelected(dest)], {queryParams: {id: id}})

  }

  deleteLivre = (event: Event, livre_id: number) => {

    event.stopPropagation()

    this.deleteExemplairesInBdd(livre_id)

  }

  deleteLivreById = (livre_id: number) => {

    this.livreService.deleteLivreById(livre_id!).subscribe({
      next: (res: any) => {
        console.log('header delete livre complete', res)
        this.getLivresFromBdd()
      },
      error: (error) => {
        this.errorMessage = error.error.message
      },
      complete () {
        console.log('header delete livre complete')
      }
    })

  }

  deleteExemplairesInBdd = (livre_id: number) => {

    console.log('delete exemplaires demandée', livre_id)
    this.exemplaireService.deleteExemplairesByLivreId(livre_id).subscribe({
      next: (res: any) => {
        this.deleteLivreById(livre_id)
        console.log('delete exemplaire ok', livre_id)
      },
      error: (error: { error: { message: any; }; }) => {
        this.errorMessage = error.error.message
      },
      complete () {
        console.log('Sauvegarde delete exemplaires complete')
      }
    })

  }

  getLivresFromService = () => {
    return this.livreService.livres
  }

  getLivresFromBdd = () => {

    this.spinner = 'background-spinner'

    this.livreService.getLivres().subscribe({
      next: (res: any) => {
        console.log(res)
        this.livreService.livres = res
        this.spinner = 'cache'
      },
      error: (error: { error: { message: any; }; }) => {
        this.errorMessage = error.error.message
      },
      complete () {
        console.log('header getLivres complete')
      }
    })

  }

  getLivresPage = () => {

    this.livreService.getLivresPage(this.pageIndex, this.pageSize).subscribe({
      next: (res: any) => {
        this.livreService.livres = res
      },
      error: (error: { error: { message: any; }; }) => {
        this.errorMessage = error.error.message
      },
      complete () {
        console.log('header getUser complete')
      }
    })

  }

}
