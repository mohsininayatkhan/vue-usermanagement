<template>
  <div class="home">
    <p>Users</p>
    <p>{{error}}</p>
    <div v-for="doc in documents" v-bind:key="doc.id">
      <div class="single">
          <div v-if="doc.photo" class="thumbnail">
              <img :src="doc.photo">
              <div v-if="doc.photo" v-bind:class="[doc.status == 'Online' ? 'online-status-circle' : 'offline-status-circle']"></div>
          </div>
          <div v-else class="thumbnail">
              <img src="@/assets/no-profile-img.png" alt="No Image">
              <div v-if="doc.photo" v-bind:class="[doc.status == 'Online' ? 'online-status-circle' : 'offline-status-circle']"></div>
          </div> 
            
          <div class="info">
              <h3>{{ doc.name }}</h3>
              <p>{{ doc.about }}</p>
              <p>{{ doc.status }}</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import getCollection from '@/composables/getCollection'

export default {
  name: 'Users',
  setup() {
    const {error, documents} = getCollection('users')

    return {error, documents}
  }
}
</script>

<style scoped>
.single {
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    background: white;
    margin: 16px 0;
    transition: all ease 0.2s;
}
.single:hover {
    box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
    transform: scale(1.02);
    transition: all ease 0.2s;
}
.thumbnail {
    position: relative;
    max-width: 100px;
    max-height: 100px;
    overflow: hidden;
    border-radius: 10px;
}
img {
    max-width: 100%;
    max-height: 100%;
    display: block;
}
.info {
    margin: 0 30px;
}
.online-status-circle {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: green;
  border: 2px solid white;
  bottom: 0;
  right: 0;
  position: absolute;
}
.offline-status-circle {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: gray;
  border: 2px solid white;
  bottom: 0;
  right: 0;
  position: absolute;
}

</style>
