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
            CarTest();

            //BrandTest();

            //carManager.Add(new Car()
            //{
            //    BrandId = 1,
            //    ColorId = 7,
            //    DailyPrice = 190,
            //    Description = "Lancia Delta",
            //    ModelYear = 2011
            //});
        }

        private static void BrandTest()
        {
            BrandManager brandManager = new BrandManager(new EfBrandDal());

            foreach (var brand in brandManager.GetAll())
            {
                Console.WriteLine(brand.Name);
            }
        }

        private static void CarTest()
        {
            CarManager carManager = new CarManager(new EfCarDal());

            foreach (var car in carManager.GetCarDetails())
            {
                Console.WriteLine(car.Description + "/" + car.BrandName);
            }
        }
    }
}
