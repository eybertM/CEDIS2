import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
    { path: '/prestamos', title: 'Préstamos',  icon: 'pe-7s-bookmarks', class: '' },
    { path: '/documentos', title: 'Documentos',  icon: 'pe-7s-file', class: '' },
    { path: '/lectores', title: 'Lectores',  icon: 'pe-7s-users', class: '' },
    { path: '/reportes', title: 'Reporte de Lectores Morosos',  icon: 'pe-7s-graph', class: '' },
    { path: '/user', title: 'User Profile',  icon:'pe-7s-user', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  userName: string;
  userInitials: string;
  userRole: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.userName = this.userService.getUserName();
    this.userInitials = this.getInitials(this.userName);
    this.userRole = this.userService.getUserRole();
  }

  getInitials(name: string): string {
    // If user is guest, return "IN"
    if (this.userService.isGuestUser()) {
      return 'IN';
    }
    
    // For regular users, get initials from name
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  logout() {
    // Clear user session
    this.userService.logout();
    // Navigate to login page
    this.router.navigate(['/login']);
  }
}
