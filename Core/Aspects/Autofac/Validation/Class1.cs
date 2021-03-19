using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Castle.DynamicProxy;
using Core.CrossCuttingConcerns.Validation;
using Core.Interceptors;
using FluentValidation;

namespace Core.Aspects.Autofac.Validation
{
    public class ValidationAspect : MethodInterception
    {
        private Type _validatorType;
        public ValidationAspect(Type validatorType)
        {
            if (!typeof(IValidator).IsAssignableFrom(validatorType))
            {
                throw new System.Exception("Bu bir doğrulama sınıfı değil");
            }

            _validatorType = validatorType;
        }
        protected override void OnBefore(IInvocation invocation)
        {
            //MethodInterception daki OnBefore u override ediyoruz.
            //Burası reflaction'dır. Çalışma anında birşeyi çalıştırmamızı sağlar.
            //Activator.CreateInstance reflactor'dır ve çalışma anında ProductValidator'ı new le der
            var validator = (IValidator)Activator.CreateInstance(_validatorType);
            //ProductValidator'ın Base type ını bul AbstractValidator; bununda generik agrumanından ilkini bul
            var entityType = _validatorType.BaseType.GetGenericArguments()[0];
            //invocation=metot demektir.
            //Validatorun tipine eşit olan parametreyi bul demektir.
            var entities = invocation.Arguments.Where(t => t.GetType() == entityType);
            //Birden fazla parametre olabilir bunu döngüyle Validate et.
            foreach (var entity in entities)
            {
                ValidationTool.Validate(validator, entity);
            }
        }
    }
}
