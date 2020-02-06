import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LearningActivity} from '../../interface/learningActivity';
import {Activity} from "../../interface/activity";

const learningActivityAPI = 'http://localhost:8080/api/activity';
const activityAPI = 'http://localhost:8080/api/listActivity';

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

  getList(): Observable<LearningActivity[]> {
    return this.httpClient.get<LearningActivity[]>(learningActivityAPI);
  }

  addActivity(product: LearningActivity, skillID: number, activityID: number) {
    return this.httpClient.post(learningActivityAPI + '/create/' + skillID + '/' + activityID, product);
  }

  editActivity(product: LearningActivity) {
    return this.httpClient.put(learningActivityAPI + '/update', product);
  }

  deleteActivity(id: number) {
    return this.httpClient.delete(learningActivityAPI + '/' + id);
  }

  getActivityList(): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(activityAPI);
  }
}
