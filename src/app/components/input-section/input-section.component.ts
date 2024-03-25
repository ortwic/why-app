import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormContent } from '../../models/content.model';

@Component({
  selector: 'app-input-section',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './input-section.component.html',
  styleUrl: './input-section.component.scss'
})
export class InputSectionComponent {
  @Input({ alias: 'item', required: true }) 
  item!: FormContent;
  
  @Input('disabled') 
  disabled = false;
}
