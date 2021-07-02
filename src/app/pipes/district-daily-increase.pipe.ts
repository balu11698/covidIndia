import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'districtDailyIncrease'
})
export class DistrictDailyIncreasePipe implements PipeTransform {

  transform(value: any, data: any, type: any) {
    // console.time("disctrisStart")
    let filteredData = data.filter((data: any) => {
      return data.District == value
    })
    // let filteredStartData:any;
    // data.some((data: any) => {
    //   if (data.District == value) {
    //     filteredStartData.push(data);
    //   }
    // })
    // let filteredEndData:any;
    // data.some((data: any) => {
    //   if (data.District == value) {
    //     filteredEndData.push(data);
    //   }
    // })
    // console.log(filteredStartData,"filters")
    if (type == "Confirmed") {
        // let total = filteredStartData[1]?.Confirmed - filteredData[0]?.Confirmed
        // let totalCount = (total > 0) ? total : null
        // return totalCount;
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
