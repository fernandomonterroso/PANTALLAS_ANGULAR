import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dominicode';


  public opcion = 0;

  getName(): void {
    console.log('Hola fernando monterroso');
  }
}
