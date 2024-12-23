import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NavigationMenu } from './model/global.model';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { FirestoreService } from './service/firestore.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,

    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  #firestoreService = inject(FirestoreService);

  title = 'reunion';
  fillerNav2: NavigationMenu[] = [
    {
      label: 'Registration',
      link: '/',
      icon: 'home' // Add icon property
    },
    {
      label: 'List',
      link: '/income',
      icon: 'attach_money' 
    },
  ];
}
