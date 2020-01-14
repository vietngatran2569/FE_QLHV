import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Objective} from '../../../interface/objective';
import {ObjectiveService} from '../../../services/objective/objective.service';
import {TransferDataService} from '../../../services/transfer-data/transfer-data.service';
import {Syllabus} from '../../../interface/syllabus';
import {SyllabusService} from '../../../services/syllabus/syllabus.service';

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

  constructor(private objectiveService: ObjectiveService,
              private router: Router,
              private dataTransferService: TransferDataService,
              private syllabusService: SyllabusService) {
  }

  ngOnInit() {
    this.objectiveService.getList().subscribe(result => {
      this.objectives = result;
      console.log('success');
    }, error => {
      console.log('error');
    });
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

  getSyllabusName(id: number){
    this.objectiveService.getSyllabus(id).subscribe(data =>{
      this.syllabus = data;
    });
  }

  getCreateObjectiveForm() {
    this.router.navigateByUrl("/add-objective");
  }
}
