import {Component, Input} from '@angular/core';
import {ModuleState} from "../../../../../../store/interfaces/modules.state";
import {Condition} from "../../../../../../../../../src/models/enums/condition.enum";

@Component({
  selector: 'app-modules-list',
  templateUrl: './modules-list.component.html',
  styleUrls: ['./modules-list.component.less']
})
export class ModulesListComponent  {
  @Input() modules: ModuleState[];
  @Input() onlyCondition?: Condition | undefined | 'all';

  public get _modules(): ModuleState[] {
    return !this.onlyCondition || this.onlyCondition === 'all'
      ? this.modules
      : this.modules.filter((state: ModuleState) => state.data.condition === this.onlyCondition);
  }
}
