import { Injectable } from '@angular/core';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[] = [];

  getStudents(): Student[] {
    return this.students;
  }

  addStudent(student: Student): void {
    student.id = Date.now();
    this.students.push(student);
  }

  deleteStudent(id: number): void {
    this.students = this.students.filter(s => s.id !== id);
  }

}