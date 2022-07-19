# F1RF1R

## İşlevi
Fırfır basit bir şekilde bildiriim mesajları ve modallar oluşturmanızı sağlayan bir javascript kütüphanesidir


## Kullanım
Eğer modül bazlı bir projede kullanıyorsanız ilk önce 

```
npm i f1rf1r
```
diyerek kütüphaneyi npm aracılığıyla yüklememiz gerek.

Ardından index js dosyasında cssi import etmek için aşağıdaki kodu eklemeniz gerekir

```
import 'f1rf1r/dist/css/fırfır.min.css'
```

```
import { Notification, Modal } from 'f1rf1r'
const fırfır = new Notification()
```
ardından bu şekilde import ederek fırfır 'ı kullanılabilir hale getirebilirsiniz 

<hr />

Eğer normal bir projede kullanıcaksanız

```
 const { Notification, Modal } = fırfır;
 const fırfır = new Modal()
```
diyerek f1rf1r metodlarına ulaşabilirsiniz

## Notification
``` 
fırfır.success("f1rf1r success mesajı deneme mesajı", {
  duration: 5000
});
```
``` 
fırfır.error("f1rf1r error mesajı deneme mesajı", {
  duration: 5000
});
```
Yukarıdaki kodda ***duration*** özelliği bildirimin ekranda (ms cinsinden) ne kadar süre kalacağını belirler.

```
for (let i = 0; i < 5; i++) {
  fırfır.success("f1rf1r success deneme bildirimi. f1rf1r success deneme bildirimi", {
    duration: 3000,
    delay: i * 0.1
  })
}
```
Eğer yukarıdaki gibi bir döngü içerisinde bildirim mesajlarını bastırmak istiyorsak bütün mesajların ekrana aynı anda gelmemesi için örnekte olduğu gibi delay özelliğini ekleyebiliriz

### Notification Konumu
Bildirimlerin ekrandaki konumunu değiştirebilirsiniz
```
fırfır.positions = "top-left"
```
Örnekte tüm bildirimler ekranın sol üstünde görünecektir

### Notification Varsayılanları
Her bildirime uygulanacak yapılandırma varsayılanlarını belirleyebilirsiniz.
```
fırfır.options = { duration: 60000 }
```

![Resim Yüklenemedi](https://github.com/ahmet687u/f1rf1r/blob/main/git-images/notification.gif)

## Modal
``` 
modal.defaultModal({
  msg: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat aliquam animi excepturi veritatis magnam repudiandae",
  header: {
    showHeader: true, //--- header kısmının görünüp görünmemesini belirliyoruz
    text: "MODAL HEADER FOR WEBPACK AND REACT" //--- header kısmında görülecek olan başlığı giriyoruz
  },
  buttons: {
    showButton: true, //--- button kısmı görünüp görünmemesini belirliyoruz
    success: () => console.log("success button callback function"), //--- evet butonuna basılınca çalışacak olan fonksiyon
    error: () => console.log("Error button callback function") //--- hayır butonuna basılınca çalışacak olan fonksiyon
  },
})
```
Yukarıdaki örnekte msg, header, ve buttons tanımlaması zorunludur. success ve error tanımlaması zorunlu değildir
![Resim Yüklenemedi](https://github.com/ahmet687u/f1rf1r/blob/main/git-images/modal.png)
