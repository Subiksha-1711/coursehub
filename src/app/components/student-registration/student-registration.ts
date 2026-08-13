import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Student } from '../../models/student';
import { CourseService } from '../../services/course';
import { StudentService } from '../../services/student';

@Component({
  selector: 'app-student-registration',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student-registration.html',
  styleUrl: './student-registration.css'
})
export class StudentRegistration implements OnInit {

  private courseService = inject(CourseService);
  private studentService = inject(StudentService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['course']) {
        this.student.course = params['course'];
      }
    });
  }

  student: Student = {
    name: '',
    registerNumber: '',
    email: '',
    phone: '',
    department: '',
    year: '',
    course: '',
    password: ''
  };

  get courses() {
    return this.courseService.getCourses();
  }

  registerStudent() {

    this.studentService.addStudent({ ...this.student });

    alert('Student Registered Successfully');

    this.student = {
      name: '',
      registerNumber: '',
      email: '',
      phone: '',
      department: '',
      year: '',
      course: '',
      password: ''
    };

  }

}