var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql')
var crypto = require('crypto')


var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "q1w2e3r4",
    database: "chad",
})


passwordMatch = (pwd, row) => {
    var sqlPwd = row.password
    var md5 = crypto.createHash('md5')
    var saltedpwd = md5.update((md5.update(pwd)+row.salt)).digest('hex')
    console.log(saltedpwd)
    return saltedpwd == sqlPwd
}

module.exports
 = passport => {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, username, password, done) => {
        console.log(password)
        conn.query("select * from ilance_users where username = ?",[username], (err, rows, fileds)=>{
            if(err) return done(err)
            if(rows.length == 0) {
                console.log('Incorrect username.')
                return done(null, false, { message: 'Incorrect username.'})
            }
            if(!passwordMatch(password, rows[0])) {
                console.log('Incorrect password.')
                return done(null, false, { message: 'Incorrect password.'})
            }
            console.log('pwd match')
            return done(null, rows[0])
        })
    }
    ))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        conn.query("select * from ilance_users where user_id = ? ",[id], (err, rows) => {
            done(err, rows[0])
        })
    })
}