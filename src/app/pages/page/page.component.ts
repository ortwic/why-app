import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GuideService } from '../../services/guide.service';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent {
  private route = inject(ActivatedRoute);
  private unitIndex = this.route.snapshot.params['unit'];
  private pageIndex = this.route.snapshot.params['page'];

  readonly service = inject(GuideService);
  readonly page = this.service.getPages(this.unitIndex)
    .then(pages => pages[this.pageIndex]);
}
