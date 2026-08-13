import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CourseService } from '../../services/course';
import { StudentService } from '../../services/student';
import { FacultyService } from '../../services/faculty';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  private courseService = inject(CourseService);
  private studentService = inject(StudentService);
  private facultyService = inject(FacultyService);

  portalName = "CourseHub";
  slogan = "Manage courses, students, faculty, and registrations efficiently.";

  get totalCourses(): number {
    return this.courseService.getCourses().length;
  }

  get totalStudents(): number {
    return this.studentService.getStudents().length;
  }

  get totalFaculty(): number {
    return this.facultyService.getFaculties().length;
  }

  get totalRegistrations(): number {
    return this.totalStudents + this.totalFaculty;
  }

  get recentCourses() {
    // Show top 3 available courses
    return this.courseService.getCourses().slice(0, 3);
  }

}