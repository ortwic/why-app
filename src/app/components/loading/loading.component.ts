import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [MatProgressBarModule],
  templateUrl: './loading.component.html'
})
export class LoadingComponent {

}
