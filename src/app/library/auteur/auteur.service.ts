import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auteur } from '../interfaces/auteur.interface';

@Injectable({
  providedIn: 'root'
})
export class AuteurService implements OnInit {

  auteur: Auteur = {
    id: 0,
    nom: '',
    prenom: ''
  }

  modified = false

  auteurs: Auteur[] = []

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getAuteursFromBdd()
  }

  getAuteursFromBdd() {

    this.getAuteurs().subscribe({
      next: (res: any) => {
        console.log(res)
        this.auteurs = res
      },
      error: (error: { error: { message: any; }; }) => {
        console.log(error.error.message)
      },
      complete () {
        console.log('header getAuteurs from service complete')
      }
    })

  }

  getAuteurById(id: number): Observable<any> {

    return this.http.get(
      environment.useBackendLibrary + `/auteur/${id}`
    )

  }

  deleteAuteurById(id: number): Observable<any> {

    return this.http.delete(
      environment.useBackendLibrary + `/auteur/${id}`
    )

  }

  putAuteurById(auteur: Auteur): Observable<any> {

    return this.http.put(
      environment.useBackendLibrary + `/auteur/${auteur.id}`,
      auteur
    )

  }

  postAuteur(auteur: Auteur): Observable<any> {

    let auteurSansId = auteur

    delete auteurSansId.id

    return this.http.post(
      environment.useBackendLibrary + `/auteur/`,
      auteurSansId
    )

  }

  getAuteurs(): Observable<any> {

    return this.http.get(
      environment.useBackendLibrary + `/auteur/`
    )

  }

  getAuteursPage(pageIndex: number, pageSize: number): Observable<any> {

    return this.http.get(
      environment.useBackend + `/auteur/${pageIndex}/${pageSize}`
    )

  }

  setAuteur = (auteur: Auteur) => {
    this.modified = false
    this.auteur = auteur
  }

}
