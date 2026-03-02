<template>
  <div class="min-h-screen bg-base-100 text-white pt-24 pb-12">
    <div class="max-w-4xl mx-auto px-6">
      
      <button @click="$router.back()" class="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Voltar</span>
      </button>

      <header class="mb-10">
        <h2 class="text-4xl font-bold mb-2">Gerenciar Perfis</h2>
        <p class="text-gray-400">Adicione, edite ou remova perfis desta conta</p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="perfil in perfis" :key="perfil.id" 
             class="bg-[#1a1a1a] border border-white/5 p-6 rounded-2xl flex flex-col gap-6 transition-all hover:border-white/20">
          
          <div class="flex items-center gap-4">
            <div class="w-20 h-20 bg-red-600 rounded-xl flex items-center justify-center text-4xl shadow-lg">
              {{ perfil.avatar }}
            </div>
            <div>
              <h3 class="text-xl font-bold">{{ perfil.nome }}</h3>
              <p class="text-sm text-gray-500 capitalize">{{ perfil.tipo }}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <button class="btn btn-ghost bg-white text-black hover:bg-gray-200 font-bold no-animation">
              Editar
            </button>
            <button class="btn btn-outline border-white/10 text-white hover:bg-error hover:border-error group">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Excluir
            </button>
          </div>
        </div>

        <div @click="$router.push('/')" 
             class="border-2 border-dashed border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-white/5 transition-all group">
          <div class="w-12 h-12 rounded-full border-2 border-dashed border-gray-500 flex items-center justify-center group-hover:border-white">
            <span class="text-2xl text-gray-500 group-hover:text-white">+</span>
          </div>
          <span class="text-gray-500 group-hover:text-white font-medium">Adicionar Perfil</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
const perfis = [
  { id: 1, nome: 'João Kids', avatar: '👶', tipo: 'infantil' },
  { id: 2, nome: 'João Adulto', avatar: '👦', tipo: 'adulto' }
];
</script>