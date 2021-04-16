export interface Rental {
  id:number;
  carId:number;
  carName:string;
  brandName:string;
  colorName:string;
  dailyPrice:number;
  customerFirstName:string;
  customerLastName:string;
  rentDate:Date;
  returnDate:Date;
}
