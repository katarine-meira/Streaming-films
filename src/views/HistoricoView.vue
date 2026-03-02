<template>
  <div class="min-h-screen bg-base-100 text-white pt-24 pb-12">
    <div class="max-w-5xl mx-auto px-6">
      
      <header class="mb-8">
        <h2 class="text-4xl font-bold mb-2">Meu Histórico</h2>
        <p class="text-gray-400">Vídeos que você assistiu recentemente</p>
      </header>

      <div class="space-y-4">
        <div v-for="filme in historico" :key="filme.id" 
             class="group relative flex flex-col md:flex-row gap-6 bg-[#1a1a1a] border border-white/5 p-4 rounded-xl hover:bg-[#222] transition-all">
          
          <div class="relative w-full md:w-64 flex-none">
            <img :src="filme.thumb" class="rounded-lg w-full h-40 object-cover shadow-2xl" :alt="filme.titulo" />
            
            <div class="absolute bottom-0 left-0 w-full h-1 bg-gray-600 rounded-b-lg overflow-hidden">
              <div class="h-full bg-error" :style="{ width: filme.progresso + '%' }"></div>
            </div>
          </div>

          <div class="flex-1 flex flex-col justify-between py-1">
            <div>
              <h3 class="text-xl font-bold mb-2">{{ filme.titulo }}</h3>
              
              <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400 mb-3">
                <span class="flex items-center gap-1">📅 {{ filme.data }}</span>
                <span>•</span>
                <span>🕒 {{ filme.duracao }}</span>
                <span>•</span>
                <span>{{ filme.genero }}</span>
                <span v-if="filme.classificacao" class="badge badge-outline badge-xs opacity-70">{{ filme.classificacao }}</span>
              </div>

              <p class="text-sm text-gray-400 line-clamp-2 mb-4">
                {{ filme.descricao }}
              </p>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="flex text-yellow-500 text-sm">
                  <span v-for="i in 5" :key="i" :class="i <= filme.minhaNota ? 'fas fa-star' : 'far fa-star'">★</span>
                </div>
                <span class="text-xs text-gray-500">Sua avaliação</span>
                <span :class="filme.progresso === 100 ? 'text-success' : 'text-yellow-500'" class="text-xs font-bold uppercase ml-2">
                  {{ filme.progresso === 100 ? 'Concluído' : filme.progresso + '% assistido' }}
                </span>
              </div>

              <button class="btn btn-ghost btn-sm btn-circle text-gray-500 hover:text-error transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const historico = [
  {
    id: 1,
    titulo: "A Última Fronteira",
    thumb: "https://placehold.co/600x400",
    data: "25 de fev. de 2026",
    duracao: "142 min",
    genero: "Ação",
    classificacao: "14+",
    descricao: "Uma equipe de elite precisa salvar o mundo de uma ameaça iminente em uma missão épica cheia de explosões e adrenalina.",
    progresso: 75,
    minhaNota: 4
  },
  {
    id: 2,
    titulo: "Amigos Para Sempre",
    thumb: "https://placehold.co/600x400",
    data: "24 de fev. de 2026",
    duracao: "95 min",
    genero: "Comédia",
    classificacao: "L",
    descricao: "Quatro amigos improváveis embarcam em uma aventura hilariante que mudará suas vidas para sempre.",
    progresso: 100,
    minhaNota: 5
  }
];
</script>