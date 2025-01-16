import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
 // Import des routes
import { provideRouter } from '@angular/router'; // Fournisseur de routeur
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes) // Assurez-vous que le routing est fourni
  ]
})
  .catch((err) => console.error(err));
