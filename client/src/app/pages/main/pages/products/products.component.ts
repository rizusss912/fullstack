import {Component, OnInit} from '@angular/core';
import {ModulesStoreHelperService} from "../../../../store/facade/helper/modules-store-helper.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit {

  constructor(
    private readonly modulesStoreHelperService: ModulesStoreHelperService,
  ) {
  }

  ngOnInit(): void {
    this.modulesStoreHelperService.uploadModules$().subscribe(console.log);
  }
}
