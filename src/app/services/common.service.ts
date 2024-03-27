import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { orderBy } from '@angular/fire/firestore';
import { NavigationItem } from '../models/nav.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private readonly navStore = new FirestoreService('navigation');
  private readonly resStore = new FirestoreService('resources');

  constructor() { }

  async getNavigation(): Promise<NavigationItem[]> {
    return this.navStore.getDocuments<NavigationItem>(orderBy('order'));
  }

  async getResources(): Promise<NavigationItem[]> {
    return this.resStore.getDocuments<NavigationItem>();
  }
}
