<template>
    <div class="chat-container">
      <h1>Team Chat</h1>
  
      <div ref="messagesContainer"
       class="messages">
        <div
          v-for="message in messages"
          :key="message.id"
          class="message"
        >
          <strong>
            {{ message.user.first_name }}
            {{ message.user.last_name }}
          </strong>
  
          <p>{{ message.message }}</p>
        </div>
      </div>
  
      <div class="chat-input">
        <textarea
          v-model="newMessage"
          placeholder="Write a message..."
        />
  
        <button @click="sendMessage">
          Send
        </button>
      </div>
    </div>
  </template>
  <!-- eslint-disable vue/block-lang -->
  <script>
  import api from '@/api/axios'
  
  export default {
    data() {
      return {
        messages: [],
        newMessage: '',
      }
    },
  
    async mounted() {
      await this.loadMessages()
      this.scrollToBottom()
    },
  
    methods: {
      scrollToBottom() {
  setTimeout(() => {
    const container = this.$refs.messagesContainer

    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, 50)
},

  async loadMessages() {
    const teamId = this.$route.params.id

    const response = await api.get(
      `/teams/${teamId}/messages`
    )

    this.messages = response.data.messages

    this.scrollToBottom()
  },
  
      async sendMessage() {
  if (!this.newMessage.trim()) {
    return
  }

  const teamId = this.$route.params.id

  await api.post(
    `/teams/${teamId}/messages`,
    {
      message: this.newMessage,
    }
  )

  this.newMessage = ''

  await this.loadMessages()

  this.scrollToBottom()
}
    },
  }
  </script>

<style>
.chat-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
}

.messages {
  background: white;
  border-radius: 12px;
  padding: 20px;
  min-height: 400px;
  border: 1px solid #eee;
}

.message {
  padding: 12px;
  margin-bottom: 12px;
  background: #f8f9fa;
  border-radius: 8px;
}

.message p {
  margin-top: 5px;
}

.chat-input {
  margin-top: 20px;
}

.chat-input textarea {
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.chat-input button {
  margin-top: 10px;
}
.messages {
  height: 500px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
}
</style>