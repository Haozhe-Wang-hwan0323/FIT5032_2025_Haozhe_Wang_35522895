<template>
  <div class="bg-gray-50 min-h-screen d-flex flex-column">
    <nav class="bg-white shadow-md fixed w-100 z-50 transition-all duration-300 py-3" id="navbar">
      <div class="container mx-auto px-4">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h1 class="text-2xl font-bold text-gray-800">Health Guardian Admin</h1>
          <button class="d-md-none text-gray-600 focus:outline-none text-2xl" id="mobileMenuBtn">
            <i class="fa fa-bars"></i>
          </button>
        </div>
        
        <div class="d-none d-md-flex flex-wrap justify-center gap-3">
          <router-link 
            to="/admin-home" 
            class="nav-link active px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium text-lg"
          >
            Admin Home
          </router-link>
          <router-link 
            to="/examine-profiles" 
            class="nav-link px-4 py-2 rounded-lg hover:bg-primary/10 text-gray-600 hover:text-primary font-medium text-lg transition-colors"
          >
            Examine Profiles
          </router-link>
          <router-link 
            to="/resource-management" 
            class="nav-link active px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium text-lg"
          >
            Resource Library Management
          </router-link>
          <router-link 
            to="/lecture-management" 
            class="nav-link px-4 py-2 rounded-lg hover:bg-primary/10 text-gray-600 hover:text-primary font-medium text-lg transition-colors"
          >
            Health Lecture Management
          </router-link>
          <router-link 
            to="/admin-about" 
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
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Resource Library Management</h2>
          <button @click="openAddResourceModal" class="btn btn-success">
            <i class="fa fa-plus mr-2"></i> Add New Resource
          </button>
        </div>
        <div class="flex flex-wrap justify-between gap-4 mb-6">
          <div class="flex-1 max-w-md">
            <div class="relative">
              <input 
                v-model="searchQuery" 
                type="text" 
                class="form-control pl-10" 
                placeholder="Search resources by name, description or rating..."
              >
              <i class="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
          <button @click="exportToCSV" class="btn btn-primary">
            <i class="fa fa-download mr-2"></i> Export to CSV
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th @click="sortBy('name')" class="cursor-pointer">
                  Name 
                  <i class="fa fa-sort ml-1"></i>
                </th>
                <th @click="sortBy('description')" class="cursor-pointer">
                  Description 
                  <i class="fa fa-sort ml-1"></i>
                </th>
                <th @click="sortBy('averageRating')" class="cursor-pointer">
                  Rating 
                  <i class="fa fa-sort ml-1"></i>
                </th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="resource in filteredResources" :key="resource.id">
                <td>{{ resource.name }}</td>
                <td>{{ resource.description }}</td>
                <td>
                  <div class="rating-stars">
                    <span class="mr-2 font-medium">{{ resource.averageRating.toFixed(1) }}</span>
                    <div class="flex">
                      <i 
                        v-for="i in 5" 
                        :key="i" 
                        class="fa fa-star text-yellow-400"
                        :class="{ 'text-gray-300': i > resource.averageRating }"
                      ></i>
                    </div>
                    <span class="ml-2 text-sm text-gray-500">({{ resource.totalRatings }} ratings)</span>
                  </div>
                </td>
                <td class="text-center">
                  <button @click="deleteResource(resource.id)" class="btn btn-danger btn-sm">
                    <i class="fa fa-trash"></i> Delete
                  </button>
                </td>
              </tr>
              <tr v-if="filteredResources.length === 0">
                <td colspan="4" class="text-center py-6 text-gray-500">
                  <i class="fa fa-folder-open-o text-3xl mb-2 block"></i>
                  <p>No resources found.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex flex-col md:flex-row justify-between items-center mt-6">
          <div class="text-sm text-gray-600 mb-4 md:mb-0">
            Showing <span class="font-medium">{{ startIndex + 1 }}</span> 
            to <span class="font-medium">{{ endIndex }}</span> 
            of <span class="font-medium">{{ totalResources }}</span> resources
          </div>
          <div class="flex">
            <button 
              @click="prevPage" 
              class="btn btn-outline-secondary mr-2" 
              :disabled="currentPage === 1"
            >
              <i class="fa fa-chevron-left mr-1"></i> Previous
            </button>
            <button 
              @click="nextPage" 
              class="btn btn-outline-secondary" 
              :disabled="currentPage >= totalPages"
            >
              Next <i class="fa fa-chevron-right ml-1"></i>
            </button>
          </div>
        </div>
      </div>
    </main>

    <div class="modal-backdrop" v-if="showAddModal" @click="closeModal" />
    <div 
      class="modal" 
      v-if="showAddModal"
      @keydown.escape="closeModal"
      role="dialog"
      aria-labelledby="addResourceModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addResourceModalLabel">Add New Resource</h5>
            <button type="button" class="btn-close" @click="closeModal">
              <i class="fa fa-times"></i>
            </button>
          </div>
          <form @submit.prevent="addResource">
            <div class="modal-body">
              <div class="mb-4">
                <label class="form-label">Name <span class="text-danger">*</span></label>
                <input 
                  v-model="newResource.name" 
                  type="text" 
                  class="form-control" 
                  required
                  placeholder="Enter resource name"
                >
              </div>
              <div class="mb-4">
                <label class="form-label">Description <span class="text-danger">*</span></label>
                <textarea 
                  v-model="newResource.description" 
                  class="form-control" 
                  rows="3" 
                  required
                  placeholder="Enter resource description"
                ></textarea>
              </div>
              <div class="mb-4">
                <label class="form-label">Download Link <span class="text-danger">*</span></label>
                <input 
                  v-model="newResource.link" 
                  type="url" 
                  class="form-control" 
                  required
                  placeholder="Enter valid download URL"
                >
              </div>
              <div class="mb-4">
                <label class="form-label">Default Rating</label>
                <div class="rating-stars">
                  <div class="flex">
                    <i 
                      v-for="i in 5" 
                      :key="i" 
                      class="fa fa-star text-yellow-400 cursor-pointer"
                      @click="newResource.defaultRating = i"
                      :class="{ 'text-gray-300': i > newResource.defaultRating }"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary">
                Add Resource
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <footer class="bg-gray-900 text-white py-16 mt-auto">
      <div class="container mx-auto px-4">
        <div class="row justify-content-between align-items-center">
          <div class="col-12 col-md-6 text-center text-md-start mb-8 mb-md-0">
            <h2 class="text-3xl font-bold mb-4 text-yellow-400">Health Guardian</h2>
            <p class="text-gray-300 max-w-md">Administrator Portal - Managing health services for elderly users</p>
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
          <p class="text-lg">&copy; 2025 Health Guardian Admin. All rights reserved.</p>
          <p class="mt-2">Contact: hwan0323@student.monash.edu</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Papa from 'papaparse';

