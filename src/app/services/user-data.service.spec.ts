import { TestBed } from '@angular/core/testing';

import { UserDataService, localKey } from './user-data.service';

describe('UserDataService', () => {
  let service: UserDataService;
  let localStore: Record<string, string> = {};
  const initialData: Record<string, unknown> = { name: 'John Doe' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDataService]
    });
    
    spyOn(window.localStorage, 'getItem').and.callFake((key) => key in localStore ? localStore[key] : null);
    spyOn(window.localStorage, 'setItem').and.callFake((key, value) => (localStore[key] = value + ''));
    spyOn(window.localStorage, 'clear').and.callFake(() => (localStore = {}));
    window.localStorage.setItem(localKey, JSON.stringify({ 0: initialData }));

    service = TestBed.inject(UserDataService<{}>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should contain initial data', () => {
    expect(service.userData()).toEqual({ 0: initialData });
  });

  it('should get initial entry', () => {
    expect(service.getEntry(0)).toEqual(initialData);
  });

  it('should append new entry', () => {
    // Arrange
    const newData = { name: 'Jane Doe' };

    // Act
    service.save(1, newData);

    // Assert
    expect(service.getEntry(1)).toEqual(newData);
    expect(service.getEntry(0)).toEqual(initialData);
  });

  it('should append new property', () => {
    // Arrange
    const newData = { color: 'purple' };

    // Act
    service.save(0, newData);

    // Assert
    expect(service.getEntry(0)['color']).toEqual(newData['color']);
    expect(service.getEntry(0)['name']).toEqual(initialData['name']);
  });

  it('should update existing entry', () => {
    // Arrange
    const updatedData = { name: 'Jane Doe' };

    // Act
    service.save(0, updatedData);

    // Assert
    expect(service.getEntry(0)).toEqual(updatedData);
  });
});
