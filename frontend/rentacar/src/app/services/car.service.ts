import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = 'https://localhost:44340/api/'

  constructor(private httpClient: HttpClient) { }

  getCars():Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcarsbybrandid?brandId="+ brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcarsbycolorid?colorId="+ colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsDetail(carId:number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "car/getcardetailbyid?carId=" + carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
}

//   getByCarIdImage(carId : number) : Observable<ListResponseModel<Car>>{
//   let newPath = this.apiUrl + + "carImages/getimagesbycarid?carId=" + carId;
//   return this.httpClient.get<ListResponseModel<Car>>(newPath);
// }
}
