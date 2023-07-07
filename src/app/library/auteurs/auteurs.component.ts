import { Component } from '@angular/core';
import { Auteur } from '../interfaces/auteur.interface';
import { AuteurService } from '../auteur/auteur.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/error-dialog/error-dialog.component';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-auteurs',
  templateUrl: './auteurs.component.html',
  styleUrls: ['./auteurs.component.scss']
})
export class AuteursComponent {

  errorMessage: string = ''

  length!: number
  pageSize!: number
  pageIndex: number = 0

  constructor (
    private auteurService: AuteurService,
    private libraryService: LibraryService,
    private router: Router,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {

    this.libraryService.selected = 2

    this.auteurService.getAuteursFromBdd()
  }

  navigateTo = (dest: number, id?: number) => {
    this.router.navigate([this.libraryService.setSelected(dest)], {queryParams: {id: id}})
  }

  deleteAuteur = (event: Event, id?: number) => {

    event.stopPropagation()

    this.auteurService.deleteAuteurById(id!).subscribe({
      next: (res: any) => {
        console.log('header delete auteur complete', res)
        this.auteurService.getAuteursFromBdd()
      },
      error: (error) => {
        this.dialog.open(ErrorDialogComponent, {
          data: {
            message1: `Delete auteur Id : ${id}`,
            message2: error.error.message.replace(
              'could not execute statement; SQL [n/a]; constraint [null]',
              'Suppresion impossible ! Il existe encore des livres de cet auteur en bibliothéque.'
            )
          }
        }
      )
        this.errorMessage = error.error.message
      },
      complete () {
        console.log('header deleteAuteur complete')
      }
    })

  }

  getAuteursFromService = () => {
    return this.auteurService.auteurs
  }

}
