import { Component, OnInit } from '@angular/core';
import {Objective} from '../../../interface/objective';
import {ObjectiveService} from '../../../services/objective/objective.service';
import {Router} from '@angular/router';
import {TransferDataService} from '../../../services/transfer-data/transfer-data.service';
import {SyllabusService} from '../../../services/syllabus/syllabus.service';

@Component({
  selector: 'app-objectives-of-syllabus',
  templateUrl: './objectives-of-syllabus.component.html',
  styleUrls: ['./objectives-of-syllabus.component.css']
})
export class ObjectivesOfSyllabusComponent implements OnInit {
  objectives: Objective[];

  constructor(private objectiveService: ObjectiveService,
              private router: Router,
              private dataTransferService: TransferDataService,
              private syllabusService: SyllabusService,) { }

  ngOnInit() {
    const id = this.syllabusService.getData();
    this.syllabusService.getObjectives(id).subscribe(result => {
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
  getCreateObjectiveForm() {
    this.router.navigateByUrl('/add-objective');
  }
}
