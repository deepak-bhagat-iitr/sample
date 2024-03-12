const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const app = express()
const path = require("path");
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "Frontend", "build")));
    res.sendFile(path.resolve(__dirname, "Frontend", "build", "index.html"));
});
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
}));


app.post("/", async (req, res) => {
    const { email, password } = req.body


    const check = await collection.findOne({
        email: email,
        password: password
    })

    if (check) {
        res.send("exist")
    }
    else {
        res.send("notexist")
    }


})



app.post("/signup", async (req, res) => {
    const { email, password } = req.body

    const data = {
        email: email,
        password: password
    }

    const check = await collection.findOne({
        email: email
    })

    if (check) {
        res.json("exist")
    }
    else {
        const helper = await collection.findOne({
            email: email,
        })
        if (helper) {
            alert("email already in use")
        }
        else {
            await collection.insertMany([data])
            res.json("notexist")
        }
    }

})

app.listen(3000, () => {
    console.log("port connected");
})

