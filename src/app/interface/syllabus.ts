import {Objective} from './objective';

export interface Syllabus {
  id: number;
  name: string;
  image: string;
  description: string;
  objectiveList: Objective[];
}
