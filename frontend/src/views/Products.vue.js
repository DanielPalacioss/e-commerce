import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Cart from "@/components/Cart.vue";
import ProductCard from "@/components/ProductCart.vue";
import Pagination from "@/components/Pagination.vue";
import { productService } from "@/api/productService";
import { useToast } from "@/components/ui/toast";
const router = useRouter();
const { toast } = useToast();
const pageData = ref({
    products: [],
    page: 0,
    size: 8,
    totalElements: 0,
    totalPages: 0,
});
// Filtros reactivos
const filters = ref({
    field: "name",
    direction: "asc",
    category: undefined,
    active: true,
});
async function loadPage(page = 0, size = 8) {
    try {
        const data = await productService.getProducts(page, size, filters.value.field, filters.value.direction, filters.value.category, filters.value.active);
        pageData.value = data;
    }
    catch (err) {
        console.error("Error al cargar productos:", err);
    }
}
const CART_KEY = "shopping_cart";
const cart = ref([]);
function loadCart() {
    const saved = localStorage.getItem(CART_KEY);
    if (saved)
        cart.value = JSON.parse(saved);
}
function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart.value));
}
function addToCart(product) {
    const existing = cart.value.find(item => item.product.id === product.id);
    if (existing) {
        if (existing.product.quantity == existing.quantity) {
            toast({
                title: "Error",
                description: `The ${existing.product.name} product does not have more quantity`,
                variant: "destructive", // "default" o "destructive"
            });
            return;
        }
        existing.quantity++;
    }
    else {
        cart.value.push({ product, quantity: 1 });
    }
    saveCart();
}
function removeFromCart(index) {
    cart.value.splice(index, 1);
    saveCart();
}
function increaseQuantity(index) {
    if (cart.value[index].product.quantity == cart.value[index].quantity) {
        toast({
            title: "Error",
            description: `The ${cart.value[index].product.name} product does not have more quantity`,
            variant: "destructive",
        });
        return;
    }
    cart.value[index].quantity++;
    saveCart();
}
function decreaseQuantity(index) {
    if (cart.value[index].quantity > 1) {
        // Si la cantidad es mayor a 1, disminuirla en 1
        cart.value[index].quantity--;
    }
    else {
        // Si la cantidad es 1, eliminar el producto del carrito
        cart.value.splice(index, 1);
    }
    saveCart();
}
const total = computed(() => Number(cart.value.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2)));
// Finalizar compra → crear orden, limpiar carrito y redirigir
async function finalizarCompra(orderResponse) {
    try {
        // Limpiar carrito
        cart.value = [];
        localStorage.removeItem(CART_KEY);
        // Redirigir a billing
        router.push({ path: "/billing", query: { orderId: orderResponse.id } });
    }
    catch (err) {
    }
}
onMounted(() => {
    loadCart();
    loadPage(0, pageData.value.size);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "min-h-screen bg-gray-50 flex flex-col" },
});
/** @type {[typeof Cart, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Cart, new Cart({
    ...{ 'onCheckout': {} },
    ...{ 'onDecrease': {} },
    ...{ 'onIncrease': {} },
    ...{ 'onRemove': {} },
    cart: (__VLS_ctx.cart),
    total: (__VLS_ctx.total),
}));
const __VLS_1 = __VLS_0({
    ...{ 'onCheckout': {} },
    ...{ 'onDecrease': {} },
    ...{ 'onIncrease': {} },
    ...{ 'onRemove': {} },
    cart: (__VLS_ctx.cart),
    total: (__VLS_ctx.total),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
const __VLS_5 = ({ checkout: {} },
    { onCheckout: (__VLS_ctx.finalizarCompra) });
const __VLS_6 = ({ decrease: {} },
    { onDecrease: (__VLS_ctx.decreaseQuantity) });
const __VLS_7 = ({ increase: {} },
    { onIncrease: (__VLS_ctx.increaseQuantity) });
const __VLS_8 = ({ remove: {} },
    { onRemove: (__VLS_ctx.removeFromCart) });
// @ts-ignore
[cart, total, finalizarCompra, decreaseQuantity, increaseQuantity, removeFromCart,];
var __VLS_2;
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "py-16 px-6 w-full" },
});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
    ...{ class: "text-2xl font-bold text-gray-800 mb-8 text-center" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4" },
});
for (const [product] of __VLS_getVForSourceType((__VLS_ctx.pageData.products))) {
    // @ts-ignore
    [pageData,];
    /** @type {[typeof ProductCard, ]} */ ;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(ProductCard, new ProductCard({
        ...{ 'onAdd': {} },
        key: (product.id),
        product: (product),
    }));
    const __VLS_11 = __VLS_10({
        ...{ 'onAdd': {} },
        key: (product.id),
        product: (product),
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    let __VLS_13;
    let __VLS_14;
    const __VLS_15 = ({ add: {} },
        { onAdd: (__VLS_ctx.addToCart) });
    // @ts-ignore
    [addToCart,];
    var __VLS_12;
}
/** @type {[typeof Pagination, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(Pagination, new Pagination({
    ...{ 'onNext': {} },
    ...{ 'onPrev': {} },
    page: (__VLS_ctx.pageData.page),
    totalPages: (__VLS_ctx.pageData.totalPages),
}));
const __VLS_18 = __VLS_17({
    ...{ 'onNext': {} },
    ...{ 'onPrev': {} },
    page: (__VLS_ctx.pageData.page),
    totalPages: (__VLS_ctx.pageData.totalPages),
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_20;
let __VLS_21;
const __VLS_22 = ({ next: {} },
    { onNext: (...[$event]) => {
            __VLS_ctx.loadPage(__VLS_ctx.pageData.page + 1, __VLS_ctx.pageData.size);
            // @ts-ignore
            [pageData, pageData, pageData, pageData, loadPage,];
        } });
const __VLS_23 = ({ prev: {} },
    { onPrev: (...[$event]) => {
            __VLS_ctx.loadPage(__VLS_ctx.pageData.page - 1, __VLS_ctx.pageData.size);
            // @ts-ignore
            [pageData, pageData, loadPage,];
        } });
var __VLS_19;
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['py-16']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-4']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        Cart: Cart,
        ProductCard: ProductCard,
        Pagination: Pagination,
        pageData: pageData,
        loadPage: loadPage,
        cart: cart,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        increaseQuantity: increaseQuantity,
        decreaseQuantity: decreaseQuantity,
        total: total,
        finalizarCompra: finalizarCompra,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
