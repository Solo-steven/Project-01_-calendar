<template>
<div id="app" class="myApp"> 
   <div class="container-fluid p-0  fill-heigth fill-width">
       <div class="row my-navbar m-0" >
          <div class="col p-0">
               <MyNavbar></MyNavbar>
          </div>
       </div>
       <div class="row my-window m-0 justify-content-center">
           <div class="col-4 p-0 fade collapse " id="list">
               <MyList :UserInfo="UserInfo" 
                       @changeStatus="onChangeStatus">
               </MyList>
           </div>
           <div class="col-8 p-0">
               <div class="row m-0 fill-heigth justify-content-center align-content-center">
                   <div class="col p-0 ">
                        <transition name="flip"> 
                          <MyCalendar v-if="flip==false" 
                                 @checkArrangement="onCheckArrangement">
                          </MyCalendar>
                          <MyArragenment v-else 
                                 @switchCalendarArrangement="onSwitchCalendarArrangement"
                                 @changeStatus="onChangeStatus">
                          </MyArragenment>
                        </transition> 
                   </div>
               </div>
           </div>
       </div>
   </div> 
  <MyModal :UserInfo="UserInfo" @upDataEvent="onUpDataEvent"></MyModal> 
</div>
</template>

<script>
import MyModal from './components/MyModal.vue'
import MyNavbar from './components/MyNavbar'
import MyList from './components/MyList'
import MyCalendar from './components/MyCalendar.vue'
import MyArragenment from './components/MyArrangement.vue'
//import {user_course , user_study, user_workproject, user_sideproject, user_todolist} from './TestInfo'

const user_course=[
    {
        name:"普通物理學", 
        day:1, 
        start_time:[ {text:"09",value:9}, {text:"00",value:0}],
        end_time:  [ {text:"11",value:11}, {text:"00",value:0}],
        status:0,
    },
    { 
        name:"工程數學", 
        day:1, 
        start_time:[ {text:"13",value:13}, {text:"00",value:0}],
        end_time:  [ {text:"16",value:16}, {text:"00",value:0}],
        status:0,
    }, 
    {
        name:"數位系統", 
        day:2, 
        start_time:[ {text:"09",value:9}, {text:"00",value:0}],
        end_time:  [ {text:"12",value:12}, {text:"00",value:0}],
        status:0,
    },
    {
        name:"會計學", 
        day:2, 
        start_time:[ {text:"14",value:14}, {text:"00",value:0}],
        end_time:  [ {text:"17",value:17}, {text:"00",value:0}],
        status:0,
    },
    {
        name:"普通物理學", 
        day:3, 
        start_time:[ {text:"09",value:9}, {text:"00",value:0}],
        end_time:  [ {text:"10",value:10}, {text:"00",value:0}],
        status:0,
    },
    {
        name:"數位邏輯", 
        day:3, 
        start_time:[ {text:"14",value:14}, {text:"00",value:0}],
        end_time:  [ {text:"17",value:17}, {text:"00",value:0}],
        status:0,
    },
    {
        name:"程式設計(一)", 
        day:4, 
        start_time:[ {text:"09",value:9}, {text:"00",value:0}],
        end_time:  [ {text:"12",value:12}, {text:"00",value:0}],
        status:0,
    },
    {
        name:"資料結構", 
        day:4, 
        start_time:[ {text:"15",value:15}, {text:"00",value:0}],
        end_time:  [ {text:"18",value:18}, {text:"00",value:0}],
        status:0,
    },
    {
        name:"機率與統計", 
        day:5, 
        start_time:[ {text:"13",value:13}, {text:"00",value:0}],
        end_time:  [ {text:"16",value:16}, {text:"00",value:0}],
        status:0,
    }

]

