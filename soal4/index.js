const http = require('http')
const path = require('path')
const express = require('express')
const { dirname, basename } = require('path');
const hbs = require('hbs')
const session = require('express-session')


const app = express()

app.use(express.json())
app.use(express.static('express'));


app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(
    session(
        {
            cookie: {
                maxAge: 1000 * 60 * 60 * 2,
                secure: false,
                httpOnly: true
            },
            store: new session.MemoryStore(),
            saveUninitialized: true,
            resave: false,
            secret: 'secretkey'
        }
    )
)

app.use(express.urlencoded({ extended: false }))

hbs.registerPartials(__dirname + '/views/partials')

// Connect DB
const dbConnection = require('./connection/db')
const uploadFile = require('./middleware/uploadFile')
const { response } = require('express');

app.set('view engine', 'hbs')

const pathFile = `http://localhost:3000/uploads/`

app.get('/', function (request, response) {
    const title = 'Provinsi & Kabupaten'
    const query = `SELECT * FROM provinsi_tb`
    dbConnection.getConnection(function (err, conn) {
        if (err) throw err


        conn.query(query, function (err, results) {
            if (err) throw err

            console.log(results)
            let provinsi = []
            for (let result of results) {
                provinsi.push({
                    id: result.id,
                    name: result.nama,
                    photo: pathFile + result.photo,
                    pulau: result.pulau,
                    diresmikan: result.diresmikan
                })
            }
            response.render('index', {
                title: title,
                provinsi,
            })
        })
    })
})

app.get('/kabupaten', function (request, response) {
    const title = 'Provinsi & Kabupaten'
    const query = `SELECT * FROM kabupaten_tb`
    dbConnection.getConnection(function (err, conn) {
        if (err) throw err


        conn.query(query, function (err, results) {
            if (err) throw err

            console.log(results)
            let kabupaten = []
            for (let result of results) {
                kabupaten.push({
                    id: result.id,
                    name: result.nama,
                    photo: pathFile + result.photo,
                    diresmikan: result.diresmikan
                })
            }
            response.render('kabupaten', {
                title: title,
                kabupaten,

            })
        })
    })
})

app.get('/add-provinsi', function (request, response) {
    const title = 'Provinsi & Kabupaten'
    response.render('add-provinsi', {
        title: title
    })
})

app.post('/add-provinsi', uploadFile('image'), function (request, response) {
    const { name, pulau, diresmikan } = request.body
    let image = ''

    if (request.file) {
        image = request.file.filename
    }

    const query = `INSERT INTO provinsi_tb(nama,pulau,diresmikan,photo) VALUES("${name}","${pulau}","${diresmikan}","${image}")`
    dbConnection.getConnection(function (err, conn) {
        if (err) throw err

        conn.query(query, function (err, results) {
            if (err) throw err

            console.log('Success')
            response.redirect('/')
        })
    })
})

app.get('/add-kabupaten', function (request, response) {
    const title = 'Provinsi & Kabupaten'
    const query = `SELECT * FROM provinsi_tb`
    dbConnection.getConnection(function (err, conn) {
        if (err) throw err

        conn.query(query, function (err, results) {
            if (err) throw err

            console.log(results)
            const provinsi = []
            for (let result of results) {
                provinsi.push({
                    id: result.id,
                    name: result.nama
                })
            }
            response.render('add-kabupaten', {
                title: title,
                provinsi
            })
        })
    })
})

app.post('/add-kabupaten', uploadFile('image'), function (request, response) {
    const { name, provinsi, diresmikan } = request.body
    let image = ''

    if (request.file) {
        image = request.file.filename
    }

    const query = `INSERT INTO kabupaten_tb(nama,provinsi_id,diresmikan,photo) VALUES("${name}",${provinsi},"${diresmikan}","${image}")`
    dbConnection.getConnection(function (err, conn) {
        if (err) throw err

        conn.query(query, function (err, results) {
            if (err) throw err

            console.log('Success')
            response.redirect('/')
        })
    })
})

