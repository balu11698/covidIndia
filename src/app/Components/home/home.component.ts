import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort, Sort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    // [
    //   trigger('animate',[
    //     state('initial', style({
    //       maxHeight: 0
    //     })),
    //     state('final', style({
    //       maxHeight:'3000px'
    //     })),
    //     transition('initial=>final', animate('1000ms cubic-bezier(0, 1, 0.5, 1)')),
    //     transition('final=>initial', animate('1000ms cubic-bezier(0, 1, 0.5, 1)'))
    //   ])
    // ]
  ]
})

export class HomeComponent implements OnInit {
  isLoading = false;
  isExpand = false;
  // stateData: any;
  stateData: any[] = [];
  allDistrictData: any;
  dailyStateData: any;
  dailyDistrictData: any;
  currentState = 'initial'
  todaysStateData: any;
  todaysDistrictData: any;
  districtData: any;
  indiaData:any;
  stateColumns: string[] = ['State', 'Confirmed', 'Active', 'Recovered', 'Deaths'];
  districtColumns: string[] = ['District', 'Confirmed', 'Active', 'Recovered', 'Deaths'];
  dataSource: any;
  expanded = false;
  dataMin: any;
  allData = [];
  stateNames: any = {
    "AN": "Andaman and Nicobar Islands",
    "AP": "Andhra Pradesh",
    "AR": "Arunachal Pradesh",
    "AS": "Assam",
    "BR": "Bihar",
    "CH": "Chandigarh",
    "CT": "Chhattisgarh",
    "DN": "Dadra and Nagar Haveli",
    "DD": "Daman and Diu",
    "DL": "Delhi",
    "GA": "Goa",
    "GJ": "Gujarat",
    "HR": "Haryana",
    "HP": "Himachal Pradesh",
    "JK": "Jammu and Kashmir",
    "JH": "Jharkhand",
    "KA": "Karnataka",
    "KL": "Kerala",
    "LD": "Lakshadweep",
    "MP": "Madhya Pradesh",
    "MH": "Maharashtra",
    "MN": "Manipur",
    "ML": "Meghalaya",
    "MZ": "Mizoram",
    "NL": "Nagaland",
    "OR": "Odisha",
    "PY": "Puducherry",
    "PB": "Punjab",
    "RJ": "Rajasthan",
    "SK": "Sikkim",
    "TN": "Tamil Nadu",
    "TG": "Telangana",
    "TR": "Tripura",
    "UP": "Uttar Pradesh",
    "UT": "Uttarakhand",
    "WB": "West Bengal",
    "LA": "Ladakh",
    "TT": "India"
  }

  hideDistricts: any = {}
  @ViewChild('sort1') public sort1!: MatSort;
  @ViewChild('sort2') public sort2!: MatSort;
  constructor(private api: ApiService, private spinner: NgxSpinnerService) { }
  ngOnInit() {
    this.isLoading = true;
    this.getAllData();
  }

