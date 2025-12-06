import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoadingComponent } from '../../components/ui/loading/loading.component';
import { MatDividerModule } from '@angular/material/divider';
import { UserDataComponent } from "./user-data/user-data.component";
import { TranslatePipe } from "../../pipes/translate.pipe";

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [MatButtonModule, MatDividerModule, MatIconModule, LoadingComponent, UserDataComponent, TranslatePipe],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss',
})
export class SettingsComponent {
    loading = true;
    
    async ngOnInit() {
        this.loading = false;
    }
}
