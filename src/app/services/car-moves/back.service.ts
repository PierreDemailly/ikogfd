import { CarPropertiesService } from './../car-properties/car-properties.service';
import { Injectable } from '@angular/core';
import { CarManipulationService } from '../car-manipulation/car-manipulation.service';

@Injectable({
  providedIn: 'root'
})
export class BackService {

  constructor(
    private carPropertiesService: CarPropertiesService,
    private carManipulationService: CarManipulationService,
  ) { }

  moveBack(car: HTMLElement): void {
    const angle = this.carPropertiesService.getAngle(car);
    if (angle === 0) {
      this.carManipulationService.increaseBottomPx(car, 10);
    } else if (angle < 0 && angle > -90) {
      const diff = (90 - Math.abs(angle)) / 10;
      this.carManipulationService.increaseBottomPx(car, diff);
      this.carManipulationService.increaseRightPx(car, 10-diff);
    } else if (angle === -90) {
      this.carManipulationService.increaseRightPx(car, 10);
    } else if (angle < -90 && angle > -180) {
      const diff = (Math.abs(angle) - 90) / 10;
      this.carManipulationService.increaseTopPx(car, diff);
      this.carManipulationService.increaseRightPx(car, 10-diff);
    } else if (angle > 0 && angle < 90) {
      const diff = (90 - angle) / 10;
      this.carManipulationService.increaseBottomPx(car, diff);
      this.carManipulationService.increaseLeftPx(car, 10-diff);
    } else if (angle > 90 && angle < 180) {
      const diff = (Math.abs(angle) - 90) / 10;
      this.carManipulationService.increaseTopPx(car, diff);
      this.carManipulationService.increaseLeftPx(car, 10-diff);
    } else if (angle === 180) {
      this.carManipulationService.increaseTopPx(car, 10);
    } else if (angle === 90) {
      this.carManipulationService.increaseLeftPx(car, 10);
    }
  }
}
