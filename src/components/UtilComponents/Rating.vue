<template>
  <div class="rating-container">
    <div class="stars" @mouseleave="resetPreview">
      <span 
        v-for="i in maxRating" 
        :key="i" 
        class="star"
        @mouseover="previewRating(i)"
        @click="selectRating(i)"
        :class="{ 
          'selected': i <= (previewValue || rating),
          'hover': i <= previewValue && previewValue > 0
        }"
      >★</span>
    </div>
    <p v-if="showText" class="rating-text">
      {{ previewValue || rating || 'Un rated' }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    rating: {
      type: Number,
      default: 0
    },
    maxRating: {
      type: Number,
      default: 5
    },
    showText: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      previewValue: null
    };
  },
  methods: {
    previewRating(value) {
      this.previewValue = value;
    },
    resetPreview() {
      this.previewValue = null;
    },
    selectRating(value) {
      this.$emit('update:rating', value);
      this.resetPreview();
    }
  }
};
</script>

<style scoped>
.rating-container {
  display: inline-block;
}

.stars {
  display: flex;
  gap: 4px;
  font-size: 24px;
}

.star {
  cursor: pointer;
  color: #ccc;
  transition: color 0.2s;
}

.star.selected {
  color: #ffd700;
}

.star.hover {
  color: #ffed85;
}

.rating-text {
  margin-top: 4px;
  font-size: 14px;
  color: #666;
  text-align: center;
}
</style>