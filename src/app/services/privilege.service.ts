// src/app/services/privilege.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PrivilegeDTO } from '../models/PrivilegeDTO';
import { Privilege } from '../models/privilege';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {
  private readonly baseUrl = 'http://localhost:8080/api/privileges';

  constructor(private http: HttpClient) { }

  // Create a privilege
  createPrivilege(privilegeDTO: PrivilegeDTO): Observable<PrivilegeDTO> {
    return this.http.post<PrivilegeDTO>(this.baseUrl, privilegeDTO);
  }

  // Get all privileges
  getAllPrivileges(): Observable<Privilege[]> {
    return this.http.get<Privilege[]>(this.baseUrl);
  }

  // Get privilege by name
  getPrivilege(name: string): Observable<Privilege> {
    return this.http.get<Privilege>(`${this.baseUrl}/${name}`);
  }

  // Delete a privilege
  deletePrivilege(name: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${name}`);
  }

  // Grant or revoke system privilege
  modifySystemPrivilege(action: 'grant' | 'revoke', privilegeName: string, userName: string, withAdminOption?: boolean): Observable<void> {
    const params = new HttpParams()
      .set('privilegeName', privilegeName)
      .set('userName', userName)
      .set('withAdminOption', withAdminOption ? 'true' : 'false');
    return this.http.post<void>(`${this.baseUrl}/${action}/system`, null, { params });
  }

  // Grant or revoke object privilege
  modifyObjectPrivilege(action: 'grant' | 'revoke', privilegeName: string, objectName: string, userName: string): Observable<void> {
    const params = new HttpParams()
      .set('privilegeName', privilegeName)
      .set('objectName', objectName)
      .set('userName', userName);
    return this.http.post<void>(`${this.baseUrl}/${action}/object`, null, { params });
  }

  // Get granted system privileges for a user
  getGrantedSystemPrivileges(userName: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/system/${userName}`);
  }

  // Get granted object privileges for a user
  getGrantedObjectPrivileges(userName: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/object/${userName}`);
  }


  //Get the list of all available privileges
  getAvailablePrivileges(): Observable<any> {
    return this.http.get<any[]>('/api/roles');
  }
}