const user_study=[
  {
     name:"複習-數位邏輯",
     day:1,
     status:0,
  },
  {
    name:"複習-普物",
    day:2,
    status:0,
  },
  {
    name:"複習-工數",
    day:3,
    status:0,
  }, 
  {
    name:"預習-機統",
    day:4,
    status:0,
  },  
  {
    name:"複習-數位系統",
    day:5,
    status:0,
  },
  { 
    name:"複習-程設",
    day:5,
    status:0,
  },
  {
    name:"複習-資結",
    day:6,
    status:0,
  },
  {
    name:"複習-普物",
    day:6,
    status:0,
  },
  {
    name:"複習-機統",
    day:0,
    status:0,
  },
  {
    name:"預習-工數",
    day:0,
    status:0,
  }
]

const user_todolist=[
    {
       name: "倒垃圾",
       status:0
    },
    {
       name: "跟浩哥拿東西",
       status:0,
    },
    {
       name: "買高鐵票",
       status:0,
    },
]

const  user_workproject=[
    {
      name:"資結-HW2",
      deadline:{
          year: "2020",
          month:"10",
          date: "8", 
      },
      status:0
    },
    {
        name:"普物-HW3",
        deadline:{
            year: "2020",
            month:"10",
            date: "7", 
        },
        status:0
    },
    {
        name: "Test-Work-Project",
        deadline:{
            year:"2020",
            month:"11",
            date:"5"
        }
    }
]

const user_sideproject=[
    {
        name:"Web app - 前端介面",
        deadline:{
            year: "2020",
            month:"10",
            date: "15", 
        },
        status:0
    },
    {
        name:"CCNA - 第六章完",
        deadline:{
            year: "2020",
            month:"10",
            date: "20", 
        },
        status:0
    },
    {
        name:"Test-Side-Project",
        deadline: { 
            year:"2020",
            month: "11",
            date: "2"
         }
    }
]


