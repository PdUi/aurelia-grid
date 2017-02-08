import {bindable, containerless} from 'aurelia-framework';

import {ColumnDefinition} from './column-definition';

@containerless()
export class GridHead {
    @bindable public columnDefinitions: ColumnDefinition[];
}