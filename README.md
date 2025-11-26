# 📰 Portal de Noticias - Sistema CMS para GitHub Pages

Sistema completo de gestión de noticias con CMS integrado, protegido con contraseña y diseño tipo Medium.

## 🌟 Características

- **🔒 CMS Protegido**: Acceso restringido con contraseña
- **✍️ Diseño tipo Medium**: Estética minimalista y elegante centrada en la lectura
- **📝 Editor Visual**: Interfaz web para escribir y publicar noticias
- **🖼️ Subida de Imágenes**: Sube imágenes directamente desde el navegador
- **🔄 Actualización Automática**: Las noticias se actualizan automáticamente en GitHub Pages
- **📅 Orden Cronológico**: Las noticias más recientes aparecen primero
- **📱 Diseño Responsivo**: Se adapta perfectamente a móviles y escritorio
- **📖 Tiempo de Lectura**: Calcula automáticamente el tiempo de lectura

## 🚀 Cómo Usar

### 1. Activar GitHub Pages

1. Ve a **Settings** de tu repositorio
2. En el menú lateral, haz clic en **Pages**
3. En **Source**, selecciona la rama `main`
4. Haz clic en **Save**
5. Espera unos minutos y tu sitio estará disponible en: `https://randycorrea.github.io/noticias/`

### 2. Acceder al CMS

1. Ve a: `https://randycorrea.github.io/noticias/cms.html`
2. Ingresa la contraseña (por defecto: **`admin2025`**)
3. ¡Listo! Ya puedes publicar noticias

**🔐 Cambiar la Contraseña:**

Para cambiar la contraseña del CMS:

1. Edita el archivo `cms.html` en GitHub
2. Busca la línea: `const CMS_PASSWORD = 'admin2025';`
3. Cambia `'admin2025'` por tu nueva contraseña
4. Guarda los cambios

### 3. Crear un Personal Access Token

Para que el CMS pueda publicar noticias automáticamente, necesitas un token de GitHub:

1. Ve a **Settings** de tu cuenta de GitHub
2. En el menú lateral, ve a **Developer settings**
3. Haz clic en **Personal access tokens** → **Tokens (classic)**
4. Haz clic en **Generate new token** → **Generate new token (classic)**
5. Dale un nombre descriptivo (ej: "CMS Noticias")
6. Selecciona el scope **repo** (acceso completo a repositorios)
7. Haz clic en **Generate token**
8. **¡IMPORTANTE!** Copia el token ahora, no podrás verlo de nuevo

### 4. Publicar una Noticia

1. Accede al CMS con tu contraseña
2. Completa el formulario:
   - **Título**: El título de tu noticia
   - **Contenido**: El texto completo de la noticia
   - **Imagen** (opcional): Selecciona una imagen desde tu computadora
   - **Token**: Pega tu Personal Access Token de GitHub
3. Haz clic en **Vista Previa** para ver cómo se verá
4. Haz clic en **Publicar Noticia**
5. Espera unos segundos y ¡listo!

### 5. Ver las Noticias

Accede a tu sitio web: `https://randycorrea.github.io/noticias/`

Las noticias aparecerán en un diseño elegante tipo Medium, con tiempo de lectura calculado automáticamente.

## 📝 Estructura del Proyecto

```
noticias/
├── index.html          # Página principal (diseño tipo Medium)
├── cms.html            # CMS protegido con contraseña
├── news-data.json      # Base de datos de noticias (JSON)
├── images/             # Carpeta de imágenes
│   └── README.md
├── README.md
└── GUIA_RAPIDA.md
```

## 🔧 Cómo Funciona

1. **Accedes al CMS** con contraseña (`cms.html`)
2. **Escribes una noticia** con título, contenido e imagen opcional
3. El CMS **convierte la imagen** a Base64 y la sube a la carpeta `images/`
4. **Crea un objeto JSON** con los datos de la noticia
5. **Actualiza** el archivo `news-data.json` agregando la nueva noticia al inicio
6. GitHub Pages **detecta los cambios** y actualiza el sitio automáticamente
7. La página principal lee el JSON y **muestra las noticias** con diseño tipo Medium

## 🎨 Características del Diseño

### Inspirado en Medium:

- **Tipografía elegante**: Uso de Merriweather para títulos e Inter para texto
- **Espaciado generoso**: Márgenes amplios para mejor legibilidad
- **Layout minimalista**: Diseño limpio centrado en el contenido
- **Imágenes destacadas**: Imágenes grandes y bien integradas
- **Tiempo de lectura**: Calcula automáticamente cuánto tarda leer cada artículo
- **Modal de lectura**: Vista completa sin distracciones
- **Colores neutros**: Paleta en blanco, negro y grises para enfoque en contenido

## 🔒 Seguridad

- **CMS protegido**: Acceso restringido con contraseña
- **Contraseña personalizable**: Fácil de cambiar editando el archivo
- **Sesión temporal**: La sesión se guarda solo mientras el navegador esté abierto
- **Token seguro**: El Personal Access Token nunca se guarda en el navegador

## ⚠️ Notas Importantes

- **Contraseña por defecto**: `admin2025` - ¡Cámbiala después de la primera instalación!
- **Seguridad del Token**: Nunca compartas tu Personal Access Token públicamente
- **Guarda el token**: Guárdalo en un lugar seguro (administrador de contraseñas)
- **Tiempo de actualización**: GitHub Pages puede tardar 1-2 minutos en actualizarse
- **Formato de imágenes**: Se recomienda usar JPG o PNG, tamaño máximo 5MB
- **Imágenes recomendadas**: 1200x800 px para mejor visualización

## 👨‍💻 Desarrollo Local

Para probar localmente:

```bash
# Necesitarás un servidor HTTP local
python -m http.server 8000
# o
npx http-server
```

Luego accede a `http://localhost:8000`

## 📚 Tecnologías Utilizadas

- **HTML5/CSS3**: Estructura y estilos
- **Google Fonts**: Merriweather e Inter para tipografía
- **JavaScript Vanilla**: Lógica y funcionalidad
- **GitHub API**: Subida automática de archivos
- **GitHub Pages**: Hosting gratuito
- **JSON**: Almacenamiento de datos

## 🔗 Enlaces Útiles

- **Página Principal**: https://randycorrea.github.io/noticias/
- **CMS**: https://randycorrea.github.io/noticias/cms.html
- **Repositorio**: https://github.com/RandyCorrea/noticias
- **Configuración de Pages**: https://github.com/RandyCorrea/noticias/settings/pages

## 👍 Ventajas

✅ Sin base de datos necesaria  
✅ Sin servidor backend  
✅ Hosting gratuito con GitHub Pages  
✅ CMS protegido con contraseña  
✅ Diseño elegante tipo Medium  
✅ Totalmente funcional sin programación  
✅ Fácil de usar y mantener  
✅ Responsive y moderno  
✅ Tiempo de lectura automático  

---

**Creado con ❤️ para facilitar la publicación de noticias con estilo**