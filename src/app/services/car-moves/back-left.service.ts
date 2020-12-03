import { Injectable } from '@angular/core';
import { CarManipulationService } from '../car-manipulation/car-manipulation.service';
import { CarPropertiesService } from '../car-properties/car-properties.service';

@Injectable({
  providedIn: 'root'
})
export class BackLeftService {

  constructor(
    private carPropertiesService: CarPropertiesService,
    private carManipulationService: CarManipulationService,
  ) { }

  moveBackLeft(car: HTMLElement): void {
    const angle = this.carPropertiesService.getAngle(car);
    console.log('angle', angle);
    if (angle === 0) {
      this.carManipulationService.increaseBottomPx(car, 5);
      this.carManipulationService.increaseLeftPx(car, 5);
    } else if (angle < 0 && angle > -90) {
      const diff = (90 - Math.abs(angle)) / 10;
      this.carManipulationService.increaseBottomPx(car, 10 - diff);
      this.carManipulationService.increaseLeftPx(car, diff);
    } else if (angle < -90 && angle > -180) {
      const diff = (Math.abs(angle) - 90) / 10;
      this.carManipulationService.increaseBottomPx(car, diff);
      this.carManipulationService.increaseRightPx(car, 10 - diff);
      
    } else if (angle > 0 && angle < 90) {
      const diff = (90 - angle) / 10;
      this.carManipulationService.increaseBottomPx(car, 10 - diff);
      this.carManipulationService.increaseLeftPx(car, diff);
    }
    this.carManipulationService.increaseAngle(car, 5);
  }
}