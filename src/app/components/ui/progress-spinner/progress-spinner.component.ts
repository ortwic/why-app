import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-progress-spinner',
    standalone: true,
    imports: [CommonModule, MatIconModule, MatProgressSpinnerModule],
    templateUrl: './progress-spinner.component.html',
    styleUrl: './progress-spinner.component.scss',
})
export class ProgressSpinnerComponent {
    color = input('primary');
    size = input(40);
    value = input(0);
    disabled = input(false);
}
