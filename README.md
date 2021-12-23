
<h1 align="center">Socket io & Node JS & Vue3 Composition Api & Node MCU & PosgreSQL</h1>
<h1 align="center">Örnek IOT Çalışması</h1>


<h4 align="left">İÇERİK</h4>

- [Giriş](#Giriş)
- [Çalışma Şekli](#Çalışma-Şekli)
- [Kullanılan Teknolojiler](#Kullanılan-Teknolojiler)
- [İletişim](#İletişim)

## Giriş
<p  align="center">
<img src="img/iot.jpg" alt="pelus" width="35%" height="35%" align="center" style="margin:10px">
</p>
Bu çalışmada test amaçlı olark bir IOT yapısı kurgulanmıştır.
Donanım kısımında;


- Node MCU ESP-12E
- DHT11 nem ve sıcaklık sensörü
- Infrared yaklaşım sensörü
- 10K pot
- 12V röle modülü
- Ledler

<p  align="center">
<img src="img/iot_donanim.jpg" alt="pelus" width="400" style="margin-left:10px">
</p>

Server kısmında ;

- Node js Express
- Socket io versiyon 4

İstemci kısmında 

- Vue3 Composition Api

## Çalışma Şekli
Donanım sensörlerden aldığı bilgileri belirli peryotlarla server kısmına uygun olay isimleri ve verilerini ekleyerek gönderirken, yaklaşım sensöründen sinyal geldiği anda gönderme işlemini gerçekleştirir. Random olarak oluışturulan değerlerden oluşan bir veri seti de kurgulanmış ve belirli süre aralıklarıyla gönderilmiştir.

Donanım ve istemcinin (frontend) aynı odaya katılması sağlanmıştır. Server ikisi arasında köprü görevi görür. Socket io 'nun iki yönlü iletişim özelliği sayesinde istemci ve donanım tarafından olay tabanlı olarak gönderilen veriler anında işlenebilmiştir.

Yerelde çalışırken "cors" ile ilgili problemler yaşanmıştır. Server ve istemci tarafında koda gerekli eklemeler ve düzenlemeler yapılmıştır.

PostgreSql veri tabanına kullanıcılarla ve sensör dataları ile ilgili veriler yazılmış ve istemci tarafından bu veriler çekilerek gösterilmiştir. Böylece socket io ile beraber istemiciden gelen veri tabanı istekleri de gerçekleştirilmiştir.

### Test Çalışmaları
Testler yerel server ve bir gsm firmasının superbox adı verilen wifi modemi ile yapılmıştır.
Farklı modem modellerinde özellikle mesafe ile ilgili sonuçlar benzer olmayabilir.

### 1- Bağlantı Mesafesi
Donanım 12V bir aküye bağlanarak yaklaşık 900 metre kare ve kare şeklinde iki katlı, alt ve üst katta duvarlarla bölünmüş alanların ve kolonların  bulunduğu bir üretim atölyesinde dip noktalar dahil her noktaya ve bahçeye gidilerek bağlantı durumu gözlenmiştir.

Bu alanda bağlantının kopmadığı görülmüştür.  

Sonrasında ise dışarıya çıkılarak binadan  uzaklşılmış yaklaşık 50m mesafede bağlantının koptuğu gözlenmiştir. 

Yapılan saha çalışmasında cep telefonunun kablosuz modemi gördüğü her noktada iletişimin sağlandığı sonucuna varılmıştır. 
(Dikkat, cep telefonu modeline göre de değişiklik olabilir.)

### 2- Veri Gönderme Hızı

Socket io bağlantısına gönderilecek verilerin minumum zaman aralığındaki durumu tespit edilmeye çalışılmıştır. Burada amacımız iki veri arasındaki minumum zaman  ve bu veriler veri tabanına kaydedilirken veya gönderilirken bir kayıp oluyor mu tespit etmektir.

Bunun için Node mcu içersindeki yazılım düzenlemiş ve TESTING isimli bir sabit oluşturularak sistem test aşamasına alınmıştır. Infrared yakınlık sensörü kod yapısı teste göre düzenlenerek sensörün tetiklenmmesi ile veriler gönderilmiştir.. Veri yapısı şu şekildedir ;

<p  align="center">
<img src="img/test_veri_yapisi.png" alt="pelus" width="300" style="margin-left:10px">
</p>

Zaman damgası ve örnek data sayısı da eklenerek kayıp veri kontrolü yapılması sağlanmıştır. Node mcu sensör tetiklendiğinde sadece bu veriyi json formatına çevirerek göndermektedir. Gecikmeler işlemleri gerçekleştiren  fonksiyonların gecikmesidir.

Cihaz resetlenerek 30 saniye süre ile sensör tetiklenmiştir. Elde edilen sonuçlar şu şekildedir :

<p  align="center">
<img src="img/test_db_ms1.png" alt="pelus" width="400" style="margin-left:10px">
<img src="img/test_db_ms2.png" alt="pelus" width="400" style="margin-left:10px">
</p>

- Veri tabanına yazılan satır sayısı :6162
- Son veri zaman damgası: 84961 mS
- ilk veri zaman damgası: 56434 mS

- Buna göre :(81063-49767)/6162  =4.629 mS 

Yapılan incelemede verilerin hepsinin sıra atlamadan veri tabanınada yazıldığı görülmüştür.

### Bazı Ekran Görüntüleri
<br>
<p  align="center">
<img src="img/istemci1.png" alt="pelus" width="425" style="margin-left:10px">
<img src="img/istemci.png" alt="pelus" width="400" style="margin-left:10px">
</p>
<br><br>
<p  align="center">
<img src="img/server_kod.png" alt="pelus" width="400" tyle="margin-left:10px">
<img src="img/vue3_kod.png" alt="pelus" width="400" style="margin-left:10px">
</p>

## Kullanılan Teknolojiler

```bash
- NOde MCU ESP-12E.
- Node js, Expres, socket io ...
- Vue3 Composition APi
- PostgreSQL

```

###  Örnek çalışma videosu :

<a href="https://youtu.be/AQEl6YUnvLM" target="_blank">
     <img src="https://camo.githubusercontent.com/241d4106ff5edca2ee25e04dcf4546fad9d20b626f7a10990307e8f83e95459f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f796f75747562652d2532334646303030302e7376673f267374796c653d666f722d7468652d6261646765266c6f676f3d796f7574756265266c6f676f436f6c6f723d7768697465253232" alt="youtube">
</a>


## İletişim

- GitHub [@your-ilyas9461](https://github.com/ilyas9461)
- Linkedin [@your-linkedin](https://www.linkedin.com/in/ilyas-yagcioglu/)
