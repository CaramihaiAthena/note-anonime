<template>
  <div id="app">
    <!-- set the navbar -->
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
      <!-- :project = prop , "project" => projects[i] -->
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
      // a computed value that return homepage true or false
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
        grades: [],
      }
      await submitProject(project)
      //we push our project into our array of proojects
      this.projects.push(project)
    },
    //setter
    setNewPage(page){
      this.currentPage = page
    },
    handleProjectGraded(params){
      // params.index indicates the index of the project graded
      // push the grade in correct project (ex: project with index 1)
      this.projects[params.index].grades.push(params.grade)
      // we use JSON.parse(JSON.stringify(this.projects)) so we can change the object address of
      // projects so that the component GradingCard rerenders and display the new values
      // this method of work is called a deep clone of an object in JS
      this.projects = JSON.parse(JSON.stringify(this.projects))
    }
  },
}
</script>
