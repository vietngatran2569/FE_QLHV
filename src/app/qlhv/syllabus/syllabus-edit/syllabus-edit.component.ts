import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Route, Router} from '@angular/router';
import {Syllabus} from '../../../interface/syllabus';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SyllabusService} from '../../../services/syllabus/syllabus.service';

@Component({
  selector: 'app-syllabus-edit',
  templateUrl: './syllabus-edit.component.html',
  styleUrls: ['./syllabus-edit.component.scss']
})
export class SyllabusEditComponent implements OnInit {

  syllabus: Syllabus;
  syllabusForm: FormGroup;
  imgURL: any;
  private selectedFile: any;

  @Output() editSyllabus = new EventEmitter<Syllabus>();

  constructor(private syllabusService: SyllabusService,
              private router: Router) {
  }

  ngOnInit() {
    this.syllabus = this.syllabusService.getData();
    this.syllabusForm = new FormGroup({
      id: new FormControl(this.syllabus.id),
      name: new FormControl(this.syllabus.name, [Validators.required]),
      image: new FormControl(this.syllabus.image),
      description: new FormControl(this.syllabus.description, [Validators.required])
    });
    this.imgURL = this.syllabus.image;
  }

  onSubmit() {
    const syllabus = this.syllabusForm.value;
    const formData = new FormData();
    formData.append("syllabusInfo", JSON.stringify(syllabus));
    formData.append('image', this.selectedFile);
    this.syllabusService.editSyllabus(formData).subscribe(result => {
      alert('da sua thanh cong!');
      this.router.navigateByUrl('/list-syllabus');
    });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
  }
}
