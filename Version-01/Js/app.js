
var vm = new Vue({
    el: "#app",
    data: {
        //--- this object is for show data in calendar
        WindowData: {
            /* in vue*/ 
            flip: true,
            //--- Today  
            key: {
                year: 0,
                month: 0,
                date: 0,
                day: 0,
            },
            /* in vue */

            others: {
                last_date: [],
                first_date: [],
                week_date: [],
            },
            fix: {
                last_month: [23, 24, 25, 26, 27, 28, 29, 30, 31],
                this_month: [],
                day: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
                month: ["January", "February", "March", "April", "May", "June", "July", "August", "Septemper", "October", "November", "Deecember"],
            },
        },

        //--- this object is for show data in project list 
        ListData: {
            day: ["Sunday", "Monday", "Tuesday", "Wednesday", "Tursday", "Friday", "Saturday"],
            height: 100,
        },

        EventData: {
            day: [{ text: "Monday", value: 1 }, { text: "Tuesday", value: 2 }, { text: "Wednesday", value: 3 },
            { text: "Tursday", value: 4 }, { text: "Friday", value: 5 }, { text: "Saturday", value: 6 }, { text: "Sunday", value: 0 }],
            hour: [],
            minute: []
        },


        ArrangeData: {
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
        },

        //-- this object is for temp data : in component
        EventTmp: {
            search_object: {},
            type: "",
            name: "",
            day: "",
            start_time: [0, 0],   //0 is hour , 1 is minute
            end_time: [0, 0],     //0 is hour , 1 is minute
            deadline: {
                year: "",
                month: "",
                date: ""
            }
        },

        //-- user information : in vue body
        DailyCourse: user_course,
        DailyStudy: user_study,
        WorkProject: user_workproject,
        SideProject: user_sideproject,
        ToDoList: user_todolist,

    },
    created() {
        //--init day 
        var date = new Date();
        this.WindowData.key.year = (date.getFullYear());
        this.WindowData.key.month = (date.getMonth()) + 1;
        this.WindowData.key.day = date.getDay();
        this.WindowData.key.date = date.getDate();

        this.ArrangeData.key.year = this.WindowData.key.year;
        this.ArrangeData.key.month = this.WindowData.key.month;

        //-- init calender 
        for (var i = 1; i <= 31; ++i)
            this.WindowData.fix.this_month.push(i);
        this.onYearorMonthChange();

        //-- init modal
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
    mounted() {

    },
    methods: {

        //------  Flip Page ----//
        onFlipMainPage() {
            this.WindowData.flip = !this.WindowData.flip;
        },

        //------ Arrange Date ----//
        onCheckArrangement(date) {
            date = String(date);
            if (date === "" || date === undefined) {
                console.log("Arrange check error", typeof (date), date)
                return;
            }
            date = Number(date);
            var D = new Date(this.WindowData.key.year, this.WindowData.key.month - 1, date);
            var day = D.getDay();
            this.ArrangeData.key.date = date;

            this.ArrangeData.dailycourse = this.DailyCourse.filter(index => index.day === day);
            this.ArrangeData.dailystudy = this.DailyStudy.filter(index => index.day === day);
            this.ArrangeData.todolist = this.ToDoList.slice();
            this.ArrangeData.workproject = this.WorkProject.filter(index => {
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
            this.ArrangeData.sideproject = this.SideProject.filter(index => {
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

            console.log("Check arrangement of date", this.WindowData.key.year, this.WindowData.key.month, date, day);
            console.log("Today Course : ", this.ArrangeData.dailycourse);
            console.log("Today Study : ", this.ArrangeData.dailycourse);
            console.log("Today To Do List: ", this.ArrangeData.todolist);
            console.log("Coming Work Porject : ", this.ArrangeData.workproject);
            console.log("Coming Side Project : ", this.ArrangeData.sideproject);

            this.onFlipMainPage();
        },

        //------  Change Calendar ----//
        onYearorMonthChange() {
            console.log("Canlendar Data is Updata!!!");
            var year = Number(this.WindowData.key.year);
            var month = Number(this.WindowData.key.month) - 1;

            console.log("Year : ", year);
            console.log("Month : ", month + 1);
            var tmp = new Date(year, month, 1);

            var day_of_first_date = tmp.getDay();
            console.log("first day of this month : ", day_of_first_date);


            var number_of_date;
            var number_of_last_month;
            switch (month + 1) {
                case 1: case 8:
                    number_of_date = 31;
                    number_of_last_month = 31;
                    break;
                case 3:
                    number_of_date = 31;
                    if ((year % 4 === 0 && year % 100 !== 0 || year % 400 === 0))
                        number_of_last_month = 29;
                    else
                        number_of_last_month = 28;
                    break;
                case 5: case 7: case 10: case 12:
                    number_of_date = 31;
                    number_of_last_month = 30;
                    break;
                case 4: case 6: case 9: case 11:
                    number_of_date = 30;
                    number_of_last_month = 31;
                    break
                case 2:
                    if ((year % 4 === 0 && year % 100 !== 0 || year % 400 === 0))
                        number_of_date = 29;
                    else
                        number_of_date = 28;
                    number_of_last_month = 31;
                    break;
                default:
                    break;
            }
            console.log("number of date : ", number_of_date);

            var number_of_week = Math.ceil((number_of_date - (7 - day_of_first_date)) / 7);
            console.log("number of week : ", number_of_week);

            for (var i = 0; i < number_of_week; ++i)
                this.WindowData.others.week_date.push([]);
            //console.log(this.WindowData.others.week_date.length); 

            this.WindowData.others.last_month = this.WindowData.fix.last_month.filter
                (date => date <= number_of_last_month && date > number_of_last_month - day_of_first_date);
            console.log("last month:", this.WindowData.others.last_month);

            var i;
            for (i = 0; i < (7 - day_of_first_date); ++i)
                this.WindowData.others.first_date.push(this.WindowData.fix.this_month[i]);

            var time = 0;
            for (i = i; i < this.WindowData.fix.this_month.length; i = i + 7) {
                for (var j = i; j < i + 7; ++j) {
                    if (j >= number_of_date)
                        break;
                    this.WindowData.others.week_date[time].push(this.WindowData.fix.this_month[j]);
                }
                time++;
            }
            while (this.WindowData.others.week_date[this.WindowData.others.week_date.length - 1].length < 7) {
                this.WindowData.others.week_date[this.WindowData.others.week_date.length - 1].push("");
            }
            console.log(this.WindowData.others.week_date);
        },
        //------ Change Status Of List And Study Plan --//
        onChangeStatus(event, name) {
            switch (event) {
                case "todolist":
                    this.ToDoList = this.ToDoList.filter(index => index.name != name);
                    break;
                case "dailystudy":
                    for (var i = 0; i < this.DailyStudy.length; ++i) {
                        if (this.DailyStudy[i].name == name) {
                            this.DailyStudy[i].status = !this.DailyStudy[i].status;
                            break;
                        }
                    }
                    break;
            }
        },


        //----- in vue body-----//
        onUpDataEvent(event) {
            if (event === "add") {
                //---- input incomplet return error.
                if (!this.checkEmptyEventTmp(event) && (this.checkLegalEventTmp(event))) {
                    if (this.EventTmp.type === "dailycourse") {
                        this.DailyCourse.push({
                            name: this.EventTmp.name,
                            day: this.EventTmp.day,
                            status: 0,
                            start_time: [this.EventTmp.start_time[0], this.EventTmp.start_time[1]],
                            end_time: [this.EventTmp.end_time[0], this.EventTmp.end_time[1]],
                        });

                        this.DailyCourse.sort(this.sortDailyCourse);
                        console.log("Updata " + event, this.DailyCourse);
                    }
                    else if (this.EventTmp.type === "dailystudy") {
                        this.DailyStudy[this.DailyStudy.length] = {
                            name: this.EventTmp.name,
                            day: this.EventTmp.day,
                            status: 0
                        };
                        this.DailyStudy.sort(this.sortDailyStudy);

                        console.log("Updata " + event, this.DailyStudy);
                    }
                    else if (this.EventTmp.type === "todolist") {
                        this.ToDoList[this.ToDoList.length] = {
                            name: this.EventTmp.name,
                            status: 0
                        };
                        console.log("Updata " + event, this.ToDoList);
                    }
                    else if (this.EventTmp.type === "workproject") {

                        this.WorkProject.push({
                            name: this.EventTmp.name,
                            deadline: {
                                year: this.EventTmp.deadline.year,
                                month: this.EventTmp.deadline.month,
                                date: this.EventTmp.deadline.date
                            },
                            status: 0
                        });
                        this.WorkProject.sort(this.sortProject);
                        console.log("Updata " + event, this.WorkProject);
                    }
                    else if (this.EventTmp.type === "sideproject") {

                        this.SideProject.push({
                            name: this.EventTmp.name,
                            deadline: {
                                year: this.EventTmp.deadline.year,
                                month: this.EventTmp.deadline.month,
                                date: this.EventTmp.deadline.date
                            },
                            status: 0
                        });
                        this.SideProject.sort(this.sortProject);
                        console.log("Updata " + event, this.SideProject);
                    }
                    this.clearEventTmp();
                    return;
                }
            }
            else if (event === "delete") {

                if (!this.checkEmptyEventTmp(event)) {
                    console.log(this.EventTmp.name);
                    if (this.EventTmp.type === "dailycourse") {
                        this.DailyCourse = this.DailyCourse.filter(index => !this.compareObject("dailycourse", index));
                        console.log("DailyCourse is update !", this.DailyCourse);
                    }
                    else if (this.EventTmp.type === "dailystudy") {
                        this.DailyStudy = this.DailyStudy.filter(index => !this.compareObject("dailystudy", index));
                        console.log("Daily Study is update !", this.DailyStudy);
                    }
                    else if (this.EventTmp.type === "todolist") {
                        this.ToDoList = this.ToDoList.filter(index => !this.compareObject("todolist", index));
                        console.log("To Do List is update !", this.ToDoList);
                    }
                    else if (this.EventTmp.type === "workproject") {
                        this.WorkProject = this.WorkProject.filter(index => !this.compareObject("workproject", index));
                        console.log("Work Project is update !", this.WorkProject);
                    }
                    else if (this.EventTmp.type === "sideproject") {
                        this.SideProject = this.SideProject.filter(index => !this.compareObject("sideproject", index));
                        console.log("Side Project is update !", this.SideProject);
                    }
                    this.clearEventTmp();
                    return;
                }
            }
            else if (event === "modify") {
                if (!this.checkEmptyEventTmp(event) && this.CheckLegalEventTmp(event)) {
                    if (this.EventTmp.type == "dailycourse") {
                        for (var i = 0; i < this.EventTmp.length; ++i) {
                            if (this.compareObject("dailycourse", this.DailyCourse[i])) {
                                this.DailyCourse[i] = {
                                    name: this.EventTmp.name,
                                    day: this.EventTmp.day,
                                    status: 0,
                                    start_time: [this.EventTmp.start_time[0], this.EventTmp.start_time[1]],
                                    end_time: [this.EventTmp.end_time[0], this.EventTmp.end_time[1]],
                                };
                                this.DailyCourse.sort(this.sortDailyCourse);
                                this.clearEventTmp();
                                return;
                            }
                        }
                    }
                    else if (this.EventTmp.type == "dailystudy") {
                        for (var i = 0; i < this.DailyStudy.length; ++i) {
                            if (this.compareObject("dailystudy", this.DailyStudy[i])) {
                                this.DailyStudy[i] = {
                                    name: this.EventTmp.name,
                                    day: this.EventTmp.day,
                                    status: 0
                                };
                                this.DailyStudy.sort(this.sortDailyStudy);
                                this.clearEventTmp()
                                return;
                            }
                        }
                    }
                    else if (this.EventTmp.type == "todolist") {
                        for (var i = 0; i < this.ToDoList.length; ++i) {
                            if (this.compareObject("todolist", this.ToDoList[i])) {
                                this.ToDoList[i] = {
                                    name: this.EventTmp.name,
                                    status: 0
                                };
                                this.clearEventTmp();
                                return;
                            }
                        }
                    }
                    else if (this.EventTmp.type == "workproject") {
                        for (var i = 0; i < this.WorkProject.length; ++i) {
                            if (this.compareObject("workproject", this.WorkProject[i])) {
                                this.WorkProject[i] = {
                                    name: this.EventTmp.name,
                                    deadline: {
                                        year: this.EventTmp.deadline.year,
                                        month: this.EventTmp.deadline.month,
                                        date: this.EventTmp.deadline.date
                                    },
                                    status: 0
                                }
                                this.WorkProject.sort(this.sortProject);
                                this.clearEventTmp();
                                return
                            }
                        }
                    }
                    else if (this.EventTmp.type == "sideproject") {
                        for (var i = 0; i < this.SideProject.length; ++i) {
                            if (this.compareObject("sideproject", this.SideProject[i])) {
                                this.SideProject[i] = {
                                    name: this.EventTmp.name,
                                    deadline: {
                                        year: this.EventTmp.deadline.year,
                                        month: this.EventTmp.deadline.month,
                                        date: this.EventTmp.deadline.date
                                    },
                                    status: 0
                                };
                                this.SideProject.sort(this.sortProject);
                                this.clearEventTmp();
                                return;
                            }
                        }
                    }
                    this.clearEventTmp();
                    return;

                }
            }

        },

        //----- in modal conponent
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

        /* in vue body */
        compareObject(event, object) {
            if (event == 'dailycourse') {
                if (object.name == this.EventTmp.search_object.name) {
                    if (object.day == this.EventTmp.search_object.day) {
                        if (object.start_time[0] == this.EventTmp.search_object.start_time[0] &&
                            object.start_time[1] == this.EventTmp.search_object.start_time[1]) {
                            if (object.end_time[0] == this.EventTmp.search_object.end_time[0] &&
                                object.end_time[1] == this.EventTmp.search_object.end_time[1]) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            }
            if (event == 'dailystudy') {
                if (object.name == this.EventTmp.search_object.name) {
                    if (object.day == this.EventTmp.search_object.day) {
                        return true;
                    }
                }
                return false;
            }
            if (event == 'todolist') {
                if (object.name == this.EventTmp.search_object.name) {
                    return true;
                }
                return false;
            }
            if (event == 'workproject') {
                if (object.name == this.EventTmp.search_object.name) {
                    if (object.deadline.year == this.EventTmp.search_object.deadline.year &&
                        object.deadline.month == this.EventTmp.search_object.deadline.month &&
                        object.deadline.date == this.EventTmp.search_object.deadline.date) {
                        return true;
                    }
                }
                return false;
            }
            if (event == 'sideproject') {
                if (object.name == this.EventTmp.search_object.name) {
                    if (object.deadline.year == this.EventTmp.search_object.deadline.year &&
                        object.deadline.month == this.EventTmp.search_object.deadline.month &&
                        object.deadline.date == this.EventTmp.search_object.deadline.date) {
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
        }
    },

})