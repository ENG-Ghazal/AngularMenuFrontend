import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl:string = 'http://localhost:8000/api/menus';

  constructor(private http:HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // or however you're storing the token
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }
  getMenus(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`,{headers:this.getHeaders()});
  }

  createMenu(menuData: { item_ids: number[] }): Observable<any> {
    return this.http.post<any>(this.apiUrl, menuData,{headers:this.getHeaders()});
  }
  calculateTotalPrice(data: { item_ids: number[] }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/menu-total-price`,data,{headers:this.getHeaders()});
  }
}
