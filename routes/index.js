

module.exports = (app, passport) => {
    app.get('/', (req, res) => {
        res.render('index')
    })
    app.get('/login', (req, res) => {
        res.render('login')
    })

    app.post('/login',passport.authenticate('local', { 
        successRedirect: '/',
        failureRedirect: '/login'
    }), (req, res) => {
        console.log("1234")
    })
}