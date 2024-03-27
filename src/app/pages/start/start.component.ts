import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { LoadingComponent } from '../../components/ui/loading/loading.component';
import { ProgressSpinnerComponent } from '../../components/ui/progress-spinner/progress-spinner.component';
import { greetings, userNames } from '../../services/common.data';
import { GuideService } from '../../services/guide.service';
import { Progress, UserProgressService } from '../../services/user-progress.service';

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
    private readonly service = inject(GuideService);
    private readonly progressService = inject(UserProgressService);
    private progress!: Progress[];
    readonly units$ = this.service.dataPromise;
    readonly userName: string;

    constructor() {
        const randomIndex = Math.floor(Math.random() * userNames.length);
        this.userName = userNames[randomIndex];
    }

    async ngOnInit() {
        this.progress = await this.progressService.progressTree;
    }

    get greeting() {
        const currentHour = new Date().getHours();

        if (currentHour >= 5 && currentHour < 12) {
            return greetings[5];
        }
        if (currentHour >= 12 && currentHour < 18) {
            return greetings[12];
        }
        if (currentHour >= 18 && currentHour < 21) {
            return greetings[18];
        }
        if (currentHour >= 21 && currentHour < 24) {
            return greetings[21];
        }
        return greetings[0];
    }

    unitProgressPercent(unitIndex: number) {
        return this.progress ? this.progress[unitIndex].percent : 0;
    }

    pageProgressPercent(unitIndex: number, pageId: string) {
        return this.progress ? (<Progress>this.progress[unitIndex][pageId]).percent : 0;
    }
}
