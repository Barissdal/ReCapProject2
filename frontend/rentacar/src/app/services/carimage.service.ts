import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarimageService {

  apiUrl = 'https://localhost:44340/api/';
  constructor(private httpClient: HttpClient) { }

  getAll(carId:number):Observable<ListResponseModel<CarImage>> {
     let newPath = this.apiUrl + "carImages/getall"
     return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
   }
   getByCarId(carId : number) : Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl + "carimages/getimagesbycarid?carId=" +carId
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getImage(imagePath : string){
    let newpath = this.apiUrl + imagePath;
    return newpath;
  }
}
