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
            class="nav-link px-4 py-2 rounded-lg hover:bg-primary/10 text-gray-600 hover:text-primary font-medium text-lg transition-colors"
          >
            Admin Home
          </router-link>
          <router-link 
            to="/examine-profiles" 
            class="nav-link active px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium text-lg"
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
            to="/lecture-management" 
            class="nav-link px-4 py-2 rounded-lg hover:bg-primary/10 text-gray-600 hover:text-primary font-medium text-lg transition-colors"
          >
            Health Lecture Management
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
       

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <div class="mb-8">
              <h3 class="text-xl font-semibold mb-4">Developer Information</h3>
              <p><strong>Name:</strong> Haozhe Wang</p>
              <p><strong>Student ID:</strong> 35522895</p>
              <p><strong>Email:</strong> hwan0323@student.monash.edu</p>
            </div>

             <div class="p-6 bg-gray-50 rounded-xl">
              <h3 class="text-xl font-bold text-gray-800 mb-4">API Access</h3>
              <p class="mb-4 text-gray-600">We provide 2 REST API endpoints for third-party integration:</p>
              
              <div class="mb-6 p-4 border border-gray-200 rounded-lg">
                <h4 class="font-bold text-blue-600">1. Health Institutions List</h4>
                <p class="text-sm mb-2"><strong>Endpoint:</strong> <code>https://medical-api-gyqxxcmiaa.cn-hongkong.fcapp.run/medical-locations</code></p>
                <p class="text-sm mb-2"><strong>Method:</strong> GET</p>
                <p class="text-sm mb-2"><strong>Description:</strong> Returns a list of partnered health institutions .</p>
                
              </div>

              <div class="p-4 border border-gray-200 rounded-lg">
                <h4 class="font-bold text-blue-600">2. Resources List</h4>
                <p class="text-sm mb-2"><strong>Endpoint:</strong> <code>https://medical-api-gyqxxcmiaa.cn-hongkong.fcapp.run/resources</code></p>
                <p class="text-sm mb-2"><strong>Method:</strong> GET</p>
                <p class="text-sm mb-2"><strong>Description:</strong> Returns a list of resources we can provide.</p>
                
                
              </div>
            </div>


          </div>


          <div class="flex flex-col gap-6">
            <div>
              <h3 class="text-xl font-semibold mb-3">User Growth (Weekly)</h3>
              <div class="bg-gray-50 p-3 rounded-lg h-64">
                <canvas id="userGrowthChart"></canvas>
              </div>
              <p v-if="userGrowthError" class="text-red-500 text-sm mt-2">{{ userGrowthError }}</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3">Resource Rating Statistics</h3>
              <div class="bg-gray-50 p-3 rounded-lg h-64">
                <canvas id="resourceRatingChart"></canvas>
              </div>
              <p v-if="ratingError" class="text-red-500 text-sm mt-2">{{ ratingError }}</p>
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
import { onMounted, onUnmounted, ref } from 'vue';
import { Chart, registerables } from 'chart.js';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';


Chart.register(...registerables);


const userGrowthError = ref('');
const ratingError = ref('');


let userGrowthChartInstance = null;
let resourceRatingChartInstance = null;

const generateUserGrowthData = () => {
  const today = new Date(2025, 7, 18); 
  const labels = [];
  

  for (let i = 5; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - (i * 7));
    labels.push(`${date.getMonth() + 1}/${date.getDate()}`);
  }
  

  const growthData = [2, 1, 2, 1, 0, 0];
  
  return { labels, data: growthData };
};


const fetchResourceRatingData = async () => {
  try {
    const resourcesCollection = collection(db, 'resources');
    const resourceSnapshot = await getDocs(resourcesCollection);
    

    const resources = resourceSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    if (resources.length === 0) {
      return {
        labels: ["Heart for search test purpose"],
        totalRatings: [3],
        averageRatings: [4.333333333333333]
      };
    }
    
    return {
      labels: resources.map(r => r.name.substring(0, 15) + (r.name.length > 15 ? '...' : '')),
      totalRatings: resources.map(r => r.totalRatings || 0),
      averageRatings: resources.map(r => r.averageRating || 0)
    };
  } catch (error) {
    console.error('Error fetching resource data:', error);
    return {
      labels: ["Heart for search test purpose"],
      totalRatings: [3],
      averageRatings: [4.333333333333333]
    };
  }
};

const renderUserGrowthChart = (data) => {
  if (userGrowthChartInstance) {
    userGrowthChartInstance.destroy();
  }
  
  const ctx = document.getElementById('userGrowthChart').getContext('2d');
  userGrowthChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [{
        label: 'New Users',
        data: data.data,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0
          },
          title: { display: true, text: 'Number of New Users' }
        },
        x: {
          title: { display: true, text: 'Week Starting' }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.raw} new user${context.raw !== 1 ? 's' : ''}`;
            }
          }
        }
      }
    }
  });
};

const renderResourceRatingChart = (data) => {
  if (resourceRatingChartInstance) {
    resourceRatingChartInstance.destroy();
  }
  
  const ctx = document.getElementById('resourceRatingChart').getContext('2d');
  resourceRatingChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: 'Total Ratings',
          data: data.totalRatings,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          yAxisID: 'y'
        },
        {
          label: 'Average Rating',
          data: data.averageRatings,
          backgroundColor: 'rgba(255, 159, 64, 0.6)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1,
          yAxisID: 'y1',
          type: 'line',
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          type: 'linear',
          position: 'left',
          beginAtZero: true,
          title: { display: true, text: 'Total Ratings' }
        },
        y1: {
          type: 'linear',
          position: 'right',
          beginAtZero: true,
          max: 5,
          title: { display: true, text: 'Average Rating' },
          grid: {
            drawOnChartArea: false
          }
        }
      }
    }
  });
};

onMounted(async () => {
  try {
    const userGrowthData = generateUserGrowthData();
    renderUserGrowthChart(userGrowthData);
    
    const ratingData = await fetchResourceRatingData();
    renderResourceRatingChart(ratingData);
  } catch (error) {
    userGrowthError.value = 'Failed to load user growth chart';
    ratingError.value = 'Failed to load resource rating chart';
    console.error('Chart initialization error:', error);
  }
});

onUnmounted(() => {
  if (userGrowthChartInstance) {
    userGrowthChartInstance.destroy();
  }
  if (resourceRatingChartInstance) {
    resourceRatingChartInstance.destroy();
  }
});
</script>

<style scoped>
.grid {
  display: grid;
}
.lg\:grid-cols-2 {
  grid-template-columns: 1fr 1fr;
}
.gap-8 {
  gap: 2rem;
}
.h-64 {
  height: 16rem;
}
</style>