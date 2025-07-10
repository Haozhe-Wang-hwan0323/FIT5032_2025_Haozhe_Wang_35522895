<template>
  <div>
    <h1>Login page</h1>
    <input v-model="username" placeholder="UserName" />
    <input v-model="password" type="password" placeholder="Passwawrd" />
    <button @click="login">Login</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');

const login = () => {
  const adminUser = { username: 'admin', password: 'admin123' };
  const normalUser = { username: 'user', password: 'user123' };

  if (username.value === adminUser.username && password.value === adminUser.password) {
    router.push('/admin-home');
  } else if (username.value === normalUser.username && password.value === normalUser.password) {
    router.push('/user-home');
  } else {
    alert('You have entered wrong UserName or Passward, please try again');
  }
};
</script>

<style scoped>


</style>