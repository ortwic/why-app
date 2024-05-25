import { FirestoreService } from './firestore.service';

xdescribe('FirestoreService', () => {
  let service: FirestoreService;

  beforeEach(() => {
    service = new FirestoreService('path');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
