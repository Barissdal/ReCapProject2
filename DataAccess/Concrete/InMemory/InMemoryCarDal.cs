using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DataAccess.Abstract;
using Entities.Concrete;

namespace DataAccess.Concrete.InMemory
{
    public class InMemoryCarDal : ICarDal
    {
        List<Car> _cars;

        public InMemoryCarDal()
        {
            _cars = new List<Car> { 
                new Car{Id=1,BrandId=1,ColorId=1,DailyPrice=150,Description="Renault Clio",ModelYear=2018},
                new Car{Id=2,BrandId=1,ColorId=2,DailyPrice=180,Description="Renault Megane",ModelYear=2017},
                new Car{Id=3,BrandId=2,ColorId=3,DailyPrice=190,Description="Opel Astra",ModelYear=2016},
                new Car{Id=4,BrandId=3,ColorId=4,DailyPrice=250,Description="Mazda 3",ModelYear=2020},
                new Car{Id=5,BrandId=4,ColorId=4,DailyPrice=450,Description="VW Amarok",ModelYear=2021}
            };
        }

        public void Add(Car car)
        {
            _cars.Add(car);
        }

        public void Delete(Car car)
        {
            Car carToDelete = _cars.SingleOrDefault(p=> p.Id == car.Id);

            _cars.Remove(carToDelete);
        }

        public List<Car> GetAll()
        {
            return _cars;
        }

        public List<Car> GetById(int brandId)
        {
            return _cars.Where(p=> p.BrandId == brandId).ToList();
        }

        public void Update(Car car)
        {
            Car carToUpdate = _cars.SingleOrDefault(p => p.Id == car.Id);

            carToUpdate.BrandId = car.BrandId;
            carToUpdate.ColorId = car.ColorId;
            carToUpdate.DailyPrice = car.DailyPrice;
            carToUpdate.Description = car.Description;
            carToUpdate.ModelYear = car.ModelYear;
        }
    }
}
