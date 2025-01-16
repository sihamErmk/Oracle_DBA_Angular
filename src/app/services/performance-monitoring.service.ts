import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerformanceMonitoringService {

  private apiUrl = 'http://localhost:8080/api/performance';

  constructor(private http: HttpClient) { }

  // Get AWR report
  getAwrReport(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/awrReport`, { responseType: 'blob' });
  }

  // Get ASH report
  getAshReport(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/ashReport`, { responseType: 'blob' });
  }

  // Get real-time stats
  getRealTimeStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/realtime`);
  }
}