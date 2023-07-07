import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor() { }

  menuDestinations = [
    {classe: 'option', path: 'bibliothèque/livres'},
    {classe: 'option', path: 'bibliothèque/livre'},
    {classe: 'option', path: 'bibliothèque/auteurs'},
    {classe: 'option', path: 'bibliothèque/auteur'},
    {classe: 'option', path: 'bibliothèque/adherents'},
    {classe: 'option', path: 'bibliothèque/adherent'},
    {classe: 'option', path: 'bibliothèque/emprunt'}
  ]

  selected: number = 0

  setSelected = (selected: number): string => {
    this.menuDestinations[this.selected].classe = 'option'
    this.selected = selected
    this.menuDestinations[this.selected].classe = 'option selected'
    return this.menuDestinations[this.selected].path
  }

}
