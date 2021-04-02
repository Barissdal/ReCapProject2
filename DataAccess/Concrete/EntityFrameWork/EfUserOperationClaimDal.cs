using System;
using System.Collections.Generic;
using System.Text;
using Core.DataAccess.EntityFrameWork;
using Core.Entities.Concrete;
using DataAccess.Abstract;

namespace DataAccess.Concrete.EntityFrameWork
{
    public class EfUserOperationClaimDal : EfEntityRepositoryBase<UserOperationClaim, RentacarContext>, IUserOperationClaimDal
    {
    }
}
