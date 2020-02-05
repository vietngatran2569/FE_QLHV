import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Skill} from '../../../interface/skill';
import {SkillService} from '../../../services/skill/skill.service';
import {Router} from '@angular/router';
import {Objective} from '../../../interface/objective';
import {ObjectiveService} from '../../../services/objective/objective.service';

@Component({
  selector: 'app-skill-add',
  templateUrl: './skill-add.component.html',
  styleUrls: ['./skill-add.component.scss']
})
export class SkillAddComponent implements OnInit {
  isSuccess: boolean;
  objective: Objective[];
  skillForm: FormGroup;

  constructor(private skillService: SkillService,
              private router: Router,
              private objectiveService: ObjectiveService,
              private fb: FormBuilder) {
  }

  refresherObjective() {
    this.objectiveService.getList().subscribe(data => {
      this.objective = data;
    });
  }

  ngOnInit() {
    this.refresherObjective();
    this.skillForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      objective: new FormControl(''),
    });
  }

  onSubmit() {
    const skill: Skill = {
      id: this.skillForm.value.id,
      name: this.skillForm.value.name,
      objective: {
        id: this.skillForm.value.objective
      }
    };
    // console.log(this.objectiveForm.value);
    this.skillService.addSkill(skill, skill.objective.id).subscribe(() => {
      this.isSuccess = false;
    }, error => {
      this.isSuccess = true;
    });
  }
}
