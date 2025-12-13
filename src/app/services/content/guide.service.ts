import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import { orderBy } from '@angular/fire/firestore';
import { map, Observable, Subscription } from 'rxjs';
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
export class GuideService extends FirestoreService implements OnDestroy {
    private readonly _dataService = inject(UserDataService);
    private _subscription: Subscription | undefined = undefined;
    readonly current = signal<Guide>(emptyGuide);

    constructor() {
        super('guides');
        this.initByIdOrCurrentDomain(this.idFromStorage());
    }

    get currentId(): string {
        return this.current().id 
            ?? this.idFromStorage() 
            ?? '';
    }

    ngOnDestroy(): void {
        this._subscription?.unsubscribe();
    }

    private initByIdOrCurrentDomain(id?: string): void {
        const domain = location.hostname;
        const guide$ = (id !== undefined) 
            ? this.getDocument<Guide>(id) 
            : this.getGuides().pipe(
                map((guides) => guides.find((g) => g.domain?.includes(domain)) || guides[0])
            );
        this._subscription = guide$
            .subscribe((guide) => this.current.set(guide ?? emptyGuide));
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
        this._subscription = this.getDocument<Guide>(id)
            .subscribe((guide) => this.current.set(guide ?? emptyGuide));
    }
}
