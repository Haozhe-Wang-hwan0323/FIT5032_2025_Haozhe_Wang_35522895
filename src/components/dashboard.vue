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
            class="nav-link px-4 py-2 rounded-lg hover:bg-primary/10 text-gray-600 hover:text-primary font-medium text-lg transition-colors"
          >
            Resource Library Management
          </router-link>
          <router-link 
            to="/admin-dashboard" 
            class="nav-link active px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium text-lg"
          >
            Admin Dashboard
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
      <div class="dashboard-container bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-200">
        <div class="dashboard-sidebar">
          <h2 class="sidebar-title text-2xl font-bold text-gray-800 mb-6">System Overview</h2>
          
          <div class="stats-grid grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div class="stat-card bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-500 text-sm">Total Users</p>
                  <h3 class="text-3xl font-bold text-gray-800 mt-1">{{ totalUsers }}</h3>
                </div>
                <div class="bg-blue-100 p-3 rounded-full">
                  <i class="fa fa-users text-blue-600 text-xl"></i>
                </div>
              </div>
            </div>
            
            <div class="stat-card bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl shadow-sm">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-500 text-sm">Admin Users</p>
                  <h3 class="text-3xl font-bold text-gray-800 mt-1">{{ adminCount }}</h3>
                </div>
                <div class="bg-green-100 p-3 rounded-full">
                  <i class="fa fa-user-secret text-green-600 text-xl"></i>
                </div>
              </div>
            </div>
            
            <div class="stat-card bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-xl shadow-sm">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-500 text-sm">Elderly Users</p>
                  <h3 class="text-3xl font-bold text-gray-800 mt-1">{{ elderlyCount }}</h3>
                </div>
                <div class="bg-yellow-100 p-3 rounded-full">
                  <i class="fa fa-heartbeat text-yellow-600 text-xl"></i>
                </div>
              </div>
            </div>
            
            <div class="stat-card bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-sm">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-500 text-sm">Total Resources</p>
                  <h3 class="text-3xl font-bold text-gray-800 mt-1">{{ totalResources }}</h3>
                </div>
                <div class="bg-purple-100 p-3 rounded-full">
                  <i class="fa fa-book text-purple-600 text-xl"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="bulk-email-section bg-gray-50 p-6 rounded-xl shadow-sm mb-8">
            <h3 class="text-xl font-bold text-gray-800 mb-4">
              <i class="fa fa-envelope-o text-blue-600 mr-2"></i>
              Send Bulk Email to Elderly Users
            </h3>

            <div class="mb-4">
              <label class="block text-gray-700 mb-2" for="emailSubject">Email Subject</label>
              <input 
                v-model="emailSubject" 
                id="emailSubject"
                type="text" 
                class="form-control w-full"
                placeholder="Enter email subject"
              >
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 mb-2" for="emailContent">Email Content</label>
              <textarea 
                v-model="emailContent" 
                id="emailContent"
                class="form-control w-full"
                rows="3"
                placeholder="Enter email content..."
              ></textarea>
            </div>

            <div class="mb-4">
              <div class="flex justify-between items-center mb-2">
                <label class="block text-gray-700">Select Users</label>
                <button 
                  @click="toggleSelectAll" 
                  class="text-sm text-blue-600 hover:underline"
                >
                  {{ selectAll ? 'Deselect All' : 'Select All' }}
                </button>
              </div>
              
              <div class="overflow-y-auto max-h-40 border rounded-lg p-2">
                <div v-for="user in elderlyUsers" :key="user.id" class="flex items-center mb-2">
                  <input 
                    type="checkbox" 
                    v-model="selectedElderlyUsers" 
                    :value="user.id"
                    class="mr-2"
                  >
                  <span class="text-sm">{{ user.email }}</span>
                </div>
              </div>
            </div>

            <button 
              @click="sendBulkEmails"
              :disabled="!emailSubject || !emailContent || selectedElderlyUsers.length === 0 || isSending"
              class="btn btn-primary w-full"
            >
              <i class="fa fa-paper-plane mr-1"></i>
              {{ isSending ? 'Sending...' : `Send to ${selectedElderlyUsers.length} Users` }}
            </button>
          </div>
        </div>

        <div class="dashboard-map mt-8 md:mt-0">
          <h2 class="map-title text-xl font-bold text-gray-800 mb-4">Health Service Locations</h2>
          
          <div class="map-controls flex gap-3 mb-4">
            <input 
              v-model="searchPlace" 
              type="text" 
              placeholder="Search health services (e.g. hospital, clinic)..."
              class="form-control flex-1"
            >
            <button @click="searchLocations" class="btn btn-primary whitespace-nowrap">
              <i class="fa fa-search mr-1"></i> Search
            </button>
          </div>
          
          <l-map 
            :zoom="13" 
            :center="defaultCenter" 
            style="height: 500px; width: 100%; border-radius: 0.5rem; border: 1px solid #e5e7eb;"
          >
            <l-tile-layer 
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            ></l-tile-layer>

            <l-marker 
              v-for="(loc, index) in filteredLocations" 
              :key="index" 
              :lat-lng="loc.coords"
              @click="selectLocation(loc)"
              :icon="locationIcon"
            >
              <l-popup>
                <div class="popup-content">
                  <h4 class="font-bold">{{ loc.name }}</h4>
                  <p class="text-sm text-gray-600">{{ loc.address }}</p>
                  <p class="text-xs text-gray-500 mt-1">Type: {{ loc.type }}</p>
                  <button 
                    @click="setRoute(loc)" 
                    class="btn btn-sm btn-success mt-2 w-full"
                  >
                    <i class="fa fa-directions mr-1"></i> Navigate
                  </button>
                </div>
              </l-popup>
            </l-marker>

            <l-polyline 
              v-if="routePoints.length > 0" 
              :lat-lngs="routePoints" 
              color="#3b82f6" 
              weight="5" 
              opacity="0.7"
            ></l-polyline>
          </l-map>

          <div v-if="filteredLocations.length > 0" class="mt-4 bg-gray-50 p-4 rounded-lg">
            <p class="font-medium mb-2">Search Results ({{ filteredLocations.length }})</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              <div 
                v-for="(loc, index) in filteredLocations" 
                :key="index"
                @click="focusMapOn(loc)"
                class="p-2 hover:bg-gray-100 rounded cursor-pointer"
              >
                <p class="font-medium text-sm">{{ loc.name }}</p>
                <p class="text-xs text-gray-500">{{ loc.address }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

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
import { ref, onMounted } from 'vue';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { LMap, LTileLayer, LMarker, LPopup, LPolyline } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const totalUsers = ref(0);
const adminCount = ref(0);
const elderlyCount = ref(0);
const totalResources = ref(0);

const elderlyUsers = ref([]); 
const selectedElderlyUsers = ref([]); 
const selectAll = ref(false); 
const emailSubject = ref(''); 
const emailContent = ref(''); 
const isSending = ref(false); 

const defaultCenter = ref([-37.8136, 144.9631]);
const searchPlace = ref('');
const selectedLocation = ref(null);
const routePoints = ref([]);

const locations = ref([
  { 
    name: 'City Health Clinic', 
    address: '123 Main St, Melbourne CBD', 
    type: 'clinic',
    coords: [-37.8136, 144.9631] 
  },
  { 
    name: 'Elderly Care Hospital', 
    address: '456 Health Ave, Carlton', 
    type: 'hospital',
    coords: [-37.8236, 144.9731] 
  },
  { 
    name: 'Community Pharmacy', 
    address: '789 Medicine Rd, South Yarra', 
    type: 'pharmacy',
    coords: [-37.8036, 144.9531] 
  },
  { 
    name: 'Mental Health Center', 
    address: '321 Wellbeing Blvd, Fitzroy', 
    type: 'clinic',
    coords: [-37.8090, 144.9750] 
  }
]);

const filteredLocations = ref([...locations.value]);
const locationIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

const fetchDashboardData = async () => {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    totalUsers.value = usersSnapshot.size;
    
    elderlyUsers.value = [];
    
    usersSnapshot.forEach(doc => {
      const user = doc.data();
      const userData = { id: doc.id, email: user.email };
      
      if (user.role === 'admin') {
        adminCount.value++;
      }
      if (user.role === 'elderly') {
        elderlyCount.value++;
        elderlyUsers.value.push(userData); 
      }
    });

    const resourcesSnapshot = await getDocs(collection(db, 'resources'));
    totalResources.value = resourcesSnapshot.size;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  }
};

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedElderlyUsers.value = [];
  } else {
    selectedElderlyUsers.value = elderlyUsers.value.map(user => user.id);
  }
  selectAll.value = !selectAll.value;
};

