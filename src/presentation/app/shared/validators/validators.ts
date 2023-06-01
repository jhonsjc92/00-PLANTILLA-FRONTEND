import { FormControl, ValidationErrors } from '@angular/forms';
export const isValidaCI = (control: FormControl) : ValidationErrors | null => {
    
    return null;
}
export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
export const onlyNumber: string = "^([0-9]{10,10})$";
export const twoDecimal: string = "^([0-9]{0,8})(\.[0-9]{0,2})$";
