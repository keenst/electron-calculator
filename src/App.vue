<template>
  <div class="bg-white h-screen flex flex-col">
    <div class="h-[200px] flex flex-col items-end justify-end">
      <div class="text-orange-100 text-2xl pr-4"> {{ getDisplayNum(memory) }} </div>
      <div class="pr-4 pb-4 h-20 font-semibold text-orange-200 text-6xl"> {{ getDisplayNum(buffer) }} </div>
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
import key from './components/Key.vue';
import nerdamer from 'nerdamer';

export default {
  components: {
    key
  },
  data() {
    return {
      buffer: '0',
      memory: '',
      buttons: [
        'CE', '^', '/', 'DEL',
        '7', '8', '9', '*',
        '4', '5', '6', '-',
        '1', '2', '3', '+',
        '+/-', '0', '.', '='
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
          if (this.buffer.length == 1)
            this.buffer = '0'
          else  
            this.buffer = this.buffer.substring(0, this.buffer.length - 1)
          break
        
        case '=':
          this.memory += this.buffer
          var e = nerdamer(this.memory)
          this.buffer = e.text('decimals')
          this.memory = ''
          break

        case '+/-':
          if (this.buffer.charAt(0) == '-')
            this.buffer = this.buffer.substring(1)
          else
            this.buffer = '-' + this.buffer;
          break;

        case '.':
          if (!this.buffer.includes('.'))
            this.buffer += '.'
          break;

        case '+':
        case '-':
        case '*':
        case '^':
        case '/':
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

      if (this.buffer == '0' && this.memory.length > 0)
        this.buttons[0] = 'C'
      else 
        this.buttons[0] = 'CE'
    },
    getDisplayNum(input) {
      if (input.length > 8)
        return Number.parseFloat(input).toExponential(8)
      else
        return input
    }
  }
}
</script>
