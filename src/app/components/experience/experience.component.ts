// src/app/components/experience/experience.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService, Proyecto } from '../../services/portfolio-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  private portfolioService = inject(PortfolioDataService);
  proyectos$!: Observable<Proyecto[]>;

  ngOnInit(): void {
    this.proyectos$ = this.portfolioService.getProyectos();
  }

  // Helper para convertir el campo 'tecnologias' si es un string
  getTecnologiasArray(tecnologias: string[] | string | undefined): string[] {
    if (Array.isArray(tecnologias)) {
      return tecnologias;
    }
    if (typeof tecnologias === 'string' && tecnologias.trim() !== '') {
      return tecnologias.split(',').map(tech => tech.trim());
    }
    return [];
  }
}