//zmienne, stałe

const { request } = require("express");
var express = require("express")
var app = express()
var PORT = process.env.PORT || 3000; // bardzo istotna linijka - port zostaje przydzielony przez Heroku
var formidable = require('formidable');
var bodyParser = require("body-parser")



let users = [
    {id: 1, log: "aaa", pass: "123", wiek: 10, uczen: "on", plec: "male"}
]


let dodajUzytkownika = 1
let loguj = 0
let rosnacoMalejaco = 0

//nasłuch na określonym porcie

app.use(express.static('static'))

var path = require("path");
const { allowedNodeEnvironmentFlags } = require("process");

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/main.html"))
    
})

app.get("/main", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/main.html"))
    
})

app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/login.html"))
})

app.get("/register", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/register.html"))
})


    app.get("/admin", function (req, res) {
        if(loguj == 1){
            res.sendFile(path.join(__dirname + "/static/admin.html"))
        }

        else{
            res.send(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <script src="./js/script.js"></script>
                <style>
                    #linki{
                        display: flex;
                        justify-content: flex-start;
                        background-color: #c01f9d;
                    }
                    p{
                        padding: 20px;
                        color: #e4d7d7;
                    }
                    
                    #mainPage{
                        display: flex;
                        justify-content: center;
                        align-items: flex-start;
                        height: 200px;
                    }
                    
                    #mainPage>p{
                        font-size: 6rem;
                        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                        margin: 0px;
                    }
                </style>
            </head>
            <body>
                <div id="linki">
                    <a href="/main"><p id="main"><u>main</u></p></a>
                    <a href="/register"><p id="register"><u>register</u></p></a>
                    <a href="/login"><p id="login"><u>login</u></p></a>
            
                </div>
                <div id="mainPage"><p>nie jesteś zalogowany</p></div>
            </body>
            </html>`)
        }
    })


app.get('/show', function (req,res){
    let show = "<table>"
    for(o=0;o<users.length;o++){
        show += "<tr>"
        show += "<td>id: "+o+"</td>"
        show += "<td>user: " + users[o].log + " - " + users[o].pass + "</td>"
        show += "<td>uczeń: " + users[o].uczen + "</td>"
        show += "<td>wiek: " + users[o].wiek + "</td>"
        show += "<td>płeć: " + users[o].plec + "</td>"
        show += "</tr>"
    }
    show += '</table>'
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <script src="./js/script.js"></script>
        <style>
            #linkiSerwer{
                display: flex;
                justify-content: flex-start;
            }
            p{
                padding: 20px;
                color: #e4d7d7;
            }
            body{
                background-color: #17102b;
            }
            table,tr,td{
                border:solid #a4b3dd 1px;
                color: #a4b3dd;
            }
            td{
                width: 100px;
                height: 40px;
            }
        </style>
    
    </head>
    <body>
        <div id="linkiSerwer">
            <a href="/show"><p id="show"><u>show</u></p></a>
            <a href="/gender"><p id="gender"><u>gender</u></p></a>
            <a href="/sort"><p id="sort"><u>sort</u></p></a>
            <a href="/admin"><p id="admin"><u>admin</u></p></a>

        </div>
        ` + show + `
    </body>
    </html>`)
})

