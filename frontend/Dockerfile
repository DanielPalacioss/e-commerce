# syntax=docker/dockerfile:1.7

### ===== Stage 1: Build =====
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar dependencias
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copiar código
COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Compilar proyecto
RUN pnpm run build

### ===== Stage 2: Runtime =====
FROM nginx:alpine AS runtime

# Elimina los archivos default de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia el build al contenedor
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf


CMD ["nginx", "-g", "daemon off;"]
