import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormContent } from '../../models/content.model';

@Component({
  selector: 'app-form-stepper',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './form-stepper.component.html',
  styleUrl: './form-stepper.component.scss',
  animations: [
    trigger('next', [
      state('collapsed', style({
        height: '0',
        overflow: 'hidden',
        visibility: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        visibility: 'visible'
      })),
      transition('collapsed <=> expanded', animate('225ms ease-in-out')),
    ])
 ]
})
export class FormStepperComponent {
  @Input('controls') controls = [] as FormContent;
  @Output('completed') completed = new EventEmitter();
  
  private step = 0;
  done = false;

  get last(): boolean {
    return this.step >= this.controls.length - 1;
  }

  get progress(): number {
    return (this.step + 1) / this.controls.length * 100;
  }

  show(index: number): boolean {
    return index <= this.step;
  }

  disabled(index: number): boolean {
    return index !== this.step;
  }

  next(): void {
    this.step++;

    if (this.step === this.controls.length) {
      this.done = true;
      this.completed.emit();
    }
  }
}
