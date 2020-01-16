import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './auth/token-storage.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  private isAuthorized: boolean = false;
  private isLoggedIn: boolean = false;


  constructor(private tokenStorage: TokenStorageService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
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
  }

  w3_open() {
    document.getElementById('mySidebar').style.display = 'block';
  }

  w3_close() {
    document.getElementById('mySidebar').style.display = 'none';
  }
}
