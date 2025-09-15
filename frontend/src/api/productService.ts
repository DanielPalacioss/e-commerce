import {
    ProductCategories,
    ProductPageResponseDTO,
    ProductRequestDTO,
    ProductResponseDTO,
    ProductSortForField,
} from "@/types/product";
import api from "@/api/axios";
import {SortDirection} from "@/types/share";

const BASE_URL = "/products";

export const productService = {
    async getProducts(
        page: number = 0,
        size: number = 10,
        field: ProductSortForField = "name",
        direction: SortDirection = "asc",
        category?: ProductCategories,
        active: boolean = true
    ): Promise<ProductPageResponseDTO> {
        const params: Record<string, string | number | boolean> = {
            page,
            size,
            field,
            direction,
            active,
        };
        if (category) {
            params.category = category;
        }

        const response = await api.get<ProductPageResponseDTO>(BASE_URL, {params});
        return response.data;
    },

    async getProductById(productId: string): Promise<ProductResponseDTO> {
        const response = await api.get<ProductResponseDTO>(`${BASE_URL}/${productId}`);
        return response.data;
    },

    async createProduct(product: ProductRequestDTO): Promise<ProductResponseDTO> {
        const response = await api.post<ProductResponseDTO>(BASE_URL, product);
        return response.data;
    },

    async updateProduct(
        productId: string,
        product: ProductRequestDTO
    ): Promise<ProductResponseDTO> {
        const response = await api.patch<ProductResponseDTO>(
            `${BASE_URL}/${productId}`,
            product
        );
        return response.data;
    },

    async deactivateProduct(productId: string): Promise<string> {
        const response = await api.post<string>(`${BASE_URL}/${productId}/deactivate`);
        return response.data;
    },

    async activateProduct(productId: string): Promise<string> {
        const response = await api.post<string>(`${BASE_URL}/${productId}/activate`);
        return response.data;
    },

    async uploadImageProduct(productId: string, file: File): Promise<string> {
        const formData = new FormData();
        formData.append("file", file);

        const response = await api.patch<string>(
            `${BASE_URL}/${productId}/upload-image`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    },

    async increaseProductStock(productId: string, quantity: number): Promise<void> {
        await api.post(`${BASE_URL}/${productId}/increase_stock/${quantity}`);
    },
};