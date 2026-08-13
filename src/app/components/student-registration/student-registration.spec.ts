import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideRouter } from '@angular/router';

import { vi } from 'vitest';

import { StudentRegistration } from './student-registration';

describe('StudentRegistration', () => {
  let component: StudentRegistration;
  let fixture: ComponentFixture<StudentRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentRegistration],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentRegistration);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register student and reset model', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    component.student = {
      name: 'John Doe',
      registerNumber: '21CS001',
      email: 'john@gmail.com',
      phone: '1234567890',
      department: 'CSE',
      year: '1',
      course: 'Angular Development',
      password: 'password'
    };
    component.registerStudent();
    expect(alertSpy).toHaveBeenCalledWith('Student Registered Successfully');
    expect(component.student.name).toBe('');
  });
});
