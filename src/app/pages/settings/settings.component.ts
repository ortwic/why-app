import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserDataService } from '../../services/user-data.service';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [MatButtonModule, MatIconModule],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss',
})
export class SettingsComponent {
    constructor(private userDataService: UserDataService) { 
      
    }

    download() {
        this.userDataService.download();
    }

    clear() {
        this.userDataService.clear();
    }
}
