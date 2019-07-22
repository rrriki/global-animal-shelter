import {FormControl} from '@angular/forms';


export class FormValidators {

    // Angular Validator's minLength doesn't work on Arrays
    static nonEmpty(control: FormControl) {
        if (!control.value || control.value.length === 0) {
            return {'empty': true};
        }
        return null;
    }

    static restrictedWordsValidator(words) {
        return (control: FormControl): object => {
            if (!words) {
                return null;
            }
            // TODO: re-implement with a better algorithm
            const arr = control.value.split(' ');
            const banned = words.filter((w) => arr.includes(w));

            if (banned && banned.length > 0) {
                return {restrictedWords: banned.join(',')};
            }

            return null;
        };
    }
}


