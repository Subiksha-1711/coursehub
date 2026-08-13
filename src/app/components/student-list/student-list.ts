import { Component, OnInit, inject } from '@angular/core';
import { StudentService } from '../../services/student';
import { Student } from '../../models/student';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css'
})
export class StudentList implements OnInit {

  private studentService = inject(StudentService);

  students: Student[] = [];

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.students = this.studentService.getStudents();
  }

  delete(id: number) {
    if (confirm("Are you sure you want to delete this student?")) {
      this.studentService.deleteStudent(id);
      this.loadStudents();
    }
  }

}