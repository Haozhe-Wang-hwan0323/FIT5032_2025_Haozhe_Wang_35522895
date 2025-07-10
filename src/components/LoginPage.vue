<template>
  <div class="container mt-5">
    <h2>Login Page</h2>
    
    <!-- login form -->
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
            <label class="form-label">Passward</label>
            <input v-model="loginForm.password" type="password" class="form-control">
            <div v-if="!isValidPassword && loginForm.password" class="text-danger">
              There seem to have an error. The length of the Passward should be more than 6.
            </div>
          </div>
          <button type="submit" class="btn btn-primary" 
                  :disabled="!isValidEmail || !isValidPassword">
           Submit
          </button>
        </form>
      </div>
    </div>
    
      <!-- Register form -->
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Register</h4>
        <form @submit.prevent="handleRegister">
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="registerForm.email" type="email" class="form-control">
            <div v-if="!isValidRegisterEmail && registerForm.email" class="text-danger">
             There seem to have an error. Please enter a correct Email
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Passward</label>
            <input v-model="registerForm.password" type="password" class="form-control">
            <div v-if="!isValidRegisterPassword && registerForm.password" class="text-danger">
              There seem to have an error. The length of the Passward should be more than 6.
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">UserType</label>
            <select v-model="registerForm.role" class="form-control">
              <option value="elderly">Elderly</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" class="btn btn-success" 
                  :disabled="!isValidRegisterEmail || !isValidRegisterPassword">
            Register!
          </button>
        </form>
      </div>
    </div>
    
    <div v-if="errorMessage" class="alert alert-danger mt-3">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { auth, db } from '../firebaseConfig';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const router = useRouter();
const errorMessage = ref('');

// loginForm
const loginForm = ref({
  email: '',
  password: ''
});

// registerForm
const registerForm = ref({
  email: '',
  password: '',
  role: 'elderly'
});

// loginForm verify
const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(loginForm.value.email);
});

const isValidPassword = computed(() => {
  return loginForm.value.password.length >= 6;
});

// registerForm verify
const isValidRegisterEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(registerForm.value.email);
});

const isValidRegisterPassword = computed(() => {
  return registerForm.value.password.length >= 6;
});

// handleLogin
const handleLogin = async () => {
  if (!isValidEmail.value || !isValidPassword.value) return;
  
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth, 
      loginForm.value.email, 
      loginForm.value.password
    );
    
    // get user from firestore
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      localStorage.setItem('userRole', userData.role);
      
      // router based on user role
      if (userData.role === 'admin') {
        router.push('/admin-home');
      } else {
        router.push('/user-home');
      }
    } else {
      throw new Error('There is no User, please check your Email and Passward or register');
    }
  } catch (error) {
    errorMessage.value = `Login Fail: ${error.message}`;
  }
};

// handleRegister
const handleRegister = async () => {
  if (!isValidRegisterEmail.value || !isValidRegisterPassword.value) return;
  
  try {
    // Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      registerForm.value.email, 
      registerForm.value.password
    );
    
    // Store the user in Firestore 
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: registerForm.value.email,
      role: registerForm.value.role,
      createdAt: new Date()
    });
    
    alert('Register is complete.');
    loginForm.value.email = registerForm.value.email;
  } catch (error) {
    errorMessage.value = `Register fail: ${error.message}`;
  }
};
</script>