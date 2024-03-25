import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
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
export class StepperComponent<T> {
  @Input({ alias: 'controls', required: true }) 
  controls!: T[];
  
  @Input({ alias: 'template', required: true }) 
  template!: TemplateRef<unknown>;
  
  @Output('completed') 
  completed = new EventEmitter();
  
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