app.get('/sort', function (req,res){

    if(rosnacoMalejaco == 0){
        let sort = "<table>"
        for(o=0;o<users.length;o++){
            sort += "<tr>"
            sort += "<td>id: "+users[o].id+"</td>"
            sort += "<td>user: " + users[o].log + " - " + users[o].pass + "</td>"
            sort += "<td>wiek: " + users[o].wiek + "</td>"
            sort += "</tr>"
        }
        sort += '</table>'

        res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <script src="./js/script.js"></script>
            <style>
                #linkiSerwer{
                    display: flex;
                    justify-content: flex-start;
                }
                p{
                    padding: 20px;
                    color: #e4d7d7;
                }
                body{
                    background-color: #17102b;
                }
                table,tr,td{
                    border:solid #a4b3dd 1px;
                    color: #a4b3dd;
                }
                td{
                    width: 100px;
                    height: 40px;
                }
                #kolejnosc{
                    display: flex;
                    justify-content: center;
                    padding: 20px;
                }
            </style>
        
        </head>
        <body>
            <div id="linkiSerwer">
            <a href="/show"><p id="show"><u>show</u></p></a>
            <a href="/gender"><p id="gender"><u>gender</u></p></a>
            <a href="/sort"><p id="sort"><u>sort</u></p></a>
                <a href="/admin"><p id="admin"><u>admin</u></p></a>
    
            </div>
            ` + sort + `
            
            <div id="kolejnocs">
                <form action="/kolejnosc" method="POST" onchange="this.submit()">
                    <label for="rosnąco">rosnąco</label>
                    <input type="radio" name="kolejność" value="rosnąco">
                    <label for="malejąco">malejąco</label>
                    <input type="radio" name="kolejność" value="malejąco">
                </form>
            </div>
        </body>
        </html>`)
    }

    else if(rosnacoMalejaco == 1){
        let sort = "<table>"
        users.sort(function(a,b){
            return parseFloat(a.wiek) - parseFloat(b.wiek);
        });
        for(o=0;o<users.length;o++){
            sort += "<tr>"
            sort += "<td>id: "+users[o].id+"</td>"
            sort += "<td>user: " + users[o].log + " - " + users[o].pass + "</td>"
            sort += "<td>wiek: " + users[o].wiek + "</td>"
            sort += "</tr>"
        }
        sort += '</table>'

        res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <script src="./js/script.js"></script>
            <style>
                #linkiSerwer{
                    display: flex;
                    justify-content: flex-start;
                }
                p{
                    padding: 20px;
                    color: #e4d7d7;
                }
                body{
                    background-color: #17102b;
                }
                table,tr,td{
                    border:solid #a4b3dd 1px;
                    color: #a4b3dd;
                }
                td{
                    width: 100px;
                    height: 40px;
                }
                #kolejnosc{
                    display: flex;
                    justify-content: center;
                    padding: 20px;
                }
            </style>
        
        </head>
        <body>
            <div id="linkiSerwer">
            <a href="/show"><p id="show"><u>show</u></p></a>
            <a href="/gender"><p id="gender"><u>gender</u></p></a>
            <a href="/sort"><p id="sort"><u>sort</u></p></a>
                <a href="/admin"><p id="admin"><u>admin</u></p></a>
    
            </div>
            ` + sort + `
            
            <div id="kolejnocs">
                <form action="/kolejnosc" method="POST" onchange="this.submit()">
                    <label for="rosnąco">rosnąco</label>
                    <input type="radio" name="kolejność" value="rosnąco">
                    <label for="malejąco">malejąco</label>
                    <input type="radio" name="kolejność" value="malejąco">
                </form>
            </div>
        </body>
        </html>`)
    }

    else if(rosnacoMalejaco == 2){
        let sort = "<table>"
        users.sort(function(a,b){
            return parseFloat(b.wiek) - parseFloat(a.wiek);
        });
        for(o=0;o<users.length;o++){
            sort += "<tr>"
            sort += "<td>id: "+users[o].id+"</td>"
            sort += "<td>user: " + users[o].log + " - " + users[o].pass + "</td>"
            sort += "<td>wiek: " + users[o].wiek + "</td>"
            sort += "</tr>"
        }
        sort += '</table>'

        res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <script src="./js/script.js"></script>
            <style>
                #linkiSerwer{
                    display: flex;
                    justify-content: center;
                    flex-direction: row;
                }
                p{
                    padding: 20px;
                    color: #e4d7d7;
                }
                body{
                    background-color: #17102b;
                }
                table,tr,td{
                    border:solid #a4b3dd 1px;
                    color: #a4b3dd;
                }
                td{
                    width: 100px;
                    height: 40px;
                }
                #kolejnosc{
                    display: flex;
                    justify-content: center;
                    padding: 20px;
                }
                label{
                    color: #e4d7d7;
                }
            </style>
        
        </head>
        <body>
            <div id="linkiSerwer">
            <a href="/show"><p id="show"><u>show</u></p></a>
            <a href="/gender"><p id="gender"><u>gender</u></p></a>
            <a href="/sort"><p id="sort"><u>sort</u></p></a>
                <a href="/admin"><p id="admin"><u>admin</u></p></a>
    
            </div>

            <div id="kolejnocs">
            <form action="/kolejnosc" method="POST" onchange="this.submit()">
                <label for="rosnąco">rosnąco</label>
                <input type="radio" name="kolejność" value="rosnąco">
                <label for="malejąco">malejąco</label>
                <input type="radio" name="kolejność" value="malejąco">
            </form>
        </div>

            ` + sort + `
            
        </body>
        </html>`)
    }

})



app.get('/gender', function (req,res){
    let kobiety = "<table>"

    for(o=0;o<users.length;o++){
        if(users[o].plec == 'female'){
            kobiety += "<tr>"
            kobiety += "<td>id: " + users[o].id + "</td>"
            kobiety += "<td>płeć: "+users[o].plec + "</td>"
            kobiety += "</tr>"
        }
    }
    kobiety += '</table>'

    let mezcyzni = "<table>"

    for(o=0;o<users.length;o++){
        if(users[o].plec == 'male'){
            mezcyzni += "<tr>"
            mezcyzni += "<td>id: "+users[o].id+"</td>"
            mezcyzni += "<td>płeć: " + users[o].plec + "</td>"
            mezcyzni += "</tr>"
        }
    }
    mezcyzni += '</table>'

    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <script src="./js/script.js"></script>
        <style>
            #linkiSerwer{
                display: flex;
                justify-content: flex-start;
            }
            p{
                padding: 20px;
                color: #e4d7d7;
            }
            body{
                background-color: #17102b;
            }
            table,tr,td{
                border:solid #a4b3dd 1px;
                color: #a4b3dd;
            }
            td{
                width: 100px;
                height: 40px;
            }
            #tabele{
                display: flex;
                justify-content: space-between;
            }

        </style>
    
    </head>
    <body>
        <div id="linkiSerwer">
            <a href="/show"><p id="show"><u>show</u></p></a>
            <a href="/gender"><p id="gender"><u>gender</u></p></a>
            <a href="/sort"><p id="sort"><u>sort</u></p></a>
            <a href="/admin"><p id="admin"><u>admin</u></p></a>

        </div>
        <div id="tabele">
        ` + kobiety + mezcyzni + `
        </div>
    </body>
    </html>`)
})

