import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{FormsModule} from "@angular/forms"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import {HttpClientModule} from '@angular/common/http';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';

import{ToastrModule} from "ngx-toastr"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { BrandPipePipe } from './pipes/brand-pipe.pipe';
import { ColorPipePipe } from './pipes/color-pipe.pipe'



@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    CarComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    NaviComponent,
    CarDetailComponent,
    VatAddedPipe,
    FilterPipePipe,
    BrandPipePipe,
    ColorPipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
