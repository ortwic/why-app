import { Component, input } from '@angular/core';
import { HeroSection } from '../../models/page.model';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {
  section = input({} as HeroSection, { alias: 'hero-section' });
}
