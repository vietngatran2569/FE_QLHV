import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Skill} from '../../interface/skill';

const skillAPI = 'http://localhost:8080/api/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

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

  getList(): Observable<Skill[]> {
    return this.httpClient.get<Skill[]>(skillAPI);
  }

  addSkill(skill: Skill, id: number) {
    return this.httpClient.post(skillAPI + '/create/' + id, skill);
  }

  editSkill(product: Skill) {
    return this.httpClient.put(skillAPI + '/update', product);
  }

  deleteSkill(id: number) {
    return this.httpClient.delete(skillAPI + '/' + id);
  }
}
