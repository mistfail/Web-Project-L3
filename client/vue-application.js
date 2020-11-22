const Home = window.httpVueLoader('./components/Main.vue')
const newDesc = window.httpVueLoader('./components/newDesc.vue')
const Inscription = window.httpVueLoader('./components/Inscription.vue')
const Connexion = window.httpVueLoader('./components/Connexion.vue')
const Podium = window.httpVueLoader('./components/Podium.vue')
const Profil = window.httpVueLoader('./components/Profil.vue')

const routes = [
    { path: '/', component: Home},
    { path: '/New', component: newDesc},
    { path: '/Inscription', component: Inscription},
    { path: '/Connexion', component: Connexion},
    { path: '/Podium', component: Podium},
    { path: '/Profil', component: Profil}
]

const router = new VueRouter({
    routes
})

var app = new Vue({
    router,
    el: '#app',
    data: {
        definitions: [],
        podium :[],
        users:[],
        message:'',
        user:[]
    },
    async mounted () {
        const res = await axios.get('/api/definitions')
        this.definitions = res.data
        const res2 = await axios.get('/api/podium')
        this.podium = res2.data
    },
    methods: {
        async adDef (article) {
            await axios.post('/api/definition', article)
        },
        async signup(users){
            const res = await axios.post('/api/Inscription', users);
            this.users.push(res.data)
            alert('Inscription in vue-application')
        },
        async signin(user){
            const res = await axios.post('/api/Connexion', user);
            this.message = res.data.message
            this.user = res.data.user
            alert('Connexion in vue-application')
        },
        async modifDef(definition){
            await axios.put('/api/definition', definition);
        },
        async deleteDef(definition){
            await axios.delete('/api/definition', definition);
        },
        async upVote(definition){
            await axios.put('/api/definition', definition)
        },
        async downVote(definition){
            await axios.put('/api/definition', definition)
        }
    }
})