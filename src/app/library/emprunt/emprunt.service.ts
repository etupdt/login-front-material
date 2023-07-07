import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Emprunt } from '../interfaces/emprunt.interface';
import { Status } from '../interfaces/status.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpruntService implements OnInit {

  constructor(
    private http: HttpClient,
  ) {
    this.init()
  }

  ngOnInit(): void {
  }

  emprunt: Emprunt = {}

  modified: boolean = false

  getEmpruntById(emprunt_id: number): Observable<any> {

    return this.http.get(
      environment.useBackendLibrary + `/emprunt/${emprunt_id}`
    )

  }

  getEmpruntsByExemplaireId(exemple_id: Number): Observable<any> {

    return this.http.get(
      environment.useBackendLibrary + `/emprunt/exemplaire/${exemple_id}`
    )

  }

  getEmpruntsByAdherentId(adherent_id: Number): Observable<any> {

    return this.http.get(
      environment.useBackendLibrary + `/emprunt/adherent/${adherent_id}`
    )

  }

  deleteEmpruntById(exemple_id: Number): Observable<any> {

    return this.http.delete(
      environment.useBackendLibrary + `/emprunt/${exemple_id}`
    )

  }

  deleteEmpruntsByExemplaireId(exemple_id: Number): Observable<any> {

    return this.http.delete(
      environment.useBackendLibrary + `/emprunt/exemplaire/${exemple_id}`
    )

  }

  deleteEmpruntsByAdherentId(adherent_id: Number): Observable<any> {

    return this.http.delete(
      environment.useBackendLibrary + `/emprunt/adherent/${adherent_id}`
    )

  }

  putEmpruntById(emprunt: Emprunt): Observable<any> {

    return this.http.put(
      environment.useBackendLibrary + `/emprunt/${emprunt.id}`,
      emprunt
    )

  }

  postEmprunt(emprunt: Emprunt): Observable<any> {

    let empruntSansId = emprunt

    delete empruntSansId.id

    return this.http.post(
      environment.useBackendLibrary + `/emprunt/`,
      empruntSansId
    )

  }

  setEmprunt = (emprunt: Emprunt) => {
    this.modified = false
    this.emprunt = emprunt

  }

  init = () => (
    this.emprunt = {
      id: 0,
      dateEmprunt: undefined,
      dateRetour: undefined,
      adherent: {
        id: 0
      },
      exemplaire: {
        id: 0,
        livre: {
          id: 0,
          titre: ''
        }
      }
    }
  )

}
