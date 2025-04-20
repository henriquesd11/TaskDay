<script setup lang="ts">
import '../../assets/Tasks.scss'
import { ref, watch } from 'vue'
import { useTasksStore } from '@/stores/tasks.ts'

const taskStore = useTasksStore()

const form = ref({
  task_name: '' as string,
  task_desc: '' as string,
  category_name: '' as string,
  date: '' as string,
  completed: false as boolean,
})

const errors = ref({
  task_name: '' as string,
  task_desc: '' as string,
  category_name: '' as string,
  date: '' as string,
})

const listCategory = ref([
  {
    value: 'Curso', label: 'Curso'
  },
  {
    value: 'Trabalho', label: 'Trabalho'
  },
  {
    value: 'Pessoal', label: 'Pessoal'
  }
]);

const validateForm = (): boolean => {
  let isValid = true

  // Validação do nome da tarefa
  if (!form.value.task_name) {
    errors.value.task_name = 'Preencha o nome da tarefa.'
    isValid = false
  } else if (form.value.task_name.length < 3) {
    errors.value.task_name = 'O nome da tarefa deve ter pelo menos 3 caracteres.'
    isValid = false
  } else {
    errors.value.task_name = ''
  }

  // Validação da descrição
  if (!form.value.task_desc) {
    errors.value.task_desc = 'Preencha a descrição da tarefa.'
    isValid = false
  } else {
    errors.value.task_desc = ''
  }

  // Validação da categoria
  if (!form.value.category_name) {
    errors.value.category_name = 'Selecione uma categoria.'
    isValid = false
  } else {
    errors.value.category_name = ''
  }

  // Validação da data
  if (!form.value.date) {
    errors.value.date = 'Selecione uma data.'
    isValid = false
  } else if (form.value.date < new Date().toISOString().split('T')[0]) {
    errors.value.date = 'A data não pode ser anterior à data atual.'
    isValid = false
  } else {
    errors.value.date = ''
  }

  return isValid
}

const addTask = () => {

  if (!validateForm()) {
    return
  }

  const newTask = { ...form.value }
  taskStore.addTask(newTask)
  form.value = {
    task_name: '',
    task_desc: '',
    category_name: '',
    date: '',
    completed: false
  }
}

</script>

<template>
  <div class="card m-2" id="card-input">
    <div class="card-body">
      <label for="task" class="mb-3">Adicionar Task</label>
      <div class="row align-items-center">
        <div class="col-auto">
          <input
            type="text"
            id="task"
            v-model="form.task_name"
            class="form-control form-control-sm"
            placeholder="Entregar tarefa x"
          />
          <small class="text-danger">{{ errors.task_name }}</small>
        </div>
        <div class="col">
          <select
            v-model="form.category_name"
            class="form-select form-select-sm"
            id="category"
          >
            <option value="" disabled>Categoria</option>
            <option
              v-for="category in listCategory"
              :key="category.value"
              :value="category.value"
            >
              {{ category.label }}
            </option>
          </select>
          <small class="text-danger">{{ errors.category_name }}</small>
        </div>
        <div class="col-auto">
          <input
            type="date"
            id="dateInput"
            class="form-control form-control-sm"
            v-model="form.date"
            :min="new Date().toISOString().split('T')[0]"
          />
          <small class="text-danger">{{ errors.date }}</small>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <textarea
            class="form-control form-control-sm mt-2"
            id="deskTask"
            v-model="form.task_desc"
            rows="3"
            placeholder="Descrição da tarefa"
          ></textarea>
          <small class="text-danger">{{ errors.task_desc }}</small>
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col text-end mt-3">
          <button
            class="btn btn-sm btn-success"
            id="button"
            type="button"
            @click="addTask()"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  </div>
</template>