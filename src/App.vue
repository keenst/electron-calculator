<template>
  <div :class="{ [`dark`]: darkMode }">
    <div class="bg-white h-screen flex flex-col rounded-md drag dark:bg-zinc-900 ease-out duration-300">
      <div @click="(darkMode = !darkMode)" class="
      no-drag w-[45px] h-[45px] rounded-full 
      text-neutral-500 hover:bg-orange-300 hover:text-white
      dark:text-neutral-400 dark:hover:bg-blue-400 dark:hover:text-zinc-900
      transition-all duration-300 ease-out cursor-pointer
      flex flex-col justify-center items-center absolute m-4 p-6 overflow-hidden
      ">
        <Transition name="toggle" mode="out-in">
          <DarkModeIcon v-if="darkMode" size="32px" />
          <LightModeIcon v-else size="32px" />
        </Transition>
      </div>
      <div @click="closeApp()" class="
      hover:bg-red-400 w-[70px] h-[45px] text-neutral-500 dark:text-neutral-400 hover:text-white
      dark:hover:bg-rose-400 dark:hover:text-white
      no-drag rounded-tr-md rounded-bl-md cursor-pointer
      transition-all duration-300 ease-out
      flex justify-center items-center ml-auto
      ">
        <CloseIcon size="32px" />
      </div>
      <div class="h-[200px] flex flex-col items-end justify-end">
        <div class="
        text-orange-100 text-2xl mr-4 select-none dark:text-blue-600"> {{ memoryDisplay }} </div>
        <div @click="copyToClipboard()" class="
        mr-4 mb-4 font-semibold text-orange-300 flex flex-col items-end justify-end no-drag
        dark:text-blue-400 ease-out duration-300 cursor-pointer select-none
        " :class="{
          [`text-6xl`]: bufferDisplay.length <= 11,
          [`text-5xl`]: bufferDisplay.length > 11,
          [`text-4xl`]: bufferDisplay.length > 14
        }"> {{ bufferDisplay }} </div>
      </div>
      <Transition name="copy">
        <div v-if="showCopyMessage" class="
        absolute top-[228px] right-4 text-lg
        dark:text-neutral-500 text-neutral-400
        transition ease-out duration-300
        select-none
        ">
          Copied!
        </div>
      </Transition>
      <div class="grid grid-cols-4 gap-1 m-2 grow no-drag">
        <key
          @click="addToBuffer(button)"
          v-for="(button, index) in buttons"
          :name="button"
          :index="index"
        ></key>
      </div>
    </div>
  </div>
</template>

<script>
  import { Transition } from 'vue';
  import App from './app.js'
  export default App
</script>

<style>
.drag {
  -webkit-app-region: drag;
}
.no-drag {
  -webkit-app-region: no-drag;
}
.toggle-enter-active,
.toggle-leave-active {
  transition: all 0.2s ease-out;
}
.toggle-enter-from {
  transform: translateY(30px);
}
.toggle-leave-to {
  transform: translateY(-30px);
}
</style>