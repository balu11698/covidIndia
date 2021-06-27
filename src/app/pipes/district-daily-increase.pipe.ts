import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'districtDailyIncrease'
})
export class DistrictDailyIncreasePipe implements PipeTransform {

  transform(value: any, data: any, type: any) {
    let filteredData = data.filter((data: any) => {
      return data.District == value
    })
    if (type == "Confirmed") {
      let total = filteredData[1]?.Confirmed - filteredData[0]?.Confirmed
      let totalCount = (total > 0) ? total : null
      return totalCount;
    }
    else if (type == "Recovered") {
      let total = filteredData[1]?.Recovered - filteredData[0]?.Recovered
      let totalCount = (total > 0) ? total : null
      return totalCount;
    }
    else if (type == "Deaths") {
      let total = filteredData[1]?.Deceased - filteredData[0]?.Deceased
      let totalCount = (total > 0) ? total : null
      return totalCount;
    }
    return null
  }

}
