<template>
  <section v-if="movies.length > 0" class="space-y-4">
    <h3 class="text-2xl font-semibold px-12">{{ title }}</h3>
    
    <div class="flex overflow-x-auto gap-4 px-12 pb-4 scrollbar-hide">
      <div 
        v-for="movie in movies" 
        :key="movie._id"
        class="min-w-[250px] md:min-w-[300px] group cursor-pointer transition-transform duration-300 hover:scale-105"
        @click="$router.push(`/movie/${movie._id}`)"
      >
        <div class="relative aspect-video rounded-md overflow-hidden bg-zinc-800 shadow-xl">
          <img 
            :src="movie.capa" 
            :alt="movie.titulo" 
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span class="text-white font-bold">Ver detalhes</span>
          </div>
        </div>
        <p class="mt-2 text-sm font-medium text-gray-400 group-hover:text-white truncate">
          {{ movie.titulo }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Movie {
  _id: string;
  titulo: string;
  capa: string;
}

defineProps<{
  title: string;
  movies: Movie[];
}>();
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>