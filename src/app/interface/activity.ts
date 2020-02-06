import {LearningActivity} from "./learningActivity";

export interface Activity {
  id: number;
  name: string;
  learningActivities?: LearningActivity[];
}
