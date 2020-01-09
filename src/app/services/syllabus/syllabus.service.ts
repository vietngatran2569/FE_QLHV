import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Syllabus} from '../../interface/syllabus';
import {Observable} from 'rxjs';

const syllabusAPI = 'http://localhost:8080/api/syllabus';

@Injectable({
  providedIn: 'root'
})
export class SyllabusService {

  constructor(private httpClient: HttpClient) {
  }

  private data;

  setData(data) {
    this.data = data;
  }

  getData() {
    const tmp = this.data;
    this.clearData();
    return tmp;
  }

  clearData() {
    this.data = undefined;
  }

  getList(): Observable<Syllabus[]> {
    return this.httpClient.get<Syllabus[]>(syllabusAPI);
  }

  addSyllabus(product: Syllabus) {
    return this.httpClient.post(syllabusAPI + '/create', product);
  }

  editSyllabus(product: Syllabus) {
    return this.httpClient.put(syllabusAPI + '/update', product);
  }

  deleteSyllabus(id: number) {
    return this.httpClient.delete(syllabusAPI + '/' + id);
  }
}
