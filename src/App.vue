<template>
  <Navigationbar />
  <div class="content">
    <router-view/>
  </div>  
</template>

<script>
import Navigationbar from './components/Navigationbar.vue';

export default {
  components: { Navigationbar },
  commponents: {
    Navigationbar
  }
}
</script>

<style>
.content {
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;
}
</style>
