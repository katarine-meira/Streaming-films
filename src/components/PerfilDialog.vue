<template>
  <dialog ref="modalRef" class="modal">
    <div class="modal-box bg-[#1a1a1a] border border-white/10 max-w-md">
      <h3 class="text-2xl font-bold mb-6 text-white">
        {{ modoEdicao ? 'Editar Perfil' : 'Novo Perfil' }}
      </h3>

      <div class="space-y-4">
        <div class="form-control">
          <label class="label"><span class="label-text text-gray-300 font-bold">Nome</span></label>
          <input v-model="form.name" type="text" placeholder="Ex: João Adulto" class="input input-bordered bg-zinc-900 text-white w-full" />
        </div>

        <div class="form-control">
          <label class="label"><span class="label-text text-gray-300 font-bold">Faixa Etária</span></label>
          <select v-model="form.ageGroup" class="select select-bordered bg-zinc-900 text-white w-full">
            <option value="Adulto">Adulto</option>
            <option value="Infantil">Infantil</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label"><span class="label-text text-gray-300 font-bold">Avatar</span></label>
          <select v-model="form.avatar" class="select select-bordered bg-zinc-900 text-white w-full">
            <option>👦</option>
            <option>👧</option>
            <option>👶</option>
          </select>
        </div>
      </div>

      <div class="modal-action flex flex-col gap-3 mt-8">
        <div class="grid grid-cols-2 gap-4 w-full">
          <button class="btn btn-error text-white font-bold" @click="salvar">
            {{ modoEdicao ? 'Salvar Alterações' : 'Criar Perfil' }}
          </button>
          <button class="btn btn-ghost bg-white text-black" @click="fechar">Cancelar</button>
        </div>
        
        <button v-if="modoEdicao" @click="excluir" class="btn btn-outline btn-error btn-sm border-none hover:bg-error/10">
          Excluir Perfil
        </button>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// Definindo a estrutura do Perfil para o TS
interface Perfil {
  name: string;
  ageGroup: string;
  avatar: string;
}

const emit = defineEmits<{
  (e: 'salvar', dados: Perfil, index: number | null): void
  (e: 'excluir', index: number): void
}>()

const modalRef = ref<HTMLDialogElement | null>(null)
const modoEdicao = ref(false)
const indexEdicao = ref<number | null>(null)

const form = reactive<Perfil>({
  name: '',
  ageGroup: 'Adulto',
  avatar: '👦'
})

const abrir = (perfilEdicao?: Perfil, index?: number) => {
  if (perfilEdicao) {
    modoEdicao.value = true
    indexEdicao.value = index ?? null
    Object.assign(form, perfilEdicao)
  } else {
    modoEdicao.value = false
    indexEdicao.value = null
    form.name = ''
    form.ageGroup = 'Adulto'
    form.avatar = '👦'
  }
  modalRef.value?.showModal()
}

const fechar = () => modalRef.value?.close()

const salvar = () => {
  if (!form.name) return
  emit('salvar', { ...form }, indexEdicao.value)
  fechar()
}

const excluir = () => {
  if (indexEdicao.value !== null && confirm("Deseja realmente excluir este perfil?")) {
    emit('excluir', indexEdicao.value)
    fechar()
  }
}

defineExpose({ abrir })
</script>