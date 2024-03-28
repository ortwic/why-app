import { Component, Input } from '@angular/core';
import { HeroSection } from '../../models/page.model';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {
  @Input('hero-section')
  section = {} as HeroSection;
}
