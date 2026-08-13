import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Faculty } from '../../models/faculty';
import { FacultyService } from '../../services/faculty';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-faculty-registration',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './faculty-registration.html',
  styleUrl: './faculty-registration.css'
})
export class FacultyRegistration {

  private facultyService = inject(FacultyService);
  private courseService = inject(CourseService);

  faculty: Faculty = {
    facultyName: '',
    employeeId: '',
    email: '',
    phone: '',
    department: '',
    specialization: '',
    course: '',
    password: ''
  };

  get courses() {
    return this.courseService.getCourses();
  }

  registerFaculty() {

    this.facultyService.addFaculty({ ...this.faculty });

    alert('Faculty Registered Successfully');

    this.faculty = {
      facultyName: '',
      employeeId: '',
      email: '',
      phone: '',
      department: '',
      specialization: '',
      course: '',
      password: ''
    };

  }

}