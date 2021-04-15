import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { CarImageService } from 'src/app/services/carimage.service';
import { ColorService } from 'src/app/services/color.service';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars:Car[]=[];
  currentCar:Car;
  distinctCars:Car[]=[];
  carId: number;
  images:CarImage[]=[];
  dataLoaded=false;
  filterText!:string;

  colors:Color[]=[];
  brands:Brand[]=[];

  brandFilter: Number;
  colorFilter: Number;

  imageUrl:string="https://localhost:44340"

  constructor(private carService:CarService,
    private carImageService:CarImageService,
    private activatedRoute:ActivatedRoute,
    private colorService:ColorService,
    private brandService:BrandService,
    private toastrService:ToastrService) { }

    ngOnInit(): void {
      this.activatedRoute.params.subscribe(params=>{
        if(params["colorId"] && params["brandId"]){
          this.getCarsByColorAndBrand(params["colorId"],params["brandId"])
        }
        else if(params["brandId"]){
          this.getCarsDetailByBrand(params["brandId"]);
        }else if(params["colorId"]){
          this.getCarsDetailByColor(params["colorId"]);
       }else if(params["carId"]){
        this.getCarsDetail(params["carId"]);
     }else{
        this.getCars();
      }
      })
      this.getColors();
      this.getBrands();
    }

    getCars(){
      this.carService.getCars().subscribe(response=>{
        //this.cars = response.data
        //car nesnemi dto'dan getirdiğim için bir arabama ait birden fazla resim olduğunda ana sayfamda bir tanesini getirsin.
        this.cars = response.data.filter(
          (thing, i, arr) => arr.findIndex(t => t.carId === thing.carId) === i
        )
        //this.currentCar=response.data[0]
        this.dataLoaded=true;
      })
    }

    getColors() {
      this.colorService.getColors().subscribe(response=>
        {
          this.colors=response.data;

        })
      }
      getBrands() {
        this.brandService.getBrands().subscribe(response=>
          {
            this.brands=response.data;

          })
        }



    getCarsByBrand(brandId:number){
      this.carService.getCarsByBrand(brandId).subscribe(response=>{
        this.cars = response.data.filter(
          (thing, i, arr) => arr.findIndex(t => t.carId === thing.carId) === i
        )
        this.dataLoaded=true;
        console.log(this.cars);
      })
    }
    getCarsByColor(colorId:number){
      this.carService.getCarsByBrand(colorId).subscribe(response=>{
        this.cars = response.data.filter(
          (thing, i, arr) => arr.findIndex(t => t.carId === thing.carId) === i
        )
        this.dataLoaded=true;

      })

    }

    getCarsDetail(carId:number){
      this.carService.getCarsDetail(carId).subscribe(response=>{
        this.cars = response.data
        console.log(response);
        this.dataLoaded=true;
        //this.carId = carId;
      })
    }

    getCarsDetailByBrand(brandId:number){
      this.carService.getCarsDetailByBrand(brandId).subscribe(response=>{
        this.cars = response.data.filter(
          (thing, i, arr) => arr.findIndex(t => t.carId === thing.carId) === i
        )
        console.log(response);
        this.dataLoaded=true;
      })
    }

    getCarsDetailByColor(colorId:number){
      this.carService.getCarsDetailByColor(colorId).subscribe(response=>{
        this.cars = response.data.filter(
          (thing, i, arr) => arr.findIndex(t => t.carId === thing.carId) === i
        )
        console.log(response);
        this.dataLoaded=true;
      })
    }

    getCarImagesByCarId(carId:number){
      this.carImageService.getCarImagesByCarId(carId).subscribe(response=>{
       this.images=response.data;
       console.log(response);
      })
    }


    getCarsByColorAndBrand(colorId:number, brandId:number){

        this.carService.getCarsByColorAndBrand(colorId,brandId).subscribe(response=>{
          this.cars = response.data
          this.cars = response.data.filter(
            (thing, i, arr) => arr.findIndex(t => t.carId === thing.carId) === i
          )
          this.dataLoaded=true;

          if(this.cars.length >0 ) {
            this.toastrService.success("Filtreleme gerçekleşti.")
          } else {this.toastrService.error("Seçilen kriterlere göre sistemde araba yok.")}

          console.log(response);
          })

    }

  setCurrentCar(car:Car) {
    this.currentCar=car
    console.log(car);
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

  addToCart(car:Car) {
    this.toastrService.success("Sepete eklendi",car.description)
  }

  getSelectedBrand(brandId: Number) {
    if (this.brandFilter == brandId)
      return true;
    else
      return false;
  }
  getSelectedColor(colorId: Number) {
    if (this.colorFilter == colorId)
      return true;
    else
      return false;
  }

}
