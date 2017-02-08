import {autoinject, bindable, containerless} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

import {ColumnDefinition} from './column-definition';
import {IRow} from './i-row';

@containerless()
@autoinject()
export class GridBody {
    @bindable public rows: IRow[];
    @bindable public columnDefinitions: ColumnDefinition[];
    @bindable private editableCell: { columnId: string, rowId: string };

    constructor (private eventAggregator: EventAggregator) {
    }

    private publishEvent(event: Event, columnDefinition: ColumnDefinition, row: IRow) {
        this.eventAggregator.publish(event.type, { columnDefinition: columnDefinition, row: row });

        switch (event.type)
        {
            case 'change':
                if (!row.changes) row.changes = [];

                row.changes.push(row.currentValue);
                row.hasChange = this.columnDefinitions.find(columnDefinition => row.originalValue[columnDefinition.propertyName] !== row.currentValue[columnDefinition.propertyName]) !== undefined;
                break;
            case 'click':
                if (columnDefinition.isEditable && !(this.editableCell && this.editableCell.columnId === columnDefinition._id && this.editableCell.rowId === row.id)) {
                    this.editableCell = { columnId: columnDefinition._id, rowId: row.id };
                    this.giveCellInputFocus(event.target);
                }
                break;
            case 'focusin':
                break;
            case 'focusout':
                if (this.editableCell && this.editableCell.columnId === columnDefinition._id && this.editableCell.rowId === row.id) {
                    this.editableCell = null;
                }
                break;
            case 'mouseout':
                break;
            case 'mouseover':
                break;
        }
    }

    private giveCellInputFocus(toElement) {
        let that = this;
        let td = toElement.nodeName === "TD" ? toElement : toElement.parentElement;
        let input = td.children[0];

        setTimeout(function () {
            input.focus();
            let endPosition = input.value.length;
            input.setSelectionRange(endPosition, endPosition);
        }, 1);
    }
}