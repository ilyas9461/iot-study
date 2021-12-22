/*
   WebSocketClientSocketIO.ino
   Node mcu ( ESP-12E ) communication with Socket-io node.js server.
   Event-based requests made by the client over socket-io are answered by the nodemcu.
   Some sensor information and random data are sent to the client in real time and
   displayed on the frontend.
   18.12.2021 ilyas9461
   github.com/ilyas9461
*/
#include <Arduino.h>
#include <LiquidCrystal_I2C.h>
#include <Wire.h>

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#include <ArduinoJson.h>

#include <SocketIOclient.h>
#include <WebSocketsClient.h>

#include "DHT.h"
#include <Hash.h>

#include "WebSocketClientSocketIO.h"

ESP8266WiFiMulti WiFiMulti;
SocketIOclient socketIO;

LiquidCrystal_I2C lcd(0x27, 16, 2);
DHT dht;

int anSensorValue = 0;

bool LED1status = LOW;
bool LED2status = LOW;
bool isGetSocketId = false;
bool isInfraredDataSend = false;

int deviceId = 62164;
String socketId = "";

unsigned long messageTimestamp = 0;
unsigned long dhtMeasurementTime = 0;
unsigned long anSensMeasurementTime = 0;
unsigned long tagDataTime = 0;

float humidity = 0.0;
float temperature = 0.0;

void setup()
{
  USE_SERIAL.begin(115200);
  
  initializePins();

  Wire.begin(2, 0); // gpio 2 and gpio 0 which are D4, and D3
  lcd.init();       // Init the LCD
  lcd.backlight();  // Activate backlight
  lcd.home();
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Socketio example");
  lcd.setCursor(0, 1);
  lcd.print("ilyas9461-->WiFi");

  dht.setup(D1); /* D1 is used for data communication with dht11 */

  USE_SERIAL.setDebugOutput(true);

  USE_SERIAL.println();
  USE_SERIAL.println();
  USE_SERIAL.println();

  for (uint8_t t = 4; t > 0; t--)
  {
    USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
    USE_SERIAL.flush();
    delay(1000);
  }
  // disable AP
  if (WiFi.getMode() & WIFI_AP)
  {
    WiFi.softAPdisconnect(true);
  }
  WiFiMulti.addAP(SSID, PASSWORD);
  // WiFi.disconnect();
  while (WiFiMulti.run() != WL_CONNECTED)
  {
    USE_SERIAL.print(".");
    delay(100);
  }
  String ip = WiFi.localIP().toString();
  USE_SERIAL.printf("[SETUP] WiFi Connected %s\n", ip.c_str());

  socketIO.begin(SOCKET_SERVER_IP, SOCKET_PORT, SOCKET_VER_URL_EIO); // server address, port and URL

  socketIO.onEvent(socketIOEvent); // event handler for socket io

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("WiFi Connected");
  lcd.setCursor(0, 1);
  lcd.print(ip.c_str());
  dhtMeasurementTime = anSensMeasurementTime = messageTimestamp = tagDataTime=millis();
} // setup

void loop()
{
  socketIO.loop();

  uint64_t now = millis();

  if ((unsigned long)now - dhtMeasurementTime > 6000Lu)
  {
    //  delay(dht.getMinimumSamplingPeriod()); /* Delay of amount equal to sampling period */  1000:2000 mS
    humidity = dht.getHumidity();       /* Get humidity value */
    temperature = dht.getTemperature(); /* Get temperature value */

    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Temp  Humidity");
    lcd.setCursor(0, 1);
    lcd.print(String(temperature) + " C - %" + String(humidity));

    sendServerTempHumidityData(temperature, humidity);
    dhtMeasurementTime = now;
  }

  if ((unsigned long)now - anSensMeasurementTime > 4250)
  {
    anSensorValue = analogRead(ANALOGUE_SENS_PIN);
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Analogue Value :");
    lcd.setCursor(0, 1);
    lcd.print(String(anSensorValue));

    sendServerANValueData(anSensorValue);
    anSensMeasurementTime = now;
  }

  if ((unsigned long)now - messageTimestamp > 10000Lu)
  {
    sendServerTimeData(now);
    messageTimestamp = now; // reinitiliaze time stamp
  }

  if((unsigned)now-tagDataTime>7000Lu){
    sendServerTagData();
    tagDataTime=now;
  }

  if (!digitalRead(INFRARED_SENS_PIN))
  {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("INFRARED sens.");
    lcd.setCursor(0, 1);
    lcd.print("Object detected!");

    if (!isInfraredDataSend) {
      sendServerInfraredSensData(true);
      isInfraredDataSend = true;
    }
    delay(100);

  } else {
    if (isInfraredDataSend) {
      sendServerInfraredSensData(false);
      isInfraredDataSend = false;
    }
  }

} // loop

