import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LearningActivity} from '../../../interface/learningActivity';
import {ActivityService} from '../../../services/activity/activity.service';
import {Objective} from '../../../interface/objective';
import {Skill} from '../../../interface/skill';
import {Router} from '@angular/router';
import {SkillService} from '../../../services/skill/skill.service';
import {Activity} from "../../../interface/activity";

@Component({
  selector: 'app-activity-add',
  templateUrl: './activity-add.component.html',
  styleUrls: ['./activity-add.component.scss']
})
export class ActivityAddComponent implements OnInit {

  isSuccess: boolean;
  activityForm: FormGroup;
  skill: Skill[];
  activity: Activity[];

  constructor(private activityService: ActivityService,
              private router: Router,
              private skillService: SkillService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.refresherSkill();
    this.refreshActivityList();
    this.activityForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      skill: new FormControl(''),
      activity: new FormControl('')
    });
  }

  onSubmit() {
    const learningActivity: LearningActivity = {
      id: this.activityForm.value.id,
      name: this.activityForm.value.name,
      skill: {
        id: this.activityForm.value.skill
      },
      activity: {
        id: this.activityForm.value.activity
      }
    };
    // console.log(this.objectiveForm.value);
    this.activityService.addActivity(learningActivity, learningActivity.skill.id, learningActivity.activity.id).subscribe(() => {
      this.isSuccess = false;
    }, error => {
      this.isSuccess = true;
    });
  }

  refresherSkill() {
    this.skillService.getList().subscribe(data => {
      this.skill = data;
    });
  }

  refreshActivityList() {
    this.activityService.getActivityList().subscribe(data => {
      this.activity = data;
    })
  }
}
