import { AfterViewInit, Component, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
import { CommonService } from '../../services/common/common.service';
import { GuideService } from '../../services/content/guide.service';
import { NavigationService } from '../../services/common/navigation.service';
import { NavigationItem } from '../../models/nav.model';
import { Guide } from '../../models/guide.model';

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
        RouterLinkActive
    ],
})
export class NavComponent implements AfterViewInit {
    private readonly _commonService = inject(CommonService);
    private readonly _navService = inject(NavigationService);
    private readonly _guideService = inject(GuideService);
    private readonly _breakpointObserver = inject(BreakpointObserver);
    private readonly _sidenavContainer = viewChild(MatSidenavContainer);
    private readonly _routes = toSignal(this._navService.getNavigation(), { initialValue: [] });

    isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset).pipe(
        map((result) => result.matches),
        shareReplay()
    );
    toolbarTop$: Observable<string> = of('0');

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

        this.toolbarTop$ = this._sidenavContainer()!.scrollable.elementScrolled().pipe(map(onScroll));

        // this.changeDetectorRef.detectChanges();
        this.toolbarTop$.subscribe();
    }

    get currentGuide(): Guide {
        return this._guideService.current();
    }

    get sidenavRoutes(): NavigationItem[] {
        return this._routes().filter(route => route.sidenav);
    }

    get footerRoutes(): NavigationItem[] {
        return this._routes().filter(route => route.footer);
    }

    getTitle(nav: NavigationItem) {
        return this._commonService.getResource('nav', nav.icon);
    }
}
