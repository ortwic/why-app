import { TestBed } from '@angular/core/testing';

import { UserDataService, defaultKey } from './user-data.service';
import { UserDataItems } from '../../models/user-data.model';

describe('UserDataService', () => {
    let service: UserDataService;
    let localStore: Record<string, string> = {};
    const pageId = 'test-page';
    const initialData: UserDataItems<string | number> = {
        name: 'John Doe',
        job: 'Bot',
        age: 42,
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserDataService],
        });

        spyOn(window.localStorage, 'getItem').and.callFake((key) => (key in localStore ? localStore[key] : null));
        spyOn(window.localStorage, 'setItem').and.callFake((key, value) => (localStore[key] = value + ''));
        spyOn(window.localStorage, 'clear').and.callFake(() => (localStore = {}));
        window.localStorage.setItem(defaultKey, JSON.stringify([{ [pageId]: initialData }]));

        service = TestBed.inject(UserDataService<{}>);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should contain initial array', () => {
        expect(service.getAll()).toEqual([{ [pageId]: initialData }]);
    });

    it('should contain first record', () => {
        expect(service.getRecord(0)).toEqual({ [pageId]: initialData });
    });

    it('should get items from first record', () => {
        expect(service.getItems(pageId)).toEqual(initialData);
    });

    it('should append new record to array', () => {
        // Arrange
        const newData = { name: 'Jane Doe', age: 37 };

        // Act
        service.saveItems([pageId, 1], newData);

        // Assert
        expect(service.getItems(pageId, 1)).toEqual(newData);
        expect(service.getItems(pageId, 0)).toEqual(initialData);
    });

    it('should append new item', () => {
        // Arrange
        const newItem = { color: 'purple' };

        // Act
        service.saveItems([pageId], newItem);

        // Assert
        expect(service.getItems(pageId)['color']).toEqual(newItem['color']);
        expect(service.getItems(pageId)['name']).toEqual(initialData['name']);
    });

    it('should update existing item', () => {
        // Arrange
        const updatedName = 'Jane Doe';

        // Act
        service.saveItems([pageId], { name: updatedName });

        // Assert
        const items = service.getItems(pageId);
        expect(items['name']).toEqual(updatedName);
        expect(items['job']).toEqual(initialData['job']);
        expect(items['age']).toEqual(initialData['age']);
    });
});
