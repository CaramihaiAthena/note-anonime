<template>
  <div class="bg-image" 
      style="background-repeat: repeat;  
      background-attachment: fixed; 
      background-image: url('https://i.pinimg.com/originals/a4/17/cf/a417cf4d9dea17fd59a132333446ee7d.jpg');">
  <div id="app" class="card.mx-auto" 
      style="width: 80%;
      height: 100%;
      margin-left: auto;
      margin-right: auto;
      padding-top: 5%;
      padding-bottom: 10%;
      border: none;">
    <!-- set the navbar -->
    <Navbar @set-new-page="setNewPage" />
    <!-- if we are on the home page, we create a form where we enter the data for the project -->
    <div v-if="isHomePage"> 
        <div class="card.mx-auto" 
        style="
        margin-top: -100px;
        margin-left: auto;
        margin-right: auto;
        padding-top: 2%;
        padding-bottom: 10%;
        border: none;"></div> 
      <div class="form-group bg-info text-light" style="border-radius: 10px; padding: 1%">
        <label class="text-center" 
        style="width: 100%;
        margin-left: auto;
        margin-right: auto;
        padding-top: 0.5%;
        padding-bottom: 0.5%;
        border: none;" 
              for="fname">First Name</label>
        <input type="text" v-model="fName" class="form-control" id="fname" placeholder="Enter First Name">
      </div>
      <div class="form-group bg-info text-light" style="border-radius: 10px; padding: 1%">
        <label class="text-center" 
        style="width: 100%;
        margin-left: auto;
        margin-right: auto; 
        padding-top: 0.5%; 
        padding-bottom: 0.5%; 
        border: none;" 
                for="lname">Last Name</label>
        <input type="text" v-model="lName" class="form-control" id="lname" placeholder="Last Name">
      </div>
      <div class="form-group bg-info text-light" style="border-radius: 10px; padding: 1%">
        <label class="text-center" 
        style=" width: 100%; 
        margin-left: auto;
        margin-right: auto;
        padding-top: 0.5%;
        padding-bottom: 0.5%;
        border: none;" 
                for="title">Project Title</label>
        <input type="text" v-model="title" class="form-control" id="title" placeholder="Project Title">
      </div>
      <div class="form-group bg-info text-light" style="border-radius: 10px; padding: 1%">
        <label class="text-center" 
        style="width: 100%; 
        margin-left: auto; 
        margin-right: auto; 
        padding-top: 0.5%; 
        padding-bottom: 0.5%; 
        border: none;" 
              for="project">Project</label>
        <textarea type="text" v-model="projectText" class="form-control w-100 h-100" id="project" placeholder="Write the project here"></textarea><br>
        <!-- <input type="file" id="project" name="project" multiple><br><br> -->
        <div class="custom-file">
          <input type="file" class="custom-file-input" id="ctrl" webkitdirectory directory multiple />
              <label class="custom-file-label" for="ctrl">Choose file/files</label>
            </div>
      </div>
      <!-- if we click submit button, we add the our project-->
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-primary bg-info text-light" 
        @click="submitHandler" style="width: 40%; 
        margin-top: 5% border-radius: 15px; border: none;">Submit</button>
      </div>
    </div>
    <div v-else-if="projects.length" v-for="(project, index) in projects" :key="index">
      <!-- :project = prop , "project" => projects[i] -->
      <div class="card.mx-auto" style="width: 80%; height: 100%; margin-top: 2%; margin-left: auto; margin-right: auto; border: none;">
      <GradingCard
        :project="project"
        :index="index"
        @project-graded="handleProjectGraded"
      />
    </div >
    </div>
    <div v-else>
      <!-- if we didn't submit any project, this message will appear -->
      <div class="card.mx-auto" style=" width: 80%; height: 100%; padding-top: 15%; padding-bottom: 50%; margin-left: auto; margin-right: auto; border: none;">
      <h1><center>No projects to grade</center></h1>
    </div>
    </div >
  </div>
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
