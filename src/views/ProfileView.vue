<template>
  <div class="min-h-screen bg-base-100 flex flex-col items-center justify-center text-white px-4">
    
    <h1 class="text-4xl md:text-5xl font-medium mb-10 tracking-wide text-center">
      Quem está assistindo?
    </h1>

    <div class="flex flex-wrap justify-center gap-6 md:gap-10 mb-16">
      
      <div v-for="perfil in perfis" :key="perfil.nome" class="group flex flex-col items-center cursor-pointer"
      @click="perfil.isAdd ? abrirNovo() : null">
        <div :class="perfil.isAdd ? 'bg-zinc-800 border-none' : 'bg-red-600'" 
             class="w-32 h-32 md:w-40 md:h-40 rounded-lg flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:ring-4 group-hover:ring-white">
          
          <span v-if="!perfil.isAdd" class="text-6xl md:text-7xl">{{ perfil.avatar }}</span>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </div>

        <div class="mt-4 text-center">
          <p class="text-gray-400 group-hover:text-white transition-colors text-lg font-medium">
            {{ perfil.nome }}
          </p>
          <span v-if="perfil.tipo" class="text-xs text-zinc-500 font-semibold uppercase tracking-widest block mt-1">
            {{ perfil.tipo }}
          </span>
        </div>
      </div>

    </div>
    <dialog ref="modalPerfil" class="modal">
      <div class="modal-box bg-[#1a1a1a] border border-white/10 max-w-md">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-400">✕</button>
        </form>

        <h3 class="text-2xl font-bold mb-6">{{ modoEdicao ? 'Editar Perfil' : 'Novo Perfil' }}</h3>

        <div class="space-y-4">
          <div class="form-control">
            <label class="label"><span class="label-text text-gray-300 font-bold">Nome do Perfil</span></label>
            <input type="text" placeholder="Ex: João Adulto" class="input input-bordered bg-zinc-900 focus:border-white transition-all w-full" />
          </div>

          <div class="form-control">
            <label class="label"><span class="label-text text-gray-300 font-bold">Faixa Etária</span></label>
            <select class="select select-bordered bg-zinc-900 w-full">
              <option selected>Adulto</option>
              <option>Infantil</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label"><span class="label-text text-gray-300 font-bold">Avatar</span></label>
            <select class="select select-bordered bg-zinc-900 w-full">
              <option>👶 Bebe</option>
              <option selected>👦 Menino</option>
              <option>👧 Menina</option>
            </select>
          </div>
        </div>

        <div class="modal-action grid grid-cols-2 gap-4 mt-8">
          <button class="btn btn-error text-white font-bold">{{ modoEdicao ? 'Salvar Alterações' : 'Criar Perfil' }}</button>
          <form method="dialog">
            <button class="btn btn-ghost bg-white text-black hover:bg-gray-200 font-bold">Cancelar</button>
          </form>
        </div>
      </div>

      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>

    <button class="btn btn-outline border-zinc-600 text-zinc-500 hover:bg-transparent hover:text-white hover:border-white px-8 rounded-none tracking-widest uppercase">
      <RouterLink to="/gerenciarPerfil">Gerenciar Perfis</RouterLink>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const modalPerfil = ref<HTMLDialogElement | null>(null);
const modoEdicao = ref(false);

// Dados temporários do formulário
const form = reactive({
  id: null,
  nome: '',
  faixaEtaria: 'Adulto',
  avatar: '👦'
});

const perfis = [
  { nome: 'João Kids', avatar: '👶', tipo: 'infantil', isAdd: false },
  { nome: 'João Adulto', avatar: '👦', tipo: 'adulto', isAdd: false },
  { nome: 'Adicionar Perfil', avatar: '', tipo: '', isAdd: true },
];

// Função para abrir em modo Edição
// const abrirEdicao = (perfil) => {
//   modoEdicao.value = true;
//   form.id = perfil.id;
//   form.nome = perfil.nome;
//   form.faixaEtaria = perfil.tipo;
//   form.avatar = perfil.avatar;
//   modalPerfil.value?.showModal();
// };

// Função para abrir em modo Novo Perfil
const abrirNovo = () => {
  modoEdicao.value = false;
  form.id = null;
  form.nome = '';
  form.faixaEtaria = 'Adulto';
  form.avatar = '👦';
  modalPerfil.value?.showModal();
};
</script>