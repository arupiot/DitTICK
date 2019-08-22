import { Component, OnDestroy } from '@angular/core';

import { CreationService } from './services/creation.service';

import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'web-ui';

  private subscription: Subscription;
  public message: string;

  constructor(
    private creationService: CreationService,
    // private _mqttService: MqttService,
  ) { }

  start(): void {
    console.log("starting");
    this.creationService.createPolicy()
    .subscribe(res => {
      console.log(res);
      console.log("next request");
      this.creationService.createConnection()
      .subscribe(res => {
        console.log(res);
        console.log("next request");
        this.creationService.createThing()
        .subscribe(res => {
          console.log(res);
        }, err => {
          console.log(err);
        })
      }, err => {
        console.log(err);
      })
    }, err => {
      console.log(err);
    })
  }

  // subscribe(): void {
  //   this.subscription = this._mqttService.observe('arup-8-fitzroy-street/UDMIduino-000/event').subscribe((message: IMqttMessage) => {
  //     this.message = message.payload.toString();
  //     console.log("this.message:", this.message);
  //   })
  // }

  // publish(): void {
  //   this._mqttService.unsafePublish('arup-8-fitzroy-street/UDMIduino-000/events', '{"present_value":62}', {qos: 1, retain: true})
  // }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
