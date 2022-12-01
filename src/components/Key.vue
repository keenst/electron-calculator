<template>
  <div class="
    w-20 h-20 m-auto flex justify-center items-center
    bg-white text-2xl select-none text-neutral-500 hover:bg-orange-200
    rounded-3xl
    ease-out duration-300
    " :class="{
      [`bg-sky-900 hover:bg-sky-700`]: index == 19 
    }">
    {{ name }}
  </div>
</template>

<script>
  export default {
    props: ['name', 'index'],
    data() {
      return {
        dark: true
      }
    },
    mounted() {
      if (this.index <= 3 || (this.index + 1) % 4 == 0) 
        this.dark = false
    }
  }
</script>
