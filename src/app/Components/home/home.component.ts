import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Sort } from '@angular/material/sort';

export interface SearchResponse {
  State: string;
  Active: string;
}

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
  ]
})

export class HomeComponent implements OnInit {
  isLoading = false;
  isExpand = false;
  stateData: any;
  hideme: any = {};
  allDistrictData: any;
  districtData: any;
  stateColumns: string[] = ['State', 'Confirmed', 'Active', 'Recovered', 'Deaths'];
  districtColumns: string[] = ['District', 'Confirmed', 'Active', 'Recovered', 'Deaths'];
  dataSource: any;
  expandedElement!: SearchResponse | null;
  expanded = false;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.isLoading = true;
    this.getAllData();
  }
  async getAllData() {
    await this.getStateData();
    await this.getDistrictData();
    this.isLoading = false;
  }
  async getStateData() {
    let untrimmedStateData: any = await this.api.fetchStateData();
    this.stateData = untrimmedStateData.sort((a:any,b:any)=>{
      return parseFloat(a.Confirmed) - parseFloat(b.Confirmed)
    }).filter(((data: any) => {
      return data.State_code != undefined;
    }))
    this.stateData.forEach((e: any) => {
      this.hideme[e.State_code] = false;
    });
    console.log(this.stateData);
  }
  async getDistrictData() {
    this.allDistrictData = await this.api.fetchDistrictData();
    // console.log(this.allDistrictData)
  }
  getStatesDistrictData(stateCode: any) {
    // this.expandedElement = this.expandedElement === row ? null : row
    // await this.getD(row)
    this.districtData = this.allDistrictData.filter((data: any) => {
      return data.State_Code == stateCode
    })
    return this.districtData;
  }
  districtExpandClose() {
    this.expandedElement = null;
  }

  toggleDistricts(item: any) {
    if (this.hideme[item] == false) {
      Object.keys(this.hideme).forEach(h => {
        this.hideme[h] = false;
      });
      this.hideme[item] = true;
    }
    else {
      Object.keys(this.hideme).forEach(h => {
        this.hideme[h] = false;
      });
    }
  }
  sortData(sort: Sort) {
    const data = this.stateData.slice();
    if (!sort.active || sort.direction === '') {
      this.stateData = data;
      return;
    }
    this.stateData = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'stateName': return compare(a.State, b.State, isAsc);
        case 'stateConfirmed': return compare(+a.Confirmed, +b.Confirmed, isAsc);
        case 'stateRecovered': return compare(+a.Recovered, +b.Recovered, isAsc);
        case 'stateActive': return compare(+a.Active, +b.Active, isAsc);
        case 'stateDeaths': return compare(+a.Deaths, +b.Deaths, isAsc);
        default: return 0;
      }
    });
  }
}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
