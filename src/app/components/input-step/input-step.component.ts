import { Component, forwardRef, inject, input, model, output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputDefinition, InputValue } from '../../models/content.model';
import { CommonService } from '../../services/common/common.service';

@Component({
    selector: 'app-input-step',
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
    templateUrl: './input-step.component.html',
    styleUrl: './input-step.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputStepComponent),
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.None
})
export class InputStepComponent implements ControlValueAccessor {
    private _commonService = inject(CommonService);
    definition = input.required<InputDefinition>();
    disabled = model(false);
    value = model<InputValue>(undefined, { alias: 'ngModel' });
    change = output<InputValue>({ alias: 'ngModelChange' });
    
    get valid(): boolean {
        let valid = true;

        const { required, validation } = this.definition().value;
        if (required) {
            const val = this.value();
            valid = valid && Array.isArray(val) 
                ? val.length > 0 
                : val !== null && val !== undefined && val !== '';
        }

        if (validation) {
            const pattern = new RegExp(validation);
            valid = valid && pattern.test(`${this.value()}`);
        }
        return valid;
    }

    get validationMessage(): string {
        const { value, type } = this.definition();
        if (value.message) {
            return value.message;
        }
        const key = type === 'select' ? 'select' : 'input';
        return this._commonService.getResource('page', `invalid-${key}`);
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
