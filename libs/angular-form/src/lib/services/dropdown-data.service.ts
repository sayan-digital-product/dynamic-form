import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownDataService {
  constructor(private http: HttpClient) {}

  getDropdownData(fieldKey: string): Observable<any[]> {
    // Mock API call, replace with actual API endpoint
    return this.http.get<any[]>(`assets/api/dropdown-data/${fieldKey}.json`);
  }
}
