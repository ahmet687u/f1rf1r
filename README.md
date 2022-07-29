# F1RF1R

Fırfır bildirim mesajları ve popuplar oluşturmanızı sağlayan bir kütüphanedir.


## Başlangıç

```
import 'f1rf1r/dist/css/fırfır.min.css'
```
İlk önce css dosyasını import etmeliyiz

```
import f1rf1r from 'f1rf1r'
const fırfır = new f1rf1r.F1rf1r()

fırfır.init()
```

Ardından init fonksiyonunu yukarıdaki gibi çağırmalıyız.

## Varsayılan değerler

### Bildirim İçin
```
fırfır.notificationSettings = {
  duration: 8000
}
```
Yukarıdaki kodda bildirim mesajları için default bir ayarlama yaptık yani gösterilecek olan her bildirim mesajı için bir **duration** ayarı belirlenmezse 8000ms ekranda kalacaktır. Özellikleri:

* ***duration***: Ms cinsinden değer girilir. Mesajların ekranda ne kadar süre kalacağını belirler
* ***delay***: Mesajların ekrana ne kadarlık bir gecikmeyle çıkacağını belirler. Örnek olarak birden fazla mesajı döngü ile ekrana basacaksak tüm mesajlara farklı delaylar verip mesajların ekrana farklı sürelerde çıkmasını sağlayabiliriz 
* ***animate***: Mesajların hangi animasyonla ekranda çıkacağını belirler. 2 özelliği vardır. Bunlar: <br />
***name***: Animasyonun tipini belirler **show** ya da **fadeIn** değerlerini alabilir <br />
***speed***: Seçili olan animasyonun ne kadarlık bir hızda gerçekleşeceğini belirler

### Modal İçin
```
fırfır.modalSettings = {
  header: "Default Fırfır Header",
  buttons: {
    error: {
      text: "default cancel btn",
      func: () => console.log("default error btn")
    },
    success: {
      text: "default success btn",
      func: () => console.log("default success btn")
    },
  },
  msg: "sadasd",
  inputs: [
    {
      label: "Default input",
      placeholder: "default input"
    }
  ]
}
```
Alabileceği özellikler örnekte gösterilmiştir.

## (Notification) Kullanımı
![Resim Yüklenemedi](https://github.com/ahmet687u/f1rf1r/blob/main/git-images/notification.gif)
```
import f1rf1r from 'f1rf1r'
const alert = new f1rf1r.Notification()
```
Önce bu şekilde tanımlamalıyız. Özellikleri:

* ***positions***: Mesajların ekrandaki konumu belirlemek için kullanılır "bottom-right", "bottom-left", "top-right" ya da "top-left" değerlerini alabilir. Mesajlar varsayılan olarak ekranın sağ alt kısmında görülürler
```
alert.positions = "bottom-left"
```

Success, info, warning ve error fonksiyonları iki parametre alır ilki ekranda gösterilecek olan mesaj, ikincisi ise gösterilecek olan mesajın ayarları belirler. İkinci parametreyi tanımlamak zorunlu değildir. İkinci parametrede olabilecekler:

* ***duration***: Ms cinsinden değer girilir. Mesajların ekranda ne kadar süre kalacağını belirler
* ***delay***: Mesajların ekrana ne kadarlık bir gecikmeyle çıkacağını belirler. Örnek olarak birden fazla mesajı döngü ile ekrana basacaksak tüm mesajlara farklı delaylar verip mesajların ekrana farklı sürelerde çıkmasını sağlayabiliriz 
* ***animate***: Mesajların hangi animasyonla ekranda çıkacağını belirler. 2 özelliği vardır. Bunlar: <br />
***name***: Animasyonun tipini belirler **show** ya da **fadeIn** değerlerini alabilir <br />
***speed***: Seçili olan animasyonun ne kadarlık bir hızda gerçekleşeceğini belirler

* ***success***: Başarılı mesajları için kullanılır
```
alert.success("App page rendering success")
```

* ***info***: İnfo mesajları için kullanılır
```
alert.info("App page rendering info", { delay: 0.1 })
```

* ***warning***: Warning (uyarı) mesajları için kullanılır
```
alert.warning("App page rendering warning", { duration: 5000 })
```

* ***error***: Hata mesajları için kullanılır
```
alert.error("Fırfır error message", { animate: { speed: 0.4, name: "fadeIn" } })
```

## (Popup) Kullanımı
![Resim Yüklenemedi](https://github.com/ahmet687u/f1rf1r/blob/main/git-images/modal.gif)
```
import f1rf1r from 'f1rf1r'
const modal = new f1rf1r.Modal()
```
Önce bu şekilde tanımlamalıyız. Özellikleri:

* ***data***: Form modaldaki inputların value değerlerini verir. Geri dönen değerler 
```
{
  [input.name]: input.value
}
```
şeklinde bir obje halinde döner. Eğer input için bir name değeri tanımlanmamışsa name değeri yerine random bir değer üretilir mesela:
```
{
  [randomdeğer]: input.value
}
```

* ***modal***: Default modallar göstermek için kullanılır
```
modal.modal({
  msg: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
  header: "Fırfır Header",
  buttons: {
    success: {
      text: "Okke",
      func: () => console.log("fırfır modal success function")
    },
    error: {
      text: "İptal et",
      func: () => alert.error("İşlem iptal edildi")
    }
  }
})
```

* ***formModal***: Form modalları göstermek için kullanılır
```
modal.formModal({
  header: "Form Gönder",
  inputs: [
    {
      label: "Kullanıcı Adı Giriniz",
      placeholder: "Kullanıcı adı giriniz",
      name: "username"
    },
    {
      label: "Email Giriniz",
      placeholder: "Mail giriniz",
      name: "mail"
    },
    {
      label: "Şifre giriniz",
      required: true,
      placeholder: "Şifre Giriniz",
      type: "password"
     }
  ],
  buttons: {
    success: {
      text: "Gönder",
      func: () => console.log(modal.data)
    },
  }
})
```
Modalın alabileceği özellikler
* ***header***: Açılan modalın başlık metnini belirler
* ***msg***: Default modalda gösterilecek olan metni belirler
* ***buttons***: Modallardaki butonların özelliklerini belirler. 2 tane özelliği vardır. Bunlar: <br />
success: Modaldaki olumlu butonunun özelliklerini belirler <br />
error: Modaldaki olumsuz butonunun özelliklerini belirler. İkisininde 2 tane özelliği vardır Bunlar: <br />
text: Butonun içindeki metni belirler
func: Butona tıklanınca çalışacak olan fonksiyon
* ***inputs***: Form modaldaki inputları belirler. biz dizi olarak tanımlanır. Dizideki her obje inputun özelliklerini belirler ve bu obje bir inputun alabileceği tüm değerleri alıri objedeki label ise inputun önündeki metnin ne olacağını belirler
