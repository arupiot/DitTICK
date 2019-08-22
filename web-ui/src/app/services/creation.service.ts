import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreationService {

  constructor(
    private http: HttpClient,
  ) { }

  createPolicy() {
    const data = {
        "entries": {
            "owner": {
                "subjects": {
                    "nginx:ditto": {
                        "type": "nginx basic auth user"
                    }
                },
                "resources": {
                    "thing:/": {
                        "grant": [
                            "READ","WRITE"
                        ],
                        "revoke": []
                    },
                    "policy:/": {
                        "grant": [
                            "READ","WRITE"
                        ],
                        "revoke": []
                    },
                    "message:/": {
                        "grant": [
                            "READ","WRITE"
                        ],
                        "revoke": []
                    }
                }
            }
        }
    }

    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('ditto:ditto'),      
    }

    const options = {
      headers: new HttpHeaders(headerDict),
    }

    const url = 'http://localhost:8080/api/2/policies/arup.eight.fitzroy:policy'

    return this.http.put(url,data,options);
  }

  createConnection() {
        const url = 'http://localhost:8080/devops/piggyback/connectivity';

        const data = {
            "targetActorSelection": "/system/sharding/connection",
            "headers": {
                "aggregate": false
            },        
            "piggybackCommand": {
                "type": "connectivity.commands:createConnection",
                "connection": {
                    "id": "mqtt-udmiduino-0",
                    "connectionType": "mqtt",
                    "connectionStatus": "open",
                    "failoverEnabled": true,
                    "uri": "tcp://10.18.32.213:1883",
                   "sources": [
                        {
                        "addresses": [
                            "arup-8-fitzroy-street/UDMIduino-000/events"
                        ],
                        "authorizationContext": ["nginx:ditto"],
                        "qos": 0,
                        "filters": []
                        }
                    ],
                    "targets": [{
                        "address": "arup-8-fitzroy-street/UDMIduino-000/lum-value",
                        "authorizationContext": ["nginx:ditto"],
                        "topics": [
                        "_/_/things/twin/events",
                        "_/_/things/live/messages"
                        ],
                        "qos": 0
                    }],
                    "mappingContext": {
                        "mappingEngine": "JavaScript",
                        "options": {
                            "incomingScript": "function mapToDittoProtocolMsg(headers, textPayload, bytePayload, contentType) {     const thingId = `UDMIduino-000`;     const jsonString = String.fromCharCode.apply(null, new Uint8Array(bytePayload));     const jsonData = JSON.parse(jsonString);     const value = {         udmi: {             properties: {                 version: 1,                 timestamp: 0,                 points: {                     lux_level: {                         present_value: jsonData.points.lux_level.present_value                     },                     lum_value: {                         present_value: jsonData.points.lum_value.present_value                     },                     dimmer_value: {                         present_value: jsonData.points.dimmer_value.present_value                     }                 }             }         }     };      return Ditto.buildDittoProtocolMsg(         `arup.eight.fitzroy`,         thingId,         `things`,         `twin`,         `commands`,         `modify`,         `/features`,         headers,         value     ); }"
                        }
                    }
                }
            }        
        }

        const headerDict = {
            'Authorization': 'Basic ' + btoa('devops:foobar'),
        }

        const options = {
            headers: new HttpHeaders(headerDict),
        }

        return this.http.post(url,data,options);
    }

    createThing() {
        const url = 'http://localhost:8080/api/2/things/arup.eight.fitzroy:UDMIduino-000';

        const data = {
            "policyId": "arup.eight.fitzroy:policy",
            "attributes": {
                "manufacturer": "SmokeAndMirrors Co.",
                "VIN": "101666"
            },
            "features": {
                "udmi": {
                    "properties": {
                        "version": 1,
                        "timestamp": "0",
                        "points": {
                            "lux_level": {
                                "present_value": 0
                            },
                            "lum_value": {
                                "present_value": 0
                            },
                            "dimmer_value": {
                                "present_value": 0
                            }
                        }
                    }
                }
            }
        }

        const headerDict = {
            'Authorization': 'Basic ' + btoa('ditto:ditto'),
        }

        const options = {
            headers: new HttpHeaders(headerDict),
        }

        return this.http.put(url,data,options);
    }
}
