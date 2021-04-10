import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { CarImageService } from 'src/app/services/carimage.service';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars:Car[]=[];
  currentCar:Car;
  carId: number;
  images:CarImage[]=[];
  dataLoaded=false;
  imageUrl:string="https://localhost:44340/"

  constructor(private carService:CarService,
    private carImageService:CarImageService,
    private activatedRoute:ActivatedRoute) { }

    ngOnInit(): void {
      this.activatedRoute.params.subscribe(params=>{
        if(params["brandId"]){
          this.getCarsByBrand(params["brandId"])
        }else if(params["carId"]){
          this.getCarImagesByCarId(params["carId"])
          this.dataLoaded=true;

        }else{
          this.getCars()
        }
      })
    }

    getCars(){
      this.carService.getCars().subscribe(response=>{
        this.cars = response.data
        this.dataLoaded=true;
      })
    }

    getCarsByBrand(brandId:number){
      this.carService.getCarsByBrand(brandId).subscribe(response=>{
        this.cars = response.data
        this.dataLoaded=true;
      })
    }
    getCarsByColor(colorId:number){
      this.carService.getCarsByBrand(colorId).subscribe(response=>{
        this.cars = response.data
        this.dataLoaded=true;
      })

    }

    getCarImagesByCarId(carId:number){
      this.carImageService.getCarImagesByCarId(carId).subscribe(response=>{
       this.images=response.data;
       console.log(response);
      })
    }

  setCurrentCar(car:Car) {
    this.currentCar=car
  }

  getCurrentCarClass(car:Car){
    if(car==this.currentCar){
      return "list-group-item active";
    }
    else{
      return "list-group-item";
    }
  }

  getAllCarClass(){
    if(!this.currentCar){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }

}
