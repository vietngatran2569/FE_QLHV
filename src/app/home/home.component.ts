import {Component, OnInit} from '@angular/core';

import {TokenStorageService} from '../auth/token-storage.service';
import {SyllabusService} from '../services/syllabus/syllabus.service';
import {Syllabus} from '../interface/syllabus';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  info: any;
  bcPreparationURL = 'http://localhost:8080/image/preparation.jpg';
  cscd1URL = 'http://localhost:8080/image/cscd1.png';
  kanbanURL = 'http://localhost:8080/image/kanban.png';
  javaSpringURL = 'http://localhost:8080/image/javaSpring.png';
  scrumURL = 'http://localhost:8080/image/scrum.png';
  webFEURL = 'http://localhost:8080/image/webFE.jpg';
  aiURL = 'http://localhost:8080/image/ai.jpeg';
  constructor(private token: TokenStorageService,
              private syllabusService: SyllabusService) {
  }

  ngOnInit() {
    // console.log(this.syllabusList);
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
