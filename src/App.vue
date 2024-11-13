<script setup>
import { reactive, ref, onMounted } from 'vue'
import db from './db'
import { ref as fbRef, set, push, onValue } from 'firebase/database'

const currentPage = ref('login')

const loggedInUser = ref('')

const inputMessage = ref('')

const messages = ref([])

const contacts = ref([])

function submitLogin() {
  if (loggedInUser.value === '') {
    return
  }
  currentPage.value = 'contacts'
}

function leaveMessenger() {
  currentPage.value = 'contacts'
}

function sendMessage() {
  push(fbRef(db, 'messages'), { username: loggedInUser.value, message: inputMessage.value })
  inputMessage === ''
}

function submitUser() {
  push(fbRef(db, 'accounts', { username: loggedInUser.value }))
}

onMounted(() => {
  onValue(fbRef(db, 'messages'), (snapshot) => {
    const data = snapshot.val()
    messages.value = data
  })
})
</script>

<template>
  <!-- login page -->
  <div
    v-if="currentPage === 'login'"
    class="w-screen h-screen bg-gray-800 flex flex-col justify-center items-center gap-16"
  >
    <div class="text-center text-white text-5xl font-semibold w-2/3">
      <i class="bi bi-chat"></i>
      Firebase Chat App
    </div>
    <div class="bg-white rounded-lg w-4/5 h-1/3 flex flex-col items-center justify-around pb-2">
      <div class="text-gray-400 text-lg font-medium w-4/5 mt-3 mb-3">Username:</div>
      <input
        v-model="loggedInUser"
        class="bg-gray-200 rounded-lg w-4/5 h-1/3 p-2 focus:outline-none"
        placeholder="Ece123"
        type="text"
      />
      <button
        @click="submitLogin"
        class="bg-orange-500 rounded-lg w-4/5 h-1/3 mt-3 mb-3 p-2 text-white font-medium"
      >
        login
      </button>
    </div>
  </div>

  <!-- contacts page -->
  <div v-if="currentPage === 'contacts'" class="w-screen h-screen bg-gray-800">
    <div class="w-full h-full overflow-scroll">
      <div
        v-for="messageObj in messages"
        :key="messageObj"
        v-show="messageObj.username !== loggedInUser"
        class="text-3xl text-white p-2 m-2 border-b-2 border-teal-800 flex flex-row gap-3"
      >
        <i class="bi bi-person-circle"></i>
        {{ messageObj.username }}
      </div>
    </div>
  </div>

  <!-- messenger page -->
  <div
    v-if="currentPage === 'messenger'"
    class="w-screen h-screen flex flex-col items-center bg-gray-800"
  >
    <div
      @click="leaveMessenger"
      class="text-white text-3xl font-semibold w-full h-7p p-2 bg-zinc-800 shadow-md shadow-gray-900"
    >
      <i class="bi bi-arrow-left-circle"></i>
    </div>
    <div class="w-full h-83p overflow-scroll flex flex-col">
      <div
        v-for="messageObj in messages"
        :key="messageObj"
        :class="{
          'flex justify-end': messageObj.username === loggedInUser
        }"
      >
        <div
          :class="{
            'bg-teal-800 text-white rounded-t-2xl rounded-l-2xl':
              messageObj.username === loggedInUser,
            'bg-neutral-50 text-black rounded-r-2xl rounded-t-2xl':
              messageObj.username !== loggedInUser
          }"
          class="wrap-text w-2/3 h-max p-2 m-1"
        >
          <div>{{ messageObj.username }}:</div>
          {{ messageObj.message }}
        </div>
      </div>
    </div>
    <div class="w-full h-10p bg-zinc-800 flex flex-row items-center p-2 shadow-above">
      <div class="text-4xl text-center text-white">
        <i class="bi bi-patch-plus"></i>
      </div>
      <input
        v-model="inputMessage"
        class="focus:outline-none rounded-full w-5/6 h-2/3 pl-2 ml-2 mr-2 wrap-text"
        type="text"
        placeholder="Message ..."
      />
      <div @click="sendMessage" class="text-4xl text-center text-white">
        <i class="bi bi-send"></i>
      </div>
    </div>
  </div>
</template>
<style>
.h-10p {
  height: 10%;
}

.h-83p {
  height: 83%;
}

.h-7p {
  height: 7%;
}

.shadow-above {
  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px 25px;
}

.wrap-text {
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}
</style>
