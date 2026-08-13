import { Routes } from '@angular/router';

import { Home } from './components/home/home';
import { StudentRegistration } from './components/student-registration/student-registration';
import { FacultyRegistration } from './components/faculty-registration/faculty-registration';
import { StudentList } from './components/student-list/student-list';
import { FacultyList } from './components/faculty-list/faculty-list';
import { CourseList } from './components/course-list/course-list';
import { RegistrationsComponent } from './components/registrations/registrations';
import { AboutComponent } from './components/about/about';

export const routes: Routes = [

  {
    path: '',
    component: Home
  },

  {
    path: 'student-registration',
    component: StudentRegistration
  },

  {
    path: 'faculty-registration',
    component: FacultyRegistration
  },

  {
    path: 'courses',
    component: CourseList
  },

  {
    path: 'registrations',
    component: RegistrationsComponent
  },

  {
    path: 'about',
    component: AboutComponent
  },

  {
    path: 'students',
    component: StudentList
  },

  {
    path: 'faculty',
    component: FacultyList
  }

];