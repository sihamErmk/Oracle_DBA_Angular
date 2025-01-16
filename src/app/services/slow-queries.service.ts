import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SlowQueryService {
  private apiBaseUrl = 'http://localhost:8080/api/slow-queries'; // Remplacez par l'URL correcte

  constructor(private http: HttpClient) {}



  getTuningReport(sqlId: string): Observable<string> {
    return this.http.post(`${this.apiBaseUrl}/optimize/${sqlId}`, null, {
      responseType: 'text',
    });
  }
  getSlowQueries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des requêtes lentes', error);
        return throwError(() => new Error('Erreur lors de la récupération des requêtes lentes'));
      })
    );
  }

}
