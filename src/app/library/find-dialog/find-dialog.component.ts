import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogFind } from './dialogFind.interface';

@Component({
  selector: 'app-find-dialog',
  templateUrl: './find-dialog.component.html',
  styleUrls: ['./find-dialog.component.scss']
})
export class FindDialogComponent<T> implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FindDialogComponent<T>>,
    @Inject(MAT_DIALOG_DATA) public data: DialogFind<T>,
  ) {}

  displayedColumns: string[] = []

  composants: T[] = []

  search: string = '';

  ngOnInit(): void {

    this.displayedColumns = this.data.fields

    this.data.query(this.search).subscribe({
      next: (res: any) => {
        console.log('ok')
        console.log(res)
        this.composants = res
      },
      error: (error: { error: { message: any; }; }) => {
        console.log(error)
      },
      complete () {
        console.log('Appel get composants complete')
      }
    })

  }

  onbuttonClick(value: string): void {
    this.dialogRef.close();
  }

  execSearch = () => {

    this.data.query(this.search).subscribe({
      next: (res: any) => {
        console.log('ok')
        console.log(res)
        this.composants = res
      },
      error: (error: { error: { message: any; }; }) => {
        console.log(error)
      },
      complete () {
        console.log('Appel get livres complete')
      }
    })

  }

}
