import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LearningActivity} from '../../../interface/learningActivity';
import {ActivityService} from '../../../services/activity/activity.service';
import {Activity} from "../../../interface/activity";
@Component({
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.scss']
})
export class ActivityEditComponent implements OnInit {

  activity: LearningActivity;
  activityForm: FormGroup;
  activities: Activity[];
  isSuccess: boolean;

  @Output() editSkill = new EventEmitter<LearningActivity>();

  constructor(private activityService: ActivityService,
              private route: Router) {
  }

  ngOnInit() {
    this.refreshActivityList();
    this.activity = this.activityService.getData();
    this.activityForm = new FormGroup({
      id: new FormControl(this.activity.id),
      name: new FormControl(this.activity.name, [Validators.required])
    });
  }

  onSubmit() {
    this.activityService.editActivity(this.activityForm.value).subscribe(result => {
      this.isSuccess = true;
      // this.route.navigateByUrl("/list-activity");
    }, error => {
      this.isSuccess = false;
    });
  }

  refreshActivityList() {
    this.activityService.getActivityList().subscribe(data => {
      this.activities = data;
    })
  }

}
