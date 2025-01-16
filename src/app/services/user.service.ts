import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getUser(username: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${encodeURIComponent(username)}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, user);
  }

  updateUser(username: string, user: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${encodeURIComponent(username)}`, user);
  }
  getAllRoles(): Observable<any[]> {
    return this.http.get<any[]>('/api/roles'); // Replace with actual endpoint
  }

  deleteUser(username: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${encodeURIComponent(username)}`);
  }

  lockAccount(username: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${encodeURIComponent(username)}/lock`, {});
  }

  unlockAccount(username: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${encodeURIComponent(username)}/unlock`, {});
  }

  resetPassword(username: string, newPassword: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${encodeURIComponent(username)}/password`, { newPassword });
  }

  grantRole(username: string, role: any): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${encodeURIComponent(username)}/roles`, role);
  }

  revokeRole(username: string, roleName: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${encodeURIComponent(username)}/roles/${roleName}`);
  }
}
