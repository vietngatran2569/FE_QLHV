import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Objective} from '../../../interface/objective';
import {ObjectiveService} from '../../../services/objective/objective.service';

@Component({
  selector: 'app-objective-list',
  templateUrl: './objective-list.component.html',
  styleUrls: ['./objective-list.component.scss']
})
export class ObjectiveListComponent implements OnInit {

  objective: Objective[] = [];

  constructor(private objectiveService: ObjectiveService, private router: Router) {
  }

  ngOnInit() {
    this.objectiveService.getList().subscribe(result => {
      this.objective = result;
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
      this.ngOnInit();
      console.log('success');
    }, error => {
      console.log('error');
    });
  }

  goToEdit(item: Objective) {
    this.objectiveService.setData(item);
    this.router.navigateByUrl('/edit-objective');
  }


}
