"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ej2_popups_1 = require("@syncfusion/ej2-popups");
var ej2_inputs_1 = require("@syncfusion/ej2-inputs");
var ej2_ng_grids_1 = require("@syncfusion/ej2-ng-grids");
var data_1 = require("./data");
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
        this.expandRow = [];
        this.parentData = data_1.employeeData;
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'dialog', allowEditOnDblClick: false };
        this.toolbar = ['add', 'edit', 'delete', 'update', 'cancel'];
        this.childGrid = {
            dataSource: data_1.orderDatas,
            queryString: 'EmployeeID', allowPaging: true,
            pageSettings: { pageSize: 2, pageCount: 5 },
            columns: [
                { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, textAlign: 'right', width: 120 },
                { field: 'ShipCity', headerText: 'Ship City', width: 120 },
                { field: 'ShipName', headerText: 'Ship Name', width: 150 }
            ]
        };
    };
    AppComponent.prototype.click = function (e) {
        var _this = this;
        var dlg = document.createElement('dialog');
        dlg.id = 'dialog';
        document.body.appendChild(dlg);
        var dialog = new ej2_popups_1.Dialog({
            header: 'Add Record',
            content: '<div>EmployeeID:<input id="emp" type="text"></input><br>ReportsTo:<input id="report" type="text"></input><br><button id="add">Add</button><br><br><button id="cancel">Cancel</button></div>',
            target: document.getElementById("container"),
            width: '250px',
        });
        dialog.appendTo('#dialog');
        var numeric1 = new ej2_inputs_1.NumericTextBox({});
        numeric1.appendTo('#emp');
        var numeric2 = new ej2_inputs_1.NumericTextBox({});
        numeric2.appendTo('#report');
        document.getElementById('add').onclick = function () {
            var addDate = { EmployeeID: numeric1.value, ReportsTo: numeric2.value };
            _this.grid.addRecord(addDate);
            dialog.destroy();
        };
        document.getElementById('cancel').onclick = function () {
            dialog.destroy();
        };
    };
    AppComponent.prototype.complete = function (e) {
        var _this = this;
        if (e.requestType === 'refresh') {
            this.expandRow.forEach(function (e) {
                _this.grid.detailRowModule.expand(e);
            });
        }
    };
    AppComponent.prototype.creat = function (e) {
        var _this = this;
        this.grid.editModule.updateRow = function (index, data) {
            var args = {
                requestType: 'save', type: 'actionBegin', data: { ReportsTo: data['ReportsTo'], EmployeeID: data['EmployeeID'] }, cancel: false,
                previousData: {}, selectedRow: _this.grid.selectedRowIndex, foreignKeyData: {}
            };
            args.action = 'edit';
            var dataModule = _this.grid.renderModule.data;
            var key = dataModule.getKey(args.foreignKeyData &&
                Object.keys(args.foreignKeyData).length ? args.foreignKeyData :
                _this.grid.getPrimaryKeyFieldNames());
            dataModule.dataManager.update(key, args.data, null, dataModule.generateQuery());
            _this.grid.refresh();
        };
    };
    AppComponent.prototype.recordClick = function (e) {
        var _this = this;
        var cell = e.target;
        if (cell) {
            var cellIndex = parseInt(cell.getAttribute('aria-colindex'), 10);
            var rowIndex_1 = parseInt(cell.parentElement.getAttribute('aria-rowindex'), 10);
            var cellValue = cell.innerText;
            var column = this.grid.columns[cellIndex];
            var row = cell.parentElement;
            var data = this.grid.getCurrentViewRecords()[rowIndex_1];
            var args_1 = { cell: cell, cellindex: cellIndex, cellvalue: cellValue, row: row, rowindex: rowIndex_1, column: column, data: data };
            var dlg = document.createElement('dialog');
            dlg.id = 'dialog';
            document.body.appendChild(dlg);
            var dialog_1 = new ej2_popups_1.Dialog({
                header: 'Edit Record',
                content: '<div>EmployeeID:<input id="emp" type="text"></input><br>ReportsTo:<input id="report" type="text"></input><br><button id="save">Save</button><br><br><button id="cancel">Cancel</button></div>',
                target: document.getElementById("container"),
                width: '250px',
            });
            dialog_1.appendTo('#dialog');
            var numeric1 = new ej2_inputs_1.NumericTextBox({
                readonly: true,
                value: args_1.data['EmployeeID']
            });
            numeric1.appendTo('#emp');
            var numeric2_1 = new ej2_inputs_1.NumericTextBox({
                value: args_1.data['ReportsTo']
            });
            numeric2_1.appendTo('#report');
            document.getElementById('save').onclick = function () {
                var editData = { EmployeeID: args_1.data['EmployeeID'], ReportsTo: numeric2_1.value };
                _this.grid.getRowsObject().forEach(function (e) {
                    if (e.isExpand) {
                        _this.expandRow.push(e.index);
                    }
                });
                _this.grid.editModule.updateRow(rowIndex_1, editData);
                dialog_1.destroy();
            };
            document.getElementById('cancel').onclick = function () {
                dialog_1.destroy();
            };
        }
    };
    return AppComponent;
}());
__decorate([
    core_1.ViewChild('grid'),
    __metadata("design:type", ej2_ng_grids_1.GridComponent)
], AppComponent.prototype, "grid", void 0);
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-container',
        template: " <button ej-button class='e-flat' (click)='click()'>Rdd record</button>\n    <ej-grid #grid id='Grid' [dataSource]='parentData' [childGrid]='childGrid' (recordDoubleClick)='recordClick($event)' (actionComplete)='complete($event)' (created)='creat($event)' [editSettings]='editSettings'>\n        <e-columns>\n            <e-column field='EmployeeID' isPrimaryKey='true' headerText='Employee ID' width='120' textAlign=\"right\"></e-column>\n            <e-column field='ReportsTo' headerText='Reports To' width='120' textAlign=\"right\"></e-column>\n        </e-columns>\n    </ej-grid>"
    })
], AppComponent);
exports.AppComponent = AppComponent;
