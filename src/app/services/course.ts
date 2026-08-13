import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courses: Course[] = [
    {
      id: 1,
      courseCode: 'CS101',
      courseName: 'Angular Development',
      department: 'CSE',
      credits: 4,
      duration: '12 Weeks',
      facultyName: 'Dr. Kumar',
      maxSeats: 50
    },
    {
      id: 2,
      courseCode: 'AI202',
      courseName: 'Artificial Intelligence',
      department: 'ECE',
      credits: 4,
      duration: '16 Weeks',
      facultyName: 'Dr. Priya',
      maxSeats: 45
    },
    {
      id: 3,
      courseCode: 'DS303',
      courseName: 'Data Science',
      department: 'IT',
      credits: 3,
      duration: '10 Weeks',
      facultyName: 'Dr. Rahul',
      maxSeats: 40
    }
  ];

  getCourses(): Course[] {
    return this.courses;
  }

  addCourse(course: Course): void {
    course.id = Date.now();
    this.courses.push(course);
  }

  deleteCourse(id: number): void {
    this.courses = this.courses.filter(c => c.id !== id);
  }
}