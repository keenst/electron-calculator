<template>
  <div class="bg-neutral-800 h-screen flex flex-col">
    <div class="h-[200px] flex flex-col items-end justify-end">
      <div class="text-neutral-500 text-2xl pr-4">{{ memory }}</div>
      <div class="flex flex-row pr-4 pb-4 h-20">
        <div v-for="digit in buffer.split('')" class="text-neutral-100 text-6xl">{{ digit }}</div>
      </div>
    </div>
    <div class="grid grid-cols-4 gap-1 m-2 grow">
      <key
        @click="addToBuffer(button)"
        v-for="(button, index) in buttons"
        :name="button"
        :index="index"
      ></key>
    </div>
  </div>
</template>

<script>
import key from "./components/Key.vue";
import nerdamer from "nerdamer";

export default {
  components: {
    key
  },
  data() {
    return {
      buffer: '0',
      memory: '',
      buttons: [
        "CE", "C", "^", "DEL",
        "7", "8", "9", "*",
        "4", "5", "6", "-",
        "1", "2", "3", "+",
        "(-)", "0", ".", "="
      ]
    }
  },
  methods: {
    addToBuffer(input) {
      switch (input) {
        case 'C':
          this.buffer = '0'
          this.memory = ''
          break;
        case 'CE':
          this.buffer = '0'
          break
        
        case 'DEL':
          this.buffer = this.buffer.substring(0, this.buffer.length - 1)
          break
        
        case '=':
          this.memory += this.buffer
          var e = nerdamer(this.memory)
          this.buffer = e.text('decimals')
          this.memory = ''
          break

        case '(-)':
          this.buffer = '-' + this.buffer;
          break;

        case '.':
          this.buffer += '.'
          break;

        case '+':
        case '-':
        case '*':
          this.memory += ' ' + this.buffer
          this.buffer = '0'

          if (this.memory.split(' ').length > 0) {
            console.log('longer than 0')
            var e = nerdamer(this.memory)
            this.memory = e.text('decimals')
          }

          this.memory += ' ' + input

          break

        default:
          if (this.buffer == '0')
            this.buffer = input
          else
            this.buffer += input
      }
    }
  }
}
</script>
