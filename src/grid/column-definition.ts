import {Guid} from '../utils/guid';

export class ColumnDefinition {
    public isEditable?: boolean;
    public isVisible?: boolean;
    public propertyName: string;
    public title?: string;
    public type?: string;
    public width?: number;
    public _id?: string;

    constructor (columnDefinition: ColumnDefinition) {
        this._id = Guid.NewGuid();
        this.isEditable = columnDefinition.isEditable;
        this.isVisible = columnDefinition.isVisible === null || columnDefinition.isVisible === undefined ? true : columnDefinition.isVisible;
        this.propertyName = columnDefinition.propertyName;
        this.title = columnDefinition.title;
        this.type = !columnDefinition.isEditable ? undefined : columnDefinition.type ? columnDefinition.type : 'text';
        this.width = columnDefinition.width;
    }

    /*
        Valid types: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input
        button
        checkbox
        color
        date
        datetime-local
        email
        file
        hidden
        image
        month
        number
        password
        radio
        range
        reset
        search
        submit
        tel
        texttime
        url
        week
    */
}