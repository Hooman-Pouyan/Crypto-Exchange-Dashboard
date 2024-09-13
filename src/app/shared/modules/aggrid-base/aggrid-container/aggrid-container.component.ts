import {Component, EventEmitter, HostListener, Input, Output, ViewChild, signal, SimpleChange, ChangeDetectorRef, effect} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AgGridAngular} from "ag-grid-angular";
import {
  CellClickedEvent,
  ColDef,
  DomLayoutType,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ValueFormatterParams
} from "ag-grid-community";
import {BehaviorSubject, concat, filter, Observable, of} from 'rxjs';
import {StatusComponent} from "../Custom Components/Cell-Renderers/status/status.component";
import {ExchangeCDNComponent} from "../Custom Components/Cell-Renderers/exchange-cdn/exchange-cdn.component";
import {ActionsComponent} from "../Custom Components/Cell-Renderers/actions/actions-container/actions.component";
import {ToggleComponent} from "../Custom Components/Cell-Renderers/toggle/toggle.component";
import {LoadingComponent} from "../Custom Components/Cell-Renderers/loading/loading.component";
import {environment} from "../../../../../environments/environment";
import {DeleteComponent} from "../Custom Components/Cell-Renderers/actions/delete/delete.component";
import {EditComponent} from "../Custom Components/Cell-Renderers/actions/edit/edit.component";
import {deepCloneDefinition} from "ag-grid-community/dist/lib/utils/object";
import { DetailComponent } from '../Custom Components/Cell-Renderers/actions/detail/detail.component';

@Component({
  selector: 'app-aggrid-container',
  templateUrl: './aggrid-container.component.html',
  styleUrls: ['./aggrid-container.component.scss']
})
export class AggridContainerComponent {
  agGridFlex = signal<any>(1)
  public domLayout: DomLayoutType = 'autoHeight';
  _DataSource: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  screenWidth = 0;

  @Input() set DataSource(value: any) {
    this._DataSource.next(value)
  }

  _loadingStatus = signal<number | null>(1)

  @Input() IColDefs: any[] = [];
  @Output() _pageChange = new EventEmitter();
  @Input() length!: number;
  @Input() hasPagination = true
  @Input() set loadingStatus(value: number) {
    this._loadingStatus.set(value)
    console.log(value)
  }
  @Output() cellClicked = new EventEmitter <any>

  a = effect(() => {
    // if (this._loadingStatus() == 1) this.agGrid.api.showLoadingOverlay()
  })

    @Input() set _refreshRows(value: boolean) {
    // this.gridOptions.api?.setRowData(value)
    // this.refreshRows()
    console.log(value)
  };

  private gridApi!: GridApi<any>;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
  ) {
    this.setScreenWidth()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setScreenWidth(window.innerWidth)
  }


  ngOnInit(): void {
    this.createColDefs();
    this.activatedroute.paramMap.subscribe(res => {
    })
  }

  createColDefs() {
    this.IColDefs.forEach(item => {
      this.columnDefs.push({
        field: item.field,
        headerName: item.field ? this.translate.instant(item.field) : '',
        cellRenderer:
          item.pipe === 'status' ? StatusComponent :
            item.pipe === 'exchange' ? ExchangeCDNComponent :
              item.pipe === 'toggle' ? ToggleComponent :
                item.pipe === 'delete' ? DeleteComponent :
                  item.pipe === 'edit' ? EditComponent :
                  item.pipe === 'popup' ? DetailComponent :
                    null,
        cellRendererParams: {
          path: item.pipe == "delete" || item.pipe == "toggle" || item.pipe == "popup" ? item.path : '',
          dialog: item?.dialog
        },
        valueFormatter: (params) => {
          return this.formatter(item.field, item.valueFormat, params)
        },
        editable: item.editable,
      });
    })
  }

  public columnDefs: ColDef[] = [];

  public defaultColDef = signal<ColDef>({
    sortable: true,
    filter: true,
    cellEditorPopup: true,
    editable: false,
    wrapText: true,
    wrapHeaderText: true,
    floatingFilter: true,
    flex: this.getGridFlex(),
    cellClass: "text-md",
  });

  public rowData$!: Observable<any[]>;

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  gridOptions: GridOptions = {
    animateRows: true,
    columnDefs: this.columnDefs,
    quickFilterText: "",
    loadingOverlayComponent: LoadingComponent
  //   overlayLoadingTemplate:
  //   '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>',
  // // overlayNoRowsTemplate:
  // //   `<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;">This is ${this._loadingStatus()} a custom \'no rows\' overlay</span>`,
  }

  onGridReady(params: GridReadyEvent<any>) {
    // this.gridApi = params.api;
    this.gridOptions.api?.refreshCells()
    this.rowData$ = this._DataSource.asObservable()
  }

  onCellClicked(e: CellClickedEvent): void {
    this.cellClicked.emit(e)
  }

  pageChange(e: any) {
    this.agGrid.api.showLoadingOverlay()
    this._pageChange.emit(e)
    // this.currentPage.set(e.pageIndex);
    let params!: GridReadyEvent<any>
    this.onGridReady(params)

  }

  formatter(field: string, valueFormat: any, params: ValueFormatterParams) {
    if (field == "unit") return this.translate.instant("Currency.unit." + params.value)
    if (field == "side") return this.translate.instant(params.value)
    if (field == "symbol_type") return this.translate.instant("symbol-type." + params.value)
    if (field == "user_balance.balance" && !params.value) return this.translate.instant("موجودی ندارد")
    if (field == "action_type") return this.translate.instant("actions." + params.value)
    if (valueFormat == "descriptions") return this.descriptionsFormatter(field, params.data.descriptions)
    else if (field === 'depositRange') return params.data.deposit_max + ' - ' + params.data.deposit_min
    else if (field === 'withdrawRange') return params.data.withdraw_max + ' - ' + params.data.withdraw_min
    return params.value
  }

  descriptionsFormatter(field: string, value: any) {
    return value[this.translate.currentLang][field]
  }

  getGridFlex() {
    this.setScreenWidth()
    return this.screenWidth < 992 ? undefined : 1
  }

  setScreenWidth(width = 0) {
    this.screenWidth = width ? width : window.screen.width
  }
}
