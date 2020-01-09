import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Skill} from '../../../interface/skill';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router} from '@angular/router';
import {SkillService} from '../../../services/skill/skill.service';

@Component({
  selector: 'app-skill-edit',
  templateUrl: './skill-edit.component.html',
  styleUrls: ['./skill-edit.component.scss']
})
export class SkillEditComponent implements OnInit {
  skill: Skill;
  skillForm: FormGroup;
  isSuccess: boolean;

  @Output() editSkill = new EventEmitter<Skill>();

  constructor(private skillService: SkillService,
              private route: Router) {
  }

  ngOnInit() {
    this.skill = this.skillService.getData();
    this.skillForm = new FormGroup({
      name: new FormControl(this.skill.name, [Validators.required]),
    });
  }

  onSubmit() {
    this.skillService.editSkill(this.skillForm.value).subscribe(result => {
      this.isSuccess = true;
    }, error => {
      this.isSuccess = false;
    });
  }

}
