// src/app/components/contact-form/contact-form.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa ReactiveFormsModule
import { PortfolioDataService } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Añade ReactiveFormsModule aquí
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  private fb = inject(FormBuilder);
  private portfolioService = inject(PortfolioDataService);

  contactForm: FormGroup;
  mensajeEnviado: boolean = false;
  errorAlEnviar: string | null = null;
  enviando: boolean = false;

  constructor() {
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.valid) {
      this.enviando = true;
      this.mensajeEnviado = false;
      this.errorAlEnviar = null;
      try {
        await this.portfolioService.enviarMensajeContacto(this.contactForm.value);
        this.mensajeEnviado = true;
        this.contactForm.reset();
      } catch (error) {
        console.error("Error al enviar mensaje:", error);
        this.errorAlEnviar = "Hubo un problema al enviar tu mensaje. Intenta más tarde.";
      } finally {
        this.enviando = false;
      }
    } else {
      this.contactForm.markAllAsTouched(); // Muestra errores si el formulario no es válido
    }
  }
}