  async getAllData() {
    this.spinner.show();
    await this.getStateData();
    // await this.getDataMin();
    this.isLoading = false;
    this.spinner.hide();
  }
  getStateNames(shortForm: any) {
    return this.stateNames[shortForm]
  }
  async getStateData() {
    let data: any = await this.api.fetchStateData1();
    let keys: any = JSON.parse(data);
    for (let key in keys) {
      this.stateData.push({ state: this.getStateNames(key), value: keys[key] });
    }
    this.indiaData = this.stateData.filter((data:any)=>{
      return data.state=="India";
    })  
    console.log(this.indiaData)
    this.stateData = this.stateData.filter((data:any)=>{
      return data.state!="India";
    })  
    for (let key1 in this.stateData) {
      this.stateData[key1].value.dis = [];
      for (let keys2 in this.stateData[key1].value.districts) {
        this.stateData[key1].value.dis.push({ district: keys2, value: this.stateData[key1].value.districts[keys2] });
      }
    }
    this.stateData.sort((a: any, b: any) => {
      return parseFloat(b.value.total.confirmed) - parseFloat(a.value.total.confirmed)
    })
    this.stateData.filter((data: any) => {
      data.value.dis?.sort((a: any, b: any) => {
        return (parseFloat(b.value.total.confirmed) - parseFloat(a.value.total.confirmed))
      })
    })
    this.stateData.forEach((e: any) => {
      this.hideDistricts[e.state] = false;
    });
    console.log(this.stateData)

  }
  sortStateData(sort: Sort) {
    const data = this.stateData.slice();
    if (!sort.active || sort.direction === '') {
      this.stateData = data;
      return;
    }
    this.stateData = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'stateName': return compare(a.state, b.state, isAsc);
        case 'stateConfirmed': return compare(+a.value.total.confirmed, +b.value.total.confirmed, isAsc);
        case 'stateRecovered': return compare(+a.value.total.recovered, +b.value.total.recovered, isAsc);
        case 'stateActive': return compare(+(a.value.total.confirmed - a.value.total.recovered), +(b.value.total.confirmed - b.value.total.recovered), isAsc);
        case 'stateDeaths': return compare(+a.value.total.deceased, +b.value.total.deceased, isAsc);
        default: return 0;
      }
    });
  }
  sortDistrictData(sort2: Sort, stateCode: any) {
    let sortDistrict = this.stateData.filter((state: any) => { return state.state == stateCode })[0].value.dis
    const data = this.stateData.slice()
    const data1 = sortDistrict.slice();
    if (!sort2.active || sort2.direction === '') {
      this.stateData = data;
      return;
    }
    let sorted = data1.sort((a: any, b: any) => {
      const isAsc = sort2.direction === 'asc';
      switch (sort2.active) {
        case 'districtName': return compare(a.district, b.district, isAsc);
        case 'districtConfirmed': return compare(+a.value.total.confirmed, +b.value.total.confirmed, isAsc);
        case 'districtRecovered': return compare(+a.value.total.recovered, +b.value.total.recovered, isAsc);
        case 'districtActive': return compare(+(a.value.total.confirmed - a.value.total.recovered), +(b.value.total.confirmed - b.value.total.recovered), isAsc);
        case 'districtDeceased': return compare(+a.value.total.deceased ? a.value.total.deceased : 0, +b.value.total.deceased ? b.value.total.deceased : 0, isAsc);
        default: return 0;
      }
    });
    this.stateData.forEach((state: any) => {
      if (state.state == stateCode) {
        state.value.dis = sorted;
      }
    })
    return this.stateData;
  }
  async getDataMin() {
    console.time("dataMin")
    this.dataMin = await this.api.fetchDataMin();
    console.log(JSON.parse(this.dataMin))
    console.timeEnd("dataMin")
  }

  // async getStateData() {
  //   let untrimmedStateData: any = await this.api.fetchStateData();
  //   this.stateData = untrimmedStateData.sort((a: any, b: any) => {
  //     return parseFloat(b.Confirmed) - parseFloat(a.Confirmed)
  //   }).filter(((data: any) => {
  //     return data.State_code != undefined;
  //   }))
  //   this.stateData.forEach((e: any) => {
  //     this.hideme[e.State_code] = false;
  //   });
  // }

  async getDistrictData() {
    this.allDistrictData = await this.api.fetchDistrictData();
    // this.allDistrictData = this.allDistrictData.filter((data:any)=>{
    //   return data.District!="Unknown";
    // })  
  }

  async getDailyStateData() {
    console.time("dailyState");
    this.dailyStateData = await this.api.fetchStateDailyData();
    let today = new Date();
    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    let todayDate = today.getFullYear().toString() + '-' + ((today.getMonth() + 1 < 10) ? ('0' + (today.getMonth() + 1)) : (today.getMonth() + 1)).toString() + '-' + ((today.getDate() < 10) ? ('0' + today.getDate()) : today.getDate()).toString();
    let yesterdaysDate = yesterday.getFullYear().toString() + '-' + ((yesterday.getMonth() + 1 < 10) ? ('0' + (yesterday.getMonth() + 1)) : (yesterday.getMonth() + 1)).toString() + '-' + ((yesterday.getDate() < 10) ? ('0' + yesterday.getDate()) : yesterday.getDate()).toString();
    this.todaysStateData = this.dailyStateData.filter((data: any) => {
      return data.Date == todayDate || data.Date == yesterdaysDate;
    })
    console.log(this.todaysStateData)
    console.timeEnd("dailyState");
  }
  async getDailyDistrictData() {
    console.time("dailyDistrict");
    this.dailyDistrictData = await this.api.fetchDistrictDailyData();
    let today = new Date();
    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    let todayDate = today.getFullYear().toString() + '-' + ((today.getMonth() + 1 < 10) ? ('0' + (today.getMonth() + 1)) : (today.getMonth() + 1)).toString() + '-' + ((today.getDate() < 10) ? ('0' + today.getDate()) : today.getDate()).toString();
    let yesterdaysDate = yesterday.getFullYear().toString() + '-' + ((yesterday.getMonth() + 1 < 10) ? ('0' + (yesterday.getMonth() + 1)) : (yesterday.getMonth() + 1)).toString() + '-' + ((yesterday.getDate() < 10) ? ('0' + yesterday.getDate()) : yesterday.getDate()).toString();
    // let x = [...this.dailyDistrictData].reverse();
    this.todaysDistrictData = this.dailyDistrictData.filter((data: any) => {
      return data.Date == todayDate || data.Date == yesterdaysDate;
    })
    // x.filter((data: any) => {
    //   if(data.Date == todayDate || data.Date == yesterdaysDate){
    //     this.todaysDistrictData.push(data)
    //   }
    // })
    // x.some((data:any) =>{
    //   if(data.Date == todayDate){
    //     this.todaysDistrictData.push(data);
    //     // console.log(data)
    //    }
    // })
    console.log(this.todaysDistrictData, "today")
    console.timeEnd("dailyDistrict");
  }

  async totalData() {
    console.time('totalData')
    this.stateData.forEach((state: any) => {
      state.District = [];
      this.allDistrictData.forEach((disctrict: any) => {
        if (state.State_code == disctrict.State_Code) {
          state.District.push(disctrict)
        }
      })
    });
    this.stateData.filter((data: any) => {
      data.District?.sort((a: any, b: any) => {
        return (parseFloat(b.Confirmed) - parseFloat(a.Confirmed))
      })
    })
    console.timeEnd('totalData')
  }

  toggleDistricts(item: any) {
    if (this.hideDistricts[item] == false) {
      this.currentState = 'final';
      Object.keys(this.hideDistricts).forEach(h => {
        this.hideDistricts[h] = false;
      });
      this.hideDistricts[item] = true;
    }
    else {
      Object.keys(this.hideDistricts).forEach(h => {
        this.hideDistricts[h] = false;
      });
      this.currentState = this.currentState == "initial" ? "final" : "initial";
    }
  }
  // closeDistricts() {
  //   Object.keys(this.hideme).forEach(h => {
  //     this.hideme[h] = false;
  //   });
  // }
  // sortStateData(sort: Sort) {
  //   const data = this.stateData.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.stateData = data;
  //     return;
  //   }
  //   this.stateData = data.sort((a: any, b: any) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'stateName': return compare(a.State, b.State, isAsc);
  //       case 'stateConfirmed': return compare(+a.Confirmed, +b.Confirmed, isAsc);
  //       case 'stateRecovered': return compare(+a.Recovered, +b.Recovered, isAsc);
  //       case 'stateActive': return compare(+a.Active, +b.Active, isAsc);
  //       case 'stateDeaths': return compare(+a.Deaths, +b.Deaths, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }
  // sortDistrictData(sort2: Sort, stateCode: any) {
  //   let sortDistrict = this.stateData.filter((state: any) => { return state.State_code == stateCode })[0].District
  //   const data = this.stateData.slice()
  //   const data1 = sortDistrict.slice();
  //   if (!sort2.active || sort2.direction === '') {
  //     this.stateData = data;
  //     return;
  //   }
  //   let sorted = data1.sort((a: any, b: any) => {
  //     const isAsc = sort2.direction === 'asc';
  //     switch (sort2.active) {
  //       case 'districtName': return compare(a.District, b.District, isAsc);
  //       case 'districtConfirmed': return compare(+a.Confirmed, +b.Confirmed, isAsc);
  //       case 'districtRecovered': return compare(+a.Recovered, +b.Recovered, isAsc);
  //       case 'districtActive': return compare(+a.Active, +b.Active, isAsc);
  //       case 'districtDeceased': return compare(+a.Deceased, +b.Deceased, isAsc);
  //       default: return 0;
  //     }
  //   });
  //   this.stateData.forEach((state: any) => {
  //     if (state.State_code == stateCode) {
  //       state.District = sorted;
  //     }
  //   })
  //   return this.stateData;
  // }
}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
