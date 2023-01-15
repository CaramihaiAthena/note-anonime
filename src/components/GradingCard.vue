<template>
  <div class="card bg-info text-light" style="border-radius: 10px;">
    <div class="card-body">
      <h5 class="card-title">{{ project.title }}</h5>
      <h6 class="card-subtitle my-2 text-muted">{{ project.fname }} {{ project.lname }}</h6>
      <p class="card-text">{{ project.projectText }}</p>
      <a href="#" @click="showGradingInput = !showGradingInput" class="card-link  text-light">Grade Project right here ({{projectGrade}})</a>
      <!-- if we click, will appear an input field where we need to grade the prooject  -->
      <div v-if="showGradingInput">
        <!-- before we enter something, we need to validate the input -->
        <input type="text" @input="validateField($event.target.value)" v-model="inputGrade" class="form-control mr-sm-2 mt-2">
        <button type="submit" @click="handleSubmitGrade" class="btn btn-success mt-4 bg-light text-info" style="border: none;">Grade The Project</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GradingCard',
  data(){
    return{
      // when we return the input, it will show only if we click on the anchor hypertext ref
      showGradingInput: false,
      // and initially, the grade will be 1
      inputGrade: 1
    }
  },
  //properties => the way that we pass data from a parent component down to it's child components
  props:{
    //every project submitted is of type object
    project: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
  },
  computed: {
    projectGrade() {
      // we start by checking if there are any grades in the project, and if there aren't it will return "Ungraded".
      if (!this.project.grades || this.project.grades.length < 3) return 'Ungraded'
      const grades = JSON.parse(JSON.stringify(this.project.grades.sort()))
      // shift() method removes the first element from an array and returns that removed element.
      grades.shift()
      // pop() method removes the last element from an array and returns that element
      grades.pop()
      let total = 0
      let count = 0
      for (let grade of grades) {
        total += grade
        count ++
      }
      const finalGrade = total / count
      return `currently ${finalGrade}/10`
    }
  },
  methods: {
    handleSubmitGrade(){
     // first we clear out the grading input field, which will be shown again once the user clicks on it
      this.showGradingInput = false
      //if we
      alert("You graded successfully this project!")
     // The code will emit an event called "project-graded" 
     // with the index of the current student and their grade.
      this.$emit('project-graded', {
        index: this.index,
        grade: + this.inputGrade
      })
    },
  // This function is meant to validate the input field.
  // If the input is not a number, it will return false and set this.inputGrade = 1 which alerts that the grading system allows for grades between 1 and 10.
  // If the input field is not present, then it will return an empty string.
    validateField(input){
      if (!input) return
      input = +input
      if(!(input >= 1 && input <= 10)) {
        this.inputGrade = 1
        alert("The grading system allows for grades between 1 and 10")
        return
      }
    }
  },
}
</script>
