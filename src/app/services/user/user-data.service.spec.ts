import { TestBed } from '@angular/core/testing';

import { firebaseProviders } from '../../../tests/test.config';
import { UserDataService, DEFAULT_KEY } from './user-data.service';
import { RecordKey, SetKey, UserDataItems } from '../../models/user-data.model';

describe('UserDataService', () => {
    let service: UserDataService;
    let localStore: Record<string, string> = {};
    const unit1: RecordKey = 0;
    const unit2: RecordKey = 'other';
    const pageId: SetKey = 'test-page';
    const initialData: UserDataItems<string | number> = {
        name: 'John Doe',
        job: 'Bot',
        age: 42,
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [...firebaseProviders()]
        });

        spyOn(window.localStorage, 'getItem').and.callFake((key) => (key in localStore ? localStore[key] : null));
        spyOn(window.localStorage, 'setItem').and.callFake((key, value) => (localStore[key] = value + ''));
        spyOn(window.localStorage, 'clear').and.callFake(() => (localStore = {}));
        window.localStorage.setItem(DEFAULT_KEY, JSON.stringify({ [unit1]: { [pageId]: initialData } }));

        service = TestBed.inject(UserDataService<{}>);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should contain initial storage', () => {
        expect(service.storage()).toEqual({ [unit1]: { [pageId]: initialData } });
    });

    it('should contain first record', () => {
        expect(service.getRecord(unit1)).toEqual({ [pageId]: initialData });
    });

    it('should get items from first record', () => {
        expect(service.getItems(pageId, unit1)).toEqual(initialData);
    });

    it('should append new record to array', () => {
        // Arrange
        const newData = { name: 'Jane Doe', age: 37 };

        // Act
        service.saveItems([pageId, unit2], newData);

        // Assert
        expect(service.getItems(pageId, unit2)).toEqual(newData);
        expect(service.getItems(pageId, unit1)).toEqual(initialData);
    });

    it('should append new item', () => {
        // Arrange
        const newItem = { color: 'purple' };

        // Act
        service.saveItems([pageId, unit1], newItem);

        // Assert
        expect(service.getItems(pageId, unit1)['color']).toEqual(newItem['color']);
        expect(service.getItems(pageId, unit1)['name']).toEqual(initialData['name']);
    });

    it('should update existing item', () => {
        // Arrange
        const updatedName = 'Jane Doe';

        // Act
        service.saveItems([pageId, unit1], { name: updatedName });

        // Assert
        const items = service.getItems(pageId, unit1);
        expect(items['name']).toEqual(updatedName);
        expect(items['job']).toEqual(initialData['job']);
        expect(items['age']).toEqual(initialData['age']);
    });
});
