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

          <form @submit.prevent="adicionarVideo" class="space-y-4">
            <div class="form-control">
              <label class="label text-xs font-bold text-gray-500 uppercase">Título</label>
              <input v-model="novoVideo.titulo" type="text" required placeholder="Ex: Interestelar" class="input input-bordered bg-zinc-900 focus:border-white w-full" />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="form-control">
                <label class="label text-xs font-bold text-gray-500 uppercase">Categoria</label>
                <select v-model="novoVideo.categoria" required class="select select-bordered bg-zinc-900 w-full capitalize">
                  <option value="" disabled>Selecione</option>
                  <option value="acao">Ação</option>
                  <option value="comedia">Comédia</option>
                  <option value="ficcao">Ficção Científica</option>
                  <option value="suspense">Suspense</option>
                  <option value="drama">Drama</option>
                  <option value="drama">Crime</option>
                </select>
              </div>
              <div class="form-control">
                <label class="label text-xs font-bold text-gray-500 uppercase">Duração (min)</label>
                <input v-model="novoVideo.duracao" type="number" required placeholder="120" class="input input-bordered bg-zinc-900 w-full" />
              </div>
            </div>

            <div class="form-control">
              <label class="label text-xs font-bold text-gray-500 uppercase">Descrição</label>
              <textarea v-model="novoVideo.descricao" required placeholder="Uma breve descrição..." class="textarea textarea-bordered bg-zinc-900 h-24 focus:border-white w-full"></textarea>
            </div>

            <div class="form-control">
              <label class="label text-xs font-bold text-gray-500 uppercase">URL da Thumbnail</label>
              <input v-model="novoVideo.img_url" type="text" required placeholder="https://..." class="input input-bordered bg-zinc-900 w-full" />
              <p class="text-[10px] text-gray-500 mt-1 italic">Use posters reais do IMDb ou TMDB.</p>
            </div>

            <button type="submit" class="btn btn-error w-full text-white font-bold mt-4" :disabled="loading">
              <span v-if="!loading" class="text-base">+ Adicionar Vídeo</span>
              <span v-else class="loading loading-spinner"></span>
            </button>
          </form>
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
            <div v-for="video in videos" :key="video._id" 
                 class="flex items-center gap-4 bg-[#1a1a1a] p-3 rounded-xl border border-white/5 hover:bg-[#222] transition-colors">
              
              <img :src="video.img_url" class="w-24 h-16 object-cover rounded-lg flex-none shadow-md" />
              
              <div class="flex-1 min-w-0">
                <h4 class="font-bold truncate text-base">{{ video.titulo }}</h4>
                
                <div class="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-wider mt-1">
                  <span class="text-error font-bold">{{ video.categoria }}</span>
                  <span>•</span>
                  <span>{{ video.duracao }} min</span>
                  <span>•</span>
                  <span class="border border-gray-700 px-1 rounded">HD</span>
                </div>

                <div class="flex items-center gap-3 text-xs text-gray-400 mt-1">
                  <span>{{ video.numero_views.toLocaleString() }} visualizações</span>
                  <span>•</span>
                  <span class="text-yellow-500 font-medium">★ {{ video.nota_media.toFixed(1) }}</span>
                </div>
              </div>

              <button @click="removerVideo(video._id)" class="btn btn-ghost btn-sm text-error hover:bg-error/10">
                Remover
              </button>
            </div>
            
            <div v-if="videos.length === 0" class="text-center py-10 text-gray-600 italic">
              Nenhum vídeo cadastrado no banco.
            </div>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../services/api';

interface Video {
  _id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  duracao: number;
  img_url: string;
  numero_views: number;
  nota_media: number;
}

const videos = ref<Video[]>([]);
const loading = ref(false);

const novoVideo = ref({
  titulo: '',
  descricao: '',
  categoria: '',
  duracao: null as number | null,
  img_url: ''
});

const carregarVideos = async () => {
  try {
    const res = await api.get('/videos');
    videos.value = res.data;
  } catch (error) {
    console.error("Erro ao carregar vídeos:", error);
  }
};

const adicionarVideo = async () => {
  if (!novoVideo.value.categoria) return alert("Selecione uma categoria");
  
  loading.value = true;
  try {
    await api.post('/videos', novoVideo.value);
    
    // Reset do form
    novoVideo.value = {
      titulo: '',
      descricao: '',
      categoria: '',
      duracao: null,
      img_url: ''
    };
    
    await carregarVideos();
  } catch (error) {
    console.error("Erro ao salvar:", error);
    alert("Erro ao adicionar o vídeo ao banco de dados.");
  } finally {
    loading.value = false;
  }
};

const removerVideo = async (id: string) => {
  if (!confirm("Deseja excluir permanentemente este vídeo?")) return;
  
  try {
    await api.delete(`/videos/${id}`);
    await carregarVideos();
  } catch (error) {
    console.error("Erro ao remover:", error);
    alert("Não foi possível excluir o vídeo.");
  }
};

onMounted(carregarVideos);
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
  background: #ff0000;
  border-radius: 10px;
}
</style>