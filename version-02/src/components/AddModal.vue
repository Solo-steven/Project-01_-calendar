<template>
     <!----- Event Model - Add    -->
        <div class="modal fade" >
          <div class="modal-dialog">
             <div class="modal-content">
                <div class="modal-header">
                  <h3 class="modal-title">Add Event</h3>
                  <button type="button" class="close" data-dismiss="modal" v-on:click="clearEventTmp_signal()" >
                    <span >&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form>
                    <!----- input type -----> 
                    <div class="form-group">
                      <label >Type</label>
                       <select class="form-control custom-select" v-model="EventTmp.type" >
                             <option value="dailycourse">Daily Course</option>
                             <option value="dailystudy">Daily Study</option>
                             <option value="todolist">To Do List</option>
                             <option value="workproject">Work Project</option>
                             <option value="sideproject">Side Project</option>
                       </select>
                    </div>
                    <!----- input name -----> 
                    <div class="form-group">
                      <label>Name</label>
                      <input class="form-control"  type="text" v-model="EventTmp.name">
                    </div>
                    
                    <!----- input daily schedular :  day-----> 
                    <div class="form-group" v-if="EventTmp.type==='dailycourse'||EventTmp.type==='dailystudy'">
                       <label>Day</label>
                       <select class="form-control custom-select"  v-model="EventTmp.day">
                          <option :value="day.value" v-for="day in EventData.day" :key="day.value"> {{day.text}}</option>
                       </select>
                    </div>
                    <!----- input daily schedular :  time range -----> 
                    <label v-if="EventTmp.type==='dailycourse'"> 
                      Start Time
                      <span style="opacity: .6;">(hour/minute)</span>
                    </label>
                    <div class="form-row" v-if="EventTmp.type==='dailycourse'">
                       <div class="col form-group">
                          <select class="form-control custom-select"  v-model="EventTmp.start_time[0]" >
                              <option :value="hour" v-for="hour in EventData.hour" :key="hour.value">{{hour.text}} </option>
                          </select> 
                       </div>
                       <div class="col form-group">
                          <select class="form-control custom-select"  v-model="EventTmp.start_time[1]">
                              <option :value="min" v-for="min in EventData.minute" :key="min.value">{{min.text}} </option>
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
                             <option :value="hour" v-for="hour in EventData.hour" :key="hour.value">{{hour.text}} </option>
                          </select>  
                       </div>
                       <div class="col form-group">
                         <select class="form-control custom-select"  v-model="EventTmp.end_time[1]">
                           <option :value="min" v-for="min in EventData.minute" :key="min.value">{{min.text}} </option>
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

                  </form>

                </div>
                <div class="modal-footer">
                   <button type="button" class="btn btn-primary" v-on:click="emit_UpDataEvent_Signal('add')">Submit</button>
                </div>
             </div>
          </div>
        </div> 
        <!----- Event Model - Add   -->
</template>

<script>
export default {
    name: "AddModal",
    props: ["EventTmp","EventData"],  
     methods:{
        clearEventTmp_signal(){
            this.$emit("clearEventTmp_signal");
        },
        emit_UpDataEvent_Signal(actiontype){
            console.log(actiontype);
            this.$emit("upDataEvent",actiontype);
        }
    }  
}
</script>

<style scoped>

</style>