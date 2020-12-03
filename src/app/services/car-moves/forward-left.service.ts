import { Injectable } from '@angular/core';
import { CarManipulationService } from '../car-manipulation/car-manipulation.service';
import { CarPropertiesService } from '../car-properties/car-properties.service';

@Injectable({
  providedIn: 'root'
})
export class ForwardLeftService {

  constructor(
    private carPropertiesService: CarPropertiesService,
    private carManipulationService: CarManipulationService,
  ) { }

  moveForwardLeft(car: HTMLElement): void {
    
  }
}
