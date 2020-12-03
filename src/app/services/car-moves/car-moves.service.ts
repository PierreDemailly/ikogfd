import { BackRightService } from './back-right.service';
import { BackLeftService } from './back-left.service';
import { BackService } from './back.service';
import { ForwardRightService } from './forward-right.service';
import { ForwardLeftService } from './forward-left.service';
import { ForwardService } from './forward.service';
import { Injectable } from '@angular/core';
import { ArrowKeysDown, Sense } from 'src/app/features/game/game.component';
import { timingSafeEqual } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class CarMovesService {

  constructor(
    private moveForwardService: ForwardService,
    private moveForwardLeftService: ForwardLeftService,
    private moveForwardRightService: ForwardRightService,
    private moveBackService: BackService,
    private moveBackLeftService: BackLeftService,
    private moveBackRightService: BackRightService,
  ) { }

  moveCar(car: HTMLElement, arrowKeysDown: ArrowKeysDown): void {
    console.log(car);
    console.log(arrowKeysDown);
    console.log(getComputedStyle(car));
    const topUp = arrowKeysDown.ArrowUp;
    if (arrowKeysDown.ArrowUp) {
      if (arrowKeysDown.ArrowLeft && !arrowKeysDown.ArrowRight) {
        // move up left
      } else if (arrowKeysDown.ArrowRight && !arrowKeysDown.ArrowLeft) {
        // move up right
        this.moveForwardRightService.moveForwardRight(car);
      } else {
        this.moveForwardService.moveForward(car);
      }
    } else if (arrowKeysDown.ArrowDown) {
      if (arrowKeysDown.ArrowLeft && !arrowKeysDown.ArrowRight) {
        // move down left
        this.moveBackLeftService.moveBackLeft(car);
      } else if (arrowKeysDown.ArrowRight && !arrowKeysDown.ArrowLeft) {
        // move down right
        this.moveBackRightService.moveBackRight(car);
      } else {
        // move down
        this.moveBackService.moveBack(car);
      }
    }
  }
}
