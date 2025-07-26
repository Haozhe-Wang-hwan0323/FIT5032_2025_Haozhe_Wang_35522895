<template>
  <div class="container mt-5">
    <h2>Login Page</h2>
    <div class="card mb-4">
      <div class="card-body">
        <h4 class="card-title">Login</h4>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="loginForm.email" type="email" class="form-control">
            <div v-if="!isValidEmail && loginForm.email" class="text-danger">
              There seem to have an error. Please enter a correct Email
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input v-model="loginForm.password" type="password" class="form-control">
            <div v-if="!isValidPassword && loginForm.password" class="text-danger">
              There seem to have an error. The length of the Password should be more than 6.
            </div>
          </div>
          <button type="submit" class="btn btn-primary" 
                  :disabled="!isValidEmail || !isValidPassword">
            Submit
          </button>
        </form>
      </div>
    </div>
    <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
    <div v-if="errorMessage" class="alert alert-danger mt-3">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { auth, db } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import DOMPurify from 'dompurify';

const router = useRouter();
const errorMessage = ref('');
const loginForm = ref({
  email: '',
  password: ''
});

const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(loginForm.value.email);
});

const isValidPassword = computed(() => {
  return loginForm.value.password.length >= 6;
});

const handleLogin = async () => {
  if (!isValidEmail.value || !isValidPassword.value) return;
  loginForm.value.email = DOMPurify.sanitize(loginForm.value.email);
  loginForm.value.password = DOMPurify.sanitize(loginForm.value.password);
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth, 
      loginForm.value.email, 
      loginForm.value.password
    );
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      localStorage.setItem('userRole', userData.role);
      if (userData.role === 'admin') {
        router.push('/admin-home');
      } else {
        router.push('/user-home');
      }
    } else {
      throw new Error('There is no User, please check your Email and Password or register');
    }
  } catch (error) {
    errorMessage.value = `Login Fail: ${error.message}`;
  }
};
</script>

<style scoped>
</style>