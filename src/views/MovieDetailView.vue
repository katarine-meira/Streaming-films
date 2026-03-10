<template>
  <div v-if="movie" class="min-h-screen bg-base-100 text-white pb-20">
    
    <div class="relative h-[60vh] w-full overflow-hidden">
      <img 
        :src="movie.img_url" 
        class="w-full h-full object-cover grayscale-[20%]" 
        :alt="movie.titulo" 
      />
      <div class="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/40 to-transparent"></div>
      
      <div class="absolute top-8 left-8 z-50">
        <button @click="$router.back()" class="btn btn-ghost bg-black/20 backdrop-blur-md text-white border-white/10">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Voltar</span>
        </button>
      </div>

      <div class="absolute bottom-10 left-8 right-8 flex flex-col gap-4">
        <h1 class="text-5xl md:text-7xl font-black tracking-tighter uppercase">{{ movie.titulo }}</h1>
        
        <div class="w-full max-w-2xl bg-white/20 h-1.5 rounded-full overflow-hidden backdrop-blur-sm">
          <div 
            class="bg-error h-full transition-all duration-700" 
            :style="{ width: formHistorico.progresso + '%' }"
          ></div>
        </div>

        <div class="flex items-center gap-4">
          <button @click="modalAberto = true" class="btn btn-error btn-lg px-12 text-white font-bold shadow-lg">
            {{ historicoUsuario ? 'Continuar Assistindo' : 'Assistir Agora' }}
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-8 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
      
      <div class="lg:col-span-8 space-y-8">
        <div class="flex flex-wrap gap-3">
          <div class="badge badge-neutral bg-zinc-800 p-4 border-none gap-2">
            <span class="text-yellow-500">⭐</span> {{ movie.nota_media.toFixed(1) }}
          </div>
          <div class="badge badge-neutral bg-zinc-800 p-4 border-none gap-2">
            <span class="text-gray-400">👁️</span> {{ movie.numero_views }} views
          </div>
          <div class="badge badge-neutral bg-zinc-800 p-4 border-none gap-2">
            <span class="text-gray-400">🕒</span> {{ movie.duracao }} min
          </div>
          <div class="badge badge-outline border-zinc-700 text-gray-400 p-4">{{ movie.categoria }}</div>
        </div>

        <section class="bg-zinc-900/40 p-6 rounded-2xl border border-white/5">
          <h3 class="font-bold text-xl mb-3 flex items-center gap-2">
            <span class="w-1 h-5 bg-error rounded-full"></span> Sinopse
          </h3>
          <p class="text-gray-400 text-lg leading-relaxed">{{ movie.descricao }}</p>
        </section>

        <section class="bg-gradient-to-br from-zinc-900 to-black p-8 rounded-2xl border border-white/5">
          <h3 class="text-xl font-bold mb-4">⭐ Sua Avaliação</h3>
          <div class="rating rating-lg gap-2">
            <input v-for="i in 5" :key="i" type="radio" 
                   class="mask mask-star-2 bg-orange-400" 
                   :checked="Math.round(formHistorico.avaliacao) === i"
                   disabled />
          </div>
          <p class="text-sm text-gray-500 mt-4" v-if="historicoUsuario">
            Você parou em {{ minutosAssistidos }} minutos de filme.
          </p>
        </section>
      </div>

      <aside class="lg:col-span-4 space-y-6">
        <div class="bg-zinc-900 p-8 rounded-2xl border border-white/5">
          <h3 class="text-error font-bold mb-6 flex items-center gap-2">📈 Estatísticas</h3>
          <div class="space-y-6">
            <div>
              <p class="text-gray-500 text-sm">Visualizações Totais</p>
              <p class="text-3xl font-bold">{{ movie.numero_views.toLocaleString() }}</p>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Média da Crítica</p>
              <p class="text-3xl font-bold">{{ movie.nota_media.toFixed(1) }} <span class="text-lg text-gray-600">/ 5.0</span></p>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Data de Cadastro</p>
              <p class="text-2xl font-bold">{{ formatarData(movie.createdAt.toLocaleString()) }}</p>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Duração</p>
              <p class="text-2xl font-bold">{{ movie.duracao.toLocaleString() }} min</p>
            </div>
          </div>
        </div>

        <div class="bg-zinc-900 p-8 rounded-2xl border border-white/5">
          <h3 class="font-bold mb-4">Mais Detalhes</h3>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between"><span class="text-gray-500">Categoria:</span> <span class="capitalize text-white">{{ movie.categoria }}</span></div>
            <div class="flex justify-between"><span class="text-gray-500">Classificação:</span> <span class="text-white">{{ movie.classificacao || '12+' }}</span></div>
          </div>
        </div>
      </aside>
    </div>

    <dialog :open="modalAberto" class="modal modal-bottom sm:modal-middle bg-black/80">
      <div class="modal-box bg-zinc-900 border border-white/10">
        <h3 class="font-bold text-2xl mb-6">Atualizar Progresso</h3>
        <div class="space-y-8">
          <div>
            <div class="flex justify-between text-sm mb-2">
              <span>{{ minutosAssistidos }} min assistidos</span>
              <span class="text-error">{{ formHistorico.progresso }}%</span>
            </div>
            <input type="range" min="0" max="100" v-model="formHistorico.progresso" class="range range-error range-sm" />
          </div>
          <select v-model="formHistorico.avaliacao" class="select select-bordered w-full bg-zinc-800">
            <option v-for="n in [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]" :key="n" :value="n">
              {{ n }} Estrelas
            </option>
          </select>
        </div>
        <div class="modal-action">
          <button class="btn btn-ghost" @click="modalAberto = false">Cancelar</button>
          <button class="btn btn-error text-white px-6" @click="enviarVisualizacao">Salvar Progresso</button>
        </div>
      </div>
    </dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import api from '../services/api';

