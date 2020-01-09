import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Activity} from '../../interface/activity';

const activityAPI = 'http://localhost:8080/api/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
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

  getList(): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(activityAPI);
  }

  addActivity(product: Activity) {
    return this.httpClient.post(activityAPI + '/create', product);
  }

  editActivity(product: Activity) {
    return this.httpClient.put(activityAPI + '/update', product);
  }

  deleteActivity(id: number) {
    return this.httpClient.delete(activityAPI + '/' + id);
  }
}
