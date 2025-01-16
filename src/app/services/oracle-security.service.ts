import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OracleSecurityService {
  private baseUrl = 'http://localhost:8080/api/security';

  constructor(private http: HttpClient) {}

  // TDE Methods
  enableTDE(tableName: string, columnName: string, algorithm: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/tde/enable`, null, {
      params: { tableName, columnName, algorithm }
    });
  }

  disableTDE(tableName: string, columnName: string,algorithm: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/tde/disable`, null, {
      params: { tableName, columnName,algorithm }
    });
  }

  getTDEConfigurations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tde/configurations`);
  }

  // VPD Methods
  createVPDPolicy(policy: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/vpd/policies`, policy);
  }

  // Drop a VPD policy
  dropVPDPolicy(policyName: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/vpd/policies/${policyName}`);
  }

  // Get all VPD policies
  getVPDPolicies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/vpd/policies`);
  }
  // Audit Methods
  enableAuditing(config: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/audit/enable`, config);
  }

  disableAuditing(tableName: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/audit/disable`, null, {
      params: { tableName }
    });
  }

  getAuditConfigurations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/audit/configurations`);
  }
}
