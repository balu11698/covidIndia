import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lastUpdated'
})
export class LastUpdatedPipe implements PipeTransform {

  transform(value: any) {
    let currentTime = new Date();
    let lastupdate = new Date(value)
    let difference = Math.abs(currentTime.getTime() - lastupdate.getTime())
    let hourDifference: any = (difference / 1000 / 3600);
    let xxx = (hourDifference > 60) ? (hourDifference / 60) : 0
    let hours = parseInt(hourDifference)
    let minutes = parseInt(((hourDifference % 1) * 60).toString())
    let lastUpdateTime = (hours != 0) ?
      ((hours == 1) ?
        ((minutes != 0) ? hours + " Hour " + minutes + " Minutes ago" : hours + " Hours ago") :
        (minutes != 0) ? hours + " Hours " + minutes + " Minutes ago" : hours + " Hours ago") :
      minutes + " Minutes ago";
    return lastUpdateTime;
  }

}
