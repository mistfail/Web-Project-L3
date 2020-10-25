const Home = window.httpVueLoader('./components/Main.vue')
const newDesc = window.httpVueLoader('./components/newDesc.vue')

const routes = [
    { path: '/', component: Home},
    { path: '/New', component: newDesc}
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
        async adDef (article) {
            const res = await axios.post('/api/definition', article)
            this.definitions.push(res.data)
        },
    }
})