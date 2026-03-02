<template>
  <div class="min-h-screen bg-base-100 text-white pt-10 pb-12">
    <div class="max-w-7xl mx-auto px-6">
      
      <button @click="$router.back()" class="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Voltar</span>
      </button>

      <header class="mb-10">
        <h2 class="text-4xl font-bold mb-2">Gerenciar Vídeos</h2>
        <p class="text-gray-400">Adicione novos vídeos à plataforma ou gerencie os existentes</p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <section class="lg:col-span-5 bg-[#1a1a1a] p-8 rounded-2xl border border-white/5 shadow-xl">
          <div class="flex items-center gap-3 mb-8">
            <div class="bg-error p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 class="text-xl font-bold">Adicionar Novo Vídeo</h3>
          </div>

          <div class="space-y-4">
            <div class="form-control">
              <label class="label text-xs font-bold text-gray-500 uppercase">Título</label>
              <input type="text" placeholder="Ex: A Última Fronteira" class="input input-bordered bg-zinc-900 focus:border-white w-full" />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="form-control">
                <label class="label text-xs font-bold text-gray-500 uppercase">Categoria</label>
                <select class="select select-bordered bg-zinc-900 w-full">
                  <option disabled selected>Selecione</option>
                  <option>Ação</option>
                  <option>Comédia</option>
                  <option>Ficção Científica</option>
                </select>
              </div>
              <div class="form-control">
                <label class="label text-xs font-bold text-gray-500 uppercase">Classificação</label>
                <select class="select select-bordered bg-zinc-900 w-full">
                  <option disabled selected>Selecione</option>
                  <option>L</option>
                  <option>12+</option>
                  <option>14+</option>
                  <option>18+</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="form-control">
                <label class="label text-xs font-bold text-gray-500 uppercase">Duração (min)</label>
                <input type="number" placeholder="120" class="input input-bordered bg-zinc-900 w-full" />
              </div>
              <div class="form-control">
                <label class="label text-xs font-bold text-gray-500 uppercase">Ano de Lançamento</label>
                <input type="number" placeholder="2026" class="input input-bordered bg-zinc-900 w-full" />
              </div>
            </div>

            <div class="form-control">
              <label class="label text-xs font-bold text-gray-500 uppercase">Descrição</label>
              <textarea placeholder="Uma breve descrição do vídeo..." class="textarea textarea-bordered bg-zinc-900 h-24 focus:border-white w-full"></textarea>
            </div>

            <div class="form-control">
              <label class="label text-xs font-bold text-gray-500 uppercase">URL da Thumbnail</label>
              <input type="text" placeholder="https://exemplo.com/imagem.jpg" class="input input-bordered bg-zinc-900 w-full" />
              <p class="text-[10px] text-gray-500 mt-1 italic">Use uma URL de imagem válida (Unsplash, etc.)</p>
            </div>

            <button class="btn btn-error w-full text-white font-bold mt-4">
              <span class="text-xl">+</span> Adicionar Vídeo
            </button>
          </div>
        </section>

        <section class="lg:col-span-7">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <div class="bg-error/20 p-2 rounded-lg text-error">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold">Vídeos Cadastrados</h3>
                <p class="text-xs text-gray-500">{{ videos.length }} vídeos no total</p>
              </div>
            </div>
          </div>

          <div class="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            <div v-for="video in videos" :key="video.id" 
                 class="flex items-center gap-4 bg-[#1a1a1a] p-3 rounded-xl border border-white/5 hover:bg-[#222] transition-colors">
              <img :src="video.thumb" class="w-24 h-16 object-cover rounded-lg flex-none" />
              <div class="flex-1 min-w-0">
                <h4 class="font-bold truncate">{{ video.titulo }}</h4>
                <div class="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-wider mt-1">
                  <span>{{ video.genero }}</span>
                  <span>•</span>
                  <span>{{ video.duracao }} min</span>
                  <span>•</span>
                  <span class="border border-gray-700 px-1 rounded">{{ video.classificacao }}</span>
                </div>
                <div class="flex items-center gap-3 text-xs text-gray-400 mt-1">
                  <span>{{ video.visualizacoes }} visualizações</span>
                  <span>•</span>
                  <span class="text-yellow-500">★ {{ video.nota }}</span>
                </div>
              </div>
              <button class="btn btn-ghost btn-sm text-error hover:bg-error/10">Remover</button>
            </div>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const videos = [
  { id: 1, titulo: "A Última Fronteira", genero: "Ação", duracao: 142, classificacao: "14+", visualizacoes: "15.420", nota: 4.7, thumb: "https://placehold.co/200x120" },
  { id: 2, titulo: "Sombras do Passado", genero: "Thriller", duracao: 118, classificacao: "16+", visualizacoes: "12.340", nota: 4.5, thumb: "https://placehold.co/200x120" },
  { id: 3, titulo: "Amigos Para Sempre", genero: "Comédia", duracao: 95, classificacao: "L", visualizacoes: "18.900", nota: 4.8, thumb: "https://placehold.co/200x120" },
  { id: 4, titulo: "Corações Entrelaçados", genero: "Romance", duracao: 105, classificacao: "12+", visualizacoes: "14.560", nota: 4.6, thumb: "https://placehold.co/200x120" },
  { id: 5, titulo: "Além do Horizonte", genero: "Ficção Científica", duracao: 156, classificacao: "12+", visualizacoes: "22.100", nota: 4.9, thumb: "https://placehold.co/200x120" },
  { id: 5, titulo: "Além do Horizonte", genero: "Ficção Científica", duracao: 156, classificacao: "12+", visualizacoes: "22.100", nota: 4.9, thumb: "https://placehold.co/200x120" },
  { id: 5, titulo: "Além do Horizonte", genero: "Ficção Científica", duracao: 156, classificacao: "12+", visualizacoes: "22.100", nota: 4.9, thumb: "https://placehold.co/200x120" },
  { id: 5, titulo: "Além do Horizonte", genero: "Ficção Científica", duracao: 156, classificacao: "12+", visualizacoes: "22.100", nota: 4.9, thumb: "https://placehold.co/200x120" },
  { id: 5, titulo: "Além do Horizonte", genero: "Ficção Científica", duracao: 156, classificacao: "12+", visualizacoes: "22.100", nota: 4.9, thumb: "https://placehold.co/200x120" },
  { id: 5, titulo: "Além do Horizonte", genero: "Ficção Científica", duracao: 156, classificacao: "12+", visualizacoes: "22.100", nota: 4.9, thumb: "https://placehold.co/200x120" },
  { id: 5, titulo: "Além do Horizonte", genero: "Ficção Científica", duracao: 156, classificacao: "12+", visualizacoes: "22.100", nota: 4.9, thumb: "https://placehold.co/200x120" },
  { id: 5, titulo: "Além do Horizonte", genero: "Ficção Científica", duracao: 156, classificacao: "12+", visualizacoes: "22.100", nota: 4.9, thumb: "https://placehold.co/200x120" },
];
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e50914;
  border-radius: 10px;
}
</style>