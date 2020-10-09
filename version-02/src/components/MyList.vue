<template>
          <!-----     Project List Part     --->
            <div class="card mylist">
              <div class="card-header navbar" id="dailycoursebotton" >
                  <button class="btn btn-info  mylist-title" data-toggle="collapse" data-target="#dailycourse" type="button">
                    Daily Course
                  </button>
              </div>
              <div class="collapse " id="dailycourse">
               <div class="card-body" data-spy="scroll" data-target="#dailycoursebutton" style="height: 200px; overflow-y: scroll;">
                   <div class="row " v-for="course in UserInfo.DailyCourse" :key="course.name">
                      <div class="col mylist-item">
                         <div class="row">
                            <div class="col" > 
                                <span class="mylist-item-heading">{{ListData.day[course.day] +" : "}} </span>
                                {{course.name}}
                             </div>
                            <div class="col-4" style="opacity: .7;">
                                 {{ course.start_time[0].text + ":" + course.start_time[1].text 
                                  + " ~ " + course.end_time[0].text + ":" +course.end_time[1].text   }}
                            </div>
                         </div>
                         <hr>
                      </div>
                    </div>s
                </div>
              </div>
              <div class="card-header navbar" id="dailystudybutton" >
                <button class="btn btn-info mylist-title" data-toggle="collapse" data-target="#dailystudy" type="button">
                    Daily Study 
                </button>
              </div>
              <div class="collapse" id="dailystudy" >
                <div class="card-body" data-spy="scroll" data-target="#dailystudybutton" style="height: 175px; overflow-y: scroll;">
                   <div class="row " v-for="study in UserInfo.DailyStudy" :key="study.name">
                     <div class="col mylist-item">
                         <div class="row">
                            <div type="button" class="col" data-toggle="tooltip" data-placement="right" title="click to finish"
                                 v-on:click="onChangeStatus('dailystudy',study.name)"> 
                              <span class="mylist-item-heading">{{ ListData.day[study.day]+" : "}} </span>
                              {{study.name}}
                            </div>
                            <div class="col-3" style="opacity: .4;">
                            <transition name="main"> 
                               <div v-if="study.status" style="display: inline-block;" key="done" >done</div>
                               <div v-else  style="display: inline-block;" key="todo" >to do</div>
                             </transition>   
                            </div>
                         </div> 
                        <hr> 
                     </div>
                  </div> 
                </div>
              </div>  
              <div class="card-header navbar"  id="todolistbutton">
                <button class="btn btn-info mylist-title" data-toggle="collapse" data-target="#todolist" type="button">
                   To Do List
                </button>
              </div>
              <div class="collapse" id="todolist" >
                <div class="card-body" data-spy="scroll" data-target="#todolistbutton" style="height: 100px; overflow-y: scroll;">
                  <transition-group name="fade">
                    <div class="row"  v-for="todolist in  UserInfo.ToDoList" :key="todolist.name">
                      <div class="col mylist-item ">
                        <div class="row justify-content-between">
                          <div type="button" class="col-4" v-on:click="onChangeStatus('todolist',todolist.name)"
                               data-toggle="tooltip" data-placement="right" title="click to finish">
                             {{todolist.name}}
                          </div>
                          <div class="col-3"  style="opacity: .4;">
                               <span v-if="todolist.status">done</span>
                               <span v-else>to do</span>     
                          </div>
                        </div>
                        <hr>
                      </div>
                    </div>
                  </transition-group>
                </div>
              </div> 
               
              <div class="card-header navbar" id="workprojectbutton">
                <button class="btn btn-info  mylist-title" data-toggle="collapse" data-target="#workproject" type="button">
                  Work Project
                </button>
            </div>
            <div class="collapse" id="workproject">
              <div class="card-body " data-spy="scroll" data-target="#worlprojectbutton" style="height: 130px; overflow-y: scroll;">
                  <div class="row" v-for="project in UserInfo.WorkProject" :key="project.name">
                      <div class="col mylist-item">
                        <div class="row">
                           <div class="col">
                              <span class="mylist-item-heading"> Project: </span>
                              {{project.name}}
                           </div>
                           <div class="col-5" style="opacity: .4;">
                              {{"Deadline : "+project.deadline.year+"."+project.deadline.month+"."+project.deadline.date}}
                           </div>
                        </div>
                        <hr>
                      </div>
                  </div>
              </div>
            </div>  
            <div class="card-header navbar" id="sideprojectbutton" >
                <button class="btn btn-info mylist-title" data-toggle="collapse" data-target="#sideproject" type="button">
                  Side Project
                </button>
            </div>
            <div class="collapse" id="sideproject">
              <div class="card-body" data-spy="scroll" data-target="#sideprojectbutton" style="height: 130px; overflow-y: scroll;">
                <div class="row" v-for="project in UserInfo.SideProject" :key="project.name">
                    <div class="col mylist-item " >
                       <div class="row justify-content-between">
                          <div class="col">
                             <span class="mylist-item-heading">Project:</span>
                             {{project.name}}
                          </div>
                          <div class="col-5" style="opacity: .4;">
                             {{"Deadline : " + project.deadline.year+"."+project.deadline.month+"."+project.deadline.date}} 
                          </div>
                       </div> 
                       <hr>
                    </div>
                </div>
             </div>
            </div>
        </div>
           
    
</template>

<script>
export default {
    name:"MyList",
    props:["UserInfo"],
    data:function (){
        return{
             //--- this object is for show data in project list 
           ListData: {
            day: ["Sunday", "Monday", "Tuesday", "Wednesday", "Tursday", "Friday", "Saturday"],
            height: 100,
          }
        }
    }
    
}
</script>

<style scoped>
     /*-----     list     -----*/

.mylist{
    background: #2b4450;
    color : #dfebed;
    border-radius: 0px;
    width: 100%;
    height: 100%;
} 

@media (min-width: 576px) and (max-width: 767.98px){
  .mylist-title{
     width: 50%;
  }
}
@media (min-width: 768px) and (max-width: 991.98px){
    .mylist-title{
        width: 45%;
     }
}

@media (min-width: 992px) and (max-width: 1199.98px){
    .mylist-title{
        width: 42%;
     }
}
@media (min-width: 1200px) and (max-width:1370px){
    .mylist-title{
        width: 38%;
    }
}   
@media(min-width:1371.02px ){
    .mylist-title{
        width: 30%;
    }
}

.mylist-item{
    padding-top: 3px;
}
.mylist-item-heading{
    font-weight: 100;
    padding-right: 2%;
}

.mylist-item hr{
    margin-top: 8px;
    margin-bottom: 5px;
    margin-left: 0px;
    margin-right: 0px;
}
 
</style>