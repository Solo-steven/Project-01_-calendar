<template>
      <div class="card  mycalendar" key="calendar" >
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
    created(){
        var date = new Date();
        this.WindowData.key.year = (date.getFullYear());
        this.WindowData.key.month = (date.getMonth()) + 1;
        this.WindowData.key.day = date.getDay();
        this.WindowData.key.date = date.getDate();
        for (var i = 1; i <= 31; ++i)
            this.WindowData.fix.this_month.push(i);
        this.onYearorMonthChange();
    },
    data : function(){
        return {
            WindowData: {
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
            
        }
    },
    methods: {
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
    }
}
</script>

<style scoped>
/*-----     calendar     -----*/

.mycalendar {
    max-width: 600px;
    background: #2b4450;
    color : #dfebed;
    border-radius: 4px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, .3);
    font-family: 'Roboto', sans-serif;
    margin: auto;
}

.yearandmonth{
    font-weight: 900;
    font-size: 1.3em;
    margin:5px;
}

.calendar-today{
    padding: 10px;
    font-weight: 400;
    font-size: 1.2em;
}

.day{
   font-weight: 600;
}

.last_month{
  opacity: .3;
  padding: 10px;
  font-weight: 300;
  font-size: 1.2em;
}
.this_month{
    padding: 10px;
    font-weight: 300;
    font-size: 1.2em;
}

.this_month:hover{
    color : darkorange;
  }
</style>