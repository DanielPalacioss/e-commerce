import { createRouter, createWebHistory } from 'vue-router';
import Products from './views/Products.vue';
import Login from './views/Login.vue';
import { jwtDecode } from "jwt-decode";
import ProductAdmin from "@/views/ProductAdmin.vue";
import DashboardLayout from "@/views/DashboardLayout.vue";
import Home from "@/views/Home.vue";
import { getToken, logout } from "@/api/authService";
import Unauthorized from "@/views/Unauthorized.vue";
import ManageAccount from "@/views/ManageAccount.vue";
import Billing from "@/views/Billing.vue";
import Orders from "@/views/Orders.vue";
import UserAddresses from "@/views/UserAddresses.vue";
import Invoices from "@/views/Invoices.vue";
const routes = [
    { path: "/", redirect: "/home" },
    { path: "/login", name: "login", component: Login },
    { path: "/unauthorized", name: "unauthorized", component: Unauthorized },
    // Rutas con sidebar
    {
        path: "/",
        component: DashboardLayout,
        children: [
            { path: "home", name: "home", component: Home },
            { path: "products", name: "products", component: Products },
            { path: "invoices", name: "invoices", component: Invoices, meta: { requiresAuth: true, roles: ["ROLE_ADMIN", "ROLE_CLIENT"] } },
            { path: "user-addresses", name: "user-addresses", component: UserAddresses, meta: { requiresAuth: true, roles: ["ROLE_CLIENT"] } },
            { path: "billing", name: "billing", component: Billing, meta: { requiresAuth: true, roles: ["ROLE_CLIENT"] } },
            { path: "orders", name: "orders", component: Orders, meta: { requiresAuth: true, roles: ["ROLE_CLIENT"] } },
            {
                path: "manage-account",
                name: "manageAccount",
                component: ManageAccount,
                meta: { requiresAuth: true, roles: ["ROLE_ADMIN", "ROLE_CLIENT"] }
            },
            {
                path: "product-admin",
                name: "productAdmin",
                component: ProductAdmin,
                meta: { requiresAuth: true, roles: ["ROLE_ADMIN"] }
            },
        ]
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach((to, from, next) => {
    const token = getToken();
    const requiresAuth = !!to.meta?.requiresAuth;
    try {
        let decoded = undefined;
        //Validar siempre que el token no haya expirado
        if (token) {
            decoded = jwtDecode(token);
            if (decoded.exp && Math.floor(Date.now() / 1000) > decoded.exp) {
                // token expiró
                localStorage.removeItem("user");
                logout();
            }
        }
        if (!requiresAuth) {
            return next();
        }
        if (!token) {
            // Si la ruta requiere auth y no hay token → mandar a login
            return next({ path: "/login", query: { redirect: to.fullPath } });
        }
        const requiredRoles = to.meta.roles;
        if (requiredRoles && !requiredRoles.some(r => decoded.authorities.includes(r))) {
            // no tiene permisos
            return next("/unauthorized");
        }
        return next();
    }
    catch (e) {
        // token inválido / error al decodificar
        localStorage.removeItem("token");
        return next({ path: "/login", query: { redirect: to.fullPath } });
    }
});
export default router;
