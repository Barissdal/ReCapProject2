import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/carimage.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetails:CarDetail[]=[];
  currentCarDetails:CarDetail;
  images:CarImage[]=[];
  imageUrl: string = 'https://localhost:44340';

  constructor(private carDetailService:CarDetailService,
    private carImageService:CarImageService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]) {
        this.getCarsByCar(params["carId"])
      }
      // else{
      //   this.getCarDetails()
      // }
    })
  }

  getCarsByCar(carId:number) {
    this.carDetailService.getCarsByCar(carId).subscribe(response=> {
      this.carDetails=response.data
      this.currentCarDetails=response.data[0]
      console.log(this.currentCarDetails);
    })
  }

  getCarDetails(){
    this.carDetailService.getCarDetails().subscribe(
      response=>{
        this.carDetails=response.data;
        this.currentCarDetails=response.data[0]
        console.log(this.currentCarDetails);
      }
    )
  }

  getCarImagesByCarId(carId:number){
    this.carImageService.getCarImagesByCarId(carId).subscribe(response=>{
     this.images=response.data;
     console.log(response);
    })
  }

  getSliderClassName(index:Number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }

  getBack(){
    this.carDetailService.getCarDetails();
  }

}
