import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserLibService {

  constructor(
    private http: HttpClient,
    @Inject('optionsUserLib') private options: {useBackend: boolean}
  ) {}


  getUserByEmail(email: string): Observable<any> {

    return this.http.get(
      this.options.useBackend + `/api/user/${encodeURIComponent(email)}`
    )

  }

  getUserById(id: number): Observable<any> {

    return this.http.get(
      this.options.useBackend + `/api/user/${id}`
    )

  }

  deleteUserById(id: number): Observable<any> {

    return this.http.delete(
      this.options.useBackend + `/api/user/${id}`
    )

  }

  putUserById(user: User): Observable<any> {

    return this.http.put(
      this.options.useBackend + `/api/user`,
      user
    )

  }

  getUsers(): Observable<any> {

    return this.http.get(
      this.options.useBackend + `/api/users`
    )

  }

  getUsersPage(page: number, usersByPage: number): Observable<any> {

    return this.http.get(
      this.options.useBackend + `/api/users/${page}/${usersByPage}`
    )

  }

}
