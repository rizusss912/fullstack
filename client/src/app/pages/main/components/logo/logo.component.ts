import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.less']
})
export class LogoComponent {
  @Input() size: number;

  public getViewBox(): string {
    return `0 0 ${this.size} ${this.size}`;
  }
}
