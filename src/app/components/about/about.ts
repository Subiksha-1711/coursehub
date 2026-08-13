import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent {
  // Feature card data for easy rendering
  features = [
    {
      title: 'Easy Registration',
      description: 'Students and faculty can register efficiently through simplified, validation-guided forms.',
      icon: 'bi-mortarboard'
    },
    {
      title: 'Course Management',
      description: 'Centralized tools to list, create, and delete courses, tracking enrollment capacity in real-time.',
      icon: 'bi-book'
    },
    {
      title: 'Centralized Records',
      description: 'Registration info and form submission details are organized in a dynamic administrative dashboard.',
      icon: 'bi-shield-check'
    }
  ];
}
