export interface Rental {
  id:number;
  carId:number;
  carName:string;
  brandName:string;
  colorName:string;
  dailyPrice:number;
  customerId:number,
  customerFirstName:string;
  customerLastName:string;
  rentDate:Date;
  returnDate:Date;
}
