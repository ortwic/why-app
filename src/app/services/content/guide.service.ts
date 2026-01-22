import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { orderBy } from '@angular/fire/firestore';
import { filter, map, Observable, ReplaySubject, Subscription, take, tap } from 'rxjs';
import { FirestoreService } from '../../core/firestore.service';
import { Guide } from '../../models/guide.model';
import { UserDataService } from '../user/user-data.service';

const itemKey = 'guide';
const propKey = 'id';
const emptyGuide = {
    title: '',
    caption: '',
    overview: '',
    description: '',
    order: 0,
} as Guide;

@Injectable({
    providedIn: 'root',
})
export class GuideService extends FirestoreService<Guide> implements OnDestroy {
    private readonly _dataService = inject(UserDataService);
    private _subscription: Subscription | undefined = undefined;
    private currentGuideSubject = new ReplaySubject<Guide>(1);
    readonly current = toSignal(this.currentGuideSubject, { initialValue: emptyGuide });

    constructor() {
        super('guides');
    }

    get currentId(): string {
        const id = this.current()?.id  ?? this.idFromStorage();
        if (!id) {
            throw new Error('GuideService not initialized');
        }
        return id;
    }

    ngOnDestroy(): void {
        this._subscription?.unsubscribe();
    }

    init(domain: string, lang: string): Observable<Guide> {
        const lang2letter = lang.split('-')[0] ?? lang;
        const matchByParams = (g: Guide) => g.domain?.includes(domain) && g.lang?.startsWith(lang2letter);
        const id = this.idFromStorage();
        const guide$ = id !== undefined
            ? this.getDocument(id)
            : this.getGuides().pipe(
                map((guides) => guides.find((g) => matchByParams(g)) || guides[0])
            );

        return guide$.pipe(
            filter(Boolean),
            take(1),
            tap((guide) => this.currentGuideSubject.next(guide))
        );
    }

    getGuides(): Observable<Guide[]> {
        return this.getDocuments(orderBy('order'));
    }

    private idFromStorage(): string | undefined {
        const entry = this._dataService.getItems(itemKey, 0);
        if (propKey in entry && entry[propKey]) {
            return entry[propKey];
        }
        return undefined;
    }

    setCurrentGuide(id: string): void {
        this._dataService.saveItems([itemKey, 0], { [propKey]: id });

        this._subscription?.unsubscribe();
        this._subscription = this.getDocument(id)
            .subscribe((guide) => this.currentGuideSubject.next(guide ?? emptyGuide));
    }
}
