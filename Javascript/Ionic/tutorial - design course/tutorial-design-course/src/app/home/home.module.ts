import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { NgCircleProgressModule } from 'ng-circle-progress';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgCircleProgressModule.forRoot({
	    radius: 100,
	    outerStrokeWidth: 16,
	    innerStrokeWidth: 8,
	    outerStrokeColor: "#78C000",
	    innerStrokeColor: "#C7E596",
	    animationDuration: 300,
	    animation: false,
	    responsive: true,
	    renderOnClick: false,
    }),
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
