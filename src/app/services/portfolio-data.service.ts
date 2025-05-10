// src/app/services/portfolio-data.service.ts
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  serverTimestamp
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface InformacionPersonal {
  nombreCompleto?: string;
  profesion?: string;
  fotoUrl?: string;
  githubUrl?: string;
  correoElectronico?: string;
}

export interface HabilidadesObjeto {
  [key: string]: string;
}

export interface Proyecto {
  id?: string;
  titulo?: string;
  descripcion?: string;
  tecnologias?: string[];  // Ya lo forzamos a array
  tipo?: string;
  url?: string;
  githubUrl?: string;
}

export interface MensajeContacto {
  nombre: string;
  correo: string;
  mensaje: string;
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {
  private firestore: Firestore = inject(Firestore);
  private platformId = inject(PLATFORM_ID);

  // --- SECCIÓN HOME ---
  getInformacionPersonal(): Observable<InformacionPersonal | undefined> {
    if (isPlatformBrowser(this.platformId)) {
      const docRef = doc(this.firestore, 'informacion_personal/main');
      console.log('[SERVICE] Usando docData para informacion_personal/main');

      return docData(docRef).pipe(
        map(data => {
          console.log('[SERVICE] Datos recibidos de docData:', data);
          return data as InformacionPersonal;
        }),
        catchError(error => {
          console.error('[SERVICE] ERROR en docData para InformacionPersonal:', error);
          return of(undefined);
        })
      );
    } else {
      console.log('[SERVICE] getInformacionPersonal (SSR): Devolviendo undefined');
      return of(undefined);
    }
  }

  // --- SECCIÓN EXPERIENCIA (PROYECTOS) ---
  getProyectos(): Observable<Proyecto[]> {
    if (isPlatformBrowser(this.platformId)) {
      const collectionRef = collection(this.firestore, 'proyectos');
      return collectionData(collectionRef, { idField: 'id' }).pipe(
        map((proyectos: any[]) => proyectos.map(p => ({
          ...p,
          tecnologias: Array.isArray(p.tecnologias)
            ? p.tecnologias
            : typeof p.tecnologias === 'string'
              ? p.tecnologias.split(',').map((t: string) => t.trim())
              : []
        })))
      );
    } else {
      return of([]);
    }
  }

  // --- SECCIÓN TECHNICAL SKILLS ---
  getHabilidadesTecnicas(): Observable<HabilidadesObjeto | undefined> {
    if (isPlatformBrowser(this.platformId)) {
      const docRef = doc(this.firestore, 'habilidades_tecnicas/hab_tec');
      return docData(docRef).pipe(
        map(data => data as HabilidadesObjeto),
        catchError(error => {
          console.error('[SERVICE] ERROR en docData para HabilidadesTecnicas:', error);
          return of(undefined);
        })
      );
    } else {
      return of(undefined);
    }
  }

  // --- SECCIÓN SOFT SKILLS ---
  getHabilidadesBlandas(): Observable<HabilidadesObjeto | undefined> {
    if (isPlatformBrowser(this.platformId)) {
      const docRef = doc(this.firestore, 'habilidades_blandas/hab_blandas');
      return docData(docRef).pipe(
        map(data => data as HabilidadesObjeto),
        catchError(error => {
          console.error('[SERVICE] ERROR en docData para HabilidadesBlandas:', error);
          return of(undefined);
        })
      );
    } else {
      return of(undefined);
    }
  }

  // --- SECCIÓN HOBBIES ---
  getHobbies(): Observable<HabilidadesObjeto | undefined> {
    if (isPlatformBrowser(this.platformId)) {
      const docRef = doc(this.firestore, 'hobbies/hobbie');
      return docData(docRef).pipe(
        map(data => data as HabilidadesObjeto),
        catchError(error => {
          console.error('[SERVICE] ERROR en docData para Hobbies:', error);
          return of(undefined);
        })
      );
    } else {
      return of(undefined);
    }
  }

  // --- SECCIÓN CONTACTO ---
  enviarMensajeContacto(formData: MensajeContacto): Promise<any> {
    if (isPlatformBrowser(this.platformId)) {
      const collectionRef = collection(this.firestore, 'mensajes_contacto');
      return addDoc(collectionRef, {
        ...formData,
        fechaEnvio: serverTimestamp()
      });
    } else {
      console.warn('[SERVICE] enviarMensajeContacto no se ejecuta en el servidor');
      return Promise.resolve(undefined);
    }
  }
}
