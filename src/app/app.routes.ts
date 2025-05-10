// src/app/app.routes.ts
import { Routes } from '@angular/router';

// Importa tus componentes standalone
import { HomeComponent } from './components/home/home.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { TechnicalSkillsComponent } from './components/technical-skills/technical-skills.component';
import { SoftSkillsComponent } from './components/soft-skills/soft-skills.component';
import { HobbiesComponent } from './components/hobbies/hobbies.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
// import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'; // Si creas uno

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Inicio | Tu Nombre' }, // title es opcional pero bueno para el SEO y la pestaña del navegador
  { path: 'experiencia', component: ExperienceComponent, title: 'Experiencia | Tu Nombre' },
  { path: 'habilidades-tecnicas', component: TechnicalSkillsComponent, title: 'Habilidades Técnicas | Tu Nombre' },
  { path: 'habilidades-blandas', component: SoftSkillsComponent, title: 'Habilidades Blandas | Tu Nombre' },
  { path: 'hobbies', component: HobbiesComponent, title: 'Hobbies | Tu Nombre' },
  { path: 'contacto', component: ContactFormComponent, title: 'Contacto | Tu Nombre' },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige la ruta vacía a /home
  // { path: '**', component: PageNotFoundComponent, title: 'Página no encontrada' } // Ruta comodín para páginas no encontradas
];