<template>
    <div id="basic-calendar-wrapper">
        <div id="basic-calendar-header">
            <button id="calendar-show-year" @click="showYear">Year</button>
            <button id="calendar-show-month" @click="showMonth">Month</button>
            <button id="calendar-next" @click="showNext">Next</button>
            <button id="calendar-prev" @click="showPrev">Prev</button>
        </div>
        <div id="basic-calendar" :class="[type]">
            <basic-calendar-month v-for="date in dates" :key="date.key" :month="date.month" :year="date.year"></basic-calendar-month>
        </div>
    </div>
</template>

<script>
    import BasicCalendarMonth from './BasicCalendarMonth.vue'

    export default {
        name: 'basic-calendar',
        components: {
            BasicCalendarMonth
        },
        props: {
            month: {
                type: Number,
                default: function () {
                    return new Date().getMonth();
                },
                validator: function (value) {
                    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].indexOf(value) !== -1;
                }
            },
            year: {
                type: Number,
                default: function () {
                    return new Date().getFullYear();
                }
            },
            limit: {
                type: Number,
                default: 1,
                validator: function (value) {
                    return [1, 3, 4, 12].indexOf(value) !== -1;
                }
            }
        },

        data: function () {
            return {
                startMonth: this.month,
                startYear: this.year,
                numberOfMonths: this.limit,
                dates: []
            }
        },

        computed: {
            type: function () {
                return this.numberOfMonths == 1 ? 'calendar-month' : 'calendar-year';
            }
        },

        created() {
        },

        mounted() {
            this.setDates();
        },

        updated() {
        },

        methods: {
            setDates: function () {
                this.dates = [];
                let currentDate = this.getStartDate();

                for (let index = 0; index < this.numberOfMonths; index++) {
                    this.dates.push({
                        month: currentDate.getMonth(),
                        year: currentDate.getFullYear(),
                        key: this.guid()
                    });
                    currentDate.setMonth(currentDate.getMonth() + 1);
                }
            },

            getStartDate: function () {
                return new Date(this.startYear, this.startMonth, 1);
            },

            showYear: function () {
                this.numberOfMonths = 12;
                this.startMonth = 0;
                this.startYear = new Date().getFullYear();
                this.setDates();
            },

            showMonth: function() {
                this.numberOfMonths = 1;
                this.startMonth = new Date().getMonth();
                this.startYear = new Date().getFullYear();
                this.setDates();
            },

            showNext: function() {
                let currentDate = this.getStartDate();
                currentDate.setMonth(currentDate.getMonth() + this.numberOfMonths);

                this.startMonth = currentDate.getMonth();
                this.startYear = currentDate.getFullYear();
                this.setDates();
            },

            showPrev: function() {
                let currentDate = this.getStartDate();
                currentDate.setMonth(currentDate.getMonth() - this.numberOfMonths);

                this.startMonth = currentDate.getMonth();
                this.startYear = currentDate.getFullYear();
                this.setDates();
            },

            guid: function() {
                return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
            }
        }
    }
</script>

<style lang="scss">
    @import "./../assets/basic-calendar";
</style>
