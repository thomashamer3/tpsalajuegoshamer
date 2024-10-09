import { Component, Input } from '@angular/core';
import { PuntosService } from '../../services/puntos.service';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-juego-propio',
  standalone: true,
  imports: [HeaderComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './juego-propio.component.html',
  styleUrl: './juego-propio.component.css',
})
export class JuegoPropioComponent {
  currentOperation: string = '';
  userAnswer: number = 0;
  puntos: number = 0;
  timeLeft: number = 25;
  operaciones: string[] = ['+', '-', '*', '/'];
  numeros: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  numerosSeleccionables: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '.',
  ];
  level: number = 6;
  operationValue: number = 0;
  isGameStarted: boolean = false;
  userResponse: string = '';
  timer: any;
  @Input() currentUser: any;

  constructor(
    public puntosService: PuntosService,
    public toastr: ToastrService
  ) {}

  handleSetUser(e: any) {
    this.currentUser = e;
  }
  public comenzar() {
    this.isGameStarted = true;
    this.startTimer();
    this.generateOperation();
  }

  generateOperation() {
    this.operationValue = 0;
    this.currentOperation = '';

    for (let i = 1; i < this.level; i++) {
      if (i % 2 != 0) {
        this.currentOperation +=
          this.numeros[Math.floor(Math.random() * this.numeros.length)] + ' ';
      } else {
        this.currentOperation +=
          this.operaciones[
            Math.floor(Math.random() * this.operaciones.length)
          ] + ' ';
      }
    }

    this.operationValue = this.getOperationResult(this.currentOperation);

    if (
      !Number.isFinite(this.operationValue) ||
      Number.isNaN(this.operationValue) ||
      this.operationValue < 0 ||
      !Number.isInteger(this.operationValue)
    ) {
      this.generateOperation();
      return;
    }
  }

  getOperationResult(operacion: string) {
    try {
      return eval(operacion);
    } catch (error) {
      return 'Error en la expresión';
    }
  }

  startTimer() {
    this.timeLeft = 25;
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.timer);
        this.onCheckAnswer();
      }
    }, 1000);
  }

  public async winEvent() {
    this.puntos++;
    this.userResponse = '';
    await this.puntosService.updatePuntos(
      this.currentUser.email,
      1,
      'juego-propio'
    );
    this.toastr.success(`¡Correcto! Puntos actuales: ${this.puntos}`);
    this.timeLeft = 30;
    if (this.puntos % 5 == 0) {
      this.level += 2;
    }
    clearInterval(this.timer);
    this.startTimer();
    this.generateOperation();
  }

  public loseEvent() {
    this.puntosService.updatePuntos(
      this.currentUser.email,
      this.puntos,
      'juego-propio'
    );
    this.toastr.error(`Respuesta incorrecta. Puntaje final: ${this.puntos}`);
    this.isGameStarted = false;
    clearInterval(this.timer);
    this.puntos = 0;
  }

  public seleccionar(numero: string) {
    this.userResponse += numero;
  }

  public onBorrarClick() {
    this.userResponse = this.userResponse.substring(
      0,
      this.userResponse.length - 1
    );
  }

  public onCheckAnswer() {
    if (this.userResponse != null) {
      let operationValueString = this.operationValue.toString();
      if (operationValueString.includes('.')) {
        operationValueString = this.operationValue.toString().substring(0, 3);
      }
      if (this.userResponse == operationValueString) {
        this.winEvent();
      } else {
        this.loseEvent();
      }
    } else {
      this.loseEvent();
    }
  }
}
