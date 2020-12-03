import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarPropertiesService {

  constructor() { }

  getAngle(car: HTMLElement): number {
    const styles = getComputedStyle(car);
    const topPxs = styles.top.split('px')[0];
    const leftPxs = styles.left.split('px')[0];
    const transform = styles.getPropertyValue("-webkit-transform") ||
                      styles.getPropertyValue("-moz-transform") ||
                      styles.getPropertyValue("-ms-transform") ||
                      styles.getPropertyValue("-o-transform") ||
                      styles.getPropertyValue("transform") ||
                      "none";
    let angle = 0;
    if (transform != "none") {
      // console.log(new WebKitCSSMatrix(transform));
      const transformValues = transform.split('(')[1].split(')')[0].split(',');
      // @ts-ignore
      const scale = Math.sqrt(transformValues[0] * transformValues[0] + transformValues[1] * transformValues[1]);
      // @ts-ignore
      angle = Math.round(Math.atan2(transformValues[1], transformValues[0]) * (180/Math.PI));
    }
    return angle;
  }
}
