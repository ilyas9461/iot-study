
<h1 align="center">Socket io && Node JS && Vue3 Composition Api && Node MCU && PosgreSQL</h1>
<h1 align="center">Örnek IOT Çalışması</h1>

### Plush Toys Control Board 

<h4 align="left">İÇERİK</h4>

- [Giriş](#Giriş)
- [Çalışma Şekli](#Çalışma-Şekli)
- [Kullanılan Teknolojiler](#Kullanılan-Teknolojiler)
- [İletişim](#İletişim)

## Giriş
<p  align="center">
<img src="img/pelus_ornek.jpg" alt="pelus" width="35%" height="35%" align="center" style="margin:10px">
</p>

Yapılan çalışmada hareketli peluş oyuncaklar için kontrol kartı yapılmıştır. Geliştirilen peluş oyuncaklar çocukların üzerine binerek gezinti yapabildiği ve RFID kart sistemi ile entgre çalışabilen oyuncaklardır. Ülkemize genelde Çin pazarından gelmektedir.
<br><br> 

## Çalışma Şekli
RFID kart okuyucuya kart okutulduğunda oyuncak çalışmaya başlar. Oyuncak üzerinde gaz pedalı ve yön değiştirmek için anahtar bulunmaktadır. Çocuk gaz pedalına bastığı müddetçe oyuncak yön anahtarı konumuna  göre ileri veya geri yönlü hareket eder.

Kontrol kartı motorun hareketini "soft start" yaparak başlatır. Durma durumunda da "soft stop" yapılır. Kullanıcı ani hızlanma ve durmadan etkilenmez. Ayrıca ön tarafa konulan mesafe sensörü ile de önüne bir engel geldiğinde "soft stop" ile durur.

Kontrol kartı akünün gerilim ve akımını anlık okuyarak şarj durumunu ve aşırı akım durumunu kontrol eder. Akünün şarja ihtiyacı varsa sesli uyarı verir. Aşırı akım durumunda ise sistemi ani olarak durdurulur.

<p float="center">
<img src="img/bts7960B_pin_mantik2.png" alt="pelus" width="300" style="margin-left:10px">
<img src="img/acs711ex-akim-sensoru-.jpg" alt="pelus" width="300"   style="margin-left:40px">

</p>


Motor sürücü olarak BTS7960 modül kullanılmıştır. Akım ölçmede ise ACS711EX akım sensörü kullanılmıştır.

Yazılımda akım ve gerilim ölçmek için hareketli ortalama kullanılmıştır. Ana denetleyicimiz demo aşamasında Arduino Nano'dur. Oyun alanında yapılan denemelerden sonra bütün sistem tek bir kart üzerinde toplanacaktır. Burada ihtiyaca göre farklı denetleyici seçilebilir.

<p  align="center">
<img src="img/bos_mekanik.jpg" alt="pelus" width="30%" height="25%" align="center" style="margin:10px">
<img src="img/kutu.jpg" alt="pelus" width="30%" height="25%" align="center" style="margin:10px">
<p align="center">
Resim: Boş mekanik aksam ve kontrol kartı kutusu.
</p>

</p>

Mekanik yapıya kontrol sistemi entegre edilerek testler yapılmıştır. Kullanıdığımız motorlarda, mekanik frenleme olmadığından dolayı oyuncağın durması sırasında hareket biraz daha devam etmiştir. Yazılımsal olarak motor sürücüsü üzerinden frenleme yaptırılmıştır.

Testlerle ilgili video görüntüleri linkleri aşağıda verilmiştir.

## Kullanılan Teknolojiler

```bash
- Arduino Nano.
- Arduino programlama.
- Motor sürücüler.
- PWM.
- mp3 player.

```

###  Masa üstü testi çalışma videosu :

<a href="https://youtu.be/92c82Suxs3E" target="_blank">
     <img src="https://camo.githubusercontent.com/241d4106ff5edca2ee25e04dcf4546fad9d20b626f7a10990307e8f83e95459f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f796f75747562652d2532334646303030302e7376673f267374796c653d666f722d7468652d6261646765266c6f676f3d796f7574756265266c6f676f436f6c6f723d7768697465253232" alt="youtube">
</a>

### Meknaik yapıya kurulu şekilde yapılan test videosu :

<a href="https://youtu.be/wljWACHbzdw" target="_blank">
     <img src="https://camo.githubusercontent.com/241d4106ff5edca2ee25e04dcf4546fad9d20b626f7a10990307e8f83e95459f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f796f75747562652d2532334646303030302e7376673f267374796c653d666f722d7468652d6261646765266c6f676f3d796f7574756265266c6f676f436f6c6f723d7768697465253232" alt="youtube">
</a>

## İletişim

- GitHub [@your-ilyas9461](https://github.com/ilyas9461)
- Linkedin [@your-linkedin](https://www.linkedin.com/in/ilyas-yagcioglu/)
