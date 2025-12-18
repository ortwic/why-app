import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { orderBy } from '@angular/fire/firestore';
import { map, Observable, Subject, Subscription } from 'rxjs';
import { FirestoreService } from '../firestore.service';
import { Guide } from '../../models/guide.model';
import { UserDataService } from '../user/user-data.service';

export const subscriptionKey = '0-subscription';
const selectedGuideKey = 'current-guide';
const emptyGuide = {
    title: '',
    caption: '',
    overview: '',
    description: '',
    order: 0
} as Guide;

@Injectable({
    providedIn: 'root',
})
export class GuideService extends FirestoreService<Guide> implements OnDestroy {
    private readonly _dataService = inject(UserDataService);
    private _subscription: Subscription | undefined = undefined;
    private currentGuideSubject = new Subject<Guide>();
    readonly current = toSignal(this.currentGuideSubject, { initialValue: emptyGuide });

    constructor() {
        super('guides');
        this.initByIdOrCurrentDomain(this.idFromStorage());
    }

    get currentId(): string {
        const id: string = this.current().id ?? this.idFromStorage();
        if (!id) {
            throw new Error('No current guide');
        }
        return id; 
    }

    ngOnDestroy(): void {
        this._subscription?.unsubscribe();
    }

    private initByIdOrCurrentDomain(id?: string): void {
        const domain = location.hostname;
        const guide$ = (id !== undefined) 
            ? this.getDocument(id) 
            : this.getGuides().pipe(
                map((guides) => guides.find((g) => g.domain?.includes(domain)) || guides[0])
            );
        this._subscription = guide$
            .subscribe((guide) => this.currentGuideSubject.next(guide ?? emptyGuide));
    }

    getGuides(): Observable<Guide[]> {
        return this.getDocuments(orderBy('order'));
    }

    private idFromStorage(): string | undefined {
        const entry = this._dataService.getItems(subscriptionKey);
        if (selectedGuideKey in entry && entry[selectedGuideKey]) {
            return entry[selectedGuideKey];
        }
        return undefined;
    }

    setCurrentGuide(id: string): void {
        this._dataService.saveItems([subscriptionKey], { [selectedGuideKey]: id });

        this._subscription?.unsubscribe();
        this._subscription = this.getDocument(id)
            .subscribe((guide) => this.currentGuideSubject.next(guide ?? emptyGuide));
    }
}
