// CMS v4.0 - Sistema completo de gestión de noticias con UTF-8 support
const CMS = {
  GITHUB_API: 'https://api.github.com/repos/RandyCorrea/noticias/contents',
  OWNER: 'RandyCorrea',
  REPO: 'noticias',

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.setupEventListeners();
      this.loadArticles();
    });
  },

  setupEventListeners() {
    const titleInput = document.getElementById('title');
    if (titleInput) titleInput.addEventListener('input', () => this.generateSlug());

    const contentType = document.getElementById('contentType');
    if (contentType) contentType.addEventListener('change', () => this.toggleContentFields());

    const avatarFile = document.getElementById('avatarFile');
    if (avatarFile) avatarFile.addEventListener('change', () => this.previewAvatar());

    const imageFile = document.getElementById('imageFile');
    if (imageFile) imageFile.addEventListener('change', () => this.previewImage());
  },

  generateSlug() {
    const title = document.getElementById('title')?.value || '';
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const display = document.getElementById('slugDisplay');
    if (display) display.textContent = slug ? `Slug: ${slug}` : 'Se generará automáticamente';
  },

  toggleContentFields() {
    const type = document.getElementById('contentType')?.value;
    const imageGroup = document.getElementById('imageGroup');
    const youtubeGroup = document.getElementById('youtubeGroup');
    if (imageGroup) imageGroup.style.display = type === 'video' ? 'none' : 'block';
    if (youtubeGroup) youtubeGroup.style.display = type === 'video' ? 'block' : 'none';
  },

  previewAvatar() {
    const file = document.getElementById('avatarFile')?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => this.convertAndStore(e.target.result, 'avatar');
      reader.readAsDataURL(file);
    }
  },

  previewImage() {
    const file = document.getElementById('imageFile')?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => this.convertAndStore(e.target.result, 'image');
      reader.readAsDataURL(file);
    }
  },

  convertAndStore(dataUrl, type) {
    sessionStorage.setItem(`${type}_data`, dataUrl);
    this.showMessage(`Imagen ${type} cargada`, 'success');
  },

  async publishArticle() {
    const token = document.getElementById('token')?.value;
    if (!token) return this.showMessage('GitHub Token requerido', 'error');

    const title = document.getElementById('title')?.value;
    const content = document.getElementById('content')?.value;
    const excerpt = document.getElementById('excerpt')?.value;

    if (!title || !content || !excerpt) return this.showMessage('Llena todos los campos', 'error');

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const htmlContent = this.generateArticleHTML(title, content, excerpt, slug);

    await this.uploadToGithub(token, `posts/${slug}.html`, htmlContent);
    this.clearForm();
  },

  generateArticleHTML(title, content, excerpt, slug) {
    const authorName = document.getElementById('author')?.value || 'Randy Correa';
    const authorHandle = document.getElementById('handle')?.value || '@RandyCorrea';
    const avatarUrl = document.getElementById('avatar')?.value || sessionStorage.getItem('avatar_data') || 'https://via.placeholder.com/32';
    const contentType = document.getElementById('contentType')?.value || 'text';
    
    let mediaHTML = '';
    if (contentType === 'video') {
      const youtubeId = document.getElementById('youtubeId')?.value;
      if (youtubeId) {
        mediaHTML = `<div class="px-4 py-3"><iframe class="relative w-full pb-56.25 bg-black rounded-lg overflow-hidden" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/${youtubeId}"></iframe></div>`;
      }
    } else {
      const imageUrl = document.getElementById('image')?.value || sessionStorage.getItem('image_data');
      if (imageUrl) {
        mediaHTML = `<img src="${imageUrl}" alt="${title}" class="w-full rounded-lg">`;
      }
    }

    const initials = authorName.split(' ').map(n => n[0]).join('').toUpperCase();

    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - RandyCorrea</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${excerpt}">
  <meta property="og:type" content="article">
</head>
<body class="bg-white">
  <div class="min-h-screen flex justify-center">
    <div class="w-full max-w-md bg-white border-x border-gray-200 pb-56.25">
      <header class="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-2">
        <span class="text-xl font-bold italic">${authorName}</span>
        <button onclick="window.location.href='/noticias/'" class="text-gray-500 hover:text-gray-700 font-semibold">Volver</button>
      </header>

      <main class="pb-16">
        <div class="px-4 py-3 flex justify-between items-center border-b border-gray-200">
          <div class="flex items-center gap-3">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">${initials}</div>
            <div>
              <p class="font-semibold text-sm">${authorName}</p>
              <p class="text-xs text-gray-500">${authorHandle}</p>
            </div>
          </div>
        </div>

        ${mediaHTML}

        <div class="px-4 py-3 border-b border-gray-200">
          <h1 class="text-xl font-bold mb-2">${title}</h1>
          <p class="text-sm text-gray-600">${excerpt}</p>
        </div>

        <div class="px-4 py-3 text-sm text-gray-700">${content}</div>

        <div class="px-4 py-3 text-center">
          <a href="/noticias/" class="text-blue-500 hover:text-blue-700 font-semibold">← Volver a Noticias</a>
        </div>
      </main>
    </div>
  </div>
</body>
</html>`;
  },

  async uploadToGithub(token, path, content) {
    try {
      this.showMessage('Publicando...', 'info');
      
      // Convertir a UTF-8 usando TextEncoder y luego a base64
      const encoder = new TextEncoder();
      const data = encoder.encode(content);
      const binaryString = Array.from(data).map(b => String.fromCharCode(b)).join('');
      const base64 = btoa(binaryString);

      const response = await fetch(`${this.GITHUB_API}/${path}`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Nuevo artículo: ${path}`,
          content: base64,
          branch: 'main',
        }),
      });

      if (response.ok) {
        this.showMessage('✅ Artículo publicado exitosamente', 'success');
        setTimeout(() => window.location.reload(), 2000);
      } else {
        const error = await response.json();
        this.showMessage(`❌ Error: ${error.message || 'No se pudo publicar'}`, 'error');
      }
    } catch (err) {
      this.showMessage(`❌ Error: ${err.message}`, 'error');
    }
  },

  async loadArticles() {
    try {
      const response = await fetch('https://raw.githubusercontent.com/RandyCorrea/noticias/main/news-data.json');
      const data = await response.json();
      const newsList = document.getElementById('articlesList');
      
      if (newsList && data.articles) {
        newsList.innerHTML = data.articles.map(article => `
          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 class="text-lg font-bold mb-2">${article.title}</h3>
            <p class="text-sm text-gray-600 mb-3">Slug: ${article.slug}</p>
            <div class="flex gap-2">
              <button onclick="CMS.editArticle('${article.slug}')" class="btn btn-primary px-3 py-2 text-sm bg-blue-600 text-white rounded">✏️ Editar</button>
              <button onclick="CMS.deleteArticle('${article.slug}')" class="btn btn-danger px-3 py-2 text-sm bg-red-600 text-white rounded">🗑️ Eliminar</button>
            </div>
          </div>
        `).join('');
      }
    } catch (err) {
      console.log('No hay articles data aún');
    }
  },

  editArticle(slug) {
    this.showMessage(`📝 Función en desarrollo: Editar ${slug}`, 'info');
    // TODO: Implementar edición
  },

  deleteArticle(slug) {
    if (confirm(`¿Eliminar artículo ${slug}? Esta acción no se puede deshacer.`)) {
      this.showMessage(`🗑️ Función en desarrollo: Eliminar ${slug}`, 'info');
      // TODO: Implementar eliminación con GitHub API
    }
  },

  showMessage(msg, type = 'info') {
    const messageEl = document.getElementById('publishMessage');
    if (messageEl) {
      messageEl.textContent = msg;
      messageEl.className = `p-3 rounded mb-4 ${type === 'success' ? 'bg-green-50 text-green-700 border border-green-300' : type === 'error' ? 'bg-red-50 text-red-700 border border-red-300' : 'bg-blue-50 text-blue-700 border border-blue-300'}`;
    }
  },

  clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    document.getElementById('excerpt').value = '';
    document.getElementById('image').value = '';
    document.getElementById('youtubeId').value = '';
    sessionStorage.removeItem('image_data');
    sessionStorage.removeItem('avatar_data');
  }
};

// Inicializar cuando el DOM está listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => CMS.init());
} else {
  CMS.init();
}
