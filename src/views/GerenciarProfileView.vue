<template>
  <div class="min-h-screen bg-base-100 text-white pt-24 pb-12">
    <div class="max-w-4xl mx-auto px-6">
      
      <button @click="$router.push('/')" class="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
        <span>← Voltar</span>
      </button>

      <header class="mb-10">
        <h2 class="text-4xl font-bold mb-2">Gerenciar Perfis</h2>
        <p class="text-gray-400">Usuário: {{ usuario?.name }}</p>
      </header>

      <div v-if="usuario" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="(perfil, index) in usuario.profiles" :key="index" 
             class="bg-[#1a1a1a] border border-white/5 p-6 rounded-2xl flex flex-col gap-6">
          
          <div class="flex items-center gap-4">
            <div class="w-20 h-20 bg-red-600 rounded-xl flex items-center justify-center text-4xl">
              {{ perfil.avatar }}
            </div>
            <div>
              <h3 class="text-xl font-bold">{{ perfil.name }}</h3>
              <p class="text-sm text-gray-500">{{ perfil.ageGroup }}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <button @click="abrirEdicao(perfil, index)" class="btn btn-white bg-white text-black hover:bg-gray-200">
              Editar
            </button>
            <button @click="excluirPerfil(index)" class="btn btn-outline border-white/10 text-white hover:bg-error">
              Excluir
            </button>
          </div>
        </div>

        <div @click="modalPerfilRef?.abrir()" class="border-2 border-dashed border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all">
          <span class="text-gray-500">+ Adicionar Perfil</span>
        </div>
      </div>
    </div>

    <PerfilDialog 
      ref="modalPerfilRef" 
      @salvar="handleSalvar" 
      @excluir="excluirPerfil" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'
import PerfilDialog from '../components/PerfilDialog.vue'

const router = useRouter()

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

const usuario = ref<Usuario | null>(null)
// Tipamos o ref do componente para acessar o método .abrir()
const modalPerfilRef = ref<InstanceType<typeof PerfilDialog> | null>(null)

const carregarDados = () => {
  const saved = localStorage.getItem('usuarioAtivo')
  if (saved) {
    try {
      usuario.value = JSON.parse(saved)
    } catch (e) {
      console.error("Erro ao ler localStorage", e)
    }
  } else {
    // Se não tiver usuário ativo, volta para a seleção
    router.push('/profile')
  }
}

// Tipando o index como number explicitamente
const abrirEdicao = (perfil: Perfil, index: number) => {
  modalPerfilRef.value?.abrir(perfil, index)
}

const handleSalvar = async (dados: Perfil, index: number | null) => {
  if (!usuario.value) return
  
  const novosPerfis = [...usuario.value.profiles]
  if (index !== null) {
    novosPerfis[index] = dados
  } else {
    novosPerfis.push(dados)
  }

  await atualizarNoBack(novosPerfis)
}

const excluirPerfil = async (index: number) => {
  if (!usuario.value) return
  
  // O filtro garante que o novo array não tenha o item do index passado
  const novosPerfis = usuario.value.profiles.filter((_, i) => i !== index)
  await atualizarNoBack(novosPerfis)
}

const atualizarNoBack = async (novosPerfis: Perfil[]) => {
  if (!usuario.value) return
  
  try {
    const res = await api.put(`/users/${usuario.value._id}`, { 
      profiles: novosPerfis 
    })
    
    // Atualiza o estado e o storage
    usuario.value = res.data
    localStorage.setItem('usuarioAtivo', JSON.stringify(res.data))
  } catch (err) {
    console.error("Erro ao atualizar:", err)
  }
}

onMounted(carregarDados)
</script>