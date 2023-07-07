import { Injectable } from '@angular/core';
import { Adherent } from '../interfaces/adherent.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdherentService {

  adherent: Adherent = {
    id: 0,
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    caution: false
  }

  modified = false

  adherents: Adherent[] = []

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getAdherentsFromBdd()
  }

  getAdherentsFromBdd() {

    this.getAdherents().subscribe({
      next: (res: any) => {
        console.log(res)
        this.adherents = res
      },
      error: (error: { error: { message: any; }; }) => {
        console.log(error.error.message)
      },
      complete () {
        console.log('header getAdherents from service complete')
      }
    })

  }

  getAdherentsByEmpruntId(emprunt_id: Number): Observable<any> {

    return this.http.get(
      environment.useBackendLibrary + `/adherent/emprunt/${emprunt_id}`
    )

  }

  getAdherentById(id: number): Observable<any> {

    return this.http.get(
      environment.useBackendLibrary + `/adherent/${id}`
    )

  }

  deleteAdherentById(id: number): Observable<any> {

    return this.http.delete(
      environment.useBackendLibrary + `/adherent/${id}`
    )

  }

  putAdherentById(adherent: Adherent): Observable<any> {

    return this.http.put(
      environment.useBackendLibrary + `/adherent/${adherent.id}`,
      adherent
    )

  }

  postAdherent(adherent: Adherent): Observable<any> {

    let adherentSansId = adherent

    delete adherentSansId.id

    return this.http.post(
      environment.useBackendLibrary + `/adherent/`,
      adherentSansId
    )

  }

  getAdherents(): Observable<any> {

    return this.http.get(
      environment.useBackendLibrary + `/adherent/`
    )

  }

  getAdherentsPage(pageIndex: number, pageSize: number): Observable<any> {

    return this.http.get(
      environment.useBackend + `/adherent/${pageIndex}/${pageSize}`
    )

  }

  setAdherent = (adherent: Adherent) => {
    this.modified = false
    this.adherent = adherent
  }

}
