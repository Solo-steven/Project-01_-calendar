<template>
      <div class="card  mycalendar" key="calendar" v-if="WindowData.flip">
              <div class="card-header ">
                  <div class="row justify-content-center">
                      <div class="col-4  yearandmonth  justify-content-between">
                          <span> {{WindowData.fix.month[WindowData.key.month-1]}} </span>
                          <span> {{WindowData.key.year}} </span> 
                      </div>
                  </div>
              </div>
              <div class="card-body">
                  <div class="row">
                      <div class="col day text-center mb-2 mt-1" v-for="day in WindowData.fix.day" :key="day">
                          {{day}}
                      </div>
                  </div>
                  <div class="row">
                      <div class="col last_month text-center mb-1" v-for="date in WindowData.others.last_month" :key="date">
                          {{date}}
                      </div>
                      <div class="col this_month text-center mb-1" v-for="date in WindowData.others.first_date" v-on:click="onCheckArrangement(date)" :key="date">
                            {{date}}
                      </div>
                  </div>
                  <div class="row" v-for="week in WindowData.others.week_date" :key="week" >
                      <div class="col this_month text-center  mb-1" v-for="date in week"  v-on:click="onCheckArrangement(date)"  :key="date">
                           {{date}}    
                      </div>
                  </div>
              </div>
      </div>
</template>

<script>
export default {
    name:"MyCalendar",
    props:[],
    data : function(){

    }
}
</script>

<style scoped>

</style>