import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormField, FormMetadata } from '../models/form.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  constructor(private http: HttpClient) { }

  fetchFormMetadata(fileName: string): Observable<FormMetadata> {
    const url = `assets/${fileName}.metadata.json`;
    return this.http.get<FormMetadata>(url);
  }
}
