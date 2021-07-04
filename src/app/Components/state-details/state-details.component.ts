import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-state-details',
  templateUrl: './state-details.component.html',
  styleUrls: ['./state-details.component.scss']
})
export class StateDetailsComponent implements OnInit {

  isLoading = false;
  state: any;
  stateData: any;
  districtData: any[] = [];
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
  selectedState: null;
  population: any;
  stateWiseData: any;
  deltaTested: any;
  totalTested: any;
  totalConfirmed: any;
  deltaConfirmed: any;
  stateName: any;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.params.subscribe(params => this.state = params.id);
    this.getDisctricData();
  }
  async getDisctricData() {
    let stateShortForm:any = Object.keys(this.stateNames).find(key => this.stateNames[key] === this.state);
    let data: any = await this.api.fetchStateData1();
    let keys: any = JSON.parse(data)[stateShortForm];
    console.log(keys)
    this.stateData = keys
    for (let key in keys.districts) {
      this.districtData.push({ district: key, value: keys.districts[key] });
    }
    this.isLoading = false;
  }
  report(stateCode: string, stateName: string) {  
    this.selectedState = null;  
    this.stateName = stateName; 
    console.log(this.stateName,"stateName") 
    // var data = this.stateWiseData[stateCode];  
    // this.population = (data?.meta?.population == undefined) ? 0 : data?.meta?.population;  
    // this.totalTested = (data?.total?.tested == undefined) ? 0 : data?.total?.tested;  
    // this.deltaTested = data?.delta?.tested;  
    // this.totalConfirmed = (data?.total?.confirmed == undefined) ? 0 : data?.total?.confirmed;  
    // this.deltaConfirmed = data?.delta?.confirmed;  
    // this.totalRecovered = (data?.total?.recovered == undefined) ? 0 : data?.total?.recovered;  
    // this.deltaRecovered = data?.delta?.recovered;  
    // this.totalDeceased = (data?.total?.deceased == undefined) ? 0 : data?.total?.deceased;  
    // this.deltaDeceased = data?.delta?.deceased;  
    // this.totalMigrated = (data?.total?.migrated == undefined) ? 0 : data?.total?.migrated;   
  }  


}
