import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAlertStore } from '@/stores/alert.ts'
interface Task {
  completed: boolean
  task_desc: string
  task_name: string
  category_name: string
  date: string
}

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    taskList: [] as Task[],
  }),

  actions: {
    addTask(task: Task) {
      this.taskList.push(task as Task)
      this.saveLocalData()
      this.actionAlert('Boa, Trate de fazer essa tarefa em!', 'success')
    },
    updateTask(index: number, task: Task) {
      this.taskList[index] = task
      this.saveLocalData()
      this.actionAlert('Tarefa atualizada com sucesso!', 'success')
    },
    saveLocalData() {
      localStorage.setItem('tasks', JSON.stringify(this.taskList))
    },
    fetchTasks() {
      const tasks = localStorage.getItem('tasks')
      if (tasks) {
        this.taskList = JSON.parse(tasks)
      }
    },
    deleteTask(index: number) {
      this.taskList.splice(index, 1)
      this.saveLocalData()
      this.actionAlert('Espero que vc tenha um bom motivo para isso!', 'info')
    },
    actionAlert (message: string, type: string) {
      const alertStore = useAlertStore()
      alertStore.showAlert(message, type)
    }
  }
})
