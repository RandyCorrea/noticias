# 📰 Portal de Noticias - Sistema CMS para GitHub Pages

Sistema completo de gestión de noticias con CMS integrado que se aloja en GitHub Pages.

## 🌟 Características

- **CMS Integrado**: Interfaz web para escribir y publicar noticias
- **Subida de Imágenes**: Sube imágenes directamente desde el navegador
- **Actualización Automática**: Las noticias se actualizan automáticamente en GitHub Pages
- **Orden Cronológico**: Las noticias más recientes aparecen primero
- **Diseño Responsivo**: Se adapta perfectamente a móviles y escritorio
- **Modal de Lectura**: Vista completa de cada noticia en ventana modal

## 🚀 Cómo Usar

### 1. Activar GitHub Pages

1. Ve a **Settings** de tu repositorio
2. En el menú lateral, haz clic en **Pages**
3. En **Source**, selecciona la rama `main`
4. Haz clic en **Save**
5. Espera unos minutos y tu sitio estará disponible en: `https://randycorrea.github.io/noticias/`

### 2. Crear un Personal Access Token

Para que el CMS pueda publicar noticias automáticamente, necesitas un token de GitHub:

1. Ve a **Settings** de tu cuenta de GitHub
2. En el menú lateral, ve a **Developer settings**
3. Haz clic en **Personal access tokens** → **Tokens (classic)**
4. Haz clic en **Generate new token** → **Generate new token (classic)**
5. Dale un nombre descriptivo (ej: "CMS Noticias")
6. Selecciona el scope **repo** (acceso completo a repositorios)
7. Haz clic en **Generate token**
8. **¡IMPORTANTE!** Copia el token ahora, no podrás verlo de nuevo

### 3. Publicar una Noticia

1. Accede al CMS: `https://randycorrea.github.io/noticias/cms.html`
2. Completa el formulario:
   - **Título**: El título de tu noticia
   - **Contenido**: El texto completo de la noticia
   - **Imagen** (opcional): Selecciona una imagen desde tu computadora
   - **Token**: Pega tu Personal Access Token de GitHub
3. Haz clic en **Vista Previa** para ver cómo se verá
4. Haz clic en **Publicar Noticia**
5. Espera unos segundos y ¡listo!

### 4. Ver las Noticias

Accede a tu sitio web: `https://randycorrea.github.io/noticias/`

Las noticias aparecerán en orden cronológico (las más nuevas primero).

## 📝 Estructura del Proyecto

```
noticias/
├── index.html          # Página principal de noticias
├── cms.html            # Sistema de gestión de contenidos
├── news-data.json      # Base de datos de noticias (JSON)
├── images/             # Carpeta de imágenes
│   └── README.md
└── README.md
```

## 🔧 Cómo Funciona

1. **Escribes una noticia** en el CMS (`cms.html`)
2. El CMS convierte la imagen a Base64 y la sube a la carpeta `images/`
3. Crea un objeto JSON con los datos de la noticia
4. Actualiza el archivo `news-data.json` agregando la nueva noticia al inicio
5. GitHub Pages detecta los cambios y actualiza el sitio automáticamente
6. La página principal (`index.html`) lee el archivo JSON y muestra las noticias

## 🎨 Personalización

Puedes personalizar:

- **Colores**: Edita los gradientes en los archivos CSS
- **Tipografía**: Cambia las fuentes en el `font-family`
- **Diseño de tarjetas**: Modifica las clases `.news-card` en `index.html`
- **Layout del CMS**: Ajusta los estilos en `cms.html`

## ⚠️ Notas Importantes

- **Seguridad del Token**: Nunca compartas tu Personal Access Token públicamente
- **Guarda el token**: Guárdalo en un lugar seguro (administrador de contraseñas)
- **Tiempo de actualización**: GitHub Pages puede tardar 1-2 minutos en actualizarse
- **Formato de imágenes**: Se recomienda usar JPG o PNG, tamaño máximo 5MB

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
- **JavaScript Vanilla**: Lógica y funcionalidad
- **GitHub API**: Subida automática de archivos
- **GitHub Pages**: Hosting gratuito
- **JSON**: Almacenamiento de datos

## 🔗 Enlaces Útiles

- **Página Principal**: https://randycorrea.github.io/noticias/
- **CMS**: https://randycorrea.github.io/noticias/cms.html
- **Repositorio**: https://github.com/RandyCorrea/noticias

## 👍 Ventajas

✅ Sin base de datos necesaria  
✅ Sin servidor backend  
✅ Hosting gratuito con GitHub Pages  
✅ Totalmente funcional sin programación  
✅ Fácil de usar y mantener  
✅ Responsive y moderno  

---

**Creado con ❤️ para facilitar la publicación de noticias**