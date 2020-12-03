import { CarMovesService } from './../../services/car-moves/car-moves.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  keyuping = false;

  @ViewChild('car') car!: ElementRef;

  @HostListener("window:keydown", ['$event'])
  onKeyDown(event: KeyboardEvent) {
    switch(event.code) {
      case ArrowKey.Left:
        this.arrowKeysDown[ArrowKey.Left] = true;
        break;
      case ArrowKey.Up:
        this.arrowKeysDown[ArrowKey.Up] = true;
        break;
      case ArrowKey.Right:
        this.arrowKeysDown[ArrowKey.Right] = true;
        break;
      case ArrowKey.Down:
        this.arrowKeysDown[ArrowKey.Down] = true;
        break;
      default: break;
    }
    const sense = ArrowKeyToSense[event.code as ArrowKeyToSenseValues] as unknown as Sense;
    this.carMovesService.moveCar(this.car.nativeElement as HTMLElement, this.arrowKeysDown);
    // @ts-ignore
    // this.moveCar(ArrowKeyToSense[event.code]);
  }
  @HostListener("window:keyup", ['$event'])
  onKeyUp(event: KeyboardEvent) {
    switch(event.code) {
      case ArrowKey.Left:
        this.arrowKeysDown[ArrowKey.Left] = false;
        break;
      case ArrowKey.Up:
        this.arrowKeysDown[ArrowKey.Up] = false;
        break;
      case ArrowKey.Right:
        this.arrowKeysDown[ArrowKey.Right] = false;
        break;
      case ArrowKey.Down:
        this.arrowKeysDown[ArrowKey.Down] = false;
        break;
      default: break;
    }
    for (const arrow in this.arrowKeysDown) {
      // console.log(this.arrowKeysDown[arrow], arrow);
      // console.log('donc', ArrowKeyToSense[arrow]);
      // @ts-ignore
      if (this.arrowKeysDown[arrow]) { 
        const sense = ArrowKeyToSense[arrow as ArrowKeyToSenseValues] as unknown as Sense;
        this.carMovesService.moveCar(this.car.nativeElement as HTMLElement, this.arrowKeysDown);
        break; 
        // this.moveCar(ArrowKeyToSense[arrow], true); 
      }
    }
  }

  arrowKeysDown: ArrowKeysDown = {
    [ArrowKey.Left]: false,
    [ArrowKey.Up]: false,
    [ArrowKey.Right]: false,
    [ArrowKey.Down]: false,
  }

  constructor(
    private carMovesService: CarMovesService,
  ) { }

  ngOnInit(): void {
  }
}

enum ArrowKey {
  Left = 'ArrowLeft',
  Up = 'ArrowUp',
  Right = 'ArrowRight',
  Down = 'ArrowDown',
}

enum ArrowKeyToSense {
  ArrowDown = 'Down',
  ArrowUp = 'Up',
}

type ArrowKeyToSenseValues = 'ArrowDown' | 'ArrowUp';

export enum Sense {
  Left = 'Left',
  Up = 'Up',
  Right = 'Right',
  Down = 'Down',
}

export interface ArrowKeysDown {
  [ArrowKey.Left]: boolean,
  [ArrowKey.Up]: boolean,
  [ArrowKey.Right]: boolean,
  [ArrowKey.Down]: boolean,
}