<template>
  <div class="min-h-screen bg-base-100 flex flex-col items-center justify-center py-12 text-white px-4">
    
    <div class="w-full max-w-4xl bg-zinc-900/50 p-6 rounded-2xl border border-white/5 mb-10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label class="label text-gray-400">Usuário da Conta</label>
          <select v-model="usuarioSelecionado" class="select select-bordered bg-zinc-900 w-full">
            <option :value="null">Selecione um usuário</option>
            <option v-for="user in usuarios" :key="user._id" :value="user">
              {{ user.name }}
            </option>
          </select>
        </div>

        <div>
          <label class="label text-gray-400">Novo Usuário</label>
          <div class="flex gap-2">
            <input v-model="novoUsuario.name" class="input input-bordered bg-zinc-900 w-1/2" placeholder="Nome" />
            <input v-model="novoUsuario.email" class="input input-bordered bg-zinc-900 w-1/2" placeholder="Email" />
            <button class="btn btn-error" @click="criarUsuario">Add</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="usuarioSelecionado" class="text-center">
      <h1 class="text-4xl font-medium mb-10">Quem está assistindo?</h1>
      <div class="flex flex-wrap justify-center gap-8">
        <div v-for="(perfil, index) in usuarioSelecionado.profiles" :key="index" 
             @click="entrarNoPerfil(perfil)" class="cursor-pointer group">
          <div class="w-32 h-32 bg-red-600 rounded-lg flex items-center justify-center group-hover:ring-4 ring-white transition-all">
            <span class="text-6xl">{{ perfil.avatar }}</span>
          </div>
          <p class="mt-2 text-gray-400 group-hover:text-white">{{ perfil.name }}</p>
        </div>

        <div @click="modalPerfilRef?.abrir()" class="cursor-pointer group">
          <div class="w-32 h-32 bg-zinc-800 rounded-lg flex items-center justify-center group-hover:bg-zinc-700 transition-all">
            <span class="text-4xl text-gray-500">+</span>
          </div>
          <p class="mt-2 text-gray-400">Novo Perfil</p>
        </div>
      </div>
    </div>
    <div v-if="usuarioSelecionado" class="mt-12">
      <button 
        @click="$router.push('/gerenciarPerfil')" 
        class="btn btn-outline border-zinc-600 text-zinc-500 hover:bg-transparent hover:text-white hover:border-white px-8 rounded-none tracking-widest uppercase"
      >
        Gerenciar Perfis
      </button>
    </div>
    <PerfilDialog ref="modalPerfilRef" @salvar="handleSalvarPerfil" />
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue"
import api from '../services/api'
import PerfilDialog from '../components/PerfilDialog.vue'
import { useRouter } from 'vue-router'

// 1. Interfaces primeiro
interface Perfil {
  name: string
  ageGroup: string
  avatar: string
}

interface Usuario {
  _id: string 
  name: string
  email: string
  profiles: Perfil[]
}

// 2. Declarações de variáveis (Estado)
const router = useRouter()
const usuarios = ref<Usuario[]>([])
const usuarioSelecionado = ref<Usuario | null>(null)
const modalPerfilRef = ref<InstanceType<typeof PerfilDialog> | null>(null)
const novoUsuario = reactive({ name: "", email: "" })

// 3. Watches (Agora as variáveis acima já existem!)
watch(usuarioSelecionado, (novo) => {
  if (novo) localStorage.setItem('usuarioAtivo', JSON.stringify(novo))
})

// 4. Funções de Lógica
const entrarNoPerfil = (perfil: Perfil) => {
  localStorage.setItem('perfilAtivo', JSON.stringify(perfil))
  router.push('/home') 
}

const carregarUsuarios = async () => {
  try {
    const res = await api.get('/users')
    usuarios.value = res.data
  } catch (error) {
    console.error("Erro ao buscar usuários:", error)
  }
}

const criarUsuario = async () => {
  if (!novoUsuario.name || !novoUsuario.email) return
  try {
    const res = await api.post('/users', {
      name: novoUsuario.name,
      email: novoUsuario.email,
      profiles: []
    })
    usuarios.value.push(res.data)
    novoUsuario.name = ""
    novoUsuario.email = ""
  } catch (error) {
    console.error("Erro ao criar usuário:", error)
  }
}

const handleSalvarPerfil = async (perfil: Perfil, index: number | null) => {
  if (!usuarioSelecionado.value) return
  const novosPerfis = [...usuarioSelecionado.value.profiles]
  if (index !== null) {
    novosPerfis[index] = perfil
  } else {
    novosPerfis.push(perfil)
  }

  try {
    const res = await api.put(`/users/${usuarioSelecionado.value._id}`, {
      profiles: novosPerfis
    })
    usuarioSelecionado.value.profiles = res.data.profiles
    const userIdx = usuarios.value.findIndex(u => u._id === res.data._id)
    if (userIdx !== -1) usuarios.value[userIdx] = res.data
  } catch (error) {
    console.error("Erro ao atualizar perfis:", error)
  }
}

// 5. Lifecycle
onMounted(() => {
  carregarUsuarios()
})
</script>