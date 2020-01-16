import {Component, OnInit} from '@angular/core';

import {TokenStorageService} from '../auth/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  info: any;
  urlimg1 = 'http://localhost:8080/image/java1.jpeg';
  urlimg2 = 'http://localhost:8080/image/java4.png';
  urlimg3 = 'http://localhost:8080/image/java5.jpeg';
  urlimg4 = 'http://localhost:8080/image/java6.jpg';
  urlteam = 'http://localhost:8080/image/team.jpeg';
  constructor(private token: TokenStorageService) {
  }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }
}
