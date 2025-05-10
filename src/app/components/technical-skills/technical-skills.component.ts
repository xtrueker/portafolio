// src/app/components/technical-skills/technical-skills.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common'; // KeyValuePipe
import { PortfolioDataService, HabilidadesObjeto } from '../../services/portfolio-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-technical-skills',
  standalone: true,
  imports: [CommonModule, KeyValuePipe], // Añade KeyValuePipe
  templateUrl: './technical-skills.component.html',
  styleUrls: ['./technical-skills.component.css']
})
export class TechnicalSkillsComponent implements OnInit {
  private portfolioService = inject(PortfolioDataService);
  habilidadesTecnicas$!: Observable<HabilidadesObjeto | undefined>;

  ngOnInit(): void {
    this.habilidadesTecnicas$ = this.portfolioService.getHabilidadesTecnicas();
  }
}