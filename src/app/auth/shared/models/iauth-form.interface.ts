import { FormGroup } from '@angular/forms';

export interface IAuthForm {
    form: FormGroup;

    onSubmit(): void;

    canSubmit(): boolean;

    initForm(): void;
}
