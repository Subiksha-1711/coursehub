import { Injectable } from '@angular/core';
import { Faculty } from '../models/faculty';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  private faculties: Faculty[] = [];

  getFaculties(): Faculty[] {
    return this.faculties;
  }

  addFaculty(faculty: Faculty): void {
    faculty.id = Date.now();
    this.faculties.push(faculty);
  }

  deleteFaculty(id: number): void {
    this.faculties = this.faculties.filter(f => f.id !== id);
  }

}