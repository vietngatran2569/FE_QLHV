import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  info: any;
  public roles: string[];
  public isAuthorized = false;
  public isLoggedIn = false;

  constructor(private token: TokenStorageService,
              private router: Router) {
  }

  ngOnInit() {
    // console.log(this.syllabusList);
    if (this.token.getToken()) {
      this.roles = this.token.getAuthorities();
      this.checkAuthorization();
    }
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
  }

  private checkAuthorization() {
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

  logout() {
    this.token.signOut();
    window.location.reload();
    this.router.navigateByUrl('/home');
  }
}


