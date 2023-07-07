import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LivreService } from './livre/livre.service';
import { AuteurService } from './auteur/auteur.service';
import { LibraryService } from './library.service';
import { AdherentService } from './adherent/adherent.service';
import { EmpruntService } from './emprunt/emprunt.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  constructor (
    private router: Router,
    private libraryService: LibraryService,
    private livreService: LivreService,
    private auteurService: AuteurService,
    private adherentService: AdherentService,
    private empruntService: EmpruntService
  ) {}

  ngOnInit(): void {
    this.navigateToOptionLibrary(0)
  }

  getLivre =  () => {
    return this.livreService.livre
  }

  getAuteur =  () => {
    return this.auteurService.auteur
  }

  getAdherent =  () => {
    return this.adherentService.adherent
  }

  navigateToOptionLibrary = (dest: number) => {
    this.router.navigate([this.libraryService.setSelected(dest)])
  }

  getMenuDestinations = () => {
    return this.libraryService.menuDestinations
  }

}
