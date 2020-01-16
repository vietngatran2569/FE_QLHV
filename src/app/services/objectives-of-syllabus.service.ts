import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObjectivesOfSyllabusService {
  private listObjectivesOfSyllabus;

  setObjectives(data){
    this.listObjectivesOfSyllabus = data;
  }

  getObjectives(){
    return this.listObjectivesOfSyllabus;
  }

  constructor() { }
}
