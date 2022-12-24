import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomFormValidators {
    static emailRegexPattern =
        "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
    static DMYdateRegexPattern =
        '^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\\d|2[0-8])[- /.]02)[- /.]\\d{4}|29[- /.]02[- /.](\\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$';
    static CEPRegexPattern = '^[0-9]{5}[-]?[0-9]{3}$';
    static CNPJRegexPattern = '^\\d{2}.\\d{3}.\\d{3}\\/\\d{4}-\\d{2}$';

    static isValidCEP(control: AbstractControl): ValidationErrors | null {
        const cep: string = String(control.value);

        if (CustomFormValidators.validateCEP(cep)) return null; //Success

        return { isValidCEP: true }; //Erro
    }

    private static validateCEP(cep: string): boolean {
        const regex = new RegExp(CustomFormValidators.CEPRegexPattern);

        if (regex.test(cep)) return true;
        return false;
    }

    static isValidDMYdate(dateString: string): boolean {
        const regex = new RegExp(CustomFormValidators.DMYdateRegexPattern);

        if (regex.test(dateString)) return true;
        return false;
    }

    static isValidCNPJ(control: AbstractControl): ValidationErrors | null {
        if (!control?.value) return null;
        const cnpj: string = String(control.value);
        const regex = new RegExp(CustomFormValidators.CNPJRegexPattern);
        if (regex.test(cnpj)) return null;

        return { isValidCNPJ: true }; //Erro
    }

    static isValidCPF(control: AbstractControl): ValidationErrors | null {
        const cpf: string = String(control.value);
        if (!cpf) return null;
        const validCPF = CustomFormValidators.sanitizeNumbersFromSymbols(cpf);

        if (CustomFormValidators.validateCPF(validCPF)) return null; //Success

        return { isValidCPF: true }; //Erro
    }

    private static sanitizeNumbersFromSymbols(n: string): string {
        return n.replace(/[^\s\d\ ]*[\s]?[\s\\\^]?/g, '');
    }

    //Receber: 12345678909 | Sem pontos ou hífen
    private static validateCPF(cpf: string, verificador?: boolean): boolean {
        let soma = 0;
        let resto;
        const x = verificador ? 0 : 1;

        for (let i = 1; i <= 9 + x; i++) {
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 + x - i);
        }
        resto = (soma * 10) % 11;

        if (resto == 10 || resto == 11) {
            resto = 0;
        }
        if (resto != parseInt(cpf.substring(9 + x, 10 + x))) {
            return false;
        }

        if (!verificador) {
            return CustomFormValidators.validateCPF(cpf, true);
        }

        return true;
    }

    static mustMatchPassword(
        controls: AbstractControl
    ): ValidationErrors | null | undefined {
        if (!controls) return;

        const password = controls.get('password');
        const confirmPassword = controls.get('confirmPassword');

        if (confirmPassword?.errors && !confirmPassword.errors['mustMatch'])
            return;

        if (password?.value !== confirmPassword?.value) {
            confirmPassword?.setErrors({ mustMatch: true });
            return { mustMatch: true }; //Erro
        }
        confirmPassword?.setErrors(null);
        return null; //Success
    }

    /**
     *
     * @param control
     */
    static isValidEmail(control: AbstractControl): ValidationErrors | null {
        const regex = new RegExp(CustomFormValidators.emailRegexPattern);
        if (regex.test(control.value)) return null; //Success

        return { isValidEmail: true }; //Erro
    }

    static isValidPhone(
        control: AbstractControl
    ): { [key: string]: any } | null {
        if (!control || !control.value) return { isValidPhone: true };

        const phoneRegex = new RegExp(
            '^[(]?(\\d{2})[)]?\\s?[9](\\d{4}-(\\d{4}))$'
        );
        const phone: string = control.value.replaceAll(' ', '');

        if (!phoneRegex.test(phone)) {
            return { isValidPhone: { phone } };
        }
        return null;
    }
}
