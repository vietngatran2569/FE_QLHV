import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LearningActivity} from '../../../interface/learningActivity';
import {ActivityService} from '../../../services/activity/activity.service';
import {Activity} from "../../../interface/activity";

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {

  activity: LearningActivity[] = [];

  constructor(private activityService: ActivityService, private router: Router) {
  }

  ngOnInit() {
    this.activityService.getList().subscribe(result => {
      this.activity = result;
      console.log('success');
    }, error => {
      console.log('error');
    });
  }

  submitDeleteActivity(id: number) {
    if (confirm('Bạn thực sự muốn xóa') === true) {
      this.deleteActi(id);
    }
  }

  deleteActi(id: number) {
    this.activityService.deleteActivity(id).subscribe(result => {
      this.ngOnInit();
      console.log('success');
    }, error => {
      console.log('error');
    });
  }

  goToEdit(item: LearningActivity) {
    this.activityService.setData(item);
    this.router.navigateByUrl('/edit-activity');
  }

  getActivityName(activity: Activity){
    return activity.name;
  }

}
