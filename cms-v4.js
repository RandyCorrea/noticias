// CMS v4.0 - Sistema completo de gestión de noticias
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
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
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
    const token = document.getElementById('githubToken')?.value;
    if (!token) return this.showMessage('GitHub Token requerido', 'error');
    
    const title = document.getElementById('title')?.value;
    const content = document.getElementById('content')?.value;
    const excerpt = document.getElementById('excerpt')?.value;
    
    if (!title || !content || !excerpt) return this.showMessage('Llena todos los campos', 'error');
    
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const htmlContent = this.generateArticleHTML(title, content, excerpt, slug);
    
    await this.uploadToGithub(token, `posts/${slug}.html`, htmlContent);
    this.clearForm();
  },
  
  generateArticleHTML(title, content, excerpt, slug) {
    const authorName = document.getElementById('authorName')?.value || 'Randy Correa';
    const authorHandle = document.getElementById('authorHandle')?.value || '@RandyCorrea';
    const avatarUrl = document.getElementById('avatarUrl')?.value || 'https://via.placeholder.com/80';
    const contentType = document.getElementById('contentType')?.value || 'text';
    
    let mediaHTML = '';
    if (contentType === 'video') {
      const youtubeId = document.getElementById('youtubeId')?.value;
      mediaHTML = `<div class="relative w-full pb-56.25 bg-black rounded-lg overflow-hidden">
        <iframe class="absolute inset-0 w-full h-full" src="https://www.youtube.com/embed/${youtubeId}" allowfullscreen></iframe>
      </div>`;
    } else {
      const imageUrl = document.getElementById('imageUrl')?.value || sessionStorage.getItem('image_data');
      if (imageUrl) mediaHTML = `<img src="${imageUrl}" alt="${title}" class="w-full rounded-lg" />`;
    }
    
    const initials = authorName.split(' ').map(n => n[0]).join('').toUpperCase();
    
    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - RandyCorrea</title>
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${excerpt}">
  <meta property="og:type" content="article">
  <script src="https://cdn.tailwindcss.com"><\/script>
</head>
<body class="bg-white">
  <div class="min-h-screen flex justify-center">
    <div class="w-full max-w-md bg-white border-x border-gray-200">
      <header class="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between">
        <span class="text-xl font-bold italic">RandyCorrea</span>
        <button onclick="window.location.href='/noticias/'" class="text-gray-500 hover:text-black text-2xl">✕</button>
      </header>
      
      <main class="pb-16">
        <div class="px-4 py-3 flex justify-between items-center border-b border-gray-200">
          <div class="flex items-center gap-3">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: url('${avatarUrl}'); background-size: cover; background-position: center;"></div>
            <div>
              <p class="font-semibold text-sm">${authorName}</p>
              <p class="text-xs text-gray-500">${authorHandle}</p>
            </div>
          </div>
        </div>
        
        <div class="px-4 py-4">${mediaHTML}</div>
        
        <div class="px-4 py-3 border-b border-gray-200">
          <h1 class="text-xl font-bold mb-2">${title}</h1>
          <p class="text-sm text-gray-600">${excerpt}</p>
        </div>
        
        <div class="px-4 py-4 text-sm text-gray-700">${content}</div>
        
        <div class="px-4 py-4 text-center">
          <a href="/noticias/" class="text-blue-500 hover:text-blue-700 font-semibold text-sm">← Volver a noticias</a>
        </div>
      </main>
    </div>
  </div>
  <style>.pb-56\\.25 { padding-bottom: 56.25%; position: relative; }</style>
</body>
</html>`;
  },
  
  async uploadToGithub(token, path, content) {
    try {
      const response = await fetch(`${this.GITHUB_API}/${path}`, {
        method: 'PUT',
        headers: { 'Authorization': `token ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Publicar: ${path}`,
          content: btoa(content),
          branch: 'main'
        })
      });
      if (response.ok) this.showMessage('✅ Artículo publicado!', 'success');
    } catch (e) {
      this.showMessage('Error: ' + e.message, 'error');
    }
  },
  
  async loadArticles() {
    const list = document.getElementById('newsList');
    if (!list) return;
    list.innerHTML = '<p>Cargando...</p>';
    try {
      const resp = await fetch(`https://raw.githubusercontent.com/${this.OWNER}/${this.REPO}/main/news-data.json`);
      const data = await resp.json();
      list.innerHTML = (data.news || []).map(article => `
        <div class="news-item">
          <h3>${article.title}</h3>
          <p class="text-gray-600">Slug: ${article.slug}</p>
          <div class="news-item-actions">
            <button class="btn btn-small" onclick="CMS.editArticle('${article.slug}')">✏️ Editar</button>
            <button class="btn btn-small btn-danger" onclick="CMS.deleteArticle('${article.slug}')">🗑️ Eliminar</button>
          </div>
        </div>
      `).join('');
    } catch (e) {
      list.innerHTML = `<p class="error">Error: ${e.message}</p>`;
    }
  },
  
  editArticle(slug) {
    alert('Función de edición en desarrollo');
  },
  
  deleteArticle(slug) {
    alert('Función de eliminación en desarrollo');
  },
  
  showMessage(msg, type) {
    const msgDiv = document.getElementById('message') || document.createElement('div');
    msgDiv.id = 'message';
    msgDiv.className = type === 'error' ? 'error' : 'success';
    msgDiv.textContent = msg;
    document.body.appendChild(msgDiv);
    setTimeout(() => msgDiv.remove(), 3000);
  },
  
  clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    document.getElementById('excerpt').value = '';
    document.getElementById('imageUrl').value = '';
    document.getElementById('youtubeId').value = '';
    this.generateSlug();
  }
};

CMS.init();