const sendBulkEmails = async () => {
  const selectedUsers = elderlyUsers.value.filter(user => 
    selectedElderlyUsers.value.includes(user.id)
  );
  
  if (selectedUsers.length === 0) return;

  isSending.value = true;
  let successCount = 0;
  const apiUrl = 'https://sendresourcecsv-tsjzaquomz.cn-hongkong.fcapp.run';

  try {
    for (const user of selectedUsers) {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toEmail: user.email,
          subject: emailSubject.value,
          text: emailContent.value,
          csvContent: ''
        })
      });

      if (response.ok) successCount++;
    }


    alert(`sent successful`);

    emailSubject.value = '';
    emailContent.value = '';
    selectedElderlyUsers.value = [];
    selectAll.value = false;

  } catch (error) {
    console.error('error', error);
    alert('there is an error');
  } finally {
    isSending.value = false;
  }
};


const searchLocations = () => {
  if (!searchPlace.value.trim()) {
    filteredLocations.value = [...locations.value];
    return;
  }
  
  const query = searchPlace.value.toLowerCase();
  filteredLocations.value = locations.value.filter(loc => 
    loc.name.toLowerCase().includes(query) || 
    loc.type.toLowerCase().includes(query) ||
    loc.address.toLowerCase().includes(query)
  );
};

const selectLocation = (loc) => {
  selectedLocation.value = loc;
};

const focusMapOn = (loc) => {
  defaultCenter.value = [...loc.coords]; 
  selectedLocation.value = loc;
};

const setRoute = (destination) => {
  routePoints.value = [
    [...defaultCenter.value], 
    [...destination.coords]   
  ];
};


onMounted(() => {
  fetchDashboardData();
  filteredLocations.value = [...locations.value];
});
</script>

<style scoped>

.dashboard-container {
  display: flex;
  min-height: 100vh;
  gap: 20px;
  padding: 20px;
}

.dashboard-sidebar {
  flex: 1;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}


.bulk-email-section {
  border: 1px solid #e5e7eb;
}


.sidebar-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.stat-card {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 6px;
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #0d6efd;
  margin: 10px 0 0;
}

.dashboard-map {
  flex: 2;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.map-controls {
  margin-bottom: 15px;
  display: flex;
  gap: 10px;
}

.map-search {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-results {
  margin-top: 15px;
  max-height: 150px;
  overflow-y: auto;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
}

.search-results ul {
  list-style: none;
  padding: 0;
}

.search-results li {
  padding: 5px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.search-results li:hover {
  background: #e9ecef;
}
</style>
