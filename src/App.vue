<template>
  <div class="bg-neutral-800 h-screen flex flex-col">
    <div class="h-[200px] flex flex-col items-end justify-end">
      <div class="text-neutral-500 text-2xl pr-4">{{ memory }}</div>
      <div class="text-neutral-100 text-6xl pb-4 pr-4">{{ buffer }}</div>
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
      buffer: '',
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
      if (input == 'C' || input == 'CE') {
        this.buffer = ''
        this.memory = ''
      }
      else if (input == 'DEL') {
        this.buffer = this.buffer.substring(0, this.buffer.length - 1);
      }
      else if (input == '=') {
        this.memory += this.buffer
        this.buffer = nerdamer(this.memory);
        this.memory = ''
      }
      else if (input == '+' || input == '-' || input == '*') {
        this.memory += ' ' + this.buffer + ' ' + input
        this.buffer = ''
      }
      else {
        this.buffer += input;
      }
    }
  }
}
</script>
