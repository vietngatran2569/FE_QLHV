import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Image} from '../../interface/Image';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  private apiURL = 'http://localhost:8080/image/';

  constructor(private httpClient: HttpClient) {
  }

  getImageList(): Observable<Image[]> {
    return this.httpClient.get<Image[]>(this.apiURL + 'images');
  }

  addImage(image: Image): Observable<Image> {
    return this.httpClient.post<Image>(this.apiURL + 'upload', image);
  }
}
