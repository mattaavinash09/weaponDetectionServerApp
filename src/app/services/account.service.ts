import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  constructor(    private router: Router,
    private http: HttpClient) {  this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();}

  login(username: string, password: string) {
    return this.http.post<User>(`${environment.baseUrl}/api/UserInfo/login`, {userName: username,password: password })
    .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
    }));

}
register(user: User) {
  return this.http.post(`${environment.baseUrl}/api/UserInfo`, user);
}

public get userValue() {
  return this.userSubject.value;
}
logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);

}
}
