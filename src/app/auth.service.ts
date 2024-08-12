import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import { map, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/api';

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    const userJson = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(userJson ? JSON.parse(userJson) : null);
    this.currentUser = this.currentUserSubject.asObservable();

    //checking if there is already logged in user
    const token = localStorage.getItem('accessToken');

    if (userJson && token) {
      this.currentUserSubject.next(userJson);
    }
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  registerUser(user: User): Observable <any>{
     return this.http.post(`${this.apiUrl}/register`,user ).
     pipe(switchMap(response => {
      // Automatically log in the user after successful registration
      return this.login(user.email, user.password);
    }));
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(map(response => {

        localStorage.setItem('currentUser', JSON.stringify(response.user));

        localStorage.setItem('token', response.token);

        localStorage.setItem('role', response.role);

        this.currentUserSubject.next(response.user);

        return response;
      }));
  }

  logout(): void {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    if (token) {
      this.http.post(`${this.apiUrl}/logout`, {}, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      }).subscribe(() => {
          localStorage.removeItem('currentUser');
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          this.currentUserSubject.next(null);
      });
  } else {
      console.error('No token found, cannot log out');
  }
}

  getUser(): Observable<any>{
    return this.http.get(`${this.apiUrl}/user`);
  }
  isAuthenticated(): boolean {
    return !!this.currentUserValue;
   // return !!localStorage.getItem('token'); // to make sure that the value returned is boolean
  }
  setToken(token:string):void{
    localStorage.setItem('token' , token);
  }
  getToken() :string | null{
    return localStorage.getItem('token');
  }
  removeToken(): void{
    localStorage.removeItem('token');
  }

  hasRole(expectedRole: string): boolean {
    return this.currentUserValue?.role === expectedRole;
  }
}
