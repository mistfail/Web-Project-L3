const Home = window.httpVueLoader('./components/Main.vue')

const routes = [
    { path: '/', component: Home}
]

const router = new VueRouter({
    routes
})

var app = new Vue({
    router,
    el: '#app',
    data: {
        definitions: []
    },
    async mounted () {
        const res = await axios.get('/api/definitions')
        this.definitions = res.data
    },
    methods: {

    }
})