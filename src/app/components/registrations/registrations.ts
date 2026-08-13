import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StudentService } from '../../services/student';
import { FacultyService } from '../../services/faculty';
import { CourseService } from '../../services/course';
import { Student } from '../../models/student';
import { Faculty } from '../../models/faculty';
import { Course } from '../../models/course';

@Component({
  selector: 'app-registrations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrations.html',
  styleUrl: './registrations.css'
})
export class RegistrationsComponent implements OnInit {

  private studentService = inject(StudentService);
  private facultyService = inject(FacultyService);
  private courseService = inject(CourseService);

  students: Student[] = [];
  faculties: Faculty[] = [];
  courses: Course[] = [];
  
  activeTab: 'students' | 'faculty' = 'students';

  // Filters
  searchQuery: string = '';
  selectedDept: string = '';
  selectedCourse: string = '';

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.students = this.studentService.getStudents();
    this.faculties = this.facultyService.getFaculties();
    this.courses = this.courseService.getCourses();
  }

  setActiveTab(tab: 'students' | 'faculty') {
    this.activeTab = tab;
  }

  // Dynamic Statistics
  get totalStudentRegs(): number {
    return this.students.length;
  }

  get totalFacultyRegs(): number {
    return this.faculties.length;
  }

  get totalRegs(): number {
    return this.totalStudentRegs + this.totalFacultyRegs;
  }

  get popularCourse(): { name: string; count: number } {
    if (this.students.length === 0) {
      return { name: 'N/A', count: 0 };
    }

    const courseCounts: { [key: string]: number } = {};
    this.students.forEach(s => {
      if (s.course) {
        courseCounts[s.course] = (courseCounts[s.course] || 0) + 1;
      }
    });

    let popular = 'N/A';
    let max = 0;
    
    Object.keys(courseCounts).forEach(c => {
      if (courseCounts[c] > max) {
        max = courseCounts[c];
        popular = c;
      }
    });

    return { name: popular, count: max };
  }

  // Filter lists dynamically
  get filteredStudents(): Student[] {
    return this.students.filter(student => {
      const matchesSearch = !this.searchQuery || 
        student.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        student.registerNumber.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesDept = !this.selectedDept || student.department === this.selectedDept;
      
      const matchesCourse = !this.selectedCourse || student.course === this.selectedCourse;

      return matchesSearch && matchesDept && matchesCourse;
    });
  }

  get filteredFaculties(): Faculty[] {
    return this.faculties.filter(fac => {
      const matchesSearch = !this.searchQuery || 
        fac.facultyName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        fac.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        fac.employeeId.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesDept = !this.selectedDept || fac.department === this.selectedDept;
      
      const matchesCourse = !this.selectedCourse || fac.course === this.selectedCourse;

      return matchesSearch && matchesDept && matchesCourse;
    });
  }

  // Helper selectors for filter dropdowns
  get uniqueDepartments(): string[] {
    const depts = new Set<string>();
    this.students.forEach(s => depts.add(s.department));
    this.faculties.forEach(f => depts.add(f.department));
    return Array.from(depts).filter(Boolean);
  }

  get uniqueCourses(): string[] {
    const list = new Set<string>();
    this.courses.forEach(c => list.add(c.courseName));
    this.students.forEach(s => list.add(s.course));
    return Array.from(list).filter(Boolean);
  }

  // Course-wise helper methods
  getEnrolledCount(courseName: string): number {
    return this.students.filter(s => s.course === courseName).length;
  }

  getEnrolledPercent(courseName: string, maxSeats: number): number {
    if (!maxSeats) return 0;
    const percent = (this.getEnrolledCount(courseName) / maxSeats) * 100;
    return Math.min(100, Math.round(percent));
  }

  getCourseStatus(courseName: string, maxSeats: number): 'Available' | 'Almost Full' | 'Full' {
    const count = this.getEnrolledCount(courseName);
    if (count >= maxSeats) {
      return 'Full';
    } else if (count >= maxSeats * 0.8) {
      return 'Almost Full';
    } else {
      return 'Available';
    }
  }

  deleteStudent(id: number) {
    if (confirm('Are you sure you want to delete this student registration?')) {
      this.studentService.deleteStudent(id);
      this.loadData();
    }
  }

  deleteFaculty(id: number) {
    if (confirm('Are you sure you want to delete this faculty registration?')) {
      this.facultyService.deleteFaculty(id);
      this.loadData();
    }
  }

}
