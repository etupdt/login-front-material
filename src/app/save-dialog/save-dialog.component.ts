import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogSave } from './dialogSave.interface';

@Component({
  selector: 'app-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.scss']
})
export class SaveDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SaveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogSave,
  ) {}

  onbuttonClick(value: string): void {
    this.data = {message1: '', message2: '', retour: value}
    this.dialogRef.close();
  }

}