app.get("/login1", function (req, res) {
    loguj = 0
    res.redirect('/login')
    
})


app.use(bodyParser.urlencoded({ extended: true })); 


app.post("/register", function (req,res){

    for(x=0;x<users.length;x++){

        if(req.body.login.trim() == users[x].log){
            dodajUzytkownika = 0
        }
    }

    if(dodajUzytkownika == 0){
        res.send(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                </head>
                <body>
                    Taki użytkownik już istnieje
                </body>
                </html>`)
        console.log(users,dodajUzytkownika)
    }
    else{
        users.push({id: users.length + 1, log: req.body.login, pass: req.body.psw, wiek: req.body.age, uczen: req.body.uczen, plec: req.body.gender})
        console.log(users)
        res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            </head>
            <body>
                Zostałeś zarejestrowany
            </body>
            </html>`)
            console.log(users,dodajUzytkownika)
    }
    dodajUzytkownika = 1


})

app.post("/login", function (req,res){
    for(x=0;x<users.length;x++){
        if(req.body.login == users[x].log && req.body.psw == users[x].pass){
            loguj = 1
            console.log(loguj)
        }
    }

    if(loguj == 1){
        res.redirect("/admin")
    }
    else{
        res.send('<script>alert("Błędny login lub hasło!"); window.location.href = "/login"; </script>');
        res.redirect("/login")
    }
})

app.post("/kolejnosc", function(req,res){
    if(req.body.kolejność == 'rosnąco'){
        rosnacoMalejaco = 1
    }
    else if(req.body.kolejność == 'malejąco'){
        rosnacoMalejaco = 2
    }
    console.log(req.body.kolejność)
    res.redirect("/sort")
})




app.listen(PORT, function () { 
    console.log("start serwera na porcie " + PORT )
})

