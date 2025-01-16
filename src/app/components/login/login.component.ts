import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.username === 'system' && this.password === 'oracle') {
      // Redirection ou affichage d'un message de succès
      alert('Connexion réussie !');
      this.router.navigate(['/user']); // Exemple de redirection
    } else {
      // Afficher un message d'erreur
      this.errorMessage = 'Identifiants incorrects.';
    }
  }

  navigateToHome(){
    this.router.navigate(['/user']);
  }
}

