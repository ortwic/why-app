import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { LoadingComponent } from '../../components/ui/loading/loading.component';
import { ProgressSpinnerComponent } from '../../components/ui/progress-spinner/progress-spinner.component';
import { CommonService } from '../../services/common.service';
import { GuideService } from '../../services/guide.service';
import { Progress, UserProgressService } from '../../services/user-progress.service';
import { Guide } from '../../models/guide.model';

@Component({
    selector: 'app-start',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        LoadingComponent,
        ProgressSpinnerComponent,
    ],
    templateUrl: './start.component.html',
    styleUrl: './start.component.scss',
})
export class StartComponent {
    private readonly _commonService = inject(CommonService);
    private readonly _guideService = inject(GuideService);
    private readonly _progressService = inject(UserProgressService);
    
    private _resources: Record<string, unknown> = {};
    private _units!: Guide[];
    private _progress!: Progress[];    
    private _greeting!: string;
    private _userName!: string;
    loading = true;

    async ngOnInit() {
        this._units = await this._guideService.dataPromise;
        this._progress = await this._progressService.progressTree;
        
        this._resources = await this._commonService.getResources('start');
        this.setUserName(this._resources['user-names'] as string[]);
        this.setGreeting(this._resources['greetings'] as Record<number, string>);

        this.loading = false;
    }

    private setUserName(userNames: string[]) {
        const randomIndex = Math.floor(Math.random() * userNames.length);
        this._userName = userNames[randomIndex];        
    }
    
    private setGreeting(greetings: Record<number, string>) {
        const currentHour = new Date().getHours();

        if (currentHour >= 5 && currentHour < 12) {
            this._greeting = greetings[5];
        } else if (currentHour >= 12 && currentHour < 18) {
            this._greeting = greetings[12];
        } else if (currentHour >= 18 && currentHour < 21) {
            this._greeting = greetings[18];
        } else if (currentHour >= 21 && currentHour < 24) {
            this._greeting = greetings[21];
        } else {
            this._greeting = greetings[0];
        }
    }

    get units(): Guide[] {
        return this._units;
    }

    get userName(): string {
        return this._userName;
    }

    get greeting() {
        return this._greeting;
    }

    resource(key: string) {
        return this._resources[key];
    }

    unitProgressPercent(unitIndex: number) {
        return this._progress ? this._progress[unitIndex].percent : 0;
    }

    pageProgressPercent(unitIndex: number, pageId: string) {
        return this._progress ? (<Progress>this._progress[unitIndex][pageId]).percent : 0;
    }
}
