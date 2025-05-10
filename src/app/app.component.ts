// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // O solo RouterOutlet si es lo único que usas de aquí
import { NavbarComponent } from './components/navbar/navbar.component'; // Asumiendo que lo creaste
import { FooterComponent } from './components/footer/footer.component'; // Asumiendo que lo creaste

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule, // O RouterOutlet
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mi-portafolio-angular';
}