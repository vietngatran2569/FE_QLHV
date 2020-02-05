import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Objective} from '../../interface/objective';
import {Syllabus} from '../../interface/syllabus';
import {Skill} from '../../interface/skill';

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
    const tmp = this.data;
    this.clearData();
    return tmp;
  }

  clearData() {
    this.data = undefined;
  }

  getList(): Observable<Objective[]> {
    return this.httpClient.get<Objective[]>(objectiveAPI);
  }

  addObjective(objective: Objective, id: number) {
    return this.httpClient.post(objectiveAPI + '/create/' + id, objective);
  }

  editObjective(objective: Objective) {
    return this.httpClient.put(objectiveAPI + '/update', objective);
  }

  deleteObjective(id: number) {
    return this.httpClient.delete(objectiveAPI + '/' + id);
  }

  getSkills(id: number) {
    return this.httpClient.get<Skill[]>(objectiveAPI + '/' + id + '/getSkillList');
  }

  // getSyllabus(id: number): Observable<Syllabus> {
  //   return this.httpClient.get<Syllabus>(objectiveAPI + '/getSyllabusName/' + id);
  // }
}
