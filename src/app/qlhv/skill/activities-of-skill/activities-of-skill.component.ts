import { Component, OnInit } from '@angular/core';
import {Skill} from '../../../interface/skill';
import {SkillService} from '../../../services/skill/skill.service';
import {Router} from '@angular/router';
import {TransferDataService} from '../../../services/transfer-data/transfer-data.service';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {ActivityService} from '../../../services/activity/activity.service';
import {LearningActivity} from '../../../interface/learningActivity';

@Component({
  selector: 'app-activities-of-skill',
  templateUrl: './activities-of-skill.component.html',
  styleUrls: ['./activities-of-skill.component.css']
})
export class ActivitiesOfSkillComponent implements OnInit {

  activities: Skill[];
  isAuthorized = false;
  roles: string[];

  constructor(private skillService: SkillService,
              private router: Router,
              private dataTransferService: TransferDataService,
              private activityService: ActivityService,
              private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
    const id = this.skillService.getData();
    this.skillService.getActivity(id).subscribe(result => {
      this.activities = result;
      console.log('success');
    }, error => {
      console.log('error');
    });
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN' || role === 'ROLE_PM') {
          this.isAuthorized = true;
          return false;
        }
        if (this.roles.length > 1) {
          this.isAuthorized = true;
          return false;
        }
      });
    }
  }

  submitDeleteSkill(id: number) {
    if (confirm('Bạn thực sự muốn xóa') === true) {
      this.deleteCategory(id);
    }
  }

  deleteCategory(id: number) {
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

  getCreateForm() {
    this.router.navigateByUrl('/add-activity');
  }

}
