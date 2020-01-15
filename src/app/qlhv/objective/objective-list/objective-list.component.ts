import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Objective} from '../../../interface/objective';
import {ObjectiveService} from '../../../services/objective/objective.service';
import {TransferDataService} from '../../../services/transfer-data/transfer-data.service';
import {Syllabus} from '../../../interface/syllabus';
import {SyllabusService} from '../../../services/syllabus/syllabus.service';
import {TokenStorageService} from '../../../auth/token-storage.service';

@Component({
  selector: 'app-objective-list',
  templateUrl: './objective-list.component.html',
  styleUrls: ['./objective-list.component.scss']
})
export class ObjectiveListComponent implements OnInit {

  objectives: Objective[] = [];
  p = 1;
  count = 3;
  private syllabus: Syllabus;

  private roles: string[];
  private authority: string;

  constructor(private objectiveService: ObjectiveService,
              private router: Router,
              private dataTransferService: TransferDataService,
              private syllabusService: SyllabusService,
              private tokenStorage: TokenStorageService
              ) {
  }

  ngOnInit() {
    this.objectiveService.getList().subscribe(result => {
      this.objectives = result;
      console.log('success');
    }, error => {
      console.log('error');
    });
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_PM') {
          this.authority = 'pm';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }

  submitDeleteObjective(id: number) {
    if (confirm('Bạn thực sự muốn xóa') === true) {
      this.deleteCategory(id);
    }
  }

  deleteCategory(id: number) {
    this.objectiveService.deleteObjective(id).subscribe(result => {
      console.log('success');
    }, error => {
      console.log('error');
    });
  }

  goToEdit(item: Objective) {
    this.objectiveService.setData(item);
    this.router.navigateByUrl('/edit-objective');
  }

  getSyllabusName(id: number) {
    this.objectiveService.getSyllabus(id).subscribe(data => {
      this.syllabus = data;
    });
  }

  getCreateObjectiveForm() {
    this.router.navigateByUrl('/add-objective');
  }
}
