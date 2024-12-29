import { Address } from "./adress.model";

export interface Register {
    name: string,
    mail: string,
    password: string,
    address: Address,
    birthday: Date,
    phone: string,
}
  