using System;
using Business.Concrete;
using DataAccess.Concrete.EntityFrameWork;
using DataAccess.Concrete.InMemory;
using Entities.Concrete;

namespace ConsoleUI
{
    class Program
    {
        static void Main(string[] args)
        {
            //CarTest();

            //BrandTest();

            RentalManager rentalManager = new RentalManager(new EfRentalDal());

            var rentCar2 = rentalManager.Add(new Rental
            {
                CarId = 5,
                CustomerId = 1,
                RentDate = new DateTime(2021, 04, 15),
                //ReturnDate = new DateTime(2021, 04, 15)
            }
            );
            Console.WriteLine(rentCar2.Message);


            var rentalResult = rentalManager.GetRentalDetails();

            if (rentalResult.Success == true)
            {
                foreach (var rent in rentalResult.Data)
                {
                    Console.WriteLine($"{rent.CarName} - {rent.ColorName} - {rent.DailyPrice} - {rent.RentDate} - {rent.ReturnDate}");
                }
            }
            else
            {
                Console.WriteLine(rentalResult.Message);
            }


        }

        //private static void BrandTest()
        //{
        //    BrandManager brandManager = new BrandManager(new EfBrandDal());

        //    foreach (var brand in brandManager.GetAll())
        //    {
        //        Console.WriteLine(brand.Name);
        //    }
        //}

        private static void CarTest()
        {
            CarManager carManager = new CarManager(new EfCarDal());

            var result = carManager.GetCarDetails();

            if (result.Success == true)
            {
                foreach (var car in result.Data)
                {
                    Console.WriteLine(car.Description + "/" + car.BrandName +
                    "/" + car.ColorName + "/" + car.DailyPrice);
                }
            }
            else
            {
                Console.WriteLine(result.Message);
            }

            //var carAddResult =carManager.Add(new Car()
            //{
            //    BrandId = 2,
            //    ColorId = 8,
            //    DailyPrice = 320,
            //    Description = "Audi Q2",
            //    ModelYear = 2019
            //});

            //Console.WriteLine(carAddResult.Message);

        }
    }
}
