<template>
    <div :class="['calendar-month', 'calendar-'+month]">
        <p>{{ getMonthTitle() }}</p>
        <ul class="calendar-weekdays calendar-grid">
            <li v-for="weekday in weekdays"><div><div><div><span>{{ weekday }}</span></div></div></div></li>
        </ul>
        <ul class="calendar-days calendar-grid" @click="dayClicked">
            <li v-for="day in days" :class="[day.class]"><div><div><div><span>{{ day.content }}</span></div></div></div></li>
        </ul>
    </div> <!-- /calendar -->  
</template>

<script>
    Date.prototype.numberOfDays = function() {
        var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
        return d.getDate();
    }

    export default {
        name: 'basic-calendar-month',

        props: [
            'month',
            'year',
            'title'
        ],

        data: function () {
            return {
                weekdays: [],
                days: []
            }
        },

        created() {
        },

        mounted() {
            this.setWeekdays();
            this.setupMonth();
        },

        updated() {
        },

        methods: {
            setWeekdays: function () {
                this.weekdays = ['Su', "Mo", "Tu", "We", "Th", "Fr", "Sa"];
            },

            setupMonth: function () {
                let currentDate = new Date(this.year, this.month, 1);
                const startingOffset = currentDate.getDay();
                const numberOfDays = currentDate.numberOfDays();
                const endingOffset = 42 - startingOffset - numberOfDays;
                this.days = [];

                // Add empty items for the starting offset
                for (var index = 0; index < startingOffset; index++) {
                    this.days.push({
                        class: 'empty',
                        content: ''
                    });
                }

                // Add regular items for each day in the month
                for (var index = 1; index <= numberOfDays; index++) {
                    this.days.push({
                        class: currentDate.toISOString().substr(0, 10),
                        content: index
                    });
                    currentDate.setDate(currentDate.getDate() + 1);
                }

                // Add empty items for the ending offset
                for (var index = 0; index < endingOffset; index++) {
                    this.days.push({
                        class: 'empty',
                        content: ''
                    });
                }
            },

            dayClicked: function (event) {
                const date = event.target.parentElement.parentElement.parentElement.parentElement.getAttribute('class');

                if (typeof date != 'undefined' && date != 'empty') {
                    console.log(date);
                }
            },

            getMonthTitle: function () {
                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

                return months[this.month] + ' ' + this.year;
            }
        }
    }
</script>
