import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {API} from "../../../../api/api.service";
import {ModulesQueryStoreService} from "../../../../store/facade/query/modules-query-store.service";
import {ModulesStoreHelperService} from "../../../../store/facade/helper/modules-store-helper.service";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.less']
})
export class AdminPanelComponent implements OnInit {
  public readonly createdModuleForm = new FormGroup({title: new FormControl(null), description: new FormControl(null)});
  constructor(
    private readonly modulesStoreHelperService: ModulesStoreHelperService,
  ) { }

  ngOnInit(): void {

  }

  public onCreateModule(): void {
    this.modulesStoreHelperService.createModule$(this.createdModuleForm.getRawValue()).subscribe(console.log);
  }
}
