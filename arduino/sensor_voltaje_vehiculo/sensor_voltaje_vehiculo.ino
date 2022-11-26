
#include <WiFiClient.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>
#include <WiFiClientSecure.h>
#include <ESP8266HTTPClient.h>

//Conexion a red WiFi (2.4GHz)
char* networkName = "network (2.4GHz)";
char* networkPassword = "network password";

char* url = "https://projectoinegrador-s4-production.up.railway.app/datasensors/";
const int urlPort = 443;

//Para el sensor de voltaje
const int offset = 0;
int pinSucessRequest = D5;
int pinFailureRequest = D7;
int delayRequest = 3000;
 
int sensor = A0;
float vOut = 0.0;
float vIn = 0.0;
float R1 = 30000;
float R2 = 7500;

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

      //double voltage = map(readSensor, 0, 1023, 0, 2500);

      //voltage /= 100;

      //Serial.println(voltage);
      
      //Formula para calcular el voltaje
      vOut = (readSensor * 3.2) / 1023.0;
      //Serial.println(vOut);
      vIn = vOut / (R2 / (R1 + R2));
      vIn = vIn - offset;
      //Serial.println(vIn);
      httpDataPostRequest(vIn);

      lastTime = actualTime;
    }
  
  }
  
}

void httpDataPostRequest(float voltageValue) {
  //WiFiClient client;  
  WiFiClientSecure client;
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
  doc["ixa"] = 3;
  doc["rda_valor"] = roundingTempValue(voltageValue);
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