export default {
  name: 'App',
  components: {
    MyModal,
    MyNavbar,
    MyList,
    MyCalendar,
    MyArragenment
  },
  data:function(){
    return {
       flip:false, 
       UserInfo:{
          DailyCourse: user_course,
          DailyStudy: user_study,
          WorkProject: user_workproject,
          SideProject: user_sideproject,
          ToDoList: user_todolist,
       }
    }
  },
  methods:{
    
    /*---------------------------------------------------------------------------------------------*/
    /*   Part One   -----   -----   -----  Switch Calendar and Arrangement -----   -----   -----   */ 
    /*---------------------------------------------------------------------------------------------*/
    onCheckArrangement(date){
      this.onSwitchCalendarArrangement();
    },
    onSwitchCalendarArrangement(){  
      this.flip= !this.flip;
    },

    /*----------------------------------------------------------------------------------*/
    /*   -----   -----   -----  Switch Calendar and Arrangement -----   -----   -----   */ 
    /*----------------------------------------------------------------------------------*/
    

    /*----------------------------------------------------------------------------------*/
    /*   Part Two   -----   -----   -----   Event Data Change   -----   -----   -----   */  
    /*----------------------------------------------------------------------------------*/

        /* Up Data from Modal -  Add、Delete and modify event*/
        onUpDataEvent(actiontype, EventTmp) {
            if (actiontype === "add") 
            {
                this.onAddEvent(EventTmp);
                return;
            }
            else if (actiontype === "delete") 
            {
                this.onDeleteEvent(EventTmp); 
                return;    
            }
            else if (actiontype === "modify") 
            {
                this.onModifyEvent(EventTmp);
                return;          
            }

        },
       
        onAddEvent(EventTmp){
            if (EventTmp.type === "dailycourse") 
            {
                    this.UserInfo.DailyCourse.push({
                        name: EventTmp.name,
                        day: EventTmp.day,
                        status: 0,
                        start_time: [EventTmp.start_time[0], EventTmp.start_time[1]],
                        end_time: [EventTmp.end_time[0], EventTmp.end_time[1]],
                    });

                    this.UserInfo.DailyCourse.sort(this.sortDailyCourse);
                    console.log("Add - Updata - Dailycourse " , this.UserInfo.DailyCourse);
            }
                else if (EventTmp.type === "dailystudy") {
                    this.UserInfo.DailyStudy.push({
                            name: EventTmp.name,
                            day: EventTmp.day,
                            status: 0
                        });
                        this.UserInfo.DailyStudy.sort(this.sortDailyStudy);

                        console.log("Add - Updata - DailyStudy ", this.UserInfo.DailyStudy);
                    }
                    else if (EventTmp.type === "todolist") {
                        this.UserInfo.ToDoList.push({
                            name: EventTmp.name,
                            status: 0
                        });
                        console.log("Add - Updata - TodoList ", this.UserInfo.ToDoList);
                    }
                    else if (EventTmp.type === "workproject") {

                        this.UserInfo.WorkProject.push({
                            name: EventTmp.name,
                            deadline: {
                                year: EventTmp.deadline.year,
                                month: EventTmp.deadline.month,
                                date: EventTmp.deadline.date
                            },
                            status: 0
                        });
                        this.UserInfo.WorkProject.sort(this.sortProject);
                        console.log("Add - Updata - WorkProject " ,this.UserInfo.WorkProject);
                    }
                    else if (EventTmp.type === "sideproject") {

                        this.UserInfo.SideProject.push({
                            name: EventTmp.name,
                            deadline: {
                                year: EventTmp.deadline.year,
                                month: EventTmp.deadline.month,
                                date: EventTmp.deadline.date
                            },
                            status: 0
                        });
                        this.UserInfo.SideProject.sort(this.sortProject);
                        console.log("Add - Updata - SideProject ", this.UserInfo.SideProject);
                    }
                    return;
        },
        onDeleteEvent(EventTmp){
            console.log(EventTmp.name);
            if (EventTmp.type === "dailycourse") 
             {
                 this.UserInfo.DailyCourse = this.UserInfo.DailyCourse.filter(index => !this.compareObject("dailycourse", index, EventTmp));
                 console.log(" Delete - Updata - Dailycourse ", this.UserInfo.DailyCourse);
             }
            else if (EventTmp.type === "dailystudy") 
            {
                this.UserInfo.DailyStudy = this.UserInfo.DailyStudy.filter(index => !this.compareObject("dailystudy", index, EventTmp));
                console.log(" Delete - Updata - DailyStudy ", this.UserInfo.DailyStudy);
            }
            else if (EventTmp.type === "todolist") 
            {
                this.UserInfo.ToDoList = this.UserInfo.ToDoList.filter(index => !this.compareObject("todolist", index, EventTmp));
                console.log(" Delete - Updata - ToDoList ", this.UserInfo.ToDoList);
            }
            else if (EventTmp.type === "workproject") 
            {
                this.UserInfo.WorkProject = this.UserInfo.WorkProject.filter(index => !this.compareObject("workproject", index ,EventTmp));
                console.log(" Delete - Updata - WorkProject ", this.UserInfo.WorkProject);
            }
            else if (EventTmp.type === "sideproject") 
            {
                this.UserInfo.SideProject = this.UserInfo.SideProject.filter(index => !this.compareObject("sideproject", index ,EventTmp));
                console.log("Delete - Updata - WorkProject ", this.UserInfo.SideProject);
            }
            return;    
        }, 
        onModifyEvent(EventTmp){
            if (EventTmp.type == "dailycourse") 
            {
                for (var i = 0; i < this.UserInfo.DailyCourse.length; ++i) 
                {
                    if (this.compareObject("dailycourse", this.UserInfo.DailyCourse[i], EventTmp)) 
                    {
                        this.UserInfo.DailyCourse[i] = {
                            name: EventTmp.name,
                            day: EventTmp.day,
                            status: 0,
                            start_time: [EventTmp.start_time[0], EventTmp.start_time[1]],
                            end_time: [EventTmp.end_time[0], EventTmp.end_time[1]],
                        };
                        this.UserInfo.DailyCourse.sort(this.sortDailyCourse);
                        console.log(" Modify - Updata - DailyCourse ", this.UserInfo.DailyCourse);                              
                        return;
                    }
                }
            }
            else if (EventTmp.type == "dailystudy") 
            {
                for (var i = 0; i < this.UserInfo.DailyStudy.length; ++i) 
                {
                    if (this.compareObject("dailystudy", this.UserInfo.DailyStudy[i],EventTmp)) 
                    {
                        this.UserInfo.DailyStudy[i] = {
                            name: EventTmp.name,
                            day: EventTmp.day,
                            status: 0
                        };
                        this.UserInfo.DailyStudy.sort(this.sortDailyStudy);
                        console.log(" Modify - Updata - DailyStudy ", this.UserInfo.DailyStudy);   
                        return;
                    }
                }
            }
            else if (EventTmp.type == "todolist") 
            {
                for (var i = 0; i < this.UserInfo.ToDoList.length; ++i) 
                {
                    if (this.compareObject("todolist", this.UserInfo.ToDoList[i], EventTmp))
                    {
                        this.UserInfo.ToDoList[i] = {
                            name: EventTmp.name,
                            status: 0
                        };
                        console.log(" Modify - Updata - ToDoList ", this.UserInfo.ToDoList);   
                        return;
                    }
                }
            }
            else if (EventTmp.type == "workproject") 
            {
                for (var i = 0; i < this.UserInfo.WorkProject.length; ++i) 
                {
                    if (this.compareObject("workproject", this.UserInfo.WorkProject[i],EventTmp)) 
                    {
                        this.UserInfo.WorkProject[i] = {
                            name: EventTmp.name,
                            deadline: {
                                year: EventTmp.deadline.year,
                                month: EventTmp.deadline.month,
                                date: EventTmp.deadline.date
                            },
                            status: 0
                        }
                        this.UserInfo.WorkProject.sort(this.sortProject);
                        console.log(" Modify - Updata - WorkProject ", this.UserInfo.WorkProject);   
                        return
                    }
                }
            }
            else if (EventTmp.type == "sideproject") 
            {
                for (var i = 0; i < this.UserInfo.SideProject.length; ++i) 
                {
                    if (this.compareObject("sideproject", this.UserInfo.SideProject[i] , EventTmp)) 
                    {
                        this.UserInfo.SideProject[i] = {
                            name: EventTmp.name,
                            deadline: {
                                year: EventTmp.deadline.year,
                                month: EventTmp.deadline.month,
                                date: EventTmp.deadline.date
                            },
                            status: 0
                        };
                        this.UserInfo.SideProject.sort(this.sortProject);
                        console.log(" Modify - Updata - DailyCourse ", this.UserInfo.SideProject);   
                        return;
                    }
                }
            }
            return;
        },
 
        compareObject(event, object ,EventTmp) {
            if (event == 'dailycourse') {
                if (object.name == EventTmp.search_object.name) {
                    if (object.day == EventTmp.search_object.day) {
                        if (object.start_time[0] == EventTmp.search_object.start_time[0] &&
                            object.start_time[1] == EventTmp.search_object.start_time[1]) {
                            if (object.end_time[0] == EventTmp.search_object.end_time[0] &&
                                object.end_time[1] == EventTmp.search_object.end_time[1]) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            }
            if (event == 'dailystudy') {
                if (object.name == EventTmp.search_object.name) {
                    if (object.day == EventTmp.search_object.day) {
                        return true;
                    }
                }
                return false;
            }
            if (event == 'todolist') {
                if (object.name == EventTmp.search_object.name) {
                    return true;
                }
                return false;
            }
            if (event == 'workproject') {
                if (object.name == EventTmp.search_object.name) {
                    if (object.deadline.year == EventTmp.search_object.deadline.year &&
                        object.deadline.month == EventTmp.search_object.deadline.month &&
                        object.deadline.date == EventTmp.search_object.deadline.date) {
                        return true;
                    }
                }
                return false;
            }
            if (event == 'sideproject') {
                if (object.name == EventTmp.search_object.name) {
                    if (object.deadline.year == EventTmp.search_object.deadline.year &&
                        object.deadline.month == EventTmp.search_object.deadline.month &&
                        object.deadline.date == EventTmp.search_object.deadline.date) {
                        return true;
                    }
                }
                return false;
            }
        },
        
        sortDailyCourse(a, b) {
            var a_day = a.day, b_day = b.day;
            if (a.day === 0)
                a_day = 7;
            if (b.day === 0)
                b_day = 7;

            if (a_day > b_day)
                return 1;

            if (a_day < b_day)
                return -1;
            if (a.start_time[0].value < b.start_time[0].value)
                return -1;

            if (a.start_time[0].value > b.start_time[0].value)
                return 1;

            if (a.start_time[0].value === b.start_time[0].value) {
                if (a.start_time[1].value > b.start_time[1].value)
                    return -1;

                if (a.start_time[1].value < b.start_time[1].value)
                    return 1;
                return 0;
            }
        },
        sortDailyStudy(a, b) {
            var a_day = a.day, b_day = b.day;
            if (a.day === 0)
                a_day = 7;
            if (b.day === 0)
                b_day = 7;
            if (a_day > b_day)
                return 1;
            if (a_day < b_day)
                return -1;
            if (a_day === b_day)
                return 0;
        },
        sortProject(a, b) {
            if (a.deadline.year < b.deadline.year) {
                return -1
            }
            if (a.deadline.year > b.deadline.year) {
                return 1;
            }
            if (a.deadline.year === b.deadline.year) {
                if (a.deadline.month < b.deadline.month) {
                    return -1;
                }
                if (a.deadline.month > b.deadline.month) {
                    return 1;
                }
                if (a.deadline.month === b.deadline.month) {
                    if (a.deadline.date < b.deadline.date) {
                        return -1;
                    }
                    if (a.deadline.date > b.deadline.date) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            }
        },

        /* Change Status of ToDoList or DailyStudy from MyCalendar or MyList */
        onChangeStatus(eventtype, targetobject){
            if(eventtype=="dailystudy")
            {
                for(var i=0;i<this.UserInfo.DailyStudy.length;+i)
                {
                    if( this.UserInfo.DailyStudy[i].name == targetobject.name &&
                        this.UserInfo.DailyStudy[i].day  == targetobject.day  )
                    {
                        this.UserInfo.DailyStudy[i].status=1;
                        return;
                    }
                }
            }
            else if(eventtype=="todolist")
            {
                for(var i=0;i<this.UserInfo.ToDoList.length;++i)
                {
                    if( this.UserInfo.ToDoList[i].name == targetobject.name)
                    {
                        this.UserInfo.ToDoList=this.UserInfo.ToDoList.filter(index=>index!==this.UserInfo.ToDoList[i]);
                        return;
                    }
                }
            }
            return;            
        },


        /* Change context of project from MyProjectWindow */
        onChangeContext(eventtype, targetobject){

       },

    /*-----------------------------------------------------------------------*/
    /*   -----   -----   -----   Event Data Change   -----   -----   -----   */ 
    /*-----------------------------------------------------------------------*/ 


    
     }


}
</script>

<style>
.myApp{
    margin-left: 0px;
    margin-right: 0px;
    background-color: #c8e8ed;
    width: 100%;
    height: 100%;
}
.my-navbar{
    width: 100%;
    height: 8.03%;
}

.my-window{
     width: 100%;
    height: 91.97%;
}
/*-----     commmon use     ------*/

.fill-heigth{
   height: 100%;
}

.fill-width{
   width: 100%;
}
</style>
