import { QuestionBase } from './question-base';

export class SwitchQuestion<T> extends QuestionBase<boolean> {
    controlType = 'switchBox';
    labelTrue: string;
    labelFalse: string;
    type: boolean;

    constructor(options: {} = {}) {

        super(options);
        this.labelFalse = options['labelFalse'] || '';
        this.labelTrue = options['labelTrue'] || '';
        this.type = options['type'] || 'boolean';
    }
    textValue() {
        return this.value ? this.labelTrue : this.labelFalse;
    }
}
