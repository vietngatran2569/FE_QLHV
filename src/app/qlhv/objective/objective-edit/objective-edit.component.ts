import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Objective} from '../../../interface/objective';
import {ObjectiveService} from '../../../services/objective/objective.service';

@Component({
  selector: 'app-objective-edit',
  templateUrl: './objective-edit.component.html',
  styleUrls: ['./objective-edit.component.scss']
})
export class ObjectiveEditComponent implements OnInit {

  objective: Objective;
  objectiveForm: FormGroup;
  isSuccess: boolean;

  @Output() editObjective = new EventEmitter<Objective>();

  constructor(private objectiveService: ObjectiveService,
              private route: Router) {
  }

  ngOnInit() {
    this.objective = this.objectiveService.getData();
    this.objectiveForm = new FormGroup({
      id: new FormControl(this.objective.id),
      name: new FormControl(this.objective.name, [Validators.required]),
    });
  }

  onSubmit() {
    this.objectiveService.editObjective(this.objectiveForm.value).subscribe(result => {
      this.isSuccess = true;
    }, error => {
      this.isSuccess = false;
    });
  }

}
