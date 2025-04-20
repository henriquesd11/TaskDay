import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const useAlertStore = defineStore('alert', {
  state: () => ({
    type: '' as string,
    message: '' as string,
    show: false as boolean,
  }),
  actions: {
    showAlert(message: string, type: string) {
      this.message = message
      this.type = type
      this.show = true
      this.hideAlert()
    },
    hideAlert() {
      setTimeout(() => {
        this.show = false
        this.message = ''
        this.type = ''
      }, 3000);
    },
  }
})
