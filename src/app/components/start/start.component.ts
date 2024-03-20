import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { orderBy } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { greetings, userNames } from '../../services/common.data';
import { GuideService } from '../../services/guide.service';
import { Guide } from '../../models/guide.model';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatCardModule, 
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss' 
})
export class StartComponent {
  readonly guideService = inject(GuideService);
  readonly guide$ = this.loadGuide();
  readonly userName: string;

  constructor() {
    const randomIndex = Math.floor(Math.random() * userNames.length);
    this.userName = userNames[randomIndex];
  }

  private loadGuide(): Observable<Guide[]> {
    const constraints = [
      orderBy('no')
    ];
    return this.guideService.getDocuments(...constraints);
  }

  get greeting() {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return greetings[5];
    } 
    if (currentHour >= 12 && currentHour < 18) {
      return greetings[12];
    } 
    if (currentHour >= 18 && currentHour < 21) {
      return greetings[18];
    } 
    if (currentHour >= 21 && currentHour < 24) {
      return greetings[21];
    } 
    return greetings[0];
  }

  done(i: number) {
    return false;
  }
}
