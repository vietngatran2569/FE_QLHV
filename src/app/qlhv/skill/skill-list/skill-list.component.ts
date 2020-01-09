import {Component, OnInit} from '@angular/core';
import {Skill} from '../../../interface/skill';
import {Router} from '@angular/router';
import {SkillService} from '../../../services/skill/skill.service';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss']
})
export class SkillListComponent implements OnInit {

  skill: Skill[] = [];

  constructor(private skillService: SkillService, private router: Router) {
  }

  ngOnInit() {
    this.skillService.getList().subscribe(result => {
      this.skill = result;
      console.log('success');
    }, error => {
      console.log('error');
    });
  }

  submitDeleteSkill(id: number) {
    if (confirm('Bạn thực sự muốn xóa') === true) {
      this.deleteCategory(id);
    }
  }

  deleteCategory(id: number) {
    this.skillService.deleteSkill(id).subscribe(result => {
      this.ngOnInit();
      console.log('success');
    }, error => {
      console.log('error');
    });
  }

  goToEdit(item: Skill) {
    this.skillService.setData(item);
    this.router.navigateByUrl('/edit-skill');
  }
}
