import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
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
    @ViewChildren(InputSectionComponent) inputs!: QueryList<InputSectionComponent>;

    done = false;
    disabled = true;
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

    isActive(index: number): boolean {
        return index === this._step;
    }

    isValid(): boolean {
        const currentInput = this.inputs?.get(this._step);
        return currentInput ? currentInput.valid : true;
    }

    update(value: InputValue, id: string) {
        this.data[id] = value;
        this.disabled = !this.isValid();
    }

    next(): void {
        const currentId = this.definitions[this._step].value.id;
        if (!this.data[currentId]) {
            // no data entered hence no update fired
            this.data[currentId] = undefined;
        }

        this._step++;
        this.disabled = !this.isValid();
        this.done = this._step === this.definitions.length;
        this.continue.emit({
            completed: this.done,
            data: { ...this.data }
        });
    }
}
