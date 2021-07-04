import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './Components/home/home.component';
import { MatSortModule } from '@angular/material/sort';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { StateDailyIncreasePipe } from './pipes/state-daily-increase.pipe';
import { DistrictDailyIncreasePipe } from './pipes/district-daily-increase.pipe';
import { StateNamePipe } from './pipes/state-name.pipe';
import { DistrictNamePipe } from './pipes/district-name.pipe';
import { VaccinationCountPipe } from './pipes/vaccination-count.pipe';
import { MatCardModule } from '@angular/material/card';
import { LastUpdatedPipe } from './pipes/last-updated.pipe';
import { NumberFormatPipe } from './pipes/number-format.pipe';
import { StateDetailsComponent } from './Components/state-details/state-details.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StateDailyIncreasePipe,
    DistrictDailyIncreasePipe,
    StateNamePipe,
    DistrictNamePipe,
    VaccinationCountPipe,
    LastUpdatedPipe,
    NumberFormatPipe,
    StateDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    MatSortModule,
    NgxSpinnerModule,
    MatButtonModule,
    MatRippleModule,
    MatCardModule,
    NgxSkeletonLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
