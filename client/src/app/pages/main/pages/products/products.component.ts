import {Component, OnInit} from '@angular/core';
import {ModulesStoreHelperService} from "../../../../store/facade/helper/modules-store-helper.service";
import {Observable} from "rxjs";
import {ModuleState} from "../../../../store/interfaces/modules.state";
import {HttpErrorResponse} from "@angular/common/http";
import {Condition} from "../../../../../../../src/models/enums/condition.enum";
import {map, startWith} from "rxjs/operators";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit {
  public modules$: Observable<ModuleState[] | HttpErrorResponse | undefined>;
  public modulesConditionFields$: Observable<Condition[]>;
  public readonly modulesFilter = new FormControl();

  constructor(
    private readonly modulesStoreHelperService: ModulesStoreHelperService,
  ) {
  }

  ngOnInit(): void {
    this.modules$ = this.modulesStoreHelperService.uploadModules$();
    this.modulesConditionFields$ = this._modulesConditionFields$;
  }

  public get _modulesConditionFields$(): Observable<Condition[]> {
    return this.modules$.pipe(
      startWith([]),
      map((modules: ModuleState[] | HttpErrorResponse | undefined) =>
        Array.isArray(modules)
          ? modules.reduce(
          (conditions: Condition[], state: ModuleState) =>
            state.data.condition && !conditions.includes(state.data.condition)
              ? conditions.concat(state.data.condition)
              : conditions,
          [],
          )
          : [],
      ),
    )
  }

  public getFilterFieldByCondition(value: Condition): string {
    const filterFieldByConditionMap: Record<Condition, string> = {
      [Condition.Valid]: 'Только доступные',
      [Condition.Hidden]: 'Только скрытые',
      [Condition.Invalid]: 'Только повреждённые',
    }

    return filterFieldByConditionMap[value];
  }
}

