
#include <WiFiClient.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>
#include <WiFiClientSecure.h>
#include <ESP8266HTTPClient.h>

//Conexion a red WiFi (2.4GHz)
char* networkName = "Redmi Note 9";
char* networkPassword = "holacomoesta123";

char* url = "https://projectoinegrador-s4-production.up.railway.app/datasensors/";
const int urlPort = 443;

//Para el sensor de temperatura
const float lineRegulation = 0.01;
int pinSucessRequest = D4;
int pinFailureRequest = D5;
int delayRequest = 3000;
 
int sensor = A0;

//Para aplicar concurrencia
unsigned long lastTime = 0;
unsigned long actualTime = 0;
unsigned long waitTime = 5000;

WiFiServer server(80);

void setup() {
  pinMode(pinSucessRequest, OUTPUT);
  pinMode(pinFailureRequest, OUTPUT);

  Serial.begin(115200);
  Serial.println();

  //Conectando red WiFi
  WiFi.begin(networkName, networkPassword);
  
  Serial.println("Connecting");
  
  while (WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(1000);
  }

  Serial.println();

  Serial.print("Connected, IP address: ");
  Serial.println(WiFi.localIP());

  server.begin();
}

void loop() {
  
  actualTime = millis();

  if(actualTime - lastTime >= waitTime){
    //Verificamos si esta conectado a WiFi
    if(WiFi.status()== WL_CONNECTED) {
      int readSensor = analogRead(sensor);
      //Serial.println(readSensor);
     
      //Formula para calcular el voltaje y temperatura
      float voltage = readSensor * (3.2 / 1023.0);
      //Serial.println(voltage);
      float temperature = voltage / lineRegulation;
      //Serial.println(temperature);
      httpDataPostRequest(temperature);
      
      lastTime = actualTime;
    }
  
  }
  
}

void httpDataPostRequest(float temperatureValue) {
  WiFiClientSecure client;
  //WiFiClient client;  
  HTTPClient http;

  String jsonResult;
  int response;

  //Iniciamos la conexion con el servidor HTTPS
  client.setInsecure();
  client.connect(url, urlPort);
  
   //Iniciamos un cliente HTTP y su header
   http.begin(client, url);
   http.addHeader("Content-Type", "application/json");
  
   //Serializamos los valores obtenidos. Sensor de temperatura tiene id de 1 (puede cambiar)
   DynamicJsonDocument doc(1024);
   doc["ixa"] = 1;
   doc["rda_valor"] = roundingTempValue(temperatureValue);
   serializeJson(doc, jsonResult);
  
   Serial.println(jsonResult);
  
   //Se hace una peticion HTTP con el valor JSON
   response = http.POST(jsonResult);
  
   //Vemos si la respuesta es 200 
   if(response > 0){
     Serial.println("Status code: " + String(response));
      
     //Si es 200, entonces se enciende un led "success"
     digitalWrite(pinSucessRequest, HIGH);
     delay(delayRequest);
     digitalWrite(pinSucessRequest, LOW);
     delay(delayRequest);
      
     if(response == 200){
       String reponse = http.getString();
       Serial.println(response);
     }
   } else {
     Serial.println(response);
      
     //Caso contrario, entonces se enciende un led "failure"
     digitalWrite(pinFailureRequest, HIGH);
     delay(delayRequest);
     digitalWrite(pinFailureRequest, LOW);
     delay(delayRequest);
   }
  
   http.end();
  
}

//Funcion para redondear el valor obtenido en la temperatura
double roundingTempValue(double value) {
   return (int)(value * 100 + 0.5) / 100.0;
}
