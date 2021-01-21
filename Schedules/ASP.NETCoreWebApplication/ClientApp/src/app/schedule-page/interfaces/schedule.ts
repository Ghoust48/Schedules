import {Lesson} from "../../lessons/interfaces/lesson";

export interface Schedule {
  id: number;
  timetableId: number;
  daysWeekId: number;
  startTime: string;
  endTime: string;
  daysWeek: string;
  lessons: Lesson[];
}
