<template>
  <div class="min-h-screen bg-base-100 text-white font-sans">
    <main v-if="todosVideos.length > 0">
      
      <section v-if="destaque" class="relative h-[70vh] w-full cursor-pointer" @click="$router.push(`/movie/${destaque._id}`)">
        <img 
          :src="destaque.img_url"
          class="w-full h-full object-cover"
          :alt="destaque.titulo"
        />
        
        <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent"></div>

        <div class="absolute bottom-1/4 left-12 max-w-xl space-y-4">
          <h2 class="text-6xl font-bold uppercase">{{ destaque.titulo }}</h2>
          <div class="flex items-center gap-3 text-sm">
            <span class="text-yellow-400 font-bold">⭐ {{ destaque.nota_media.toFixed(1) }}</span>
            <span class="badge badge-outline capitalize">{{ destaque.categoria }}</span>
            <span>{{ destaque.duracao }} min</span>
          </div>
          <p class="text-lg text-gray-200 line-clamp-3">{{ destaque.descricao }}</p>
          
          <div class="flex gap-3">
            <button @click.stop="$router.push(`/movie/${destaque._id}`)" class="btn btn-primary px-8 text-black border-none hover:bg-white/80">
               Assistir
            </button>
            <button class="btn btn-neutral bg-gray-500/50 border-none backdrop-blur-md">
               Mais Informações
            </button>
          </div>
        </div>
      </section>

      <section class="px-12 -mt-20 relative z-10 space-y-12 pb-20">
        <div>
          <h3 class="text-2xl font-semibold mb-4 text-error">Top 10 Mais Assistidos</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
           <div v-for="video in top10" :key="video._id" 
              class="group card bg-base-300 shadow-xl hover:scale-105 transition-transform cursor-pointer overflow-hidden"
              @click="$router.push(`/movie/${video._id}`)">
                <figure>
                  <img :src="video.img_url" :alt="video.titulo" class="w-full h-40 object-cover" />
                </figure>
                <div class="p-2 text-sm font-medium group-hover:text-error transition-colors truncate">
                  {{ video.titulo }}
                </div>
            </div>
          </div>
        </div>
      </section>

      <section v-for="cat in categorias" :key="cat" class="px-12 mt-10 relative z-10 space-y-12 pb-20">
        <div>
          <h3 class="text-2xl font-semibold mb-4 capitalize">{{ cat }}</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div v-for="video in videosPorCategoria(cat)" :key="video._id" 
                 class="group card bg-base-300 shadow-xl hover:scale-105 transition-transform cursor-pointer overflow-hidden"
                 @click="$router.push(`/movie/${video._id}`)">
              <figure>
                <img :src="video.img_url" :alt="video.titulo" class="w-full h-40 object-cover" />
              </figure>
              <div class="p-2 text-sm font-medium group-hover:text-error transition-colors truncate">
                {{ video.titulo }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <div v-else class="h-screen flex items-center justify-center">
      <span class="loading loading-spinner loading-lg text-error"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import api from '../services/api'

interface Video {
  _id: string
  titulo: string
  img_url: string
  categoria: string
  descricao: string
  ano: number
  classificacao: string
  duracao: string
  nota_media: number
  numero_views: number
}

const todosVideos = ref<Video[]>([])
const top10 = ref<Video[]>([])

const carregarDados = async () => {
  try {
    const [resTop, resTodos] = await Promise.all([
      api.get('/videos/top10'),
      api.get('/videos')
    ])
    top10.value = resTop.data
    todosVideos.value = resTodos.data
  } catch (err) {
    console.error("Erro ao carregar vídeos:", err)
  }
}

const categorias = computed(() => {
  const cats = todosVideos.value.map(v => v.categoria)
  return [...new Set(cats)]
})

const videosPorCategoria = (cat: string) => {
  return todosVideos.value.filter(v => v.categoria === cat)
}

const destaque = computed(() => top10.value[0] || todosVideos.value[0] || null)

onMounted(carregarDados)
</script>