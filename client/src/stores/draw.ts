import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDrawStore = defineStore('draw', {
    state: () => ({
        tool: "brush",
        thickness: 1,
        color: "#333333"
    }),
    actions: {
        setTool(newTool: 'brush' | 'fill' | 'erase') {
            this.tool = newTool
        },
        setThickness(newThickness: 1 | 2 | 3 | 4) {
            this.thickness = newThickness
        },
        setColor(newColor: string) {
            this.color = newColor
        }
    }    
})