app.get('/detail-provinsi/:id', function (request, response) {
    const title = 'Provinsi & Kabupaten'
    const id = request.params.id
    const query = `SELECT * FROM provinsi_tb WHERE id=${id}`
    dbConnection.getConnection(function (err, conn) {
        if (err) throw err

        conn.query(query, function (err, results) {
            if (err) throw err

            console.log(results)
            const provinsi = []
            for (let result of results) {
                provinsi.push({
                    id: result.id,
                    name: result.nama,
                    photo: pathFile + result.photo,
                    pulau: result.pulau,
                    diresmikan: result.diresmikan
                })
            }
            response.render('detail-provinsi', {
                title: title,
                provinsi
            })
        })
    })
})

app.post('/detail-provinsi/:id', uploadFile('image'), function (request, response) {
    const { name, pulau, diresmikan } = request.body
    const id = request.params.id
    let image = ''

    if (request.file) {
        image = request.file.filename
    }

    const query = `UPDATE provinsi_tb SET nama="${name}",pulau="${pulau}",diresmikan="${diresmikan}",photo="${image}" WHERE id = ${id}`
    dbConnection.getConnection(function (err, conn) {
        if (err) throw err

        conn.query(query, function (err, results) {
            if (err) throw err
            console.log(results)
            console.log('success')
            response.redirect('/')
        })
    })
})

app.get('/detail-provinsi/:id/delete', function (request, response) {
    const id = request.params.id
    const query = `DELETE FROM provinsi_tb WHERE id = ${id}`

    dbConnection.getConnection(function (err, conn) {
        if (err) throw err

        conn.query(query, function (err, results) {
            if (err) throw err

            console.log('success')
            response.redirect('/')
        })
    })
})

app.get('/detail-kabupaten/:id', function (request, response) {
    const title = 'Provinsi & Kabupaten'
    const id = request.params.id
    const query = `SELECT * FROM kabupaten_tb WHERE id=${id}`
    const query2 = `SELECT * FROM provinsi_tb`
    dbConnection.getConnection(function (err, conn) {
        if (err) throw err

        const provinsi = []
        request.session.provinsi = []
        conn.query(query2, function (err, results) {
            if (err) throw err

            console.log(results)
            for (let result of results) {
                provinsi.push({
                    id: result.id,
                    name: result.nama
                })
                request.session.provinsi.push({
                    id: result.id,
                    name: result.nama
                })
            }
        })
        conn.query(query, function (err, results) {
            if (err) throw err

            console.log(results)
            // const kabupaten = []
            for (let result of results) {
                request.session.kabupaten = {
                    id: result.id,
                    name: result.nama,
                    photo: pathFile + result.photo,
                    provinsi_id: result.provinsi_id,
                    diresmikan: result.diresmikan
                }
            }

            const provinsiNow = []
            for(let result of request.session.provinsi){
                if(request.session.kabupaten.provinsi_id == result.id){
                    provinsiNow.push({
                        id: result.id,
                        name: result.name
                    })
                }
            }

            console.log('ini PROVINSI')
            console.log(provinsi)
            response.render('detail-kabupaten', {
                title: title,
                kabupaten: request.session.kabupaten,
                provinsi,
                provinsiNow
            })
        })
    })
})

app.post('/detail-kabupaten/:id', uploadFile('image'), function (request, response) {
    const { name, provinsi, diresmikan } = request.body
    const id = request.params.id
    let image = ''

    if (request.file) {
        image = request.file.filename
    }

    const query = `UPDATE kabupaten_tb SET nama="${name}",provinsi_id=${provinsi},diresmikan="${diresmikan}",photo="${image}" WHERE id = ${id}`
    dbConnection.getConnection(function (err, conn) {
        if (err) throw err

        conn.query(query, function (err, results) {
            if (err) throw err
            console.log(results)
            console.log('success')
            response.redirect('/kabupaten')
        })
    })
})

app.get('/detail-kabupaten/:id/delete', function (request, response) {
    const id = request.params.id
    const query = `DELETE FROM kabupaten_tb WHERE id = ${id}`

    dbConnection.getConnection(function (err, conn) {
        if (err) throw err

        conn.query(query, function (err, results) {
            if (err) throw err

            console.log('success')
            response.redirect('/kabupaten')
        })
    })
})

const port = 3000
const server = http.createServer(app)
server.listen(port)

hbs.handlebars.registerHelper('isStatus', function (value) {
    if (value == 1) {
        return true;
    } else {
        return false;
    }
})