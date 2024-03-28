import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { expandTrigger } from '../../animations.helper';
import { InputSectionComponent } from '../input-section/input-section.component';
import { ProgressSpinnerComponent } from '../ui/progress-spinner/progress-spinner.component';
import { InputDefinition, InputValue } from '../../models/content.model';

export interface ContinueEventArgs {
    completed: boolean;
    data: Record<string, InputValue>;
}

@Component({
    selector: 'app-input-stepper',
    standalone: true,
    imports: [
        CommonModule, 
        FormsModule,
        MatButtonModule, 
        MatIconModule,
        InputSectionComponent,
        ProgressSpinnerComponent
    ],
    templateUrl: './input-stepper.component.html',
    styleUrl: './input-stepper.component.scss',
    animations: [expandTrigger('next')],
})
export class InputStepperComponent {
    @Input({ required: true }) definitions!: InputDefinition[];
    @Input() data: Record<string, InputValue> = {};
    @Output() continue = new EventEmitter<ContinueEventArgs>();

    done = false;
    private _step = 0;

    get last(): boolean {
        return this._step >= this.definitions.length - 1;
    }

    get progress(): number {
        return ((this._step + 1) / this.definitions.length) * 100;
    }

    show(index: number): 'expanded' | 'collapsed' {
        return index <= this._step ? 'expanded' : 'collapsed';
    }

    disabled(index: number): boolean {
        return index !== this._step;
    }

    update(value: InputValue, id: string) {
        this.data[id] = value;
    }

    next(): void {
        const currentId = this.definitions[this._step].value.id;
        if (!this.data[currentId]) {
            // no data entered hence no update fired
            this.data[currentId] = undefined;
        }

        this._step++;
        this.done = this._step === this.definitions.length;
        this.continue.emit({
            completed: this.done,
            data: { ...this.data }
        });
    }
}
