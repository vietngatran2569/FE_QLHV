import { Component, OnInit } from '@angular/core';
import {Syllabus} from '../../../interface/syllabus';
import {Router} from '@angular/router';
import {SyllabusService} from '../../../services/syllabus/syllabus.service';

@Component({
  selector: 'app-syllabus-list',
  templateUrl: './syllabus-list.component.html',
  styleUrls: ['./syllabus-list.component.scss']
})
export class SyllabusListComponent implements OnInit {

  syllabusList: Syllabus[];
  isFormHidden = true;

  constructor(private syllabusService: SyllabusService,
              private router: Router) {
    this.updateList();
  }

  ngOnInit() {
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

}
