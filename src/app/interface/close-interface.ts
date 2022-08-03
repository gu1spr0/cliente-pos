export interface Close {
    token: string;
    idKiosk: number;
    confirm: boolean;
    multi: boolean;
    idCommerce?: number;
}