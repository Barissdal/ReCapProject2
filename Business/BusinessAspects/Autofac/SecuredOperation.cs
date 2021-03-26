using System;
using System.Collections.Generic;
using System.Text;
using Business.Constants;
using Castle.DynamicProxy;
using Core.Extensions;
using Core.Interceptors;
using Core.Utilities.IoC;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace Business.BusinessAspects.Autofac
{
    public class SecuredOperation : MethodInterception
    {
        private string[] _roles;
        //IHttpContextAccessor= bir jwt'da göndererek yapılan her bir istek için HttpContext oluşur
        private IHttpContextAccessor _httpContextAccessor;

        //burada manager'de aspecti çağırıken rolleri virgulla ayırıp yazarız
        //bu metotta bu virgulleri ayırıp array e atıyoruz
        public SecuredOperation(string roles)
        {
            _roles = roles.Split(',');
            //ServiceTool kullanarak dependency'leri yakalamak için yazılmış
            //Bizim injecktion alt yapımızı okuyan araç olacak
            //Autofac ile oluşturduğumuz servis mimarisine ulaş demek
            //Autofac'teki değerleri alacak artık _httpContextAccessor nesnesi
            _httpContextAccessor = ServiceTool.ServiceProvider.GetService<IHttpContextAccessor>();

        }

        protected override void OnBefore(IInvocation invocation)
        {
            var roleClaims = _httpContextAccessor.HttpContext.User.ClaimRoles();
            foreach (var role in _roles)
            {
                if (roleClaims.Contains(role))
                {
                    return;
                }
            }
            throw new Exception(Messages.AuthorizationDenied);
        }
    }
}
