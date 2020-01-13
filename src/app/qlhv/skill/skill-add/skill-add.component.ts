import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {Skill} from '../../../interface/skill';
import {SkillService} from '../../../services/skill/skill.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-skill-add',
  templateUrl: './skill-add.component.html',
  styleUrls: ['./skill-add.component.scss']
})
export class SkillAddComponent implements OnInit {
  isSuccess: boolean;
  skillForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  @Output() addSkill = new EventEmitter<Skill>();

  constructor(private skillService: SkillService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    const skill = this.skillForm.value;
    this.addSkill.emit(skill);
    this.skillService.addSkill(skill).subscribe(result => {
      this.isSuccess = true;
      this.router.navigateByUrl("/list-skill");
    }, error => {
      this.isSuccess = false;
    });
  }
}
