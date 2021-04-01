import {Component, Input, OnInit} from '@angular/core';
import {ModuleState} from "../../../../../../store/interfaces/modules.state";

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.less'],
})
export class ModuleComponent implements OnInit {
  @Input() config: ModuleState;
  constructor() { }

  ngOnInit(): void {
  }

}
