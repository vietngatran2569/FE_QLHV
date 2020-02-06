import {Component, OnInit} from '@angular/core';
import {Objective} from '../../../interface/objective';
import {ObjectiveService} from '../../../services/objective/objective.service';
import {Router} from '@angular/router';
import {TransferDataService} from '../../../services/transfer-data/transfer-data.service';
import {SyllabusService} from '../../../services/syllabus/syllabus.service';
import {TokenStorageService} from '../../../auth/token-storage.service';

@Component({
  selector: 'app-objectives-of-syllabus',
  templateUrl: './objectives-of-syllabus.component.html',
  styleUrls: ['./objectives-of-syllabus.component.scss']
})
export class ObjectivesOfSyllabusComponent implements OnInit {
  objectives: Objective[];
  isAuthorized = false;
  roles: string[];

  constructor(private objectiveService: ObjectiveService,
              private router: Router,
              private dataTransferService: TransferDataService,
              private syllabusService: SyllabusService,
              private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
    const id = this.syllabusService.getData();
    this.syllabusService.getObjectives(id).subscribe(result => {
      this.objectives = result;
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


  submitDeleteObjective(id: number) {
    if (confirm('Bạn thực sự muốn xóa') === true) {
      this.deleteCategory(id);
    }
  }

  deleteCategory(id: number) {
    this.objectiveService.deleteObjective(id).subscribe(() => {
      console.log('success');
    }, () => {
      console.log('error');
    });
  }

  goToEdit(item: Objective) {
    this.objectiveService.setData(item);
    this.router.navigateByUrl('/edit-objective');
  }

  getCreateObjectiveForm() {
    this.router.navigateByUrl('/add-objective');
  }

  getSKills(id: number) {
    this.objectiveService.setData(id);
    this.router.navigateByUrl('/activity-of-objective');
  }
}
