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
            CarManager carManager = new CarManager( new EfCarDal());

            foreach (var car in carManager.GetCarsByBrandId(1))
            {
                Console.WriteLine(car.Description);
            }

            carManager.Add(new Car()
            {
                BrandId = 1,
                ColorId = 7,
                DailyPrice = 0,
                Description = "Lancia Delta",
                ModelYear = 2011
            });
        }
    }
}
