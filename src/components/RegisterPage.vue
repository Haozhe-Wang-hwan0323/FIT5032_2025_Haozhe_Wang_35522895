<template>
  <div class="container mt-5">
    <h2>Register Page</h2>

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
            <label class="form-label">Password</label>
            <input v-model="registerForm.password" type="password" class="form-control">
            <div v-if="!isValidRegisterPassword && registerForm.password" class="text-danger">
              There seem to have an error. The length of the Password should be more than 6.
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">UserType</label>
            <select v-model="registerForm.role" class="form-control" @change="checkAdminCodeVisibility">
              <option value="elderly">Elderly</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div v-if="showAdminCodeInput" class="mb-3">
            <label class="form-label">Admin Code</label>
            <input v-model="adminCode" type="text" class="form-control">
            <div v-if="!isValidAdminCode && adminCode" class="text-danger">
              Invalid admin code.
            </div>
          </div>
          <button type="submit" class="btn btn-success" 
                  :disabled="!isValidRegisterEmail || !isValidRegisterPassword || (showAdminCodeInput && !isValidAdminCode)">
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
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const router = useRouter();
const errorMessage = ref('');
const adminCode = ref('');
const showAdminCodeInput = ref(false);

// registerForm
const registerForm = ref({
  email: '',
  password: '',
  role: 'elderly'
});

// registerForm verify
const isValidRegisterEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(registerForm.value.email);
});

const isValidRegisterPassword = computed(() => {
  return registerForm.value.password.length >= 6;
});

const isValidAdminCode = computed(() => {
  return registerForm.value.role === 'admin' ? adminCode.value === 'hwan0323@student.monash.edu' : true;
});

const checkAdminCodeVisibility = () => {
  showAdminCodeInput.value = registerForm.value.role === 'admin';
};

// handleRegister
const handleRegister = async () => {
  if (!isValidRegisterEmail.value || !isValidRegisterPassword.value || (showAdminCodeInput.value && !isValidAdminCode.value)) return;
  
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
    
    alert('Register is complete. You can now log in.');
    router.push('/');
  } catch (error) {
    errorMessage.value = `Register fail: ${error.message}`;
  }
};
</script>

<style scoped>
</style>