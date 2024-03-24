import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { combineLatest, from, of, switchMap } from 'rxjs';
import { FormStepperComponent } from '../../components/form-stepper/form-stepper.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ImageSliderComponent } from '../../components/image-slider/image-slider.component';
import { GuideService } from '../../services/guide.service';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { MarkedPipe } from '../../pipes/marked.pipe';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    MatButtonModule,
    MatIconModule,
    FormStepperComponent,
    HeroSectionComponent,
    ImageSliderComponent,
    MarkedPipe,
    SafeUrlPipe,
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent {
  private route = inject(ActivatedRoute);
  readonly unitIndex = +this.route.snapshot.params['unit'];

  readonly guideService = inject(GuideService);
  readonly currentPage$ = combineLatest([
    from(this.guideService.getPages(this.unitIndex)),
    this.route.params
  ]).pipe(
    switchMap(([pages, params]) => {
      const pageIndex = +params['page'];
      const prev = pageIndex > 0 ? pageIndex - 1 : undefined;
      const next = pageIndex + 1 < pages.length ? pageIndex + 1 : undefined;
      return of({
        ...pages[pageIndex],
        prevIndex: prev,
        nextIndex: next
      });
    })
  );
}
