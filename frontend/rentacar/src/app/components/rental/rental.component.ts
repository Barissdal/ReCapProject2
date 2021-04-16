import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentals :Rental[]=[]
  lastRental:Rental
  returnDate:Date;
  rentDate:Date;

  cars:Car[]=[];
  isRentBefore:Boolean = false;


  constructor(private rentalService:RentalService,
    private carService:CarService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]) {
        this.getRentalsByCar(params["carId"])
        this.getCarsDetail(params["carId"])
        console.log(this.rentDate)
      }else{
      this.getRentals();
      }
    })
  }

  getRentals() {
    this.rentalService.getRentals().subscribe(response=> {
      this.rentals=response.data
      //this.dataLoaded=true;
    })
  }

  getRentalsByCar(carId:number) {
    this.rentalService.getRentalsByCar(carId).subscribe(response=> {
      this.rentals=response.data
      this.lastRental = this.rentals[this.rentals.length-1]

      if(this.lastRental == null) {
        this.isRentBefore = false;
      } else{this.isRentBefore = true;}

    })
  }

  getCarsDetail(carId:number){
    this.carService.getCarsDetail(carId).subscribe(response=>{
      this.cars = response.data
      //console.log(response);
      //this.carId = carId;
    })
  }

  getRentMinDate() {
    var today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0, 10);
  }

  getReturnMinDate() {
    var today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().slice(0, 10);
  }


  checkAvailability() {
    if (!this.isRentBefore) {
      return true;
    } else {
      return this.rentedBeforeCarCheck();
    }
  }

  rentedBeforeCarCheck() {
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    let today = formatDate(now, 'yyyy/MM/dd', 'en');
    let oldDate = formatDate(this.lastRental.returnDate, 'yyyy/MM/dd', 'en');
    if (this.lastRental.returnDate == null) {
      return false;
    } else if (oldDate > today) {
      return false;
    } else {
      return true;
    }
  }

  checkClick() {
    if (this.checkAvailability() == true) {
      if (this.rentDate == null) {
        this.toastrService.warning(
          'Başlangıç tarihi seçimi zorunludur!',
          'Eksik Form'
        );
      } else {
        if (this.returnDate == null || this.returnDate > this.rentDate) {
          this.toastrService.success('Araç kiralanabilir.', 'Araç Uygun');
          //this.createRental();
        } else if (this.returnDate < this.rentDate) {
          this.toastrService.error(
            'Dönüş tarihi başlangıç tarihinden küçük olamaz!'
          );
        } else if (this.returnDate == this.rentDate) {
          this.toastrService.error('Kiralama işlemi en az 1 gün olmalıdır!');
        }
      }
    } else {
      this.toastrService.warning(
        'Araç kiralama işlemi gerçekleşemez.',
        'Araç Kullanımda'
      );
    }
  }

}
