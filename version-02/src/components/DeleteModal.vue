<template>
   <!----- Event Model - Delete --->
        <div class="modal fade" id="deleteevent" >
           <div class="modal-dialog">
              <div class="modal-content">
                 <div class="modal-header">
                     <h3 class="modal-title">Delete Event</h3>
                     <button type="button" class="close" data-dismiss="modal" v-on:click="clearEventTmp_signal()" >
                      <span >&times;</span>
                    </button>
                 </div>
                 <div class="modal-body">
                    <!----- select type ----->
                    <div class="form-group">
                      <label >Type</label>
                       <select class="form-control custom-select"  v-model="EventTmp.type">
                             <option value="dailycourse">Daily Course</option>
                             <option value="dailystudy">Daily Study</option>
                             <option value="todolist">To Do List</option>
                             <option value="workproject">Work Project</option>
                             <option value="sideproject">Side Project</option>
                       </select>
                    </div>
                   <!------ if is course , select target course -->
                   <div class="form-group" v-if=" EventTmp.type==='dailycourse' && UserInfo.DailyCourse.length>0 ">
                       <label>Delete Course</label>
                       <select class="form-control custom-select" v-model="EventTmp.search_object">
                            <option :value="course" v-for="course in UserInfo.DailyCourse" :key="course.name" >
                               {{course.name}}
                            </option>
                       </select>
                   </div>
                   
                   <!------ if is study , select target study --> 
                   <div class="form-group" v-if="EventTmp.type==='dailystudy' && UserInfo.DailyStudy.length>0 ">
                      <label >Delete Study Plan</label>
                      <select class="form-control custom-select" v-model="EventTmp.search_object">
                         <option :value="study" v-for="study in UserInfo.DailyStudy" :key="study.name">
                            {{study.name}}
                         </option>
                      </select>
                   </div>

                   <!------ if is ToDoList , select target List --> 
                   <div class="form-group" v-if="EventTmp.type==='todolist'&& UserInfo.ToDoList.length>0 ">
                     <label >Delete To Do List</label>
                     <select class="form-control custom-select" v-model="EventTmp.search_object">
                         <option :value="todo" v-for="todo in UserInfo.ToDoList" :key="todo.name">
                            {{todo.name}}
                        </option>
                      </select>
                   </div>

                   <!----- if is workproject , select target project -->
                   <div class="form-group" v-if="EventTmp.type==='workproject' && UserInfo.WorkProject.length>0 ">
                     <label>Delete Work Project </label>
                      <select class="form-control custom-select" v-model="EventTmp.search_object">
                          <option :value="project" v-for="project in UserInfo.WorkProject" :key="project.name">
                             {{project.name}}
                          </option>
                      </select>
                   </div>

                   <!----- if is sideproject , select target project-->
                   <div class="form-group" v-if="EventTmp.type==='sideproject' && UserInfo.SideProject.length>0 ">
                    <label>Delete Side Project </label>
                     <select  class="form-control custom-select" v-model="EventTmp.search_object">
                        <option :value="project" v-for="project in UserInfo.SideProject" :key="project.name">
                           {{project.name}}
                        </option>
                     </select>
                   </div>
    
                 </div>
                 <div class="modal-footer">
                     <button type="button" class="btn btn-primary" v-on:click="onUpDataEvent('delete')" >Submit</button>
                 </div>
              </div>
           </div>
        </div> 
        <!----- Event Model - Delete --->    

</template>

<script>
export default {
    name: "DeleteModal",
    props:["EventTmp","EventData","UserInfo"],
    methods:{
        clearEventTmp_signal(){
            this.$emit("clearEventTmp_signal");
        }
    }
}
</script>

<style scoped>

</style>