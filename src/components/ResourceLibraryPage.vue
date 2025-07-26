<template>
  <div class="bg-gray-50 min-h-screen d-flex flex-column">
    <nav class="bg-white shadow-md fixed w-100 z-50 transition-all duration-300 py-3" id="navbar">
      <div class="container mx-auto px-4">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h1 class="text-2xl font-bold text-gray-800">Health Guardian</h1>
          <button class="d-md-none text-gray-600 focus:outline-none text-2xl" id="mobileMenuBtn">
            <i class="fa fa-bars"></i>
          </button>
        </div>
        
        <div class="d-none d-md-flex flex-wrap justify-center gap-3">
          <router-link 
            to="/home" 
            class="nav-link active px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium text-lg"
          >
            HomePage
          </router-link>
          <router-link 
            to="/ai-diagnose" 
            class="nav-link px-4 py-2 rounded-lg hover:bg-primary/10 text-gray-600 hover:text-primary font-medium text-lg transition-colors"
          >
            AI Diagnose
          </router-link>
          <router-link 
            to="/reserve-diagnose" 
            class="nav-link px-4 py-2 rounded-lg hover:bg-primary/10 text-gray-600 hover:text-primary font-medium text-lg transition-colors"
          >
            Reserve Diagnose
          </router-link>
          <router-link 
            to="/lecture" 
            class="nav-link px-4 py-2 rounded-lg hover:bg-primary/10 text-gray-600 hover:text-primary font-medium text-lg transition-colors"
          >
            Lecture
          </router-link>
          <router-link 
            to="/resource" 
            class="nav-link active px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium text-lg"
          >
            Resource
          </router-link>
          <router-link 
            to="/about-us" 
            class="nav-link px-4 py-2 rounded-lg hover:bg-primary/10 text-gray-600 hover:text-primary font-medium text-lg transition-colors"
          >
            About Us
          </router-link>
          <router-link 
            to="/logout" 
            class="nav-link px-4 py-2 rounded-lg hover:bg-red-100 text-red-600 hover:text-red-700 font-medium text-lg transition-colors"
          >
            Logout
          </router-link>
        </div>
      </div>
    </nav>

    <main class="container mx-auto px-4 pt-50 pb-16 flex-grow">
      <div class="bg-white rounded-2xl shadow-xl p-8 mb-8 border-2 border-gray-200">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Resource Library</h2>

        <div class="mb-4">
          <input v-model="searchQuery" type="text" class="form-control" placeholder="Search resources...">
        </div>

        <div v-if="loading" class="text-center py-8">
          <i class="fa fa-spinner fa-spin text-primary text-3xl"></i>
          <p class="mt-2 text-gray-600">Loading resources...</p>
        </div>
        
        <div v-else>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Average Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="resource in filteredResources" :key="resource.id">
                <td>{{ resource.name }}</td>
                <td>{{ resource.description }}</td>
                <td>
                  <span class="font-medium">{{ resource.averageRating.toFixed(1) }}</span>
                </td>
                <td>
                  <button @click="downloadResource(resource.link)" class="btn btn-primary me-2">
                    <i class="fa fa-download mr-1"></i> Download
                  </button>
                  <button @click="openRatingModal(resource.id)" class="btn btn-secondary">
                    <i class="fa fa-star mr-1"></i> Rate
                  </button>
                </td>
              </tr>
              <tr v-if="filteredResources.length === 0">
                <td colspan="4" class="text-center py-8 text-gray-500">
                  <i class="fa fa-folder-open-o text-4xl mb-3 text-gray-400"></i>
                  <p>No resources found.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <div v-if="isRatingModalOpen" class="modal d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Rate this resource</h5>
            <button type="button" class="btn-close" @click="closeRatingModal"></button>
          </div>
          <div class="modal-body">
            <p class="mb-4">Your rating:</p>
            <Rating 
              v-model:rating="tempRating" 
              :showText="true" 
              @update:rating="tempRating = $event"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeRatingModal">Cancel</button>
            <button 
              type="button" 
              class="btn btn-primary" 
              @click="submitRating"
              :disabled="!tempRating"
            >
              Submit Rating
            </button>
          </div>
        </div>
      </div>
    </div>

    <footer class="bg-gray-900 text-white py-16 mt-auto">
      <div class="container mx-auto px-4">
        <div class="row justify-content-between align-items-center">
          <div class="col-12 col-md-6 text-center text-md-start mb-8 mb-md-0">
            <h2 class="text-3xl font-bold mb-4 text-yellow-400">Health Guardian</h2>
            <p class="text-gray-300 max-w-md">Providing health services for elderly users</p>
          </div>
          
          <div class="col-12 col-md-4 d-flex justify-content-center justify-content-md-end gap-6">
            <a href="#" class="text-gray-300 hover:text-white transition-colors duration-200 text-3xl">
              <i class="fa fa-weixin"></i>
            </a>
            <a href="#" class="text-gray-300 hover:text-white transition-colors duration-200 text-3xl">
              <i class="fa fa-weibo"></i>
            </a>
            <a href="#" class="text-gray-300 hover:text-white transition-colors duration-200 text-3xl">
              <i class="fa fa-youtube-play"></i>
            </a>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-10 pt-8 text-center text-gray-400">
          <p class="text-lg">&copy; 2025 Health Guardian. All rights reserved.</p>
          <p class="mt-2">Contact: hwan0323@student.monash.edu</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Rating from './UtilComponents/Rating.vue'; 
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const searchQuery = ref('');
const resources = ref([]);
const isRatingModalOpen = ref(false);
const currentResourceId = ref(null);
const tempRating = ref(null); 
const loading = ref(true);

