using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using Core.DataAccess.EntityFrameWork;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;

namespace DataAccess.Concrete.EntityFrameWork
{
    public class EfRentalDal: EfEntityRepositoryBase<Rental,RentacarContext>, IRentalDal
    {
        public List<RentalDetailDto> GetRentalDetails(Expression<Func<Rental, bool>> filter = null)
        {
            using (RentacarContext context = new RentacarContext())
            {
                var result = from rnt in filter == null ? context.Rentals: context.Rentals.Where(filter)
                             join cr in context.Cars on rnt.CarId equals cr.Id
                             join col in context.Colors on cr.ColorId equals col.Id
                             join brd in context.Brands on cr.BrandId equals brd.Id
                             join cus in context.Customers on rnt.CustomerId equals cus.Id
                             join usr in context.Users on cus.UserId equals usr.Id
                             select new RentalDetailDto 
                             { 
                                RentalId = rnt.Id,
                                CarId = cr.Id,
                                CarName = cr.Description,
                                BrandName = brd.Name,
                                ColorName = col.Name,
                                CustomerId = rnt.CustomerId,
                                CustomerFirstName = usr.FirstName,
                                CustomerLastName = usr.LastName,
                                DailyPrice = cr.DailyPrice,
                                RentDate = rnt.RentDate,
                                ReturnDate = rnt.ReturnDate
                             };

                return result.ToList();
            }
        }

    }
}
