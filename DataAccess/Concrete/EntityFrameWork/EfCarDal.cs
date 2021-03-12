using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using Core.DataAccess.EntityFrameWork;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Concrete.EntityFrameWork
{
    public class EfCarDal : EfEntityRepositoryBase<Car, RentacarContext>, ICarDal
    {
        public List<CarDetailDto> GetCarDetails()
        {
            using (RentacarContext context = new RentacarContext())
            {
                var result = from c in context.Cars
                             join b in context.Brands
                             on c.BrandId equals b.Id
                             select new CarDetailDto
                             {
                                 CarId = c.Id,
                                 BrandName = b.Name,
                                 DailyPrice = c.DailyPrice,
                                 Description = c.Description
                             };

                return result.ToList();
            }
        }
    }
}
