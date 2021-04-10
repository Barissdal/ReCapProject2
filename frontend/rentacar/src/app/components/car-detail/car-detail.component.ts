import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarDetailService } from 'src/app/services/car-detail.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetails:CarDetail[]=[];
  currentCarDetails:CarDetail;
  imageBasePath: string = 'https://localhost:44340';

  constructor(private carDetailService:CarDetailService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["id"]) {
        this.getCarsByCar(params["id"])
      }else {
        this.getCarDetails()
      }
    })
  }

  getCarsByCar(id:number) {
    this.carDetailService.getCarsByCar(id).subscribe(response=> {
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

}
