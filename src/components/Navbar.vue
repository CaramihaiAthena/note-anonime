<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-info" style="border-radius: 10px">
      <!-- <a class="navbar-brand text-light" href="#">Navbar</a> -->
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <!-- .active class is used to highlight which is the active/current link -->
          <li :class="isHomePage ? 'nav-item active' : 'nav-item'">
            <a class="nav-link text-light" href="#" @click="setNewPage('home')"
              >Home <span class="sr-only"></span
            ></a>
          </li>
          <li :class="isHomePage ? 'nav-item' : 'nav-item active'">
            <a class="nav-link text-light" href="#" @click="setNewPage('projects')"
              >Projects</a
            >
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      // initial, pagina curenta este home
      currentPage: "home",
    };
  },
  // computed properties are cached based on their reactive dependencies (will only re-evaluate when some of its reactive dependencies have changed)
  computed: {
    isHomePage() {
      // `this` points to the component instance
      return this.currentPage === "home";
    },
  },
  methods: {
    //sets the current page
    setNewPage(page) {
      this.currentPage = page;
      //emit a custom event.
      this.$emit("set-new-page", page); //we set the page to be the current page
    },
  },
};
</script>
