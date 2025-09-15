export interface ProductResponseDTO {
    id: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
    imageUrl: string;
    category: ProductCategories;
    active: boolean;
}

export interface ProductPageResponseDTO {
    products: ProductResponseDTO[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

export type ProductCategories =
    | "ELECTRONICS"
    | "FASHION"
    | "HOME"
    | "BEAUTY"
    | "SPORTS"
    | "BOOKS"
    | "GROCERY";

export type ProductSortForField = "name" | "price" | "createdAt";

export interface ProductRequestDTO {
    name: string;
    description?: string;
    price: number;
    category: ProductCategories;
}