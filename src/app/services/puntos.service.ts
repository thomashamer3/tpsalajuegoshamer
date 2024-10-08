import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  query,
  where,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';
import { Puntaje } from '../interfaces/puntaje';

@Injectable({
  providedIn: 'root',
})
export class PuntosService {
  constructor(public firestore: Firestore) {}

  async updatePuntos(email: string, puntos: number, juego: string) {
    try {
      const col = collection(this.firestore, 'puntos');
      const q = query(
        col,
        where('userEmail', '==', email),
        where('juego', '==', juego)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        let existingPoints = await this.getPuntosPorUsuarioYJuego(email, juego);
        let newPuntos = Number(existingPoints[0].puntos) + Number(puntos);

        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, { puntos: newPuntos });
      } else {
        await addDoc(col, {
          userEmail: email,
          puntos: puntos,
          juego: juego,
          fecha: new Date(),
        });
      }
    } catch (error) {
      console.error('Error actualizando los puntos:', error);
      throw error;
    }
  }

  async getPuntosPorUsuarioYJuego(email: string, juego: string) {
    const col = collection(this.firestore, 'puntos');
    const q = query(
      col,
      where('userEmail', '==', email),
      where('juego', '==', juego)
    );

    try {
      const querySnapshot = await getDocs(q);

      const puntos: any = [];
      querySnapshot.forEach((doc) => {
        puntos.push(doc.data() as Puntaje);
      });

      return puntos;
    } catch (error) {
      console.error('Error obteniendo los puntos:', error);
      throw error;
    }
  }

  async getPuntosByJuego(juego: string) {
    const col = collection(this.firestore, 'puntos');
    const querySnapshot = await getDocs(col);

    let puntajes: any = [];
    querySnapshot.forEach((doc) => {
      let puntaje = doc.data() as Puntaje;
      puntajes.push(puntaje);
    });
    puntajes = puntajes.filter((x: any) => x.juego === juego);
    return puntajes;
  }
}
