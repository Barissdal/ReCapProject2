import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = 'https://localhost:44340/api/'

  constructor(private httpClient: HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>> {
    let newPath= this.apiUrl + "rentals/getrentaldetails";
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRentalsByCar(carId:number):Observable<ListResponseModel<Rental>> {
    let newPath= this.apiUrl + "rentals/getrentaldetailsbycar?carId="+carId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRentalCarControl(carId: number):Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "rentals/getcarcontrol?carId="+carId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  add(rental:Rental):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"rentals/add",rental);
  }
}
