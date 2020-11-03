const Home = window.httpVueLoader('./components/Main.vue')
const newDesc = window.httpVueLoader('./components/newDesc.vue')
const Inscription = window.httpVueLoader('./components/Inscription.vue')
const Connexion = window.httpVueLoader('./components/Connexion.vue')

const routes = [
    { path: '/', component: Home},
    { path: '/New', component: newDesc},
    { path: '/Inscription', component: Inscription},
    { path: '/Connexion', component: Connexion}
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
            await axios.post('/api/signup', user);
        },
        async signin(user){
            await  axios.post('/api/signin', user)
        }
    }
})