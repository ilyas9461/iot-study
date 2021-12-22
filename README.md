
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
Donanım sensörlerden aldığı bilgileri belirli peryotlarla server kısmına uygun olay isimleri ve verileri ekleyerek gönderirken, yaklaşım sensöründen sinyal geldiği anda gönderme işlemini gerçekleştirir.

Kurgulanan yapıda donanım ve istemci kısım aynı odaya kayıt edilmiştir. Server ikisi arasında köprü görevi görür. Socket io 'nun iki yönlü iletişim özelliği sayesinde istemci ve donanım tarafından olay tabanlı olarak gönderilen veriler anında işlenebilmiştir.

Yapılan saha çalışmasında cep telefonunun kablosuz modemi gördüğü her noktada iletişimin sağlandığı görülmüştür.

## Kullanılan Teknolojiler

```bash
- NOde MCU ESP-12E.
- Node js, Expres, socket io ...
- Vue3 Composition APi

```

###  Örnek çalışma videosu :

<a href="https://youtu.be/92c82Suxs3E" target="_blank">
     <img src="https://camo.githubusercontent.com/241d4106ff5edca2ee25e04dcf4546fad9d20b626f7a10990307e8f83e95459f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f796f75747562652d2532334646303030302e7376673f267374796c653d666f722d7468652d6261646765266c6f676f3d796f7574756265266c6f676f436f6c6f723d7768697465253232" alt="youtube">
</a>


## İletişim

- GitHub [@your-ilyas9461](https://github.com/ilyas9461)
- Linkedin [@your-linkedin](https://www.linkedin.com/in/ilyas-yagcioglu/)
