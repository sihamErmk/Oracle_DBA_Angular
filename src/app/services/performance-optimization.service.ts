import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerformanceOptimizationService {
  private apiUrl = 'http://localhost:8080/api/performance/optimization';

  constructor(private http: HttpClient) {}

  getSlowQueries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/slow-queries`);
  }

  getTuningRecommendations(sqlId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tuning-recommendations/${sqlId}`);
  }

  gatherTableStats(schemaName: string, tableName: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/gather-stats`, null, {
      params: { schemaName, tableName }
    });
  }

  scheduleStatsGathering(schemaName: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/schedule-stats`, null, {
      params: { schemaName }
    });
  }
}
