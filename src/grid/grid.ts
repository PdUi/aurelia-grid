import {Guid} from '../utils/guid';
import {ColumnDefinition} from './column-definition';
import {IRow} from './i-row';

import {bindable, inject, DOM} from 'aurelia-framework';
import {OverrideContext} from 'aurelia-binding';

const INIT_ACTION: string = 'init';
const RESET_ACTION: string = 'reset';

@inject(DOM.Element)
export class Grid {
    @bindable public columnDefinitions: ColumnDefinition[];
    @bindable public id: string;
    @bindable public records: any[];
    private rows: IRow[];

    constructor(private element: Element) {
    }

    protected attached() {
        setTimeout(this.alignGridColumnWidths.call(this), 1);
    }

    protected bind(bindingContext: any, overrideContext?: OverrideContext) {
        if (this.records) {
            let rows = [];
            let rowIdIndexMapper = {};
            this.records.forEach(record => {
                let row = { 
                    id: Guid.NewGuid(), 
                    currentValue: JSON.parse(JSON.stringify(record)), 
                    originalValue: record, 
                    changes: [],
                    hasChange: false
                };
                rowIdIndexMapper[row.id] = rows.length;
                rows.push(row);
            });

            this.rows = rows;
        }

        this.id = Guid.NewGuid();
    }

    private alignGridColumnWidths() {
        let tableHeaderRow = ((<HTMLTableElement>this.element.children[0].children[0]).tHead).rows[0];
        let tableBodyRow = ((<HTMLTableElement>this.element.children[0].children[1]).tBodies[0]).rows[0];

        if (tableHeaderRow && tableBodyRow) {
            for(var i = 0, l = this.columnDefinitions.length; i < l; i++) {
                let columnDefinition = this.columnDefinitions[i];
                if (columnDefinition.isVisible) {
                    let headerCellWidth = tableHeaderRow.cells[i].offsetWidth;
                    let bodyCellWidth = tableBodyRow.cells[i].offsetWidth;

                    (<any>columnDefinition)._initialWidth = headerCellWidth > bodyCellWidth ? headerCellWidth : bodyCellWidth;
                    columnDefinition.width = headerCellWidth > bodyCellWidth ? headerCellWidth : bodyCellWidth;
                }
            }
        }
    }
}