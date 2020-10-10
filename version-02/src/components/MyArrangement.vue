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
            <span type="button" class="arrangement-item" v-for="study in ArrangeData.dailystudy" v-on:click="emit_changeStatus_singal('dailystudy', study) "
                  data-toggle="tooltip" data-placement="right" title="click to finish" :key="study.name">
                     {{study.name}}
               <transition name="flip" mode="out-in">
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
               <span type="button" class="arrangement-item" v-for="todolist in ArrangeData.todolist" v-on:click="emit_changeStatus_singal('todolist', todolist)"
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
           
</template>

<script>
export default {
    name:"MyArrangement",
    props:["ArrangeData" /* UserInfo */ ],
    
    /*
    data(){
      return{
         ArrangeData:{
            key: {
                year: 0,
                month: 0,
                date: 0
            },
            dailycourse: [],
            dailystudy: [],
            todolist: [],
            workproject: [],
            sideproject: []
         }
      } 
    },
    */

    /*
    created(){
       //this.$bus.$on("checkArrangement",(year,month,date)=>filterArrangement(year, month, date));
       //console.log("create arrangement");
    },
    */
    
    methods:{

      emit_switchCalnedarArrangement_signal(){
          this.$emit("switchCalendarArrangement");
       },

      emit_changeStatus_singal(eventtype, targetobject){
          this.$emit("changeStatus" , eventtype , targetobject)
       },

       /*  --- 
       fliterArrangement(year, month , date)
       {
          console.log("check Arrangement")
            date = String(date);
            if (date === "" || date === undefined) {
                console.log("Arrange check error", typeof (date), date)
                return;
            }
            date = Number(date);
            var D = new Date(year, month - 1, date);
            var day = D.getDay();
            this.ArrangeData.key.year = year;
            this.ArrangeData.key.month= month;
            this.ArrangeData.key.date = date;

            this.ArrangeData.dailycourse = this.UserInfo.DailyCourse.filter(index => index.day === day);
            this.ArrangeData.dailystudy = this.UserInfo.DailyStudy.filter(index => index.day === day);
            this.ArrangeData.todolist = this.UserInfo.ToDoList;
            console.log(this.ArrangeData.todolist === this.UserInfo.ToDoList)
            this.ArrangeData.workproject = this.UserInfo.WorkProject.filter(index => {
                if (index.deadline.year == this.ArrangeData.key.year &&
                    index.deadline.month == this.ArrangeData.key.month &&
                    index.deadline.date >= this.ArrangeData.key.date &&
                    index.deadline.date - this.ArrangeData.key.date <= 7) {
                    return true;
                }
                if (index.deadline.year == this.ArrangeData.key.year &&
                    index.deadline.month > this.ArrangeData.key.month &&
                    index.deadline.month - this.ArrangeData.key.month == 1 &&
                    ((index.deadline.date) - 0) + (31 - this.ArrangeData.key.date) <= 7) {
                    return true;
                }
            });
            this.ArrangeData.sideproject = this.UserInfo.SideProject.filter(index => {
                if (index.deadline.year == this.ArrangeData.key.year &&
                    index.deadline.month == this.ArrangeData.key.month &&
                    index.deadline.date >= this.ArrangeData.key.date &&
                    index.deadline.date - this.ArrangeData.key.date <= 7) {
                    return true;
                }
                if (index.deadline.year == this.ArrangeData.key.year &&
                    index.deadline.month > this.ArrangeData.key.month &&
                    index.deadline.month - this.ArrangeData.key.month == 1 &&
                    ((index.deadline.date) - 0) + (31 - this.ArrangeData.key.date) <= 7) {
                    return true;
                }
            });

            console.log("Check arrangement : ", year,"(year)", month,"month" ,date,"(date)", day, "(day)");
            console.log("Today Course : ", this.ArrangeData.dailycourse);
            console.log("Today Study : ", this.ArrangeData.dailycourse);
            console.log("Today To Do List: ", this.ArrangeData.todolist);
            console.log("Coming Work Porject : ", this.ArrangeData.workproject);
            console.log("Coming Side Project : ", this.ArrangeData.sideproject);
       },
    */


    },


    /*
    beforeDestroy(){
       //this.$bus.$off("checkArrangement");
    }
    */
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