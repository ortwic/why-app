import { TestBed } from '@angular/core/testing';

import { UserDataService, localKey } from './user-data.service';

function createMockStorage() {
  let storage: Record<string, string> = {};
  return {
    setItem(key: string, value: string) {
      storage[key] = value || '';
    },
    getItem(key: string) {
      return key in storage ? storage[key] : null;
    },
    removeItem(key: string) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
  } as unknown as Storage;
}

describe('UserDataService', () => {
  let service: UserDataService;
  const mockLocalStorage = createMockStorage();
  const initialData = { 0: { name: 'John Doe' } };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserDataService,
        // { provide: 'localStorage', useValue: mockLocalStorage }
      ]
    });
    
    service = TestBed.inject(UserDataService<{}>);
    // mockLocalStorage.setItem(localKey, JSON.stringify(initialData));
    localStorage.setItem(localKey, JSON.stringify(initialData));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should contain initial data', () => {
    expect(service.userData()).toEqual(initialData);
  });

  it('should get initial entry', () => {
    expect(service.getEntry(0)).toEqual(initialData[0]);
  });

  it('should add new data without overwriting existing data', () => {
    // Arrange
    const newData = { 1: { name: 'Jane Doe' } };

    // Act
    service.save(1, newData[1]);

    // Assert
    expect(service.getEntry(1)).toEqual(newData[1]);
    expect(service.getEntry(0)).toEqual(initialData[0]);
  });

  it('should overwrite data if the same id is used', () => {
    // Arrange
    const updatedData = { 1: { name: 'Jane Doe' } };

    // Act
    service.save(1, updatedData[1]);

    // Assert
    expect(service.getEntry(1)).toEqual(updatedData[1]);
  });
});
