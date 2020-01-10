import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Objective} from '../../../interface/objective';
import {ObjectiveService} from '../../../services/objective/objective.service';
import {Syllabus} from '../../../interface/syllabus';
import {SyllabusService} from '../../../services/syllabus/syllabus.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-objective-add',
  templateUrl: './objective-add.component.html',
  styleUrls: ['./objective-add.component.scss']
})
export class ObjectiveAddComponent implements OnInit {
  objectiveForm: FormGroup;
  syllabus: Syllabus[];
  isSuccess: boolean;

  constructor(private objectiveService: ObjectiveService,
              private syllabusService: SyllabusService,
              private router: Router,
              private fb: FormBuilder) {
  }

  refresherSyllabus() {
    this.syllabusService.getList().subscribe(data => {
      this.syllabus = data;
    });
  }

  ngOnInit() {
    this.refresherSyllabus();
    this.objectiveForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      syllabus: new FormControl(''),
    });
  }

  onSubmit() {
    this.objectiveService.addObjective(this.objectiveForm.value).subscribe(result => {
      this.isSuccess = true;
    }, error => {
      this.isSuccess = false;
    });
  }


}
