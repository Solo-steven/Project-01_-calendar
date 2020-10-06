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