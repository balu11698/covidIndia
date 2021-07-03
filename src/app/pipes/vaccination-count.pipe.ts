import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vaccinationCount'
})
export class VaccinationCountPipe implements PipeTransform {

  transform(value: any , vaccinationType:any) {
    let population = value[0].value.meta.population;
    if(vaccinationType == "vaccination1"){
    let firstVaccination = value[0].value.total.vaccinated1;
    let firstVaccinationPercent = ((firstVaccination/population) * 100).toFixed(2)
    return firstVaccinationPercent+"%";
    }
    else{
      let secondVaccination = value[0].value.total.vaccinated2;
      let secondVaccinationPercent = ((secondVaccination/population) * 100).toFixed(2)
    return secondVaccinationPercent+"%";
    }
  }

}
