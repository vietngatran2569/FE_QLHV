import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Activity} from '../../../interface/activity';
import {ActivityService} from '../../../services/activity/activity.service';
@Component({
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.scss']
})
export class ActivityEditComponent implements OnInit {

  activity: Activity;
  activityForm: FormGroup;
  isSuccess: boolean;

  @Output() editSkill = new EventEmitter<Activity>();

  constructor(private activityService: ActivityService,
              private route: Router) {
  }

  ngOnInit() {
    this.activity = this.activityService.getData();
    this.activityForm = new FormGroup({
      name: new FormControl(this.activity.name, [Validators.required]),
    });
  }

  onSubmit() {
    this.activityService.editActivity(this.activityForm.value).subscribe(result => {
      this.isSuccess = true;
    }, error => {
      this.isSuccess = false;
    });
  }

}
