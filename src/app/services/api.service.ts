import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  stateData: any;

  url = 'https://api.covid19india.org/csv/latest/';

  constructor(private http: HttpClient) { }

  csvJSON(csv: any) {
    const promise = new Promise(resolve => {
      const [firstLine, ...lines] = csv.toString().split('\n');
      const keys = firstLine.split(',');
      let result = lines.map((line: string) => ((values) =>
        keys.reduce(
          (curr: any, next: any, index: number) => ({
            ...curr,
            [next]: values[index],
          }),
          {}
        )
      )(line.split(',')));
      resolve(result)
    })
    return promise;
  }

  fetchStateData() {
    const promise = new Promise(resolve => {
      this.http.get(this.url + 'state_wise.csv', { responseType: 'text' }).subscribe((data) => {
        resolve(this.csvJSON(data))
      })
    })
    return promise;
  }
  fetchDistrictData() {
    const promise = new Promise(resolve => {
      this.http.get(this.url + 'district_wise.csv', { responseType: 'text' }).subscribe((data) => {
        resolve(this.csvJSON(data))
      })
    })
    return promise;
  }

  fetchStateDailyData(){
    const promise = new Promise(resolve => {
      this.http.get(this.url + 'states.csv', { responseType: 'text' }).subscribe((data) => {
        resolve(this.csvJSON(data))
      })
    })
    return promise;
  }
  fetchDistrictDailyData(){
    const promise = new Promise(resolve => {
      this.http.get(this.url + 'districts.csv', { responseType: 'text' }).subscribe((data) => {
        resolve(this.csvJSON(data))
      })
    })
    return promise;
  }
}
