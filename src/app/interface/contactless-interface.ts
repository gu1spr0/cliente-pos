export interface Contactless {
    token: string;
    idKiosk: number;
    amount: number;
    multi: boolean;
    idCommerce?: number;
}