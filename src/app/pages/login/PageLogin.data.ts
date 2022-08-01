import { InputFieldAbstractControl } from "app/@components/input-field/input-field.module";

export class PageLoginData {
    valuesInput: any[] = [
        new InputFieldAbstractControl('Usuario',' '),
        new InputFieldAbstractControl('Contraseña', ' ')
    ];

    itemsForm = {
        username: { required: true, max: 30 },
        password: { required: true, min: 5, max: 50 }
    };
}