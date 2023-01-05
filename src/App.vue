<template>
  <div id="app">
    <Navbar @set-new-page="setNewPage" />
    <!-- if we are on the home page, we create a form where we enter the data for the project -->
    <div v-if="isHomePage">  
      <div class="form-group">
        <label for="fname">First Name</label>
        <input type="text" v-model="fName" class="form-control" id="fname" placeholder="Enter First Name">
      </div>
      <div class="form-group">
        <label for="lname">Last Name</label>
        <input type="text" v-model="lName" class="form-control" id="lname" placeholder="Last Name">
      </div>
      <div class="form-group">
        <label for="title">Project Title</label>
        <input type="text" v-model="title" class="form-control" id="title" placeholder="Project Title">
      </div>
      <div class="form-group">
        <label for="project">Project</label>
        <textarea type="text" v-model="projectText" class="form-control w-100 h-100" id="project" placeholder="Write the project here"></textarea><br>
        <!-- <input type="file" id="project" name="project" multiple><br><br> -->
        <input type="file" id="ctrl" webkitdirectory directory multiple/>
      </div>
      <!-- if we click submit button, we add the our project-->
      <button type="submit" class="btn btn-primary" @click="submitHandler">Submit</button>
    </div>
    <div v-else-if="projects.length" v-for="(project, index) in projects" :key="index">
      <GradingCard
        :project="project"
        :index="index"
        @project-graded="handleProjectGraded"
      />
    </div >
    <div v-else>
      <!-- if we didn't submit any project, this message will appear -->
      <h1>No projects to grade</h1>
    </div >
  </div>
</template>

<script>
// we imported the files 
import { submitProject } from "../sdk/api"
import GradingCard from './components/GradingCard.vue'
import Navbar from "./components/Navbar.vue"

export default {
  components: {
    Navbar,
    GradingCard,
  },
  name: 'App',
  data(){
    return {
      //initially, our data are empty
      fName: '',
      lName: '',
      title: '',
      projectText: '',
      currentPage: 'home',
      projects: []
    }
  },
  // computed properties are cached based on their reactive dependencies (will only re-evaluate when some of its reactive dependencies have changed)
  computed: {
    isHomePage() {
      // a computed getter
      return this.currentPage === 'home'
    }
  },
  methods: {
    async submitHandler() {
      const project = {
        fName: this.fName,
        lName: this.lName,
        title: this.title,
        projectText: this.projectText,
      }
      await submitProject(project)
      //we push our project into our array of proojects
      this.projects.push(project)
    },
    //setter
    setNewPage(page){
      this.currentPage = page
    },
    //The code above parses the JSON object and assigns the grades to each project.
    handleProjectGraded(params){
      this.projects[params.index].grades.push(params.grade)
      //creates a JSON object and assigns the values of this new object to the projects list 
      //so that they can be parsed later on into individual objects with their respective grade 
      //information stored inside them
      this.projects = JSON.parse(JSON.stringify(this.projects))
    }
  },
}
</script>
