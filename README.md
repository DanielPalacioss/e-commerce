# 🛒 E-commerce

## 📌 Introducción

Este proyecto es una aplicación **E-commerce** desarrollada con arquitectura **frontend-backend**, cuyo propósito es ofrecer una plataforma moderna y escalable para la gestión de productos, usuarios, pedidos y pagos.

El sistema cuenta con un **frontend dinámico** que brinda una experiencia de usuario atractiva e intuitiva, y un **backend robusto** que maneja la lógica de negocio, autenticación, seguridad, persistencia de datos y migraciones.

## ⚙️ Tecnologías utilizadas

### 🔹 Frontend

- Vue 3 – Framework progresivo para la construcción de interfaces de usuario.
- shadcn-vue – Componentes accesibles y personalizables para Vue.
- Vite – Bundler y servidor de desarrollo ultrarrápido.
- pnpm – Gestor de paquetes eficiente y rápido.

**Dependencias principales**

- `@tanstack/vue-table` – Tablas reactivas y configurables.
- `@vueuse/core` – Utilidades para Vue Composition API.
- `axios` – Cliente HTTP para consumir la API.
- `jwt-decode` – Decodificación de tokens JWT.
- `lucide-vue-next` – Iconos SVG modernos.
- `reka-ui` – Componentes UI adicionales.
- `tailwind-merge` – Utilidad para combinar clases de Tailwind CSS.
- `vue-router` – Manejo de rutas y navegación.

### 🔹 Backend

