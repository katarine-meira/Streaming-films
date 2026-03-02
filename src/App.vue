<script setup lang="ts">
</script>

<template>
<div v-if="!$route.meta.hideNavbar" class="navbar bg-base-100 shadow-sm">
  <div class="navbar-start flex-1">
    <RouterLink to="/home" class="btn btn-ghost text-error text-3xl font-bold tracking-tighter" >Streaming Films</RouterLink>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><RouterLink to="/home">Início</RouterLink></li>
        <li><RouterLink to="/ranking">Ranking</RouterLink></li>
        <li><RouterLink to="/historico">Meu Histórico</RouterLink></li>
        <li>
          <details>
            <summary>Admin</summary>
            <ul class="p-2 bg-base-100 w-40 z-1">
              <li><RouterLink to="/gerenciarVideos">Gerenciar Vídeos</RouterLink></li>
              <li><a>Gerenciar Perfis</a></li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  </div>
  <div class="flex gap-2">
    <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabindex="-1"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a class="justify-between">
            Profile
            <span class="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><RouterLink to="/">Logout</RouterLink></li>
      </ul>
    </div>
  </div>
</div>
  <RouterView />
</template>
