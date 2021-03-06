using System;
using System.Collections.Generic;
using System.Text;
using Core.Entities.Concrete;
using FluentValidation;

namespace Business.ValidationRules.FluentValidation
{
    public class UserValidator : AbstractValidator<User>
    {
        public UserValidator()
        {
            RuleFor(u => u.Email).NotEmpty().NotNull().EmailAddress();
            RuleFor(u => u.FirstName).NotEmpty().NotNull().MinimumLength(2);
            RuleFor(u => u.LastName).NotEmpty().NotNull().MinimumLength(2);
        }
    }
}
