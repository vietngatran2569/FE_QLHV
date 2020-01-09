import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Syllabus} from '../../../interface/syllabus';
import {Router} from '@angular/router';
import {SyllabusService} from '../../../services/syllabus/syllabus.service';

@Component({
  selector: 'app-syllabus',
  templateUrl: './syllabus.component.html',
  styleUrls: ['./syllabus.component.scss']
})
export class SyllabusComponent implements OnInit {

  @Input() syllabus: Syllabus;
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();

  constructor(private syllabusService: SyllabusService,
              private router: Router) {
  }

  ngOnInit() {
  }

  editProduct() {
    this.edit.emit();
  }

  deleteProduct() {
    this.syllabusService.deleteSyllabus(this.syllabus.id).subscribe(result => {
      alert('xoa thanh cong');
      this.delete.emit();
    });
  }

}
