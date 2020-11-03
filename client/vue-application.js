const Home = window.httpVueLoader('./components/Main.vue')
const newDesc = window.httpVueLoader('./components/newDesc.vue')
const Inscription = window.httpVueLoader('./components/Inscription.vue')

const routes = [
    { path: '/', component: Home},
    { path: '/New', component: newDesc},
    { path: '/Inscription', component: Inscription}
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
            await axios.post('/api/definition', article)
        },
        async signup(user){
            await axios.post('/api/signup/', user);
        }
    }
})