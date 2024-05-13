import { Component, forwardRef, input, model, output } from '@angular/core';
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
    item = input.required<InputDefinition>();
    disabled = model(false);
    value = model<InputValue>(undefined, { alias: 'ngModel' });
    change = output<InputValue>({ alias: 'ngModelChange' });
    
    get valid(): boolean {
        const definition = this.item();
        if ('validation' in definition.value && definition.value.validation) {
            const pattern = new RegExp(definition.value.validation);
            return pattern.test(`${this.value()}`);
        }
        return true;
    }

    get validationMessage(): string {
        const definition = this.item();
        if ('message' in definition.value && definition.value.message) {
            return definition.value.message;
        }
        return 'Eingabe ungültig';
    }

    writeValue(value: InputValue): void {
        this.value.set(value);
    }

    registerOnChange(fn: (v: InputValue) => void): void {
        this.change.subscribe(fn);
    }

    registerOnTouched(fn: (v: InputValue) => void): void {
        this.change.subscribe(fn);
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
    }

    updateValue(value: InputValue): void {
        this.value.set(value);
        this.change.emit(value);
    }
}
