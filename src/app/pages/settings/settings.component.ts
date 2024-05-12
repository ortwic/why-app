import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoadingComponent } from '../../components/ui/loading/loading.component';
import { CommonService } from '../../services/common/common.service';
import { UserDataService } from '../../services/user/user-data.service';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [MatButtonModule, MatIconModule,LoadingComponent],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss',
})
export class SettingsComponent {
    private readonly _commonService = inject(CommonService);
    private readonly _userDataService = inject(UserDataService);
    
    private _resources: Record<string, unknown> = {};
    loading = true;
    
    async ngOnInit() {
        this._resources = await this._commonService.getResources('settings');

        this.loading = false;
    }

    download() {
        this._userDataService.download();
    }

    clear() {
        this._userDataService.clear();
    }
    
    resource(key: string) {
        return this._resources[key];
    }
}
