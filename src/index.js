import BasicCalendar from './components/BasicCalendar.vue'
import BasicCalendarMonth from './components/BasicCalendarMonth.vue'

const VueBasicCalendar = {
    install (Vue) {
        Vue.component('basic-calendar', BasicCalendar),
        Vue.component('basic-calendar-month', BasicCalendarMonth)
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueBasicCalendar)
}

export default VueBasicCalendar

export {
    BasicCalendar,
    BasicCalendarMonth
}
