import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Syllabus} from '../../../interface/syllabus';
import {HttpClient} from '@angular/common/http';
import {SyllabusService} from '../../../services/syllabus/syllabus.service';
import {UploadImageService} from '../../../services/upload-image/upload-image.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-syllabus-add',
  templateUrl: './syllabus-add.component.html',
  styleUrls: ['./syllabus-add.component.scss']
})
export class SyllabusAddComponent implements OnInit {

  @Output() addSyllabus = new EventEmitter<Syllabus>();
  public selectedFile;
  imgURL: any;
  @Output() receivedImageData: any;

  constructor(private syllabusService: SyllabusService,
              private httpClient: HttpClient,
              private uploadImageService: UploadImageService,
              private router: Router) {
  }

  syllabusForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  ngOnInit() {
  }

  onSubmit() {
    const syllabus = this.syllabusForm.value;
    const formData = new FormData();
    formData.append('syllabusInfo', JSON.stringify(syllabus));
    formData.append('image', this.selectedFile);
    // this.addSyllabus.emit(syllabus);
    this.syllabusService.addSyllabus(formData).subscribe(result => {
      alert('da them thanh cong!');
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
