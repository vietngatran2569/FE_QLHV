import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Objective} from '../../../interface/objective';
import {ObjectiveService} from '../../../services/objective/objective.service';

@Component({
  selector: 'app-objective-add',
  templateUrl: './objective-add.component.html',
  styleUrls: ['./objective-add.component.scss']
})
export class ObjectiveAddComponent implements OnInit {

  isSuccess: boolean;
  objecitveForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  @Output() addObjective = new EventEmitter<Objective>();

  constructor(private objectiveService: ObjectiveService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    const objective = this.objecitveForm.value;
    this.addObjective.emit(objective);
    this.objectiveService.addObjective(objective).subscribe(result => {
      this.isSuccess = true;
    }, error => {
      this.isSuccess = false;
    });
  }


}
