// src/app/components/hobbies/hobbies.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common'; // Necesitas CommonModule y KeyValuePipe
import { PortfolioDataService, HabilidadesObjeto } from '../../services/portfolio-data.service'; // Ajusta la ruta si es necesario
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hobbies',
  standalone: true,
  imports: [CommonModule, KeyValuePipe], // Asegúrate de importar KeyValuePipe
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.css']
})
export class HobbiesComponent implements OnInit {
  private portfolioService = inject(PortfolioDataService);
  hobbies$!: Observable<HabilidadesObjeto | undefined>;

  ngOnInit(): void {
    this.hobbies$ = this.portfolioService.getHobbies();
  }
}