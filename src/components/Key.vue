<template>
  <div data-mdb-ripple="true" data-mdb-ripple-color="light" class="
    w-20 h-20 m-auto flex justify-center items-center
    text-2xl select-none text-neutral-500
    rounded-3xl
    ease-out duration-300
    " :class="{
      [`hover:bg-orange-200 dark:hover:bg-zinc-800`]: index != 19,
      [`bg-orange-50 hover:bg-orange-300 dark:bg-zinc-800 dark:hover:bg-zinc-700`]: index == 19 
    }">
    {{ name }}
  </div>
</template>

<script>
  export default {
    props: ['name', 'index']
  }
</script>
