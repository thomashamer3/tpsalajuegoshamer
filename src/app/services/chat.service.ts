import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  getDocs,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { map } from 'rxjs/operators';
import { MensajeChat } from '../interfaces/mensaje-chat';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(public firestore: Firestore) {}

  // Método para agregar un mensaje a la sala de chat
  async addMsjToSalaChat(sender: Usuario, msj: string): Promise<void> {
    try {
      let col = collection(this.firestore, 'sala-chat');
      await addDoc(col, { sender: sender, content: msj, fecha: new Date() });
    } catch (error) {
      console.error('Error agregando el mensaje:', error);
      throw error;
    }
  }

  // Método para obtener todos los mensajes en formato Promesa
  async getAllMensajesSalaChats(): Promise<MensajeChat[]> {
    const col = collection(this.firestore, 'sala-chat');
    try {
      const querySnapshot = await getDocs(col);
      const mensajes: MensajeChat[] = [];
      querySnapshot.forEach((doc) => {
        mensajes.push(doc.data() as MensajeChat);
      });
      return mensajes;
    } catch (error) {
      console.error('Error obteniendo los mensajes:', error);
      throw error;
    }
  }

  // Método para obtener mensajes en tiempo real con Observable
  getAllMensajesSalaChat(): Observable<MensajeChat[]> {
    const col = collection(this.firestore, 'sala-chat');
    return collectionData(col).pipe(
      map((mensajes: MensajeChat[]) => {
        return mensajes
          .filter((mensaje) => mensaje.fecha && mensaje.fecha.toDate)
          .sort((a: MensajeChat, b: MensajeChat) => {
            return a.fecha.toDate().getTime() - b.fecha.toDate().getTime();
          });
      })
    );
  }
}
