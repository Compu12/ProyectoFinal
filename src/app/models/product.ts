import { Url } from 'url';

//CAMPOS
export class Product {
    $key: string;
    name: string;
    category: string;
    stock: number;
    price: number;
    description: string;
    image: Url;
}