const getResources = async () => {
  try {
    console.log("Fetching resources...");
    loading.value = true;
    
    const resourceCollection = collection(db, 'resources');
    const querySnapshot = await getDocs(resourceCollection);
    const resourceList = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      
      const totalRatings = data.totalRatings || 1;
      const sumRatings = data.sumRatings || data.rating || 0;
      const averageRating = sumRatings / totalRatings;
      
      resourceList.push({
        id: doc.id,
        ...data,
        totalRatings,
        sumRatings,
        averageRating
      });
    });
    
    resources.value = resourceList;
    console.log("Resources fetched:", resourceList);
  } catch (error) {
    console.error('Failed to get resources:', error);
  } finally {
    loading.value = false;
  }
};

const filteredResources = computed(() => {
  return resources.value.filter(resource => {
    const searchTerm = searchQuery.value.toLowerCase();
    return resource.name.toLowerCase().includes(searchTerm) || 
           resource.description.toLowerCase().includes(searchTerm);
  });
});

const downloadResource = (link) => {
  console.log("Downloading resource:", link);
  window.open(link, '_blank');
};

const openRatingModal = (resourceId) => {
  currentResourceId.value = resourceId;
  isRatingModalOpen.value = true;
  const resource = resources.value.find(r => r.id === resourceId);
  tempRating.value = Math.round(resource.averageRating) || 0;
};

const closeRatingModal = () => {
  isRatingModalOpen.value = false;
  tempRating.value = null;
};

const submitRating = async () => {
  if (!currentResourceId.value || !tempRating.value) return;
  
  try {
    const resourceDoc = doc(db, 'resources', currentResourceId.value);
    const resource = resources.value.find(r => r.id === currentResourceId.value);
    
    const totalRatings = resource.totalRatings || 0;
    const sumRatings = resource.sumRatings || 0;
    
    const newTotalRatings = totalRatings + 1;
    const newSumRatings = sumRatings + tempRating.value;
    const newAverageRating = newSumRatings / newTotalRatings;
    
    await updateDoc(resourceDoc, {
      totalRatings: newTotalRatings,
      sumRatings: newSumRatings,
      averageRating: newAverageRating
    });
    
    const updatedResources = resources.value.map(r => {
      if (r.id === currentResourceId.value) {
        return {
          ...r,
          totalRatings: newTotalRatings,
          sumRatings: newSumRatings,
          averageRating: newAverageRating
        };
      }
      return r;
    });
    
    resources.value = updatedResources;
    closeRatingModal();
    
    alert('Thank you for your rating!');
  } catch (error) {
    console.error('Failed to submit rating:', error);
    alert('Failed to submit rating. Please try again.');
  }
};

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is authenticated:", user.uid);
      const userRole = localStorage.getItem('userRole');
      console.log("User role:", userRole);
      getResources();
    } else {
      console.log("User is not authenticated");
    }
  });
});
</script>

<style scoped>

</style>