- [Spring Boot](https://spring.io/projects/spring-boot) – Framework Java para aplicaciones web.
- Maven – Gestión de dependencias y build tool.
- [PostgreSQL](https://www.postgresql.org/) – Base de datos relacional.
- Flyway – Migración y control de versiones de la base de datos.
- [Spring Security + JWT](https://spring.io/projects/spring-security) – Autenticación y autorización segura.
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa) – Acceso simplificado a bases de datos.
- Cloudinary – Gestión y almacenamiento de imágenes en la nube.
- Springdoc OpenAPI – Documentación automática de la API con Swagger UI.

**Dependencias principales**

- `spring-boot-starter-data-jpa`
- `spring-boot-starter-validation`
- `spring-boot-starter-web`
- `spring-boot-starter-security`
- `postgresql`
- `lombok`
- `flyway-core`
- `flyway-database-postgresql`
- `springdoc-openapi-starter-webmvc-ui`
- `cloudinary-http44`
- `java-jwt`

### 🔹 Testing

- JUnit 5 (`junit-jupiter`)
- Mockito (`mockito-junit-jupiter`)
- Base de datos en memoria (`h2`)

## 🏗️ Arquitectura del Proyecto

La aplicación sigue una arquitectura **cliente-servidor** con separación clara de responsabilidades:

- **Cliente (Frontend - Vue 3 + shadcn-vue):**

  El usuario interactúa con la interfaz, que consume la API REST mediante peticiones HTTP con tokens JWT.

- **API (Backend - Spring Boot):**

  Expone endpoints REST que manejan autenticación, lógica de negocio, validaciones y seguridad.

    - **Spring Security** protege las rutas, valida los tokens JWT y aplica políticas de autorización basadas en roles.
    - **CORS** configurado para aceptar únicamente orígenes confiables, garantizando que solo el frontend permitido pueda comunicarse con el backend.
    - **Roles en endpoints**: los recursos sensibles solo pueden ser accedidos si el usuario posee el rol adecuado (`ROLE_USER`, `ROLE_ADMIN`, etc.).
- **Base de datos (PostgreSQL):**

  Gestiona la persistencia de datos mediante JPA/Hibernate y mantiene integridad con migraciones versionadas a través de **Flyway**.


---

### 🔄 Flujo de interacción

1. El **usuario** inicia sesión en el frontend y obtiene un **JWT** válido tras autenticarse.
2. El **frontend (Vue)** envía peticiones HTTP al **backend** con el token en los headers (`Authorization: Bearer ...`).
3. **Spring Security** intercepta la petición:
    - Valida el **CORS** (si el origen está permitido).
    - Verifica la validez del **JWT**.
    - Comprueba los **roles y permisos** asociados al token para acceder al endpoint.
4. Si todo es válido, la petición fluye hacia:
    - **Controller** → recibe la solicitud.
    - **Service** → maneja la lógica de negocio.
    - **Repository** → se comunica con la base de datos.
5. La **respuesta JSON** retorna siguiendo el mismo flujo hasta el **frontend**, que actualiza la vista.

---

### 📐 Patrones importantes

- **MVC (Model-View-Controller):** separación en capas en el backend.
- **REST API:** recursos accesibles a través de endpoints bien definidos.
- **JWT (JSON Web Tokens):** autenticación y autorización de usuarios.
- **Spring Security:** validación de CORS, autenticación y roles en endpoints.
- **ORM con JPA/Hibernate:** mapeo objeto-relacional.
- **Migraciones con Flyway:** versionado de la base de datos.

## ✅ Requisitos del Proyecto

Para poder ejecutar el proyecto de manera local o dentro de contenedores, es necesario contar con el siguiente software instalado:

### 🔹 Dependencias principales

- **Node.js** (v18 o superior) → para ejecutar el frontend.
- **Gestor de paquetes**:
    - `pnpm` (recomendado, utilizado en este proyecto)
    - o alternativamente `npm` / `yarn`.
- **Java 17** → requerido por **Spring Boot**.
- **Maven** → para la gestión de dependencias y compilación del backend.
- **PostgreSQL** (base de datos principal).

### 🔹 Herramientas adicionales

- **Docker** → permite ejecutar el proyecto en contenedores.
- **Docker Compose** → orquesta los servicios (frontend, backend, base de datos).

📦 En este proyecto se usa un archivo **docker-compose.yml** para levantar los servicios de manera conjunta, además de configuraciones específicas en archivos individuales para:

- `frontend`
- `backend`
- `database`

De esta manera, basta con ejecutar:

```bash
docker compose up --build

```

para iniciar toda la aplicación con un solo comando.

## ⚡ Instalación

### 🔹 Backend

1. **Clonar el repositorio**

    ```bash
    git clone https://github.com/DanielPalacioss/e-commerce
    cd e-commerce_backend
    
    ```

2. **Configurar variables de entorno**

   Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

    ```
    # DATABASE
    DB_NAME=db
    DB_USER=admin
    DB_PASSWORD=admin
   
   # PARA DOCKER USAR ESTE VALOR
    DB_HOST:postgres
   
   # PARA LOCAL USAR ESTE VALOR
    DB_HOST=localhost
    
    
    # CLOUDINARY
    CLOUDINARY_CLOUD_NAME=doilmxhua
    CLOUDINARY_API_KEY=455412265425866
    CLOUDINARY_API_SECRET=pf_vkArKfhLRF5lO5A8d_IFCZRg
    
    # JWT
    JWT_SECRET_KEY=f3662cd21b11c8c6410707432eddcc4551fec927ba538700b204108220dc8c93
    JWT_EXPIRATION_MILLISECOND=3600000
    JWT_REFRESH_EXPIRATION_MILLISECOND=3600000
    
    # CORS
    CORS_ALLOWED_ORIGINS="http://localhost:3000,http://localhost:5173,http://localhost:8080"
    CORS_ALLOWED_METHODS="GET,POST,PUT,DELETE,PATCH,OPTIONS"
    
    # PREFIX
    API_PREFIX=/api/v1/
    
    ```

3. **Instalar dependencias**

    ```bash
    ./mvnw clean install
    
    ```

4. **Ejecutar el proyecto**

    ```bash
    ./mvnw spring-boot:run
    
    ```


---

### 🔹 Frontend

1. **Clonar el repositorio**

    ```bash
    git clone https://github.com/DanielPalacioss/e-commerce
    cd frontend
    
    ```

2. **Configurar variables de entorno**

   Crear un archivo `.env` con:

    ```
    VITE_API_URL=http://localhost:8080/api/v1
    
    ```

3. **Instalar dependencias**

    ```bash
    pnpm install
    # o
    npm install
    
    ```

4. **Ejecutar el proyecto en desarrollo**

    ```bash
    pnpm run dev
    # o
    npm run dev
    
    ```


---

## 🐳 Instalación con Docker Compose

Este proyecto está preparado para ejecutarse con **Docker Compose**.

1. Clonar el repositorio completo (que contiene `docker-compose.yml`).
2. Crear el archivo `.env` en la raíz del proyecto (usando las variables anteriores).
3. Levantar los servicios:

    ```bash
    docker compose up --build
    ```


Esto iniciará:

- `backend` en [**http://localhost:8080**](http://localhost:8080/)
- `frontend` en [**http://localhost:5173**](http://localhost:5173/)
- `postgres` en **localhost:5432**

---

## 👤 Usuarios por defecto

Se incluyen usuarios semilla para facilitar pruebas locales:

- **Admin**
    - Username: `admin123`
    - Password: `admin123`
    - Roles: `ROLE_ADMIN`

- **Cliente**
    - Username: `client123`
    - Password: `client123`
    - Roles: `ROLE_CLIENT`


### 🔹 Endpoints importantes del Backend

| Método | Endpoint | Descripción | Requiere Auth |
| --- | --- | --- | --- |
| **POST** | `/auth/login` | Inicia sesión y devuelve un **JWT** | ❌ |
| **POST** | `/auth/register` | Registro de nuevo usuario | ❌ |
| **GET** | `/products` | Lista todos los productos con filtros/paginación | ❌ |
| **POST** | `/products` | Crea un nuevo producto (solo **ADMIN**) | ✅ |
| **PATCH** | `/products/{id}` | Actualiza un producto (solo **ADMIN**) | ✅ |
| **DELETE** | `/products/{id}` | Desactiva/elimina un producto (solo **ADMIN**) | ✅ |
| **GET** | `/orders/me` | Lista pedidos del usuario autenticado | ✅ |
| **POST** | `/orders` | Crea una nueva orden | ✅ |
| **PATCH** | `/orders/{id}/cancel` | Cancela un pedido pendiente | ✅ |
| **GET** | `/invoices/me` | Consulta facturas del usuario | ✅ |
| **GET** | `/user-addresses` | Lista direcciones de envío del usuario | ✅ |
| **POST** | `/user-addresses` | Agrega una nueva dirección (máx. 3 por usuario) | ✅ |
| **PATCH** | `/user-addresses/{id}` | Edita una dirección existente | ✅ |
| **DELETE** | `/user-addresses/{id}` | Elimina una dirección | ✅ |

👉 Los endpoints están protegidos con **JWT + Roles** (`ROLE_USER`, `ROLE_ADMIN`), y el **CORS** está configurado para aceptar únicamente orígenes permitidos definidos en las variables de entorno.

---

### 🔹 Funcionalidades principales del Frontend

El **cliente en Vue 3 + shadcn-vue** implementa:

- **Autenticación de usuarios**:
    - Login y registro con JWT.
    - Gestión automática de tokens y refresco.
- **Gestión de productos**:
    - Listado de productos con tabla dinámica.
    - Filtros, paginación y búsqueda.
    - Creación, edición, desactivación/activación de productos (solo ADMIN).
- **Carrito de compras**:
    - Añadir productos al carrito.
    - Calcular totales dinámicamente.
    - Checkout con selección de dirección de envío.
- **Órdenes**:
    - Listado de pedidos del usuario.
    - Redirección a **Billing** en pedidos pendientes.
    - Cancelación de órdenes activas.
- **Facturación (Invoices)**:
    - Visualización de facturas propias.
- **Direcciones de envío**:
    - CRUD de direcciones (máx. 3 por usuario).
- **UI moderna y responsiva**:
    - Construida con **shadcn-vue + Tailwind CSS**.
    - Iconografía con **lucide-vue-next**.

## 📑 API Documentation

La API cuenta con documentación automática generada con **Swagger**.

Puedes acceder desde:

```
http://localhost:8080/api/v1/docs

```

Ahí encontrarás:

- Listado completo de **endpoints disponibles**.
- Métodos HTTP soportados (GET, POST, PUT, PATCH, DELETE).
- Parámetros requeridos y opcionales.
- Estructura del **body en JSON**.
- Respuestas esperadas con ejemplos.

📌 Si prefieres, también puedes importar la colección en **Postman** o acceder directamente al **Swagger UI** para probar los endpoints.

Dentro de la carpeta `doc/` se incluyen diagramas que explican las interacciones y transacciones:

- `doc/sequence_diagram/` → Diagramas de secuencia de las principales operaciones (ejemplo: creación de orden, actualización de producto).
- `doc/transactions/` → Explicación de transacciones **ACID** implementadas en el sistema.
- `doc/software_architecture_pattern.puml` → Patrón de arquitectura de software utilizado.
- `doc/entity_relationship_model.png` → Diagrama entidad-relación (ERD).

---

## 🗄️ Base de Datos

El sistema utiliza **PostgreSQL** como motor de base de datos.

### 🔹 Modelo Entidad-Relación (ERD)

### 🔹 Tablas principales y relaciones

- **auth_users**: usuarios de la aplicación (datos personales, credenciales, roles).
- **auth_user_addresses**: direcciones de envío relacionadas a un usuario (máximo 3).
- **inventory_products**: catálogo de productos disponibles.
- **inventory_product_stocks**: control de stock asociado a cada producto.
- **sales_orders**: pedidos realizados por los usuarios.
- **sales_order_items**: detalle de los productos en cada pedido.
- **sales_invoices**: facturación de los pedidos.

### 🔹 Relaciones clave

- Un **usuario** puede tener varias **direcciones** (`auth_users → auth_user_addresses`).
- Un **usuario** puede realizar múltiples **órdenes** (`auth_users → sales_orders`).
- Una **orden** puede incluir varios **items** (`sales_orders → sales_order_items`).
- Una **orden** genera una **factura** (`sales_orders → sales_invoices`).
- Un **producto** pertenece al catálogo (`inventory_products`) y tiene asociado su **stock** (`inventory_product_stocks`).

### 🔹 Tipos de datos importantes

- **UUID**: usado como identificador principal en la mayoría de tablas.
- **numeric(10,2)**: para precios y totales.
- **boolean**: estado de productos (activo/inactivo).
- **timestamp**: trazabilidad de creación y actualización.

## 🚀 Uso

### 🔹 Acceso a la aplicación

- **Frontend**:

  Una vez levantado el proyecto (ya sea en local o con Docker), accede desde tu navegador a:

    ```
    http://localhost:5173   # en modo desarrollo con Vite
    ```

- **Backend (API REST)**:

  La API estará disponible en:

    ```
    http://localhost:8080/api/v1
    
    ```


Además, la documentación automática de la API con OPEN-API se puede consultar en:

```
http://localhost:8080/api/v1/docs

```
## 🧪 Ejecución de pruebas

El proyecto cuenta con pruebas automatizadas implementadas con **JUnit 5** y **Mockito**.

### 🔹 Backend
Para ejecutar los tests del backend:

```bash
  ./mvnw test
```

## 📝 Decisiones de Diseño y Justificación

### Uso de **shadcn-vue**

Se eligió **shadcn-vue** como librería de componentes por su flexibilidad, accesibilidad y diseño moderno. Esto permitió construir una interfaz limpia y consistente, con componentes reutilizables que reducen la duplicación de código y facilitan la mantenibilidad del frontend.

---

### Organización por módulos (Product, Order, Auth, etc.)

En lugar de seguir la estructura clásica de `service/`, `repository/`, `controller/` y `entity/`, se decidió agrupar la lógica dentro de **módulos funcionales** (`product/`, `order/`, `auth/`).

Este enfoque modular ofrece:

- Mayor **cohesión** al tener toda la lógica de un dominio en un mismo lugar.
- Escalabilidad, ya que nuevos módulos pueden añadirse sin afectar los existentes.
- Claridad para el equipo, que puede ubicar rápidamente los archivos relacionados a una misma funcionalidad.

---

### Creación del módulo **shared/**

Se creó la carpeta `shared/` para concentrar configuraciones y utilidades transversales al sistema:

- **Cloudinary**: para la gestión centralizada de imágenes en la nube.
- **Spring Security + JWT Filter**: configuración de autenticación y autorización.
- **Configuraciones comunes** (CORS, validaciones, etc.).

Esto evita duplicación de código, mejora la reutilización y mantiene un único punto de mantenimiento para servicios globales.

---

### Uso de **Cloudinary**

Se eligió **Cloudinary** para almacenar y servir imágenes de productos debido a:

- Su **escalabilidad** y soporte de CDN.
- Optimización automática de imágenes (formatos, compresión).
- Facilidad de integración con Spring Boot.

  De esta manera, el backend no se sobrecarga con almacenamiento pesado y la entrega de imágenes al frontend es mucho más rápida.


---

### Principios **ACID**

La aplicación garantiza **transacciones ACID** en operaciones críticas (creación de órdenes, facturación, actualización de stock):

- **Atomicidad:** las operaciones de orden y factura ocurren completas o no ocurren.
- **Consistencia:** las reglas de negocio y restricciones de integridad se mantienen.
- **Aislamiento:** múltiples usuarios pueden comprar sin interferirse.
- **Durabilidad:** los datos confirmados persisten incluso ante fallos.

Esto asegura confiabilidad en procesos financieros y de inventario.

---

### Manejo del problema **N+1**

Para evitar el problema de consultas **N+1** (muy común en JPA/Hibernate):

- Se implementaron **`fetch joins`** en las consultas más críticas.
- Se utilizaron **proyecciones DTO** para traer solo los campos necesarios.
- Se configuró **`EntityGraph`** en casos puntuales.

Con estas prácticas, se optimizó el rendimiento al reducir la cantidad de queries generadas y minimizar el acceso innecesario a la base de datos.