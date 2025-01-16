// src/app/rman.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RmanService {

  private apiUrl = 'http://localhost:8080/api/rman';  // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) { }

  // Full Backup
  fullBackup(): Observable<any> {
    return this.http.post(`${this.apiUrl}/backup/full`, {}).pipe(
      catchError(this.handleError)
    );
  }

  // Incremental Backup
  incrementalBackup(level: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/incremental-backup/${level}`, {}).pipe(
      catchError(this.handleError)
    );
  }

  // Get Backup History
  getBackups(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/backups`).pipe(
      catchError(this.handleError)
    );
  }

  // Restore
  restore(): Observable<any> {
    return this.http.post(`${this.apiUrl}/restore`, {}).pipe(
      catchError(this.handleError)
    );
  }

  // Handle errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred while processing the request.';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
