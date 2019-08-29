import { Component } from '@angular/core';

import { CreationService } from './services/creation.service';
import { FlaskService } from './services/flask.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web-ui';

  public message: string;

  constructor(
    private creationService: CreationService,
    private flaskService: FlaskService,
  ) { }

  start(): void {
    this.policy()
    .then(() => this.connection())
    .then(() => this.thing())
    .catch((err) => {
      console.log(err);
    });
  }

  policy(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.creationService.createPolicy()
      .subscribe(res => {
        console.log(res);
        resolve();
      }, err => {
        reject(err);
      });
    });
  }
  connection(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.creationService.createConnection()
      .subscribe(res => {
        console.log(res);
        resolve();
      }, err => {
        reject(err);
      });
    });
  }
  thing(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.creationService.createThing()
      .subscribe(res => {
        console.log(res);
        resolve();
      }, err => {
        reject(err);
      });
    });
  }

  testPost(): void {
    this.flaskService.testPost()
    .subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
  }

  subscribe(): void {
    this.flaskService.subscribe()
    .subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
  }
  publish(): void {
    this.flaskService.publish()
    .subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
  }
}
