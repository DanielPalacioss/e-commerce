import api from "@/api/axios";
const BASE_URL = "/products";
export const productService = {
    async getProducts(page = 0, size = 10, field = "name", direction = "asc", category, active = true) {
        const params = {
            page,
            size,
            field,
            direction,
            active,
        };
        if (category) {
            params.category = category;
        }
        const response = await api.get(BASE_URL, { params });
        return response.data;
    },
    async getProductById(productId) {
        const response = await api.get(`${BASE_URL}/${productId}`);
        return response.data;
    },
    async createProduct(product) {
        const response = await api.post(BASE_URL, product);
        return response.data;
    },
    async updateProduct(productId, product) {
        const response = await api.patch(`${BASE_URL}/${productId}`, product);
        return response.data;
    },
    async deactivateProduct(productId) {
        const response = await api.post(`${BASE_URL}/${productId}/deactivate`);
        return response.data;
    },
    async activateProduct(productId) {
        const response = await api.post(`${BASE_URL}/${productId}/activate`);
        return response.data;
    },
    async uploadImageProduct(productId, file) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await api.patch(`${BASE_URL}/${productId}/upload-image`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },
    async increaseProductStock(productId, quantity) {
        await api.post(`${BASE_URL}/${productId}/increase_stock/${quantity}`);
    },
};
