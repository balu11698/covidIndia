import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-state-details',
  templateUrl: './state-details.component.html',
  styleUrls: ['./state-details.component.scss']
})
export class StateDetailsComponent implements OnInit {

  state:any;
  constructor(private activatedRoute : ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
   (this.activatedRoute.params.subscribe(params => this.state=params.id));
   console.log(this.state)

  }

}
