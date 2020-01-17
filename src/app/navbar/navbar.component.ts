import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private roles: string[];
  private isAuthorized: boolean = false;
  private isLoggedIn: boolean = false;


  constructor(private tokenStorage: TokenStorageService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.checkAuthorization();
    }
  }

  private checkAuthorization(){
    this.roles.every(role => {
      if (role === 'ROLE_ADMIN' || role === 'ROLE_PM') {
        this.isLoggedIn = true;
        this.isAuthorized = true;
        return false;
      } else if (role === 'ROLE_USER') {
        this.isLoggedIn = true;
        this.isAuthorized = false;
        // return false;
      }
      return true;
    });
  }

  w3_open() {
    document.getElementById('mySidebar').style.display = 'block';
  }

}
