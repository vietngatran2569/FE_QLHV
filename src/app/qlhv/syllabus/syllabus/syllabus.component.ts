import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Syllabus} from '../../../interface/syllabus';
import {Router} from '@angular/router';
import {SyllabusService} from '../../../services/syllabus/syllabus.service';
import {TokenStorageService} from '../../../auth/token-storage.service';

@Component({
  selector: 'app-syllabus',
  templateUrl: './syllabus.component.html',
  styleUrls: ['./syllabus.component.scss']
})
export class SyllabusComponent implements OnInit {

  @Input() syllabus: Syllabus;
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();

  private roles: string[];
  private authority: string;

  constructor(private syllabusService: SyllabusService,
              private router: Router,
              private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
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
