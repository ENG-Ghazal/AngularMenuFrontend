import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  private apiUrl = 'http://localhost:8000/api/items'; // Replace with your actual API URL


  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // or however you're storing the token
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }


  getItems(): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl,{headers : this.getHeaders()});

  }
  addItem(item: any): Observable<any> {

    return this.http.post(this.apiUrl, item,{headers : this.getHeaders()});


  }

}
