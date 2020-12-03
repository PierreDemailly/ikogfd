import { CarPropertiesService } from './../car-properties/car-properties.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarManipulationService {

  constructor(private carPropertiesService: CarPropertiesService) { }

  increaseTopPx(car: HTMLElement, px: number): void {
    const carStyles = new CarStyles(car);
    car.style.top = `${carStyles.topPx +- px}px`;
  }

  increaseBottomPx(car: HTMLElement, px: number): void {
    const carStyles = new CarStyles(car);
    car.style.top = `${carStyles.topPx + px}px`;
  }

  increaseRightPx(car: HTMLElement, px: number): void {
    const carStyles = new CarStyles(car);
    car.style.left = `${carStyles.leftPx + px}px`;
  }

  increaseLeftPx(car: HTMLElement, px: number): void {
    const carStyles = new CarStyles(car);
    car.style.left = `${carStyles.leftPx +- px}px`;
  }

  increaseAngle(car: HTMLElement, degrees: number): void {
    const angle = this.carPropertiesService.getAngle(car);
    car.style.transform = `rotate(${angle + degrees}deg)`;
  }

  decreaseAngle(car: HTMLElement, degrees: number): void {
    const angle = this.carPropertiesService.getAngle(car);
    car.style.transform = `rotate(${angle - degrees}deg)`;
  }
}

class CarStyles {
  topPx: number;
  rightPx: number;
  bottomPx: number;
  leftPx: number;

  constructor(car: HTMLElement) {
    const styles = getComputedStyle(car);
    this.topPx = this.getPxValue(styles.top);
    this.rightPx = this.getPxValue(styles.right);
    this.bottomPx = this.getPxValue(styles.bottom);
    this.leftPx = this.getPxValue(styles.left);
  }

  getPxValue(property: string): number {
    return parseInt(property.split('px')[0]);
  }
}
