import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { UserDataService } from '../../../services/user/user-data.service';
import { TranslatePipe } from "../../../pipes/translate.pipe";

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule, TranslatePipe],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss'
})
export class UserDataComponent {
    private readonly _userDataService = inject(UserDataService);
    
    loading = true;
    
    async ngOnInit() {
        this.loading = false;
    }

    download() {
        this._userDataService.download();
    }

    clear() {
        this._userDataService.clear();
    }
}
