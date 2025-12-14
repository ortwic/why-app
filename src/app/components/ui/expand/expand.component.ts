import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-expand',
  standalone: true,
  imports: [CommonModule, MatAccordion, MatExpansionModule],
  templateUrl: './expand.component.html',
  styleUrl: './expand.component.scss'
})
export class ExpandComponent {
    title = input.required<string>();
    description = input('');
}
