import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Ui {

  constructor() {}

  blurActiveElement(): void {
    if(document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }
}
