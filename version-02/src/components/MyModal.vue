<template>
    <div>
         <AddModal id="addevent" :EventTmp="EventTmp" :EventData="EventData" 
                      @clearEventTmp_signal="clearEventTmp"
                      @upDataEvent="emit_upDataEvent">
         </AddModal>
         <DeleteModal id="deleteevent" :EventTmp="EventTmp" :EventData="EventData" :UserInfo="UserInfo"
                       @clearEventTmp_signal="clearEventTmp"
                       @upDataEvent="emit_upDataEvent">
         </DeleteModal>
         <ModifyModal id="modifyevent" :EventTmp="EventTmp" :EventData="EventData" :UserInfo="UserInfo"
                      @clearEventTmp_signal="clearEventTmp" 
                      @upDataEvent="emit_upDataEvent">
         </ModifyModal>
    </div>
</template>

<script>
import AddModal from './AddModal.vue'
import DeleteModal from './DeleteModal.vue'
import ModifyModal from './ModifyModal.vue'

export default {
    name:"MyModal",
    props:["UserInfo"],
    components: {
        AddModal,
        DeleteModal,
        ModifyModal
    },
    data: function (){
        return{
        EventTmp:{
            info:"",            // 欲改變的UesrInfo  
            type: "",           // 三種中的哪一種行為
            search_object: {},  // 刪除、修改的指定物件 
            
            /*----  以下為optional ------*/
            name: "",         
            day: "",       
            start_time: [0, 0], 
            end_time: [0, 0], 
            deadline: {
                year: "",
                month: "",
                date: ""
            }
        },
       EventData: {
            day: [{ text: "Monday", value: 1 }, { text: "Tuesday", value: 2 }, { text: "Wednesday", value: 3 },
            { text: "Tursday", value: 4 }, { text: "Friday", value: 5 }, { text: "Saturday", value: 6 }, { text: "Sunday", value: 0 }],
            hour: [],
            minute: []
        },
    }
   },
   created(){
       for (var i = 0; i < 24; ++i) {
            if (i < 10) {
                this.EventData.hour.push({
                    text: "0" + i,
                    value: i
                });
            }
            else {
                this.EventData.hour.push({
                    text: String(i),
                    value: i
                });
            }
        }

        for (var i = 0; i < 60; ++i) {
            if (i < 10) {
                this.EventData.minute.push({
                    text: "0" + i,
                    value: i
                });
            }
            else {
                this.EventData.minute.push({
                    text: String(i),
                    value: i
                });
            }
        }
   },
   methods: {
         checkEmptyEventTmp(event) {
            if (event == "modify") {
                if (this.EventTmp.search_object == {}) {
                    return true;
                }
            }
            if (event === "add" || event == "modify") {
                if (this.EventTmp.type === "dailycourse") {
                    if (this.EventTmp.name === "" || this.EventTmp.day === "" ||
                        this.EventTmp.start_time[0] > this.EventTmp.end_time[0] ||
                        (this.EventTmp.start_time[1] === this.EventTmp.end_time[1] &&
                            this.EventTmp.start_time[0] === this.EventTmp.end_time[0])) {
                        console.error("Add event error due to incomplet data!", this.EventTmp);
                        alert("Add event error due to data incomplet")
                        return true;
                    }

                    return false;
                }
                else if (this.EventTmp.type === "dailystudy") {
                    if (this.EventTmp.name === "" || this.EventTmp.day === "") {
                        console.error("Add event error due to incomplet data!", this.EventTmp);
                        alert("Add event error due to data incomplet")
                        return true;
                    }
                    return false;
                }
                else if (this.EventTmp.type === "todolist") {
                    if (this.EventTmp.name === "") {
                        console.error("Add event error due to incomplet data!", this.EventTmp);
                        alert("Add event error due to data incomplet")
                        return true;
                    }
                    return false;
                }
                else if (this.EventTmp.type === "workproject") {
                    if (this.EventTmp.name === "" || this.EventTmp.deadline.year === "" ||
                        this.EventTmp.deadline.month === "" || this.EventTmp.deadline.date === "") {
                        console.error("Add event error due to incomplet data!", this.EventTmp);
                        alert("Add event error due to data incomplet")
                        return true;
                    }
                    return false;
                }
                else if (this.EventTmp.type === "sideproject") {
                    if (this.EventTmp.name === "" || this.EventTmp.deadline.year === "" ||
                        this.EventTmp.deadline.month === "" || this.EventTmp.deadline.date === "") {
                        console.error("Add event error due to incomplet data!", this.EventTmp);
                        alert("Add event error due to data incomplet");
                        return true;
                    }
                    return false;
                }
            }
            return false;
        },
         checkLegalEventTmp(event) {
            if (event == "add" || event == "modify") {
                if (this.EventTmp.type == "dailycourse") {
                    //--- start hour is late than end hour . 
                    if (this.EventTmp.start_time[0].value > this.EventTmp.end_time[0].value) {
                        alert("Worng Time Order!!");
                        return false;
                    }
                    if (this.EventTmp.start_time[0].value === this.EventTmp.end_time[0].value) {
                        if (this.EventTmp.start_time[1].value > this.EventTmp.end_time[1].value) {
                            alert("Worng Time Order!!");
                            return false;
                        }
                        else if (this.EventTmp.start_time[1].value === this.EventTmp.end_time[1].value) {
                            alert("Worng Time Order(start time is same as end time)!!");
                            return false;
                        }
                    }
                    //---- if assign time already has course 
                    for (var i = 0; i < this.DailyCourse.length; ++i) {
                        if (this.EventTmp.day === this.DailyCourse[i].day) {
                            if (this.EventTmp.start_time[0] === this.DailyCourse[i].start_time[0]
                                && this.EventTmp.start_time[1] === this.DailyCourse[i].start_time[1]) {
                                console.error("Time of new dailycourse is not available!!");
                                alert("Time of new dailycourse is not available!!");
                                return false;
                            }
                            if (this.EventTmp.end_time[0] === this.DailyCourse[i].end_time[0] &&
                                this.EventTmp.end_time[1] === this.DailyCourse[i].end_time[1]) {
                                console.error("Time of new dailycourse is not available!!");
                                alert("Time of new dailycourse is not available!!");
                                return false;
                            }
                        }
                    }
                    return true;
                }
                if (this.EventTmp.type === "dailystudy" || this.EventTmp.type == "todolist") {
                    return true;
                }
                if (this.EventTmp.type == "workproject" || this.EventTmp.type == "sideproject") {
                    if (this.EventTmp.deadline.year < this.WindowData.key.year) {
                        alert("This project's deadline has already pass !! ");
                        console.log("deadline error");
                        return false;
                    }
                    if (this.EventTmp.deadline.year == this.WindowData.key.year) {
                        if (this.EventTmp.deadline.month < this.WindowData.key.month) {
                            alert("This project's deadline has already pass !! ");
                            console.log("deadline error");
                            return false;
                        }
                        if (this.EventTmp.deadline.month == this.WindowData.key.month) {
                            if (this.EventTmp.deadline.date < this.WindowData.key.date) {
                                alert("This project's deadline has already pass !! ");
                                console.log("deadline error");
                                return false;
                            }
                        }
                    }
                    return true;
                }
            }
        },
         clearEventTmp() {
            this.EventTmp.type = "";
            this.EventTmp.name = "";
            this.EventTmp.day = "";
            this.EventTmp.start_time = [0, 0];
            this.EventTmp.end_time = [0, 0];
            this.EventTmp.deadline = {
                year: "",
                month: "",
                date: ""
            };
            this.EventTmp.search_object = {};
        },
         emit_upDataEvent(actiontype){ 
            this.$emit("upDataEvent", actiontype, this.EventTmp)
         }
   }    
    
}
</script>

