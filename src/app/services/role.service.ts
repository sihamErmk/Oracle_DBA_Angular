import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiUrl = 'http://localhost:8080/api/roles'; // Remplacez par l'URL réelle de votre API

  constructor(private http: HttpClient) {}

  // Fetch all roles
  getAllRoles(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Create a new role
  createRole(role: any): Observable<any> {
    return this.http.post(this.apiUrl, role);
  }

  // Get a single role by name
  getRole(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${name}`);
  }

  // Delete a role by name
  deleteRole(name: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${name}`);
  }

  // Grant a privilege to a role
  grantPrivilege(roleName: string, privilegeName: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${roleName}/privileges/${privilegeName}`,
      null
    );
  }

  // Grant multiple privileges to a role
  grantPrivileges(roleName: string, privilegeNames: Set<string>): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${roleName}/privileges`,
      Array.from(privilegeNames)
    );
  }

  // Revoke a privilege from a role
  revokePrivilege(roleName: string, privilegeName: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${roleName}/privileges/${privilegeName}`
    );
  }

  // Get all privileges for a role
  getRolePrivileges(roleName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${roleName}/privileges`);
  }

  // Check if a role has a specific privilege
  hasPrivilege(roleName: string, privilegeName: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.apiUrl}/${roleName}/privileges/${privilegeName}`
    );
  }

  // Get the list of all available privileges
  getAvailablePrivileges(): Observable<any> {
    return this.http.get(`${this.apiUrl}/available-privileges`);
  }
}
