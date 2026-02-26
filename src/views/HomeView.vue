<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-base-100 text-white font-sans">
    <main>
      <section class="relative h-[70vh] w-full">
        <img 
          src="/public/img/capa2.jpg" 
          class="w-full h-full object-cover"
          alt="Destaque"
        />
        
        <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent"></div>

        <div class="absolute bottom-1/4 left-12 max-w-xl space-y-4">
          <h2 class="text-6xl font-bold">Breaking Bad</h2>
          <div class="flex items-center gap-3 text-sm">
            <span class="text-yellow-400 font-bold">⭐ 4.9</span>
            <span>2008</span>
            <span class="badge badge-outline">16+</span>
            <span>5 temporadas</span>
          </div>
          <p class="text-lg text-gray-200">
            Walter White é um modesto professor de química do ensino médio. Quando descobre que tem câncer terminal, ele precisa encontrar uma maneira de garantir o bem-estar da família e toma uma decisão drástica: produzir e comercializar metanfetamina.
          </p>
          <div class="flex gap-3">
            <button class="btn btn-primary px-8 text-black border-none hover:bg-white/80">
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
          <h3 class="text-2xl font-semibold mb-4">Top 10 Mais Assistidos</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div v-for="i in 6" :key="i" class="card bg-base-300 shadow-xl hover:scale-105 transition-transform cursor-pointer">
              <figure><img src="https://placehold.co/300x160" alt="Filme" /></figure>
              <div class="p-2 text-sm font-medium">Nome do Filme {{ i }}</div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 class="text-2xl font-semibold mb-4">Ação</h3>
          </div>
      </section>
    </main>
  </div>
</template>
