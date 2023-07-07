import { Component } from '@angular/core';
import { ErrorDialogComponent } from 'src/app/error-dialog/error-dialog.component';
import { LibraryService } from '../library.service';
import { AdherentService } from '../adherent/adherent.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-adherents',
  templateUrl: './adherents.component.html',
  styleUrls: ['./adherents.component.scss']
})
export class AdherentsComponent {

  errorMessage: string = ''

  length!: number
  pageSize!: number
  pageIndex: number = 0

  constructor (
    private adherentService: AdherentService,
    private libraryService: LibraryService,
    private router: Router,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {

    this.libraryService.selected = 4

    this.adherentService.getAdherentsFromBdd()
  }

  navigateTo = (dest: number, id?: number) => {
    this.router.navigate([this.libraryService.setSelected(dest)], {queryParams: {id: id}})
  }

  deleteAdherent = (event: Event, id?: number) => {

    event.stopPropagation()

    this.adherentService.deleteAdherentById(id!).subscribe({
      next: (res: any) => {
        console.log('header delete adherent complete', res)
        this.adherentService.getAdherentsFromBdd()
      },
      error: (error) => {
        this.dialog.open(ErrorDialogComponent, {
          data: {
            message1: `Delete adherent Id : ${id}`,
            message2: error.error.message.replace(
              'could not execute statement; SQL [n/a]; constraint [null]',
              'Suppresion impossible ! Il existe encore des livres de cet adherent en bibliothéque.'
            )
          }
        }
      )
        this.errorMessage = error.error.message
      },
      complete () {
        console.log('header deleteAdherent complete')
      }
    })

  }

  getAdherentsFromService = () => {
    return this.adherentService.adherents
  }

}
