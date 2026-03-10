<template>
  <div class="min-h-screen bg-base-100 text-white pt-16 pb-12 px-4 md:px-12">
    <div class="max-w-7xl mx-auto px-6 md:px-10">
      <header class="mb-10">
        <div class="flex items-center gap-3 mb-2">
          <div class="bg-error/20 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h2 class="text-4xl font-bold">Rankings</h2>
        </div>
        <p class="text-gray-400 ml-1">Os conteúdos reais mais populares da plataforma</p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <section>
          <div class="flex items-center gap-2 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <h3 class="text-xl font-bold uppercase tracking-wide">Mais Assistidos</h3>
          </div>

          <div class="space-y-4">
            <div v-for="(item, index) in maisAssistidos" :key="item._id" 
                 @click="$router.push(`/video/${item._id}`)"
                 class="flex items-center gap-4 bg-white/5 hover:bg-white/10 p-4 rounded-xl transition-all group cursor-pointer">
              <span :class="index < 3 ? 'text-error font-black' : 'text-gray-500 font-bold'" class="text-3xl w-10 italic">
                #{{ index + 1 }}
              </span>
              <img :src="item.img_url" class="w-24 h-14 object-cover rounded shadow-lg" />
              <div class="flex-1">
                <h4 class="font-bold text-lg leading-tight">{{ item.titulo }}</h4>
                <div class="flex items-center gap-3 text-xs text-gray-400 mt-1">
                  <span class="flex items-center gap-1">👁️ {{ item.numero_views.toLocaleString() }}</span>
                  <span>•</span>
                  <span class="flex items-center gap-1 text-yellow-400">★ {{ item.nota_media.toFixed(1) }}</span>
                  <span>•</span>
                  <span class="capitalize">{{ item.categoria }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div class="flex items-center gap-2 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <h3 class="text-xl font-bold uppercase tracking-wide">Melhor Avaliados</h3>
          </div>

          <div class="space-y-4">
            <div v-for="(item, index) in melhorAvaliados" :key="item._id" 
                 @click="$router.push(`/video/${item._id}`)"
                 class="flex items-center gap-4 bg-white/5 hover:bg-white/10 p-4 rounded-xl transition-all group cursor-pointer">
              <span :class="index < 3 ? 'text-yellow-500 font-black' : 'text-gray-500 font-bold'" class="text-3xl w-10 italic">
                #{{ index + 1 }}
              </span>
              <img :src="item.img_url" class="w-24 h-14 object-cover rounded shadow-lg" />
              <div class="flex-1">
                <h4 class="font-bold text-lg leading-tight">{{ item.titulo }}</h4>
                <div class="flex items-center gap-3 text-xs text-gray-400 mt-1">
                  <span class="flex items-center gap-1 text-yellow-400 font-bold">★ {{ item.nota_media.toFixed(1) }}</span>
                  <span>•</span>
                  <span>🕒 {{ item.duracao }} min</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="max-w-7xl mx-auto px-6 md:px-10 pb-20 mt-20">
        <div class="w-full bg-gradient-to-r from-[#441111] to-[#1a1122] rounded-xl p-8 shadow-2xl border border-white/5">
          <h3 class="text-xl font-bold mb-8 text-white/90">Estatísticas Gerais</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <div class="flex flex-col gap-2">
              <span class="text-4xl md:text-5xl font-bold text-error">{{ totalVideos }}</span>
              <span class="text-gray-400 text-sm font-medium">Total de Vídeos</span>
            </div>

            <div class="flex flex-col gap-2">
              <span class="text-4xl md:text-5xl font-bold text-error tracking-tight">{{ totalViews.toLocaleString() }}</span>
              <span class="text-gray-400 text-sm font-medium">Total de Visualizações</span>
            </div>

            <div class="flex flex-col gap-2">
              <span class="text-4xl md:text-5xl font-bold text-error">{{ mediaGeral.toFixed(1) }}</span>
              <span class="text-gray-400 text-sm font-medium">Média de Avaliação</span>
            </div>

            <div class="flex flex-col gap-2">
              <span class="text-4xl md:text-5xl font-bold text-error uppercase">{{ totalHoras }}h</span>
              <span class="text-gray-400 text-sm font-medium">Total de Conteúdo</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import api from '../services/api';

interface Video {
  _id: string;
  titulo: string;
  img_url: string;
  numero_views: number;
  nota_media: number;
  categoria: string;
  duracao: number;
}

const videos = ref<Video[]>([]);

// Lógica de Ranking
const maisAssistidos = computed(() => {
  return [...videos.value].sort((a, b) => b.numero_views - a.numero_views).slice(0, 7);
});

const melhorAvaliados = computed(() => {
  return [...videos.value].sort((a, b) => b.nota_media - a.nota_media).slice(0, 7);
});

// Estatísticas Gerais Dinâmicas
const totalVideos = computed(() => videos.value.length);
const totalViews = computed(() => videos.value.reduce((acc, v) => acc + v.numero_views, 0));
const mediaGeral = computed(() => {
  if (videos.value.length === 0) return 0;
  return videos.value.reduce((acc, v) => acc + v.nota_media, 0) / videos.value.length;
});
const totalHoras = computed(() => {
  const minutos = videos.value.reduce((acc, v) => acc + v.duracao, 0);
  return Math.floor(minutos / 60);
});

const carregarRankings = async () => {
  try {
    const res = await api.get('/videos');
    videos.value = res.data;
  } catch (error) {
    console.error("Erro ao carregar rankings:", error);
  }
};

onMounted(carregarRankings);
</script>