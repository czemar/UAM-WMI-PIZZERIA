import { IValidationErrors } from './validation-errors.interface';

export type IValidator = (val: any) => IValidationErrors | null