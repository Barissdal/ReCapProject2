import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { Customer } from 'src/app/models/customer';

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

  customers:Customer;
  customerId:number;


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
      this.cars = response.data.filter(
        (thing, i, arr) => arr.findIndex(t => t.carId === thing.carId) === i
      )
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
          'Ba??lang???? tarihi se??imi zorunludur!',
          'Eksik Form'
        );
      } else {
        if (this.returnDate == null || this.returnDate > this.rentDate) {
          this.toastrService.success('Ara?? kiralanabilir.', 'Ara?? Uygun');
          //this.createRental();
        } else if (this.returnDate < this.rentDate) {
          this.toastrService.error(
            'D??n???? tarihi ba??lang???? tarihinden k??????k olamaz!'
          );
        } else if (this.returnDate == this.rentDate) {
          this.toastrService.error('Kiralama i??lemi en az 1 g??n olmal??d??r!');
        }
      }
    } else {
      this.toastrService.warning(
        'Ara?? kiralama i??lemi ger??ekle??emez.',
        'Ara?? Kullan??mda'
      );
    }
  }

}
