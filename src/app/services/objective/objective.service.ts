import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Objective} from '../../interface/objective';

const objectiveAPI = 'http://localhost:8080/api/objective';

@Injectable({
  providedIn: 'root'
})
export class ObjectiveService {

  constructor(private httpClient: HttpClient) {
  }

  private data;

  setData(data) {
    this.data = data;
  }

  getData() {
    let tmp = this.data;
    this.clearData();
    return tmp;
  }

  clearData() {
    this.data = undefined;
  }

  getList(): Observable<Objective[]> {
    return this.httpClient.get<Objective[]>(objectiveAPI);
  }

  addObjective(product: Objective) {
    return this.httpClient.post(objectiveAPI + '/create', product);
  }

  editObjective(product: Objective) {
    return this.httpClient.put(objectiveAPI + '/update', product);
  }

  deleteObjective(id: number) {
    return this.httpClient.delete(objectiveAPI + '/' + id);
  }
}
