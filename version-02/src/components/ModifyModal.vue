<template>
     <!----- Event Modal - Modify --->
        <div class="modal fade" id="modifyevent">
           <div class="modal-dialog">
              <div class="modal-content">
                 <div class="modal-header">
                    <h3 class="modal-title">Modify Event</h3>
                    <button type="button" class="close" data-dismiss="modal" v-on:click="clearEventTmp_signal()">
                     <transition>   
                       <span  >
                           X
                        </span>
                     </transition>   
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
                     <!----->
                     <div class="form-group" v-if="EventTmp.type==='dailycourse'">
                        <label>Name</label>
                        <select class="form-control custom-select" v-model="EventTmp.search_object">
                           <option v-bind:value="dailycourse" v-for="dailycourse in UserInfo.DailyCourse" :key="dailycourse.name">
                               {{dailycourse.name}}
                           </option>
                        </select>
                     </div>

                     <div class="form-group" v-if= " EventTmp.type ==='dailystudy' ">
                        <label>Name</label>
                        <select class="form-control custom-select" v-model="EventTmp.search_object">
                            <option :value="dailystudy" v-for="dailystudy in UserInfo.DailyStudy" :key="dailystudy.name">
                               {{dailystudy.name}}
                            </option>
                        </select>
                     </div>
                     
                     <div class="form-group" v-if=" EventTmp.type === 'todolist' ">
                        <label>Name</label>
                        <select class="form-control custom-select" v-model="EventTmp.search_object">
                            <option :value="todolist" v-for="todolist in UserInfo.ToDoList" :key="todolist.name"> 
                               {{todolist.name}}
                            </option>
                        </select>
                     </div>

                     <div class="form-group" v-if=" EventTmp.type === 'workproject' ">
                        <label>Name</label>
                        <select class="form-control custom-select" v-model="EventTmp.search_object">
                            <option :value="project" v-for="project in UserInfo.WorkProject" :key="project.name"> 
                               {{project.name}}
                            </option>
                        </select>
                     </div>

                     <div class="form-group" v-if=" EventTmp.type === 'sideproject' ">
                        <label>Name</label>
                        <select class="form-control custom-select" v-model="EventTmp.search_object">
                            <option :value="project" v-for="project in UserInfo.SideProject" :key="project.name"> 
                               {{project.name}}
                            </option>
                        </select>
                     </div>

                     <hr v-if=" EventTmp.type!=='' ">




                     <div class="form-group" v-if=" EventTmp.type!=='' ">
                        <label>New Name</label>
                        <input class="form-control"  type="text" v-model="EventTmp.name">
                     </div>   
                     <!----- input daily schedular :  day-----> 
                    <div class="form-group" v-if="EventTmp.type==='dailycourse'||EventTmp.type==='dailystudy'">
                      <label>Day</label>
                      <select class="form-control custom-select"  v-model="EventTmp.day">
                         <option :value="day.value" v-for="day in EventData.day" :key="day.text"> {{day.text}}</option>
                      </select>
                    </div>
                     <label v-if="EventTmp.type==='dailycourse'"> 
                        Start Time
                        <span style="opacity: .6;">(hour/minute)</span>
                      </label>
                      <div class="form-row" v-if="EventTmp.type==='dailycourse'">
                         <div class="col form-group">
                            <select class="form-control custom-select"  v-model="EventTmp.start_time[0]" >
                                <option :value="hour" v-for="hour in EventData.hour" :key="hour.text">{{hour.text}} </option>
                            </select> 
                         </div>
                         <div class="col form-group">
                            <select class="form-control custom-select"  v-model="EventTmp.start_time[1]">
                                <option :value="min" v-for="min in EventData.minute" :key="min.text">{{min.text}} </option>
                            </select> 
                         </div>
                      </div>
                      <label v-if="EventTmp.type==='dailycourse'">
                         End Time
                        <span style="opacity: .6;">(hour/minute)</span>
                      </label>
                      <div class="form-row" v-if="EventTmp.type==='dailycourse'">
                         <div class="col form-group">
                           <select class="form-control custom-select"  v-model="EventTmp.end_time[0]">
                               <option :value="hour" v-for="hour in EventData.hour" :key="hour.text">{{hour.text}} </option>
                            </select>  
                         </div>
                         <div class="col form-group">
                           <select class="form-control custom-select"  v-model="EventTmp.end_time[1]">
                             <option :value="min" v-for="min in EventData.minute" :key="min.text">{{min.text}} </option>
                           </select> 
                         </div>
                      </div>

                      <!----- input project schedular : deadline -->
                     <label v-if="EventTmp.type==='workproject'||EventTmp.type==='sideproject'">
                           DeadLine
                         <span style="opacity: 0.6;">(year/month/date)</span>
                     </label>
                     <div class="form-row" v-if="EventTmp.type==='workproject'||EventTmp.type==='sideproject'">
                         <div class="col form-group">
                            <input class="form-control" type="text" v-model="EventTmp.deadline.year">
                         </div>
                         <div class="col form-group">
                            <input class="form-control"  type="text" v-model="EventTmp.deadline.month">
                         </div>
                         <div class="col form-group">
                             <input class="form-control" type="text" v-model="EventTmp.deadline.date">
                         </div>
                     </div>

                 </div>
                 <div class="modal-footer">
                    <button type="button" class="btn btn-primary" v-on:click="emit_UpDataEvent_Signal('modify')">Submit</button>
                 </div>
              </div>
           </div>
        </div>
        <!----- Event Modal - Modify -->
</template>

<script>
export default {
    name:"ModifyModal",
    props:["EventTmp","EventData","UserInfo" ],
    methods:{
        clearEventTmp_signal(){
            this.$emit("clearEventTmp_signal");
        },
        emit_UpDataEvent_Signal(ActionType){
            this.$emit("upDataEvent",ActionType);
        }
    }
}
</script>

<style scoped>

</style>