const resources = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);
const sortField = ref('name');
const sortDirection = ref('asc');
const showAddModal = ref(false);

const newResource = ref({
  name: '',
  description: '',
  link: '',
  totalRatings: 1,    
  sumRatings: 3,     
  averageRating: 3.0 
});

const filteredResources = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return resources.value
    .filter(resource => 
      resource.name.toLowerCase().includes(query) ||
      resource.description.toLowerCase().includes(query) ||
      (resource.averageRating && resource.averageRating.toString().includes(query))
    )
    .sort((a, b) => {
      const valueA = a[sortField.value];
      const valueB = b[sortField.value];
      
      if (typeof valueA === 'string') {
        return sortDirection.value === 'asc' 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      }
      
      return sortDirection.value === 'asc' 
        ? valueA - valueB 
        : valueB - valueA;
    })
    .slice((currentPage.value - 1) * itemsPerPage.value, currentPage.value * itemsPerPage.value);
});

const totalResources = computed(() => resources.value.length);
const totalPages = computed(() => Math.ceil(totalResources.value / itemsPerPage.value));
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, totalResources.value));

const getResources = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'resources'));
    resources.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching resources:', error);
  }
};

const addResource = async () => {
  try {
    newResource.value.averageRating = newResource.value.sumRatings / newResource.value.totalRatings;
    
    await addDoc(collection(db, 'resources'), {
      ...newResource.value
    });
    
    resetForm();
    closeModal();
    await getResources();
  } catch (error) {
    console.error('Error adding resource:', error);
  }
};

const resetForm = () => {
  newResource.value = {
    name: '',
    description: '',
    link: '',
    totalRatings: 1,
    sumRatings: 3,
    averageRating: 3.0
  };
};

const deleteResource = async (id) => {
  if (confirm('Are you sure you want to delete this resource? This action cannot be undone.')) {
    try {
      await deleteDoc(doc(db, 'resources', id));
      await getResources();
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  }
};

const exportToCSV = () => {
  const csvData = resources.value.map(resource => ({
    Name: resource.name,
    Description: resource.description,
    AverageRating: resource.averageRating,
    TotalRatings: resource.totalRatings,
    DownloadLink: resource.link
  }));
  
  const csv = Papa.unparse(csvData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'resources.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const sortBy = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field;
    sortDirection.value = 'asc';
  }
};

const openAddResourceModal = () => {
  resetForm();
  showAddModal.value = true;
};

const closeModal = () => {
  showAddModal.value = false;
};

onMounted(() => {
  getResources();
});
</script>

<style scoped>

.btn-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #6c757d;
  cursor: pointer;
}

.btn-close:hover {
  color: #000;
}

.pagination {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.page-item {
  margin: 0 0.25rem;
}

.page-link {
  display: block;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  text-decoration: none;
  color: #0d6efd;
  background-color: #fff;
  border: 1px solid #dee2e6;
}

.page-link:hover {
  background-color: #f8f9fa;
}

.page-item.active .page-link {
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  background-color: #fff;
  border-color: #dee2e6;
}
</style>