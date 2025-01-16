import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerformanceOptimizationService {

  private apiUrl = 'http://localhost:8080/api/performance/optimization'; // Update the API URL accordingly

  constructor(private http: HttpClient) { }

  getSlowQueries(): Observable<any> {
    return this.http.get(`${this.apiUrl}/slow-queries`);
  }

  getTuningRecommendations(sqlId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/tuning-recommendations/${sqlId}`);
  }

  gatherTableStats(schemaName: string, tableName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/gather-stats`, null, {
      params: { schemaName, tableName }
    });
  }

  scheduleStatsGathering(schemaName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/schedule-stats`, null, {
      params: { schemaName }
    });
  }
}
