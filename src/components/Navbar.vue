<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li :class="isHomePage ? 'nav-item active' : 'nav-item'">
            <a class="nav-link" href="#" @click="setNewPage('home')">Home <span class="sr-only"></span></a>
          </li>
          <li :class="isHomePage ? 'nav-item' : 'nav-item active'">
            <a class="nav-link" href="#" @click="setNewPage('projects')">Projects</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
    return {
      currentPage: 'home',
    }
  },
  computed: {
    isHomePage() {
      return this.currentPage === 'home'
    }
  },
  methods: {
    setNewPage(page) {
      this.currentPage = page
      this.$emit('set-new-page', page)
    }
  },
  }
</script>