void socketIOEvent(socketIOmessageType_t type, uint8_t *payload, size_t length)
{
  switch (type)
  {
    case sIOtype_DISCONNECT:
      USE_SERIAL.printf("[IOc] Disconnected!\n");
      ledConnOff();
      isGetSocketId = false;
      break;
    case sIOtype_CONNECT:
      USE_SERIAL.printf("[IOc] Connected to url: %s\n", payload); //[IOc] Connected to url: /socket.io/?EIO=4
      // join default namespace (no auto join in Socket.IO V3)
      socketIO.send(sIOtype_CONNECT, "/"); // main room
      ledConnOn();
      break;
    case sIOtype_EVENT:                                    // is event receive
      USE_SERIAL.printf("[IOc] get event: %s\n", payload); // socketById.emit("socket-id", socket.id) --> ["socket-id","go52jjEsej3TpULMAAAB"]
      // String socketId=parsePayload(payload,false);  //get data
      if (!isGetSocketId)            // if device socket id has'nt.
        sendServerJoinData(payload); //  join the socket-io server room  with socket id and device id.
        
      eventDataOperations(payload);
      break;
    case sIOtype_ACK:
      USE_SERIAL.printf("[IOc] get ack: %u\n", length);
      hexdump(payload, length);
      break;
    case sIOtype_ERROR:
      USE_SERIAL.printf("[IOc] get error: %u\n", length);
      hexdump(payload, length);
      break;
    case sIOtype_BINARY_EVENT:
      USE_SERIAL.printf("[IOc] get binary: %u\n", length);
      hexdump(payload, length);
      break;
    case sIOtype_BINARY_ACK:
      USE_SERIAL.printf("[IOc] get binary ack: %u\n", length);
      hexdump(payload, length);
      break;
  }
}

String parsePayload(uint8_t *payload, bool isEventNameData)
{
  /*nodejs :                                      node mcu:
    socketById.emit("socket-id", socket.id) --> ["socket-id","go52jjEsej3TpULMAAAB"] : this is comple string
                     event name, id               event name, id
  */
  char bufStr[MAX_STRING_LEN];
  sprintf(bufStr, "%s", payload);

  String strEventName = splitStr(bufStr, ",", 1);
  String strEventData = splitStr(bufStr, ",", 2);

  strEventName.replace("[", "");
  strEventName.replace("\"", "");

  strEventData.replace("\"", "");
  strEventData.replace("]", "");
  Serial.println(strEventName);
  Serial.println(strEventData);

  if (isEventNameData)
    return strEventName;
  else
    return strEventData;
}

void eventDataOperations(uint8_t *payload) {
  
  String eventName = parsePayload(payload, true);
  String eventData = parsePayload(payload, false);

  if(eventName=="led1-on"){
    led1On();
  }
  if(eventName=="led1-off"){
    led1Off();
  }
  if(eventName=="led2-on"){
    led2On();
  }
  if(eventName=="led2-off"){
    led2Off();
  }
  if(eventName=="relay1"){
    relay1On();
    delay(1500);
    relay1Off();
  }
  if(eventName=="relay2"){
    relay2On();
    delay(1500);
    relay2Off();
  }
   if(eventName=="temp-humidty"){
    sendServerTempHumidityData(temperature,humidity);
  }

   USE_SERIAL.println(eventName+","+eventData);
}

void sendServerJoinData(uint8_t *payload)
{
  socketId = parsePayload(payload, false);
  DynamicJsonDocument doc(1024);
  JsonArray array = doc.to<JsonArray>();

  array.add("login-user");  // Hint: socket.on('event_name', ....  "login-user"
  JsonObject object = array.createNestedObject();
  // add payload (parameters) for the event
  object["login_user"] = "NODE-MCU";
  object["login_device_id"] = deviceId;
  object["socket_id"] = socketId;

  /* nodejs side :
      {
       login_device_id: 62164,
       socket_id: 'tEWadhNqiPGmlXnsAAAD',
       login_user: 'NODE-MCU'
     }
  */
  String output;
  serializeJson(doc, output);
  if (socketIO.isConnected())
  {
    socketIO.sendEVENT(output); // Send event;
    isGetSocketId = true;
  }
  // Print JSON for debugging  example print :
  USE_SERIAL.println(output); // ["login-user",{login_device_id: 62164,
}

void sendServerTempHumidityData(float temp, float hum)
{
  DynamicJsonDocument doc(1024);
  JsonArray array = doc.to<JsonArray>();

  array.add("temp-humidity");  // Hint: socket.on('event_name', ....  "login-user"
  JsonObject object = array.createNestedObject();
  // add payload (parameters) for the event
  object["login_user"] = "NODE-MCU";
  object["login_device_id"] = deviceId;
  object["socket_id"] = socketId;
  object["temperature"] = temp;
  object["humidity"] = hum;

  /* nodejs side :
      login_user: 'NODE-MCU',
      login_device_id: 62164,
      socket_id: 'aY63NW_XIe0JaQUnAAAB',
      temperature: 17,
      humidity: 33
  */
  String output;
  serializeJson(doc, output);
  if (socketIO.isConnected())
  {
    socketIO.sendEVENT(output); // Send event;
    isGetSocketId = true;
  }
  // Print JSON for debugging  example print :
  USE_SERIAL.println(output); // ["login-user",{login_device_id: 62164,
}

