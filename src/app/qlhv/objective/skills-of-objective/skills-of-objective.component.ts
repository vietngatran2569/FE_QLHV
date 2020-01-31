import { Component, OnInit } from '@angular/core';
import {ObjectiveService} from "../../../services/objective/objective.service";
import {Router} from "@angular/router";
import {TransferDataService} from "../../../services/transfer-data/transfer-data.service";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {Objective} from "../../../interface/objective";
import {SkillService} from "../../../services/skill/skill.service";
import {Skill} from "../../../interface/skill";

@Component({
  selector: 'app-skills-of-objective',
  templateUrl: './skills-of-objective.component.html',
  styleUrls: ['./skills-of-objective.component.css']
})
export class SkillsOfObjectiveComponent implements OnInit {

  skills: Objective[];
  isAuthorized = false;
  roles: string[];

  constructor(private objectiveService: ObjectiveService,
              private router: Router,
              private dataTransferService: TransferDataService,
              private skillService: SkillService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    const id = this.objectiveService.getData();
    this.objectiveService.getSkills(id).subscribe(result => {
      this.skills = result;
      console.log('success');
    }, () => {
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
    this.skillService.deleteSkill(id).subscribe(() => {
      console.log('success');
    }, () => {
      console.log('error');
    });
  }

  goToEdit(item: Skill) {
    this.skillService.setData(item);
    this.router.navigateByUrl('/edit-skill');
  }

  getCreateSkillForm() {
    this.router.navigateByUrl('/add-skill');
  }

}
