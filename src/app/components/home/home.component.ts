// src/app/components/home/home.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  PortfolioDataService,
  InformacionPersonal,
  Proyecto,
  HabilidadesObjeto
} from '../../services/portfolio-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private portfolioService = inject(PortfolioDataService);

  informacionPersonal$!: Observable<InformacionPersonal | undefined>;
  proyectos$!: Observable<Proyecto[]>;
  habilidadesTec$!: Observable<HabilidadesObjeto | undefined>;
  habilidadesBlandas$!: Observable<HabilidadesObjeto | undefined>;
  hobbies$!: Observable<HabilidadesObjeto | undefined>;

  // Formulario de contacto
  contacto = {
    nombre: '',
    correo: '',
    mensaje: ''
  };

  cargando = false;
  mensajeEnviado = false;
  errorEnvio = false;

  ngOnInit(): void {
    this.informacionPersonal$ = this.portfolioService.getInformacionPersonal();
    this.proyectos$ = this.portfolioService.getProyectos();
    this.habilidadesTec$ = this.portfolioService.getHabilidadesTecnicas();
    this.habilidadesBlandas$ = this.portfolioService.getHabilidadesBlandas();
    this.hobbies$ = this.portfolioService.getHobbies();
  }

  enviarMensaje() {
    this.cargando = true;
    this.mensajeEnviado = false;
    this.errorEnvio = false;

    this.portfolioService.enviarMensajeContacto(this.contacto)
      .then(() => {
        this.mensajeEnviado = true;
        this.contacto = { nombre: '', correo: '', mensaje: '' };
      })
      .catch(() => {
        this.errorEnvio = true;
      })
      .finally(() => {
        this.cargando = false;
      });
  }
}
