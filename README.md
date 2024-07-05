
<h1 align="center">Socket io & Node JS & Vue3 Composition Api & Node MCU & PosgreSQL</h1>
<h1 align="center">Sample IOT Study</h1>


<h4 align="left">CONTENTS</h4>

- [Introduction](#Introduction)
- [How does it work?](#How-does-it-work?)
- [Used technologies](#Used-technologies)


## Giriş
<p  align="center">
<img src="img/iot.jpg" alt="pelus" width="35%" height="35%" align="center" style="margin:10px">
</p>
 
In this study, an IoT( <a href="https://en.wikipedia.org/wiki/Internet_of_things" target="_blank">Internet of Things</a>) structure was designed for testing purposes.

In the hardware section;
 
- Node MCU ESP-12E
- DHT11 humidity and temperature sensor
- Infrared proximity sensor
- 10K pot
- 12V relay module
- Leds

<p  align="center">
<img src="img/iot_donanim.jpg" alt="pelus" width="400" style="margin-left:10px">
</p>

In the server section;

- Node js Express
- Socket-io ver 4

On the client side;

- Vue3 Composition Api

## How does it work?
While the hardware sends the information it receives from the sensors to the server by adding appropriate event names and data at certain periods, it sends the information as soon as it receives a signal from the proximity sensor. A data set consisting of randomly generated values ​​is also created and sent at certain intervals.

It is ensured that the hardware and the client (frontend) join the same room. The server acts as a bridge between the two. Thanks to Socket io's two-way communication feature, event-based data sent by the client and hardware can be evaluated instantly.

There were problems with "cors" when running locally. Necessary additions and edits have been made to the code on the server and client sides.

Data about users and sensor data was written to the PostgreSql database and this data was retrieved and displayed by the client. Thus, database requests from the client were also realized with socket io.

### Test Studies
The tests were made with a local server and a GSM company's wifi modem called superbox. Results may not be similar across different modem models, especially regarding distance.

### 1- Connection Distance
The hardware was connected to the 12V battery, and the connection status was observed by visiting every point and garden, including the sub-points, in two production workshops of approximately 900 square meters, whose areas were divided by walls and columns.

It has been observed that the connection is not broken in this area.

Later, when she went out and moved away from the building, it was seen that the connection was lost approximately 50 meters away.

During the field study, it was concluded that communication was achieved at every point where the mobile phone saw the wireless modem. (Attention, it may vary depending on the mobile phone model.)

### 2- Data Sending Speed
An attempt was made to determine the status of the data to be sent to the Socket io connection within the minimum time interval. Our aim here is to determine the minimum time between two data and whether there is any loss when saving this data or sending it to the database.

For this purpose, the software in the Node MCU was edited and a constant named TESTING was created and the system was taken to the testing phase. The infrared proximity sensor code structure was arranged according to the test and the data was sent by triggering the sensor. The data structure is as follows;
<p  align="center">
<img src="img/test_veri_yapisi.png" alt="pelus" width="300" style="margin-left:10px">
</p>

Missing data checking is enabled by adding timestamp and sample data count. When the sensor is triggered, Node MCU converts this data to JSON format and sends it. Latencies are the delay of functions that perform operations.

The device was reset and the sensor was triggered for 30 seconds. The results obtained are as follows:

<p  align="center">
<img src="img/test_db_ms1.png" alt="pelus" width="400" style="margin-left:10px">
<img src="img/test_db_ms2.png" alt="pelus" width="400" style="margin-left:10px">
</p>

- Number of rows written to the database:6162
- Last data timestamp: 84961 mS
- first data timestamp: 56434 mS

- According to this :(81063-49767)/6162  =4.629 mS 

Upon examination, it was seen that all of the data was written to the database without skipping any order.

### Some Screenshots
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

## Used technologies

```bash
- NOde MCU ESP-12E.
- Node js, Expres, socket io ...
- Vue3 Composition APi
- PostgreSQL

```

###  Sample working video :

<a href="https://youtu.be/AQEl6YUnvLM" target="_blank">
     <img src="./img/youtube.png" alt="youtube" wiedth="55">
</a>



- GitHub [@your-ilyas9461](https://github.com/ilyas9461)
- Linkedin [@your-linkedin](https://www.linkedin.com/in/ilyas-yagcioglu/)
