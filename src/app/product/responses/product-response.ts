import { ProductDto } from "../models/product";

export interface ProductResponse{
    items: ProductDto[];
    pageNumber: number;
    pageSize: number;
    total:number
}