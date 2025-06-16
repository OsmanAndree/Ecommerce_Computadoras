# TechStore - Ecommerce de Tecnología

## Descripción
TechStore es una tienda en línea especializada en computadoras, laptops, componentes y accesorios tecnológicos. El proyecto incluye un diseño moderno y responsivo con funcionalidades completas de ecommerce.

## Páginas del Proyecto

### 1. Página de Inicio (`index.html`)
- Hero banner con llamadas a la acción
- Categorías destacadas
- Productos en oferta
- Newsletter
- Navegación completa
- **Carrito sincronizado** con todas las páginas

### 2. Página de Login (`login.html`)
- Formulario de inicio de sesión
- Validación en tiempo real
- Opciones de login social
- Diseño moderno y accesible

### 3. Página de Catálogo (`catalogo.html`)
- Catálogo completo de productos
- Sistema de filtros avanzado:
  - Filtro por rango de precio
  - Filtro por categoría
  - Filtro por marca
  - Filtro por calificación
- Búsqueda en tiempo real
- Ordenamiento de productos
- Vista en grid y lista
- Paginación
- Funcionalidad de carrito
- Diseño responsivo

### 4. Página del Carrito (`carrito.html`)
- Gestión completa del carrito de compras
- Lista de productos con controles de cantidad
- Resumen de orden con cálculos automáticos
- Sistema de cupones de descuento
- Opciones de envío (Estándar, Express, Nocturno)
- Proceso de checkout simulado
- Persistencia de datos en localStorage
- Diseño responsivo y moderno

## 🔧 Sistema de Carrito Unificado

### Problema Resuelto
**Antes**: El carrito funcionaba diferente en el index vs el catálogo
- Index: Sin persistencia, se reseteaba al recargar
- Catálogo: Con localStorage y persistencia completa

**Solución**: Sistema unificado con `cart-utils.js`
- **Funcionalidad compartida** entre todas las páginas
- **Persistencia consistente** en localStorage
- **Sincronización automática** del contador
- **Comportamiento uniforme** en toda la aplicación

### Archivos del Sistema de Carrito
- **`cart-utils.js`**: Funcionalidad compartida del carrito
- **`script.js`**: Funcionalidad específica del index (usando utilidades)
- **`catalogo.js`**: Funcionalidad específica del catálogo (usando utilidades)
- **`carrito.js`**: Funcionalidad específica del carrito (usando utilidades)

## Características del Carrito

### Gestión de Productos
- **Agregar/Remover productos** desde cualquier página
- **Control de cantidades** con botones +/- 
- **Cálculo automático** de subtotales y totales
- **Persistencia local** de los datos del carrito
- **Sincronización** entre todas las páginas
- **Contador actualizado** en tiempo real

### Sistema de Cupones
- **WELCOME10**: 10% de descuento (mínimo $50)
- **SAVE20**: 20% de descuento (mínimo $100)
- **FREESHIP**: $15 de descuento fijo (mínimo $75)
- **TECH25**: 25% de descuento (mínimo $200)

### Opciones de Envío
- **Envío Estándar**: Gratis (5-7 días hábiles)
- **Envío Express**: $15 (2-3 días hábiles)
- **Envío Nocturno**: $25 (1 día hábil)

### Funcionalidades Avanzadas
- **Cálculo automático** de descuentos y totales
- **Validación de cupones** en tiempo real
- **Mensajes de feedback** para todas las acciones
- **Confirmación** antes de vaciar el carrito
- **Simulación de checkout** con limpieza automática
- **Auto-guardado** cada 30 segundos

## Características del Catálogo

### Filtros Disponibles
- **Rango de Precio**: Slider interactivo con inputs manuales
- **Categorías**: Gaming, Oficina, Escritorio, Componentes, Accesorios
- **Marcas**: ASUS, Dell, HP, Lenovo, Apple
- **Calificación**: Filtro por estrellas (3, 4, 5 estrellas)

### Funcionalidades
- **Búsqueda**: Búsqueda en tiempo real por título y descripción
- **Ordenamiento**: Por relevancia, precio, calificación y fecha
- **Vista**: Cambio entre vista de grid y lista
- **Paginación**: Navegación por páginas con 8 productos por página
- **Carrito**: Agregar productos al carrito con persistencia local
- **Favoritos**: Botón para agregar a lista de deseos
- **Vista Rápida**: Modal para ver detalles del producto

### Diseño Responsivo
- **Desktop**: Layout de dos columnas con sidebar de filtros
- **Tablet**: Layout adaptativo con filtros colapsables
- **Mobile**: Layout de una columna optimizado para móviles

## Archivos del Proyecto

### HTML
- `index.html` - Página principal
- `login.html` - Página de inicio de sesión
- `catalogo.html` - Página de catálogo de productos
- `carrito.html` - Página del carrito de compras

### CSS
- `styles.css` - Estilos principales del proyecto

### JavaScript
- `cart-utils.js` - **Funcionalidad compartida del carrito**
- `script.js` - Funcionalidad de la página principal
- `login.js` - Funcionalidad de login
- `catalogo.js` - Funcionalidad del catálogo
- `carrito.js` - Funcionalidad del carrito

### Imágenes
- `img/` - Carpeta con imágenes de productos y assets

## Tecnologías Utilizadas
- HTML5
- CSS3 (con variables CSS y gradientes)
- JavaScript ES6+
- Font Awesome (iconos)
- Google Fonts (Inter)
- localStorage (persistencia de datos)

## Características de Diseño
- Gradientes modernos
- Animaciones suaves
- Efectos hover interactivos
- Sombras y efectos de profundidad
- Paleta de colores consistente
- Tipografía legible y moderna

## Funcionalidades del Carrito
- Persistencia en localStorage
- Contador de productos sincronizado
- Animaciones de feedback
- Notificaciones de estado
- Cálculos automáticos
- Sistema de cupones
- Opciones de envío
- Proceso de checkout
- **Sistema unificado** entre todas las páginas

## Instalación y Uso
1. Clona o descarga el proyecto
2. Abre `index.html` en tu navegador
3. Navega entre las páginas usando el menú
4. Explora el catálogo con todos sus filtros
5. Agrega productos al carrito desde cualquier página
6. Prueba la funcionalidad completa del carrito
7. **Verifica la sincronización** entre páginas

## Navegación
- **Inicio**: Página principal con productos destacados
- **Catálogo**: Catálogo completo con filtros avanzados
- **Carrito**: Gestión completa del carrito de compras
- **Login**: Página de autenticación

## Flujo de Compra
1. **Explorar**: Navegar por el catálogo con filtros
2. **Agregar**: Añadir productos al carrito desde cualquier página
3. **Revisar**: Ver productos en el carrito
4. **Aplicar**: Usar cupones de descuento
5. **Enviar**: Seleccionar opción de envío
6. **Pagar**: Proceder al checkout

## ✅ Problemas Resueltos

### Consistencia del Carrito
- **Antes**: Comportamiento diferente entre páginas
- **Después**: Sistema unificado con `cart-utils.js`
- **Beneficios**: 
  - Persistencia consistente
  - Sincronización automática
  - Funcionalidad uniforme
  - Mantenimiento simplificado

## Notas de Desarrollo
- El proyecto está optimizado para navegadores modernos
- Utiliza CSS Grid y Flexbox para layouts
- JavaScript modular y bien estructurado
- Código comentado para fácil mantenimiento
- Persistencia de datos en localStorage
- Sincronización entre páginas
- **Sistema de carrito unificado** para consistencia 