<template>
  <div class="
    w-full h-full flex justify-center items-center
    text-2xl select-none text-neutral-100 hover:bg-neutral-700
    hover:outline outline-1 outline-neutral-500
    ease-out duration-200
    " :class="{
      [`bg-black`]: dark,
      [`bg-neutral-900`]: !dark,
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
