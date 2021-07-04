import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { StateDetailsComponent } from './Components/state-details/state-details.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'State/:id', component: StateDetailsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
