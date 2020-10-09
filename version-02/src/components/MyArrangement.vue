<template>

  <div class=" card arrangement" key="arrange"  >
      <div class="card-header">
          <div class="row justify-content-between">
               <div class="col-2">
                  <button type="button" class="btn btn-info" v-on:click="emit_switchCalnedarArrangement_signal" >
                     Back
                  </button>
               </div>
               <div class="col-4 ">
                  <h3 class="card-title arrangement-today text-right"> {{ArrangeData.key.year + "."+ ArrangeData.key.month +"."+ ArrangeData.key.date}}</h3>
               </div>
         </div>
      </div>
      <div class="card-body">
         <div class="row justify-content-left" >
            <div class="col-2 pr-0 pl-2 arrangement-title">
               <span>Course :</span>  
            </div>
            <span  class="arrangement-item" v-for="course in ArrangeData.dailycourse" :key="course.name">
               {{course.name}} 
            </span>
         </div>
         <hr>
         <div class="row justify-content-left" >
            <div class="col-2 pr-0 pl-2 arrangement-title">
                  <span>Study Plan :</span>
             </div>
            <span type="button" class="arrangement-item" v-for="study in ArrangeData.dailystudy" v-on:click="onChangeStatus('dailystudy',study.name)"
                  data-toggle="tooltip" data-placement="right" title="click to finish" :key="study.name">
                     {{study.name}}
               <transition name="main" mode="out-in">
                  <div v-if="study.status" style="display: inline-block; opacity: .4;" key="done">
                     {{"(done)"}}
                  </div>
                  <div v-else style="display: inline-block; opacity: .4;" key="todo">
                     {{ "(to do)"}}
                  </div>
               </transition>
            </span>
         </div>
         <hr>
         <div class="row justify-content-left" >
            <div class="col-2 pr-0 pl-2 arrangement-title" >
                  <span> To do list : </span>
            </div>
            <transition-group name="fade" class="col-10">
               <span type="button" class="arrangement-item" v-for="todolist in ToDoList" v-on:click="onChangeStatus('todolist',todolist.name)"
                     data-toggle="tooltip" data-placement="right" title="click to finish" :key="todolist.name">
                  {{todolist.name}}
                  <span v-if="todolist.status" style="opacity: .4;">
                     {{"(done)"}}
                  </span>
                  <span v-else style="opacity: .4;">
                     {{ "(to do)"}}
                  </span>
               </span> 
            </transition-group>     
         </div>
         <hr>
         <div class="row justify-content-left">
             <div class="col-4 pr-0 pl-2 arrangement-title" >
                  <span>Coming Work Project : </span>
             </div>
             <span class="arrangement-item" v-for="project in ArrangeData.workproject" :key="project.name">
                     {{project.name}}
             </span>
         </div>
         <hr>
         <div class="row justify-content-left">
             <div class="col-4 pr-0 pl-2 arrangement-title" >
                  <span>Coming Side Project : </span>
            </div>
            <span class="arrangement-item" v-for="project in ArrangeData.sideproject" :key="project.name">
                     {{project.name}}
            </span>
         </div>
         <hr>
      </div>
   </div>
           <!-----     Calendar Part     --->

        
        <!-----     Project List And Calendar     -->

 
    
</template>

<script>
export default {
    name:"MyArrangement",
    methods:{
       emit_switchCalnedarArrangement_signal(){
          this.$emit("switchCalendarArrangement");
       },
       emit_changeStatus_singal(evevnttype, targetobject){
          this.$emit(eventtype , targetobject)
       }
    }
}
</script>

<style scoped>
 .arrangement{
    max-width: 600px;
    min-height: 415px;
    background: #2b4450;
    color : #dfebed;
    border-radius: 4px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, .3);
    font-family: 'Roboto', sans-serif;
    margin: auto;
 }
 .arrangement-today{
     font-weight: 100;
 }
  
 .arrangement-title{
     font-weight: 100;
 }

 .arrangement-item{
     padding-right: 2%;
 }

</style>