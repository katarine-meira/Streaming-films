<template>
  <div v-if="!$route.meta.hideNavbar" class="navbar bg-base-100 shadow-md px-4 md:px-8">
    
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-white/5">
          <li><RouterLink to="/home">Início</RouterLink></li>
          <li><RouterLink to="/ranking">Ranking</RouterLink></li>
          <li><RouterLink to="/historico">Meu Histórico</RouterLink></li>
          <li>
            <span class="text-gray-500 font-bold text-xs uppercase px-4 mt-2">Admin</span>
            <ul>
              <li><RouterLink to="/gerenciarVideos">Gerenciar Vídeos</RouterLink></li>
              <li><RouterLink to="/gerenciarPerfil">Gerenciar Perfis</RouterLink></li>
            </ul>
          </li>
        </ul>
      </div>
      
      <RouterLink to="/home" class="btn btn-ghost text-error text-xl md:text-3xl font-bold tracking-tighter p-0 md:p-2">
        Streaming Films
      </RouterLink>
    </div>

    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1 gap-2">
        <li><RouterLink to="/home" class="hover:text-error transition-colors">Início</RouterLink></li>
        <li><RouterLink to="/ranking" class="hover:text-error transition-colors">Ranking</RouterLink></li>
        <li><RouterLink to="/historico" class="hover:text-error transition-colors">Meu Histórico</RouterLink></li>
        <li>
          <details>
            <summary class="hover:text-error transition-colors">Admin</summary>
            <ul class="p-2 bg-base-100 w-48 z-[10] border border-white/5 shadow-xl">
              <li><RouterLink to="/gerenciarVideos">Gerenciar Vídeos</RouterLink></li>
              <li><RouterLink to="/gerenciarPerfil">Gerenciar Perfis</RouterLink></li>
            </ul>
          </details>
        </li>
      </ul>
    </div>

    <div class="navbar-end gap-4">
      <span class="hidden sm:block text-sm font-medium text-gray-300">
        Bem-vindo, <span class="text-white font-bold">{{ nomePerfil }}</span>
      </span>

      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar border-2 border-transparent hover:border-error transition-all">
          <div class="w-10 rounded-full bg-error flex items-center justify-center text-xl">
            <span v-if="avatarPerfil">{{ avatarPerfil }}</span>
            <img v-else src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-52 p-2 shadow-2xl border border-white/5">
          <li class="sm:hidden px-4 py-2 text-error font-bold border-b border-white/5 mb-2">
            {{ nomePerfil }}
          </li>
          <li><RouterLink to="/gerenciarPerfil">Trocar Perfil</RouterLink></li>
          <li><a>Configurações</a></li>
          <li><RouterLink to="/" class="text-error font-bold">Sair</RouterLink></li>
        </ul>
      </div>
    </div>
  </div>

  <RouterView />
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const nomePerfil = ref('Convidado');
const avatarPerfil = ref('');

const carregarPerfil = () => {
  const perfilAtivo = JSON.parse(localStorage.getItem('perfilAtivo') || '{}');
  if (perfilAtivo.name) {
    nomePerfil.value = perfilAtivo.name;
    avatarPerfil.value = perfilAtivo.avatar;
  } else {
    nomePerfil.value = 'Convidado';
    avatarPerfil.value = '';
  }
};

onMounted(carregarPerfil);

watch(() => route.path, () => {
  carregarPerfil();
});
</script>
<style scoped>
/* Garante que o link ativo na navbar fique destacado */
.router-link-active {
  color: #ff0000;
  font-weight: bold;
}
</style>