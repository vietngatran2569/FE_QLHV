import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Activity} from '../../../interface/activity';
import {ActivityService} from '../../../services/activity/activity.service';
import {Objective} from '../../../interface/objective';
import {Skill} from '../../../interface/skill';
import {Router} from '@angular/router';
import {SkillService} from '../../../services/skill/skill.service';

@Component({
  selector: 'app-activity-add',
  templateUrl: './activity-add.component.html',
  styleUrls: ['./activity-add.component.scss']
})
export class ActivityAddComponent implements OnInit {

  isSuccess: boolean;
  activityForm: FormGroup;
  skill: Skill[];

  constructor(private activityService: ActivityService,
              private router: Router,
              private skillService: SkillService,
              private fb: FormBuilder) {
  }

  refresherSkill() {
    this.skillService.getList().subscribe(data => {
      this.skill = data;
    });
  }
  ngOnInit() {
    this.refresherSkill();
    this.activityForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      skill: new FormControl(''),
    });
  }

  onSubmit() {
    const activity: Activity = {
      id: this.activityForm.value.id,
      name: this.activityForm.value.name,
      skill: {
        id: this.activityForm.value.objective
      }
    };
    // console.log(this.objectiveForm.value);
    this.activityService.addActivity(activity, activity.skill.id).subscribe(() => {
      this.isSuccess = false;
    }, error => {
      this.isSuccess = true;
    });
  }

}
