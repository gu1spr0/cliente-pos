export interface Cancel{
    token: string;
    idKiosk: number;
    idTransaction: number;
    multi: boolean;
    idCommerce?: boolean;
}