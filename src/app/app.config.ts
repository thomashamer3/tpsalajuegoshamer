import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideToastr(),
    provideHttpClient(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'saladejuegoshamer',
        appId: '1:351874689071:web:af7ef003049b29f81ebeda',
        storageBucket: 'saladejuegoshamer.appspot.com',
        apiKey: 'AIzaSyBCZmectI8Mgxn3g-b2MwXyNiGbc_UMK0Q',
        authDomain: 'saladejuegoshamer.firebaseapp.com',
        messagingSenderId: '351874689071',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAnimationsAsync(),
  ],
};
