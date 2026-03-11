<template>
  <div class="min-h-screen bg-base-100 text-white pt-24 pb-12">
    <div class="max-w-5xl mx-auto px-6">
      
      <header class="mb-8">
        <h2 class="text-4xl font-bold mb-2">Meu Histórico</h2>
        <p class="text-gray-400">Vídeos que você assistiu recentemente</p>
      </header>

      <div v-if="historico.length > 0" class="space-y-4">
        <div v-for="item in historico" :key="item._id" 
             @click="$router.push(`/movie/${item.video}`)"
             class="group relative flex flex-col md:flex-row gap-6 bg-[#1a1a1a] border border-white/5 p-4 rounded-xl hover:bg-[#222] transition-all cursor-pointer">
          
          <div class="relative w-full md:w-64 flex-none">
            <img :src="item.video_info[0]?.img_url || 'https://placehold.co/600x400'" 
                 class="rounded-lg w-full h-40 object-cover shadow-2xl" 
                 :alt="item.video_info[0]?.titulo" />
            
            <div class="absolute bottom-0 left-0 w-full h-1 bg-gray-600 rounded-b-lg overflow-hidden">
              <div class="h-full bg-error" :style="{ width: item.progresso + '%' }"></div>
            </div>
          </div>

          <div class="flex-1 flex flex-col justify-between py-1">
            <div>
              <h3 class="text-xl font-bold mb-2">{{ item.video_info[0]?.titulo || 'Vídeo Removido' }}</h3>
              
              <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400 mb-3">
                <span class="flex items-center gap-1">📅 {{ formatarData(item.data_visualisacao) }}</span>
                <span>•</span>
                <span>🕒 {{ item.video_info[0]?.duracao }} min</span>
                <span>•</span>
                <span class="capitalize">{{ item.video_info[0]?.categoria }}</span>
              </div>

              <p class="text-sm text-gray-400 line-clamp-2 mb-4">
                {{ item.video_info[0]?.descricao }}
              </p>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="flex text-yellow-500 text-sm">
                  <span v-for="i in 5" :key="i">
                    {{ i <= item.avaliacao ? '★' : '☆' }}
                  </span>
                </div>
                <span class="text-xs text-gray-500">Sua avaliação</span>
                <span :class="item.progresso === 100 ? 'text-success' : 'text-yellow-500'" class="text-xs font-bold uppercase ml-2">
                  {{ item.progresso === 100 ? 'Concluído' : item.progresso + '% assistido' }}
                </span>
              </div>

              <button @click.stop="removerDoHistorico(item._id)" class="btn btn-ghost btn-sm btn-circle text-gray-500 hover:text-error transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20 bg-zinc-900/50 rounded-2xl border border-dashed border-white/10">
        <p class="text-gray-500">Você ainda não assistiu a nenhum vídeo.</p>
        <button @click="$router.push('/home')" class="btn btn-error btn-sm mt-4 text-white">Explorar Filmes</button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../services/api';

interface VideoInfo {
  titulo: string;
  descricao: string;
  img_url: string;
  duracao: number;
  categoria: string;
}

interface HistoricoItem {
  _id: string;
  video: string;
  progresso: number;
  avaliacao: number;
  data_visualisacao: string; 
  video_info: VideoInfo[];
}

const historico = ref<HistoricoItem[]>([]);

const formatarData = (dataString: string) => {
  if (!dataString) return "";
  const data = new Date(dataString);
  return data.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const carregarHistorico = async () => {
  try {
    const userAtivo = JSON.parse(localStorage.getItem('usuarioAtivo') || '{}');
    if (!userAtivo._id) return;

    const response = await api.get(`/historico/${userAtivo._id}`);
    
    historico.value = response.data;
  } catch (error) {
    console.error("Erro ao carregar histórico:", error);
  }
};

const removerDoHistorico = async (id: string) => {
  if (!confirm("Deseja remover este item do seu histórico?")) return;
  
  try {
    // Supondo que você tenha uma rota DELETE /historico/:id
    await api.delete(`/historico/${id}`);
    await carregarHistorico(); // Recarrega a lista
  } catch (error) {
    console.error("Erro ao remover:", error);
  }
};

onMounted(carregarHistorico);
</script>