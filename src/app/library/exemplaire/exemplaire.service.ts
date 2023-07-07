import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Exemplaire } from '../interfaces/exemplaire.interface';

@Injectable({
  providedIn: 'root'
})
export class ExemplaireService {

  exemplaire: Exemplaire = {
    id: 0
  }

  modified = false

  exemplaires: Exemplaire[] = []

  constructor(
    private http: HttpClient,
  ) { }

  getExemplairesFromBdd() {

    this.getExemplaires().subscribe({
      next: (res: any) => {
        console.log(res)
        this.exemplaires = res
      },
      error: (error: { error: { message: any; }; }) => {
        console.log(error.error.message)
      },
      complete () {
        console.log('header getExemplaires from service complete')
      }
    })

  }

  getExemplairesByLivreId(livre_id: Number): Observable<any> {

    return this.http.get(
      environment.useBackendLibrary + `/exemplaire/livre/${livre_id}`
    )

  }

  getExemplairesByEmpruntId(emprunt_id: Number): Observable<any> {

    return this.http.get(
      environment.useBackendLibrary + `/exemplaire/emprunt/${emprunt_id}`
    )

  }

  getExemplaires(): Observable<any> {

    return this.http.get(
      environment.useBackendLibrary + `/exemplaire`
    )

  }

  deleteExemplaireById(exemple_id: Number): Observable<any> {

    return this.http.delete(
      environment.useBackendLibrary + `/exemplaire/${exemple_id}`
    )

  }

  deleteExemplairesByLivreId(livre_id: Number): Observable<any> {

    return this.http.delete(
      environment.useBackendLibrary + `/exemplaire/livre/${livre_id}`
    )

  }

  putExemplaireById(exemplaire: Exemplaire): Observable<any> {

    return this.http.put(
      environment.useBackendLibrary + `/exemplaire/${exemplaire.id}`,
      exemplaire
    )

  }

  postExemplaire(exemplaire: Exemplaire): Observable<any> {

    let exemplaireSansId = exemplaire

    delete exemplaireSansId.id

    return this.http.post(
      environment.useBackendLibrary + `/exemplaire`,
      exemplaireSansId
    )

  }

}
