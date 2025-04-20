<script setup lang="ts">
import '../../assets/Tasks.scss';
import { useTasksStore } from '@/stores/tasks.ts'
import { onMounted } from 'vue'

const taskStore = useTasksStore();

const formatDate = (date: string): string => {
  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}

onMounted(() => {
  taskStore.fetchTasks();
})

</script>

<template>
  <div v-if="taskStore.taskList.length === 0" class="alert alert-info m-2 text-center">
    <strong>Ops!</strong> Você não tem tarefas cadastradas.
  </div>
  <div v-else>
    <p class="mt-5  m-2">
      <h3>Tasks</h3>
    </p>
    <!--  future tasks-->
    <div v-for="(task, index) in taskStore.taskList" class="card  m-2">
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col-auto">
            <input class="form-check-input" type="checkbox" v-model="task.completed" :id="index + 'check'"
              @change="taskStore.updateTask(index, task)" />

          </div>
          <div class="col">
            <label :for="index + 'check'">
              {{ task.task_name }}
            </label>
          </div>
          <div class="col text-end">
            <button type="button" class="btn btn-danger btn-sm" @click="taskStore.deleteTask(index)">
              <i class="bi bi-trash2-fill"></i>
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col" id="taskDesc">
            <p class="card-text">Descrição: {{ task.task_desc }}</p>
          </div>
        </div>
        <div class="row mt-3">
          <div class="d-flex justify-content-between">
            <span class="badge rounded-pill" :class="{
              badge_work: task.category_name == 'Trabalho',
              badge_course: task.category_name == 'Curso',
              badge_personal: task.category_name == 'Pessoal'
            }">{{ task.category_name }}</span>
            <span class="badge rounded-pill badge-secondary">{{ formatDate(task.date) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>