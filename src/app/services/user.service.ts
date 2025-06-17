import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userName: string = 'Eybert Macedo'; // This will be replaced with actual user data from backend
  private userRole: string = 'Bibliotecario'; // This will be replaced with actual user role from backend
  private isGuest: boolean = false;

  constructor() { }

  getUserName(): string {
    return this.userName;
  }

  setUserName(name: string): void {
    this.userName = name;
  }

  getUserRole(): string {
    return this.userRole;
  }

  setUserRole(role: string): void {
    this.userRole = role;
  }

  isGuestUser(): boolean {
    return this.isGuest;
  }

  setGuestUser(isGuest: boolean): void {
    this.isGuest = isGuest;
  }

  loginAsGuest(): void {
    this.userName = 'INVITADO';
    this.userRole = 'Invitado';
    this.isGuest = true;
  }

  loginAsUser(name: string, role: string): void {
    this.userName = name;
    this.userRole = role;
    this.isGuest = false;
  }

  logout(): void {
    // Clear user session data
    this.userName = '';
    this.userRole = '';
    this.isGuest = false;
    // You can also clear localStorage or sessionStorage here if needed
    localStorage.removeItem('userToken');
    sessionStorage.clear();
  }
} 