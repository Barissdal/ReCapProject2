using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;
using Entities.Concrete;

namespace Business.Constants
{
    public static class Messages
    {
        public static string MaintenanceTime = "Sistem bakımda.";

        public static string CarAdded = "Araba eklendi.";
        public static string CarNameInValid = "Araba ismi geçersiz.";
        public static string CarsListed = "Arabalar listelendi.";
        public static string CarDeleted = "Araba silindi.";
        public static string CarUpdated = "Araba güncellendi.";

        public static string BrandsListed = "Markalar listelendi.";
        public static string BrandAdded = "Marka eklendi.";
        public static string BrandNameInValid = "Marka ismi geçersiz.";
        public static string BrandDeleted = "Marka silindi.";
        public static string BrandUpdated ="Marka güncellendi.";

        public static string CustomerUserIdNull = "Müşteri kullanıcı numarası giriniz.";
        public static string CustomerAdded = "Müşteri eklendi.";
        public static string CustomerNotAdded = "Müşteri eklenemedi.";
        public static string CustomerDeleted = "Müşteri silindi.";
        public static string CustomersListed = "Müşteriler listelendi.";
        public static string CustomerUpdated = "Müşteri güncellendi.";

        public static string RentalNotAdded = "Kiralama eklenemedi.";
        public static string RentalAdd = "Kiralama eklendi.";
        public static string CarLeased = "Araba kiralanmış.";
        public static string CarRentable = "Araba kiralanabilir.";
        public static string RentalDeleted = "Kiralama silindi.";
        public static string RentalListed = "Kiralamalar listelendi.";
        public static string RentalUpdated = "Kiralama güncellendi.";

        public static string ColorAdded = "Resim eklendi.";
        public static string ColorNameInValid = "Resim ismi geçersiz.";
        public static string ColorDeleted = "Resim silindi.";
        public static string ColorUpdated = "Resim güncellendi.";
        public static string ColorsListed = "Resimler listelendi.";
        public static string CarCountOfBrandError = "Bir markada 10'dan fazla araba olamaz.";
        public static string CarImageAdded = "Araba resmi eklendi.";
        public static string CarImageUpdated = "Araba resmi güncellendi.";
        public static string CarImageLimitExceded = "Her arabanın en fazla 5 adet resmi olabilir.";
        public static string CarImageDeleted = "Araba resmi silindi.";
        public static string CarImageLimitExceeded = "Her arabanın en fazla 5 adet resmi olabilir.";

        public static string UserNotFound = "Kullanıcı bulunamadı";
        public static string PasswordError = "Şifre hatalı";
        public static string SuccessfulLogin = "Sisteme giriş başarılı";
        public static string UserAlreadyExists = "Bu kullanıcı zaten mevcut";
        public static string UserRegistered = "Kullanıcı başarıyla kaydedildi";
        public static string AccessTokenCreated = "Access token başarıyla oluşturuldu";

        public static string AuthorizationDenied = "Yetkiniz yok";
        public static string LoginSuccess = "Login başarılı.";
    }
}
