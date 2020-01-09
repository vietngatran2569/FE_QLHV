import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Route, Router} from '@angular/router';
import {Syllabus} from '../../../interface/syllabus';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SyllabusService} from '../../../services/syllabus/syllabus.service';

@Component({
  selector: 'app-syllabus-edit',
  templateUrl: './syllabus-edit.component.html',
  styleUrls: ['./syllabus-edit.component.scss']
})
export class SyllabusEditComponent implements OnInit {

  syllabus: Syllabus;
  syllabusForm: FormGroup;

  @Output() editSyllabus = new EventEmitter<Syllabus>();

  constructor(private syllabusService: SyllabusService,
              private route: Router) {
  }

  ngOnInit() {
    this.syllabus = this.syllabusService.getData();
    this.syllabusForm = new FormGroup({
      id: new FormControl((this.syllabus.id)),
      name: new FormControl(this.syllabus.name, [Validators.required]),
      image: new FormControl(this.syllabus.image, [Validators.required]),
      description: new FormControl(this.syllabus.description, [Validators.required])
    });
  }

  onSubmit() {
    this.syllabusService.editSyllabus(this.syllabusForm.value).subscribe(result => {
      alert('sua thanh cong!');
      this.route.navigateByUrl('/list-syllabus');
    });
  }

}
