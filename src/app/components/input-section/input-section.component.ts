import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputDefinition, InputValue } from '../../models/content.model';

@Component({
    selector: 'app-input-section',
    standalone: true,
    imports: [
        CommonModule, 
        FormsModule, 
        MatButtonToggleModule, 
        MatCardModule, 
        MatIconModule, 
        MatInputModule, 
        MatFormFieldModule
    ],
    templateUrl: './input-section.component.html',
    styleUrl: './input-section.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputSectionComponent),
            multi: true
        }
    ]
})
export class InputSectionComponent implements ControlValueAccessor {
    @Input({ required: true }) item!: InputDefinition;
    @Input() disabled = false;
    @Input('ngModel') value!: InputValue;
    @Output('ngModelChange') change = new EventEmitter();
    
    get valid(): boolean {
        if ('validation' in this.item.value && this.item.value.validation) {
            const pattern = new RegExp(this.item.value.validation);
            return pattern.test(`${this.value}`);
        }
        return true;
    }

    get validationMessage(): string {
        if ('message' in this.item.value) {
            return this.item.value.message;
        }
        return 'Eingabe ungültig';
    }

    writeValue(value: InputValue): void {
        this.value = value;
    }

    registerOnChange(fn: (v: InputValue) => void): void {
        this.change.subscribe(fn);
    }

    registerOnTouched(fn: (v: InputValue) => void): void {
        this.change.subscribe(fn);
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    updateValue(value: InputValue): void {
        this.value = value;
        this.change.emit(value);
    }
}
