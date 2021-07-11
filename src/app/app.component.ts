import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'covidIndia';
  theme: any = "";
  ngOnInit() {
    this.theme = window.localStorage.getItem('theme');
    (!this.theme || this.theme == "theme-light") ?
      document.body.classList.add("theme-light") :
      document.body.classList.add("theme-dark");
  }
  setTheme() {
    (this.theme == "theme-light") ? this.setDarkTheme() : this.setLightTheme()
  }
  setDarkTheme() {
    document.body.classList.remove("theme-light");
    document.body.classList.add("theme-dark")
    window.localStorage.setItem('theme', 'theme-dark');
    this.theme = "theme-dark"
  }
  setLightTheme() {
    document.body.classList.remove("theme-dark");
    document.body.classList.add("theme-light")
    window.localStorage.setItem('theme', 'theme-light');
    this.theme = "theme-light"
  }
}
