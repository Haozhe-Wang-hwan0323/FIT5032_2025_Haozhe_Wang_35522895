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
            class="nav-link px-4 py-2 rounded-lg hover:bg-primary/10 text-gray-600 hover:text-primary font-medium text-lg transition-colors"
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
      <div class="mb-10 d-flex justify-content-center">
        <button class="emergency-btn d-flex align-items-center justify-content-center">
          <i class="fa fa-phone text-5xl me-3"></i>
          <span class="text-2xl font-bold">EMERGENCY</span>
        </button>
      </div>

      <div class="bg-white rounded-2xl shadow-xl p-8 mb-8 border-2 border-gray-200">
        <div class="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-8 mb-12 shadow-md">
          <h2 class="text-[clamp(1.8rem,4vw,3rem)] font-bold text-white mb-4">Welcome back, Mr. Chen</h2>
        </div>

        <div class="row g-8">
          <div class="col-12 col-md-6 col-lg-3 d-flex">
            <router-link to="/ai-diagnose" class="card-link flex-grow">
              <div class="feature-card blue-card h-100 d-flex flex-column">
                <div class="icon-container">
                  <i class="fa fa-stethoscope text-4xl"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-4">AI Diagnose</h3>
                <p class="text-gray-600 text-lg flex-grow">AI-assisted health diagnosis</p>
                <div class="decor-line blue-line"></div>
              </div>
            </router-link>
          </div>

          <div class="col-12 col-md-6 col-lg-3 d-flex">
            <router-link to="/reserve-diagnose" class="card-link flex-grow">
              <div class="feature-card green-card h-100 d-flex flex-column">
                <div class="icon-container">
                  <i class="fa fa-calendar-check-o text-4xl"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Reserve Diagnose</h3>
                <p class="text-gray-600 text-lg flex-grow">Book doctor appointments</p>
                <div class="decor-line green-line"></div>
              </div>
            </router-link>
          </div>

          <div class="col-12 col-md-6 col-lg-3 d-flex">
            <router-link to="/lecture" class="card-link flex-grow">
              <div class="feature-card purple-card h-100 d-flex flex-column">
                <div class="icon-container">
                  <i class="fa fa-graduation-cap text-4xl"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Health Lecture</h3>
                <p class="text-gray-600 text-lg flex-grow">Online health sessions</p>
                <div class="decor-line purple-line"></div>
              </div>
            </router-link>
          </div>

          <div class="col-12 col-md-6 col-lg-3 d-flex">
            <router-link to="/resource" class="card-link flex-grow">
              <div class="feature-card orange-card h-100 d-flex flex-column">
                <div class="icon-container">
                  <i class="fa fa-book text-4xl"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Resource Library</h3>
                <p class="text-gray-600 text-lg flex-grow">Health guides & materials</p>
                <div class="decor-line orange-line"></div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-gray-900 text-white py-16 mt-auto">
      <div class="container mx-auto px-4">
        <div class="row justify-content-between align-items-center">
          <div class="col-12 col-md-6 text-center text-md-start mb-8 mb-md-0">
            <h2 class="text-3xl font-bold mb-4 text-yellow-400">Health Guardian</h2>
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
          <p class="mt-2">Contact: hwan0323@student.monash.edu </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'UserHomePage',
  methods: {
    handleScroll() {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 10) {
        navbar.classList.add('py-2', 'shadow-lg');
        navbar.classList.remove('py-3', 'shadow-md');
      } else {
        navbar.classList.add('py-3', 'shadow-md');
        navbar.classList.remove('py-2', 'shadow-lg');
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style scoped>
</style>