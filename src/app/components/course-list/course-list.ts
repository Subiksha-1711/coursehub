import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { CourseService } from '../../services/course';
import { StudentService } from '../../services/student';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList {

  private courseService = inject(CourseService);
  private studentService = inject(StudentService);

  course: Course = {
    courseCode: '',
    courseName: '',
    department: '',
    credits: 0,
    duration: '',
    facultyName: '',
    maxSeats: 0
  };

  get courses(): Course[] {
    return this.courseService.getCourses();
  }

  addCourse() {
    this.courseService.addCourse({ ...this.course });
    alert('Course Added Successfully');
    this.course = {
      courseCode: '',
      courseName: '',
      department: '',
      credits: 0,
      duration: '',
      facultyName: '',
      maxSeats: 0
    };
  }

  deleteCourse(id: number) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(id);
    }
  }

  getEnrolledCount(courseName: string): number {
    return this.studentService.getStudents().filter(s => s.course === courseName).length;
  }

  getEnrolledPercent(courseName: string, maxSeats: number): number {
    if (!maxSeats) return 0;
    const pct = (this.getEnrolledCount(courseName) / maxSeats) * 100;
    return Math.min(100, Math.round(pct));
  }

  getStatus(courseName: string, maxSeats: number): 'Available' | 'Almost Full' | 'Full' {
    const enrolled = this.getEnrolledCount(courseName);
    if (enrolled >= maxSeats) {
      return 'Full';
    } else if (enrolled >= maxSeats * 0.8) {
      return 'Almost Full';
    } else {
      return 'Available';
    }
  }

}