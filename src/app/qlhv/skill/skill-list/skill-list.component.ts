import {Component, OnInit} from '@angular/core';
import {Skill} from '../../../interface/skill';
import {Router} from '@angular/router';
import {SkillService} from '../../../services/skill/skill.service';
import {TokenStorageService} from "../../../auth/token-storage.service";

@Component({
    selector: 'app-skill-list',
    templateUrl: './skill-list.component.html',
    styleUrls: ['./skill-list.component.scss']
})
export class SkillListComponent implements OnInit {

    skill: Skill[] = [];
    public roles: string[];
    public isAuthorized = false;

    constructor(private skillService: SkillService,
                private router: Router,
                private token: TokenStorageService) {
    }

    ngOnInit() {
        this.skillService.getList().subscribe(result => {
            this.skill = result;
            console.log('success');
        }, error => {
            console.log('error');
        });
        if (this.token.getToken()) {
            this.roles = this.token.getAuthorities();
            this.checkAuthorization();
        }
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

    getCreateForm() {
        this.router.navigateByUrl('/add-skill');
    }

    getActivity(id: number) {
        this.skillService.setData(id);
        this.router.navigateByUrl('/activities-of-skill');
    }

    private checkAuthorization() {
        this.roles.every(role => {
            if (role === 'ROLE_ADMIN' || role === 'ROLE_PM') {
                this.isAuthorized = true;
                return false;
            } else if (role === 'ROLE_USER') {
                this.isAuthorized = false;
                // return false;
            }
            return true;
        });
    }
}
