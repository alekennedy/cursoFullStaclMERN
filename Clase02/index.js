const express = require('express');

const app = express();

//settings
app.set('port',3000);

//middleawares
app.use(express.json());


//routes
app.get("/", (req, res) => {
    res.json({
        mensaje:"leer un recursos"
    });
});

app.get("/:id", (req, res) => {
    res.json({
        mensaje:"leer el recurso "+req.param('id')
    });
});

app.post("/", (req, res) => {
    console.log(req.body)
    res.json({
        mensaje:req.body
    });
});

app.delete("/:id", (req, res) => {
    res.json({
        mensaje:"Recurso "+req.param("id")+" eliminado"
    });
});

app.put("/:id", (req, res) => {
    res.json({
        "id_act":req.param("id"),
        "data":req.body
    });
});

app.listen(app.get('port'), () => { 
    console.log("Server on port "+app.get('port'));
});
