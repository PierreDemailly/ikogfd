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

  moveCar(sense: Sense, keyup = false): void {
    if (keyup && this.keyuping) {
      keyup = false;
      this.keyuping = false;
    }    
    console.log('ptn', sense, this.arrowKeysDown.ArrowUp);
    if (this.arrowKeysDown.ArrowUp) { 
      // this.carMovesService.moveCar(sense);
      this.moveForwardCar(keyup);
    }
    return;
    switch(sense) {
      case Sense.Down:
        this.moveBackCar();
        break;
      case Sense.Up:
        this.moveForwardCar();
        break;
      default: break;
    }
    return;
    /**
     * Is a POC, TODO: ViewChildren
     */
    
  }

  moveForwardCar(keyup = false): void {
    if (keyup) this.keyuping = true;
    console.log('move')
    const car = document.getElementsByClassName('car')[0] as HTMLElement;
    const styles = getComputedStyle(car);
    const topPxs = styles.top.split('px')[0];
    const leftPxs = styles.left.split('px')[0];
    const transform = styles.getPropertyValue("-webkit-transform") ||
                      styles.getPropertyValue("-moz-transform") ||
                      styles.getPropertyValue("-ms-transform") ||
                      styles.getPropertyValue("-o-transform") ||
                      styles.getPropertyValue("transform") ||
                      "none";
    let angle;
      if (transform != "none") {
      // const matrix = new WebKitCSSMatrix(transform);
      // console.log(transform);
      // console.log(new WebKitCSSMatrix(transform));
      const transformValues = transform.split('(')[1].split(')')[0].split(',');
      // @ts-ignore
      const scale = Math.sqrt(transformValues[0] * transformValues[0] + transformValues[1] * transformValues[1]);
      // @ts-ignore
      const sin = transformValues[1] / scale;
      // @ts-ignore
      angle = Math.round(Math.atan2(transformValues[1], transformValues[0]) * (180/Math.PI));
      // console.log('angle', angle);
      }
    console.log('d', angle)
    if (this.arrowKeysDown[ArrowKey.Left] && ! this.arrowKeysDown[ArrowKey.Right]) {
      console.log('ok');
      if (angle && Math.abs(angle) > 90) {
        car.style.top = `${parseInt(topPxs) + 10}px`;
      } else if (Math.abs(angle || 0) !== 90) {
        car.style.top = `${parseInt(topPxs) +- 10}px`;
      }
      if (angle && angle > 0 && angle < 90) {
        console.log('ok', leftPxs);
        car.style.left = `${parseInt(leftPxs) + 10}px`;
      } else {

        // if (angle && Math.abs(angle) > 180) {
          car.style.left = `${parseInt(leftPxs) - 10}px`;
        }
      // } else {
        // car.style.left = `${parseInt(leftPxs) +- 10}px`;
      // }
      // console.log('angle - 10', angle +- 10)
      car.style.transform = angle ? `rotate(${angle +- 8}deg)` : 'rotate(-10deg)';
    } else if (this.arrowKeysDown[ArrowKey.Right] && !this.arrowKeysDown[ArrowKey.Left]) {
      if (angle && Math.abs(angle) > 90) {
        car.style.top = `${parseInt(topPxs) + 10}px`;
      } else if (Math.abs(angle || 0) !== 90) {
        car.style.top = `${parseInt(topPxs) +- 10}px`;
      }
      if (angle && angle > 0 && angle < 90) {
        console.log('ok', leftPxs);
        car.style.left = `${parseInt(leftPxs) - 10}px`;
      } else {

        // if (angle && Math.abs(angle) > 180) {
          car.style.left = `${parseInt(leftPxs) + 10}px`;
        }
      // } else {
        // car.style.left = `${parseInt(leftPxs) +- 10}px`;
      // }
      // console.log('angle - 10', angle +- 10)
      car.style.transform = angle ? `rotate(${angle + 8}deg)` : 'rotate(+10deg)';
      console.log('obl')
      if (angle !== undefined) {
        console.log('angle', angle)
        if (angle < -90 && angle > -180) {
          angle = Math.abs(angle)
          console.log('yeah', leftPxs);
          const tmp = 180-angle;
          let moveBot = Math.round((angle - 90) / 10);
          console.log(moveBot);
          car.style.top = `${parseInt(topPxs) + moveBot}px`;
          car.style.left = `${parseInt(leftPxs) + (10 - moveBot)}px`;
        } else if (angle < 180 && angle > 90) {
          console.log('ok');
          let moveBot = 10 - Math.round((190 - angle) / 10);
          car.style.top = `${parseInt(topPxs) + moveBot}px`;
          car.style.left = `${parseInt(leftPxs) - (10 - moveBot)}px`;
          console.log(angle);
        } else if (angle < 90 && angle > 0) {
          let moveBot = Math.round((90 - angle) / 10);
          console.log(moveBot, 'ok')
          car.style.top = `${parseInt(topPxs) - (moveBot)}px`;
          car.style.left = `${parseInt(leftPxs) - (10-moveBot)}px`;
        } else if (angle !== 0 && angle !== 180) {
          angle = Math.abs(angle)
          let moveBot = Math.round((90 - angle) / 10);
          console.log(moveBot, 'ok')
          car.style.top = `${parseInt(topPxs) - (moveBot)}px`;
          car.style.left = `${parseInt(leftPxs) + (10-moveBot)}px`;
        } else {
          if (angle === 0) {
            car.style.top = `${parseInt(topPxs) - 10}px`
          } else {
            car.style.top = `${parseInt(topPxs) - 10}px`
          }
        }
        // if (angle && angle > 0 && angle < 90) {
        //   console.log('ok', leftPxs);
        //   car.style.left = `${parseInt(leftPxs) + 10}px`;
        // } else {
  
        //   // if (angle && Math.abs(angle) > 180) {
        //     car.style.left = `${parseInt(leftPxs) - 10}px`;
        //   }
      }
    } else {
      // car.style.top = `${parseInt(topPxs) +- 10}px`;
      if (angle !== undefined) {
        console.log('angle', angle)
        if (angle < -90 && angle > -180) {
          angle = Math.abs(angle)
          console.log('yeah', leftPxs);
          const tmp = 180-angle;
          let moveBot = Math.round((angle - 90) / 10);
          console.log(moveBot);
          car.style.top = `${parseInt(topPxs) + moveBot}px`;
          car.style.left = `${parseInt(leftPxs) +- (10 - moveBot)}px`;
        } else if (angle < 180 && angle > 90) {
          console.log('ok');
          let moveBot = 10 - Math.round((190 - angle) / 10);
          car.style.top = `${parseInt(topPxs) + moveBot}px`;
          car.style.left = `${parseInt(leftPxs) + (10 - moveBot)}px`;
          console.log(angle);
        } else if (angle < 90 && angle > 0) {
          let moveBot = Math.round((90 - angle) / 10);
          console.log(moveBot, 'ok')
          car.style.top = `${parseInt(topPxs) - (moveBot)}px`;
          car.style.left = `${parseInt(leftPxs) + (10-moveBot)}px`;
        } else if (angle !== 0 && angle !== 180) {
          angle = Math.abs(angle)
          let moveBot = Math.round((90 - angle) / 10);
          console.log(moveBot, 'ok')
          car.style.top = `${parseInt(topPxs) - (moveBot)}px`;
          car.style.left = `${parseInt(leftPxs) - (10-moveBot)}px`;
        } else {
          if (angle === 0) {
            car.style.top = `${parseInt(topPxs) - 10}px`
          } else {
            car.style.top = `${parseInt(topPxs) - 10}px`
          }
        }
        // if (angle && angle > 0 && angle < 90) {
        //   console.log('ok', leftPxs);
        //   car.style.left = `${parseInt(leftPxs) + 10}px`;
        // } else {
  
        //   // if (angle && Math.abs(angle) > 180) {
        //     car.style.left = `${parseInt(leftPxs) - 10}px`;
        //   }
      }
      else {
        console.log('merde')
      }
    } 
    if (this.arrowKeysDown.ArrowUp && keyup && this.keyuping) {
      setTimeout(() => this.moveForwardCar(true), 100)};
  }

  moveBackCar(): void {

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