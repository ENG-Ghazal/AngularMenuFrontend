import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8000/api/categories';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // or however you're storing the token
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  getCategories(): Observable<any> {

    return this.http.get<any>(this.apiUrl,{headers : this.getHeaders()});

  }
 addCategory(category: any): Observable<any> {

    return this.http.post<any>(this.apiUrl, category ,{headers:this.getHeaders() });
  }


}
