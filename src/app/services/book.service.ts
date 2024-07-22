import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getAllBook(page:any) {
    return this.http.get<any[]>(`https://openlibrary.org/search.json?q=the+lord+of+the+rings&page=${page}`);
  }
}
