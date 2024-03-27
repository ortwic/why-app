import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CommonService } from '../../services/common.service';
import { NavigationItem } from '../../models/nav.model';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.scss',
    standalone: true,
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        AsyncPipe,
        RouterLink,
        RouterLinkActive,
    ],
})
export class NavComponent implements AfterViewInit {
    private breakpointObserver = inject(BreakpointObserver);
    private commonService = inject(CommonService);
    private routes: NavigationItem[] = [];

    @ViewChild(MatSidenavContainer)
    private sidenavContainer!: MatSidenavContainer;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map((result) => result.matches),
        shareReplay()
    );
    toolbarTop$: Observable<string> = of('0');
    
    async ngOnInit() {
        this.routes = await this.commonService.getNavigation();
    }

    ngAfterViewInit(): void {
        let lastScrollTop = 0;

        const onScroll = (event: Event) => {
            const target = event.target as HTMLElement;
            const toolbar = target.querySelector('.mat-toolbar') as HTMLElement;

      
            const top = target.scrollTop < lastScrollTop ? 0 
                      : target.scrollTop < toolbar.offsetHeight 
                      ? target.scrollTop : toolbar.offsetHeight
            toolbar.style.top = `${-top}px`;

            lastScrollTop = target.scrollTop > 0 ? target.scrollTop : 0;
            return `${top}px`;
        };

        this.toolbarTop$ = this.sidenavContainer.scrollable.elementScrolled().pipe(map(onScroll));

        // this.changeDetectorRef.detectChanges();
        this.toolbarTop$.subscribe();
    }

    get sidenavRoutes(): NavigationItem[] {
        return this.routes.filter(route => route.sidenav);
    }

    get footerRoutes(): NavigationItem[] {
        return this.routes.filter(route => route.sidenav);
    }
}