const route = useRoute();

interface Video {
  _id: string;
  titulo: string;
  descricao: string;
  img_url: string;
  nota_media: number;
  createdAt: String;
  classificacao: string;
  duracao: number;
  numero_views: number;
  categoria: string;
}

interface Historico {
  _id: string;
  usuario: string;
  video: string;
  progresso: number;
  avaliacao: number;
  video_info?: Video[]; // Caso venha do aggregate do seu back-end
}

const movie = ref<Video | null>(null);
const historicoUsuario = ref<Historico | null>(null);
const modalAberto = ref(false);

const formHistorico = ref({
  progresso: 0,
  avaliacao: 0
});

const formatarData = (dataString: string | Date) => {
  if (!dataString) return "Data indisponível";
  
  const data = new Date(dataString);
  
  // Formata para: 11 de janeiro de 2026
  return data.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

// Converte a porcentagem do slider em minutos baseados na duração total
const minutosAssistidos = computed(() => {
  if (!movie.value) return 0;
  return Math.round((formHistorico.value.progresso / 100) * movie.value.duracao);
});

const carregarDados = async () => {
  try {
    const videoId = route.params.id;
    const userAtivo = JSON.parse(localStorage.getItem('usuarioAtivo') || '{}');

    // Carrega o vídeo
    const resVideos = await api.get('/videos');
    movie.value = resVideos.data.find((v: Video) => v._id === videoId);

    // Carrega o histórico do usuário para este vídeo específico
    if (userAtivo._id) {
      const resHist = await api.get(`/historico/${userAtivo._id}`);
      const registro = resHist.data.find((h: Historico) => 
        h.video === videoId || (h.video_info && h.video_info[0]?._id === videoId)
      );
      
      if (registro) {
        historicoUsuario.value = registro;
        formHistorico.value.progresso = registro.progresso;
        formHistorico.value.avaliacao = registro.avaliacao;
      }
    }
  } catch (err) {
    console.error("Erro:", err);
  }
};

const enviarVisualizacao = async () => {
  const userAtivo = JSON.parse(localStorage.getItem('usuarioAtivo') || '{}');
  const payload = {
    usuario: userAtivo._id,
    video: movie.value?._id,
    progresso: Number(formHistorico.value.progresso),
    avaliacao: Number(formHistorico.value.avaliacao)
  };

  try {
    await api.post('/visualizar', payload);
    modalAberto.value = false;
    await carregarDados(); // Atualiza a tela
  } catch (err) {
    console.error(err);
  }
};

onMounted(carregarDados);
</script>