void sendServerTimeData(uint64_t nowMillis)
{
  // creat JSON message for Socket.IO (event)
  DynamicJsonDocument doc(1024);
  JsonArray array = doc.to<JsonArray>();
  array.add("time_stamp"); // add event name , Hint: socket.on('event_name', ....

  JsonObject objectParam = array.createNestedObject();
  // add payload (parameters) for the event
  objectParam["device_id"] = deviceId;
  objectParam["user_name"] = "NODE-MCU";
  objectParam["now"] = (uint32_t)nowMillis;

  // JSON to String (serializion)
  String output;
  serializeJson(doc, output);

  if (socketIO.isConnected())
  {
    // Send event
    socketIO.sendEVENT(output); //["event_name",{"now":3073468}]
  }
  // Print JSON for debugging
  USE_SERIAL.println(output);
}

void sendServerANValueData(int anValue)
{
  DynamicJsonDocument doc(1024);
  JsonArray array = doc.to<JsonArray>();

  array.add("analogue-value");  // Hint: socket.on('event_name', ....  "login-user"
  JsonObject object = array.createNestedObject();
  // add payload (parameters) for the event
  object["login_user"] = "NODE-MCU";
  object["login_device_id"] = deviceId;
  object["socket_id"] = socketId;
  object["analogue_value"] = anValue;

  /* nodejs side :
      login_user: 'NODE-MCU',
      login_device_id: 62164,
      socket_id: 'aY63NW_XIe0JaQUnAAAB',
      temperature: 17,
      humidity: 33
  */
  String output;
  serializeJson(doc, output);
  if (socketIO.isConnected())
  {
    socketIO.sendEVENT(output); // Send event;
    isGetSocketId = true;
  }
  // Print JSON for debugging  example print :
  USE_SERIAL.println(output); // ["login-user",{login_device_id: 62164,
}

void sendServerInfraredSensData(bool data)
{
  DynamicJsonDocument doc(1024);
  JsonArray array = doc.to<JsonArray>();

  array.add("infrared-value");  // Hint: socket.on('event_name', ....  "login-user"
  JsonObject object = array.createNestedObject();
  // add payload (parameters) for the event
  object["login_user"] = "NODE-MCU";
  object["login_device_id"] = deviceId;
  object["socket_id"] = socketId;
  if (data)
    object["sensor_value"] = "ON-Object Detected";
  else
    object["sensor_value"] = "OFF";


  /* nodejs side :
      login_user: 'NODE-MCU',
      login_device_id: 62164,
      socket_id: 'aY63NW_XIe0JaQUnAAAB',
      temperature: 17,
      humidity: 33
  */
  String output;
  serializeJson(doc, output);
  if (socketIO.isConnected())
  {
    socketIO.sendEVENT(output); // Send event;
    isGetSocketId = true;
  }
  // Print JSON for debugging  example print :
  USE_SERIAL.println(output); // ["login-user",{login_device_id: 62164,
}

void sendServerTagData()
{
  String tagId="";
  String tagRemain="";

  for(int i=0; i<5;i++){
    int rnd=random(10, 255);
    String str=String(rnd,HEX);
    str.toUpperCase();
    tagId+=str+" ";
  }
  tagId.remove(tagId.length()-1);
  //  tagId.toUpperCase();
  
  tagRemain=String(random(10, 255));
  
  DynamicJsonDocument doc(1024);
  JsonArray array = doc.to<JsonArray>();

  array.add("tag-data");  // Hint: socket.on('event_name', ....  "login-user"
  JsonObject object = array.createNestedObject();
  // add payload (parameters) for the event
  object["login_user"] = "NODE-MCU";
  object["login_device_id"] = deviceId;
  object["socket_id"] = socketId;
  object["tag_id"] = tagId;
  object["tag_remain"] =tagRemain;

  /* nodejs side :
      login_user: 'NODE-MCU',
      login_device_id: 62164,
      socket_id: 'aY63NW_XIe0JaQUnAAAB',
      temperature: 17,
      humidity: 33
  */
  String output;
  serializeJson(doc, output);
  if (socketIO.isConnected())
  {
    socketIO.sendEVENT(output); // Send event;
  }
  // Print JSON for debugging  example print :
  USE_SERIAL.println(output); // ["login-user",{login_device_id: 62164,
}

// index=segment_number, 1 start point.
char *splitStr(char *input_string, char *separator, int segment_number)
{
  char *act, *sub, *ptr;
  static char copy[MAX_STRING_LEN];
  int i;
  strcpy(copy, input_string);
  for (i = 1, act = copy; i <= segment_number; i++, act = NULL)
  {
    sub = strtok_r(act, separator, &ptr);
    if (sub == NULL)
      break;
  }
  return sub;
}
