import { Component, OnInit } from '@angular/core';
import {Syllabus} from '../../../interface/syllabus';
import {Router} from '@angular/router';
import {SyllabusService} from '../../../services/syllabus/syllabus.service';
import {TokenStorageService} from '../../../auth/token-storage.service';

@Component({
  selector: 'app-syllabus-list',
  templateUrl: './syllabus-list.component.html',
  styleUrls: ['./syllabus-list.component.scss']
})
export class SyllabusListComponent implements OnInit {

  syllabusList: Syllabus[];
  isFormHidden = true;

  private roles: string[];
  private authority: string;

  constructor(private syllabusService: SyllabusService,
              private router: Router,
              private tokenStorage: TokenStorageService) {
    this.updateList();
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_PM') {
          this.authority = 'pm';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }

  showFormAdd() {
    this.isFormHidden = !this.isFormHidden;
  }

  addSyllabus(syllabus: Syllabus) {
    this.syllabusList.push(syllabus);
  }

  updateList() {
    this.syllabusService.getList().subscribe(result => {
      this.syllabusList = result;
    });
  }

  goToEdit(item: Syllabus) {
    this.syllabusService.setData(item);
    this.router.navigateByUrl('/edit-syllabus');
  }

  getCreateForm() {
    this.router.navigateByUrl('/add-syllabus');
  }
}
