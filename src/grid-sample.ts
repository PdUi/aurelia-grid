import {ColumnDefinition} from './grid/column-definition';
import {Person} from './person';
import {PersonFactory} from './person-factory';

export class GridSample {
    columnDefinitions: ColumnDefinition[] = [
        new ColumnDefinition({ propertyName: 'id'/*, isVisible: false*/, type: 'number', title: 'Id' }),
        new ColumnDefinition({ propertyName: 'firstName', title: 'First Name', type: 'text', isEditable: true }),
        new ColumnDefinition({ propertyName: 'lastName', title: 'Last Name', type: 'text', isEditable: true })
    ];

    id: string;

    people: Person[];

    constructor() {
        let people = [];
        for(let i = 0; i < 20; i++) {
            people.push(PersonFactory.NewPerson())
        }

        this.people = people;
    }
}