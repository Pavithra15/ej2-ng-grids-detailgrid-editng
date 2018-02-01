import { L10n, setCulture } from '@syncfusion/ej2-base';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Dialog } from '@syncfusion/ej2-popups';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { GridComponent, actionBegin, updateData, SaveEventArgs, Grid } from '@syncfusion/ej2-ng-grids';
import { employeeData, orderDatas } from './data';


@Component({
    selector: 'app-container',
    template: ` <button ej-button class='e-flat' (click)='click()'>Add record</button>
    <ej-grid #grid id='Grid' [dataSource]='parentData' [childGrid]='childGrid' (recordDoubleClick)='recordClick($event)' (actionComplete)='complete($event)' (created)='creat($event)' [editSettings]='editSettings'>
        <e-columns>
            <e-column field='EmployeeID' isPrimaryKey='true' headerText='Employee ID' width='120' textAlign="right"></e-column>
            <e-column field='ReportsTo' headerText='Reports To' width='120' textAlign="right"></e-column>
        </e-columns>
    </ej-grid>`
})
export class AppComponent implements OnInit {
    @ViewChild('grid')
    public grid: GridComponent;
    public parentData: Object[];
    public childGrid: any;
    public updateRow: any;
    public expandRow: number[];
    public updateCell: Function;
    public editSettings: Object;
    public toolbar: string[];
    ngOnInit(): void {
        this.expandRow = [];
        this.parentData = employeeData;
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'dialog', allowEditOnDblClick: false };
        this.childGrid = {
            dataSource: orderDatas,
            queryString: 'EmployeeID',allowPaging: true,
            pageSettings: { pageSize: 2, pageCount: 5 },
            columns: [
                { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, textAlign: 'right', width: 120 },
                { field: 'ShipCity', headerText: 'Ship City', width: 120 },
                { field: 'ShipName', headerText: 'Ship Name', width: 150 }
            ]
        };

    }



    click(e) {
        let dlg = document.createElement('dialog');
        dlg.id = 'dialog';
        document.body.appendChild(dlg);

        let dialog = new Dialog({
            header: 'Add Record',
            content: '<div>EmployeeID:<input id="emp" type="text"></input><br>ReportsTo:<input id="report" type="text"></input><br><button id="add">Add</button><br><br><button id="cancel">Cancel</button></div>',
            target: document.getElementById("container"),
            width: '250px',
        });
        dialog.appendTo('#dialog');
        let numeric1: NumericTextBox = new NumericTextBox({

        });
        numeric1.appendTo('#emp');
        let numeric2: NumericTextBox = new NumericTextBox({
        });
        numeric2.appendTo('#report');

        document.getElementById('add').onclick = (): void => {
            let addDate = { EmployeeID: numeric1.value, ReportsTo: numeric2.value }
            this.grid.addRecord(addDate);
            dialog.destroy();
        }
        document.getElementById('cancel').onclick = (): void => {
            dialog.destroy()
        }

    }

    complete(e) {
        if (e.requestType === 'refresh') {
            this.expandRow.forEach((e) => {
                this.grid.detailRowModule.expand(e);
            });
        }

    }
    creat(e) {
        this.grid.editModule.updateRow = (index: number, data: any): void => { // this 
            let args: SaveEventArgs = {
                requestType: 'save', type: 'actionBegin', data: { ReportsTo: data['ReportsTo'], EmployeeID: data['EmployeeID'] }, cancel: false,
                previousData: {}, selectedRow: this.grid.selectedRowIndex, foreignKeyData: {}
            };
            args.action = 'edit';
            let dataModule: any = this.grid.renderModule.data;
            let key: string = dataModule.getKey(args.foreignKeyData &&
                Object.keys(args.foreignKeyData).length ? args.foreignKeyData :
                this.grid.getPrimaryKeyFieldNames());
            dataModule.dataManager.update(key, args.data, null, dataModule.generateQuery()) as Promise<Object>;
            this.grid.refresh();
        };

    }

    recordClick(e) {
        let cell: HTMLElement = e.target;
        if (cell) {
            let cellIndex: number = parseInt(cell.getAttribute('aria-colindex'), 10);
            let rowIndex: number = parseInt(cell.parentElement.getAttribute('aria-rowindex'), 10);
            let cellValue = cell.innerText;
            let column = this.grid.columns[cellIndex];
            let row = cell.parentElement;
            let data = this.grid.getCurrentViewRecords()[rowIndex];
            let args = { cell: cell, cellindex: cellIndex, cellvalue: cellValue, row: row, rowindex: rowIndex, column: column, data: data };
            let dlg = document.createElement('dialog');
            dlg.id = 'dialog';
            document.body.appendChild(dlg);

            let dialog = new Dialog({
                header: 'Edit Record',
                content: '<div>EmployeeID:<input id="emp" type="text"></input><br>ReportsTo:<input id="report" type="text"></input><br><button id="save">Save</button><br><br><button id="cancel">Cancel</button></div>',  
                target: document.getElementById("container"),
                width: '250px',
            });
            dialog.appendTo('#dialog');
            let numeric1: NumericTextBox = new NumericTextBox({
                readonly: true,
                value: args.data['EmployeeID']
            });
            numeric1.appendTo('#emp');
            let numeric2: NumericTextBox = new NumericTextBox({

                value: args.data['ReportsTo']
            });
            numeric2.appendTo('#report');

            document.getElementById('save').onclick = (): void => {
                let editData = { EmployeeID: args.data['EmployeeID'], ReportsTo: numeric2.value }
                this.grid.getRowsObject().forEach((e) => {
                    if (e.isExpand) {
                        this.expandRow.push(e.index);
                    }

                });
                this.grid.editModule.updateRow(rowIndex, editData);dialog.destroy();
            }
            document.getElementById('cancel').onclick = (): void => {
                dialog.destroy()
            }
        }


    }

}