from flask import Flask, request
from flask_cors import CORS

from time import sleep
from serial import Serial
import paho.mqtt.client as mqtt

app = Flask(__name__)
CORS(app)

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        client.connected_flag = True  # set flag
        print("connected OK")
    else:
        print("Bad connection Returned code=", rc)

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, message):
    payload = str(message.payload.decode("utf-8"))
    print("message received " ,payload)
    print("message topic=",message.topic)
    print("message qos=",message.qos)
    print("message retain flag=",message.retain)

mqtt.Client.connected_flag = False
broker = "localhost"
client = mqtt.Client("WPitC Dummy Gateway")
client.on_connect = on_connect
client.on_message = on_message
client.loop_start()

print("Connecting to broker", broker)
client.connect(broker)

while not client.connected_flag:
    print("In wait loop")
    sleep(1)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/post', methods=['POST','GET'])
def post():
    data = request.form.get('name')
    print("data: " + str(data))
    return {"text": "post"}

@app.route('/subscribe',methods=['POST'])
def subscribe():
    print("Subscribing to LED toggle topic")
    client.subscribe("arup-8-fitzroy-street/UDMIduino-000/lum-value")

    return {"text": "subscribed"}

@app.route('/publish',methods=['POST'])
def publish():
    print("Publishing")

    ret = client.publish("arup-8-fitzroy-street/UDMIduino-000/events",'{"present_value":62}')

    print(ret)

    return {"text": "published"}