import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Activity} from '../../../interface/activity';
import {ActivityService} from '../../../services/activity/activity.service';
import {Objective} from '../../../interface/objective';

@Component({
  selector: 'app-activity-add',
  templateUrl: './activity-add.component.html',
  styleUrls: ['./activity-add.component.scss']
})
export class ActivityAddComponent implements OnInit {

  isSuccess: boolean;
  activityForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  @Output() addActivity = new EventEmitter<Activity>();

  constructor(private activityService: ActivityService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    const activity = this.activityForm.value;
    this.addActivity.emit(activity);
    this.activityService.addActivity(activity).subscribe(result => {
      this.isSuccess = true;
    }, error => {
      this.isSuccess = false;
    });
  }

}
