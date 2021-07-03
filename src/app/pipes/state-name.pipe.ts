import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateName'
})
export class StateNamePipe implements PipeTransform {

  transform(value: any) {
    let keys= []
    for (let key in value) {
      keys.push({key: key, value: value[key]});
      
    }
    console.log(keys)
    return keys
  }

}
