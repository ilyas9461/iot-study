/* Some definitions and macros */

#define USE_SERIAL Serial  //Serial1

#define SSID  "...."         // Enter SSID here
#define PASSWORD "......"              //Enter Password here

//#define SSID  "Turknet"                     // Enter SSID here
//#define PASSWORD "143db8ed43"              //Enter Password here

#define SOCKET_SERVER_IP  "192.168.1.165" // 
#define SOCKET_PORT    3000
#define SOCKET_VER_URL_EIO "/socket.io/?EIO=4"  //
/*    EIO: the version of the protocol (currently, "4")
  These are query parameters that the socket.io client sends to the
  socket.io server as part of the initial connection request.
  EIO=4  is the version number of the engine.io sub-system in socket.io.
  If the server is not compatible with this version number,
  it will likely fail the attempt to connect.
*/

#define MAX_STRING_LEN 150

/* PINs*/
#define LED_CONNECT_PIN D0
#define LED1_PIN D2
#define LED2_PIN D6
#define INFRARED_SENS_PIN D5
#define ANALOGUE_SENS_PIN A0
#define RELAY1_PIN D7
#define RELAY2_PIN D8

/* Macros*/
#define initializePins() \
        pinMode(LED_CONNECT_PIN, OUTPUT);\
        pinMode(LED1_PIN, OUTPUT);\
        pinMode(LED2_PIN, OUTPUT);\
        pinMode(RELAY1_PIN, OUTPUT);\
        pinMode(RELAY2_PIN, OUTPUT);\
        pinMode(INFRARED_SENS_PIN, INPUT);\
        digitalWrite(LED_CONNECT_PIN, LOW);\
        digitalWrite(LED1_PIN, LOW);\
        digitalWrite(LED2_PIN, LOW);\
        digitalWrite(RELAY1_PIN, LOW);\
        digitalWrite(RELAY2_PIN, LOW)\

#define ledConnOn() digitalWrite(LED_CONNECT_PIN, HIGH)
#define ledConnOff() digitalWrite(LED_CONNECT_PIN, LOW)
#define led1On() digitalWrite(LED1_PIN, HIGH)
#define led1Off() digitalWrite(LED1_PIN, LOW)
#define led2On() digitalWrite(LED2_PIN, HIGH)
#define led2Off() digitalWrite(LED2_PIN, LOW)

#define relay1On() digitalWrite(RELAY1_PIN, HIGH)
#define relay1Off() digitalWrite(RELAY1_PIN, LOW)
#define relay2On() digitalWrite(RELAY2_PIN, HIGH)
#define relay2Off() digitalWrite(RELAY2_PIN, LOW)
