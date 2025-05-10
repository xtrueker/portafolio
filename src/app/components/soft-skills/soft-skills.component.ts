// src/app/components/soft-skills/soft-skills.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common'; // Necesitas CommonModule y KeyValuePipe
import { PortfolioDataService, HabilidadesObjeto } from '../../services/portfolio-data.service'; // Ajusta la ruta si es necesario
import { Observable } from 'rxjs';

@Component({
  selector: 'app-soft-skills',
  standalone: true,
  imports: [CommonModule, KeyValuePipe], // Asegúrate de importar KeyValuePipe
  templateUrl: './soft-skills.component.html',
  styleUrls: ['./soft-skills.component.css']
})
export class SoftSkillsComponent implements OnInit {
  private portfolioService = inject(PortfolioDataService);
  habilidadesBlandas$!: Observable<HabilidadesObjeto | undefined>;

  ngOnInit(): void {
    this.habilidadesBlandas$ = this.portfolioService.getHabilidadesBlandas();
  }
}