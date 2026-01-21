import { Component, inject, OnDestroy, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { GuideService } from '../../../services/content/guide.service';
import { Guide } from '../../../models/guide.model';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from "@angular/material/card";

@Component({
    selector: 'app-guides',
    standalone: true,
    imports: [TranslatePipe, MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent],
    templateUrl: './guides.component.html',
    styleUrl: './guides.component.scss',
})
export class GuidesComponent {
    readonly _guideService = inject(GuideService);
    readonly guides = toSignal(this._guideService.getGuides());
    readonly selected = this._guideService.current;

    selectGuide(selected: Guide) {
        this._guideService.setCurrentGuide(selected.id);
    }
}
