import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Syllabus} from '../../../interface/syllabus';
import {HttpClient} from '@angular/common/http';
import {SyllabusService} from '../../../services/syllabus/syllabus.service';
import {UploadImageService} from '../../../services/upload-image/upload-image.service';

@Component({
  selector: 'app-syllabus-add',
  templateUrl: './syllabus-add.component.html',
  styleUrls: ['./syllabus-add.component.scss']
})
export class SyllabusAddComponent implements OnInit {

  @Output() addSyllabus = new EventEmitter<Syllabus>();
  public selectedFile;
  imgURL: any;
  base64Data: any;
  convertedImage: any;
  @Output() receivedImageData: any;

  constructor(private syllabusService: SyllabusService,
              private httpClient: HttpClient,
              private uploadImageService: UploadImageService) {
  }

  syllabusForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  ngOnInit() {
  }

  onSubmit() {
    const syllabus = this.syllabusForm.value;
    this.addSyllabus.emit(syllabus);
    this.syllabusService.addSyllabus(syllabus).subscribe(result => {
      alert('da them thanh cong!');
    });
  }

  uploadImage() {
    const uploadData = new FormData();
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    this.httpClient.post('http://localhost:8080/image', uploadData)
      .subscribe(
        res => {
          console.log(res);
          this.receivedImageData = res;
          this.base64Data = this.receivedImageData.pic;
          this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
          this.uploadImageService.addImage(this.convertedImage);
        },
        err => console.log('Error Occurred during saving: ' + err)
      );
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
