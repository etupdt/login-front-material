import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Livre } from '../interfaces/book.interface';

@Injectable({
  providedIn: 'root'
})
export class LivreService {

  livre: Livre = {
    id: 0,
    isbn: '',
    titre: '',
    auteur: {
      id: 0,
      nom: '',
      prenom: ''
    }
  }

  modified = false

  livres: Livre[] = []

  constructor(
    private http: HttpClient,
  ) { }

  getLivreById(id: Number): Observable<any> {

    return this.http.get(
      environment.useBackendLibrary + `/book/${id}`
    )

  }

  deleteLivreById(id: Number): Observable<any> {

    return this.http.delete(
      environment.useBackendLibrary + `/book/${id}`
    )

  }

  putLivreById(livre: Livre): Observable<any> {

    return this.http.put(
      environment.useBackendLibrary + `/book/${livre.id}`,
      livre
    )

  }

  postLivre(livre: Livre): Observable<any> {

    let livreSansId = livre

    delete livreSansId.id

    return this.http.post(
      environment.useBackendLibrary + `/book/`,
      livreSansId
    )

  }

  getLivres(): Observable<any> {

    return this.http.get(
      environment.useBackendLibrary + `/book/`
    )

  }

  getLivresByKeyWord(keyword: string): Observable<any> {

    return this.http.get(
      environment.useBackendLibrary + `/book/keyword`,
      {params: new HttpParams().append('keyword', keyword)}
    )

  }

  getLivresByAuteurId(id: number): Observable<any> {

    return this.http.get(
      environment.useBackendLibrary + `/book/auteur/${id}`
    )

  }

  getStocks(): Observable<any> {

    return this.http.get(
      environment.useBackendLibrary + `/stock/`
    )

  }

  getUsures(): Observable<any> {

    return this.http.get(
      environment.useBackendLibrary + `/usure`
    )

  }

  getLivresPage(pageIndex: Number, pageSize: Number): Observable<any> {

    return this.http.get(
      environment.useBackend + `/book/${pageIndex}/${pageSize}`
    )

  }

  setLivre = (livre: Livre) => {
    this.modified = false
    this.livre = livre
  }

}
