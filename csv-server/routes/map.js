const express = require("express");
const { Connection } = require("../postgres");
const router = express.Router();

router.get("/delitos_genero", async (req, res) => {
  Connection.db.query('SELECT * FROM public.delitos_genero')
    .then((data) => {
      return res.send(data).status(200);
    })
    .catch((error) => {
      return res.send(error).status(500);
    })

})

router.get("/delitos_violentos", async (req, res) => {
  Connection.db.query('SELECT * FROM public.delitos_violentos')
    .then((data) => {
      return res.send(data).status(200);
    })
    .catch((error) => {
      return res.send(error).status(500);
    })

})

router.get("/delitos_genero/graph1", async (req, res) => {
  Connection.db.query('SELECT "alcaldiaHecho", COUNT("alcaldiaHecho") from public.delitos_genero group by "alcaldiaHecho";')
    .then((data) => {
      return res.send(data).status(200);
    })
    .catch((error) => {
      return res.send(error).status(500);
    })

})

router.get("/delitos_genero/graph2", async (req, res) => {
  Connection.db.query( 'select "horaHecho", COUNT("horaHecho") from public.delitos_genero where "horaHecho" IS NOT NULL group by "horaHecho";')
    .then((data) => {
      return res.send(data).status(200);
    })
    .catch((error) => {
      return res.send(error).status(500);
    })

})

router.get("/delitos_genero/graph3", async (req, res) => {
  Connection.db.query('select "edad", COUNT("edad") from public.delitos_genero where "edad" IS NOT NULL group by "edad";')
    .then((data) => {
      return res.send(data).status(200);
    })
    .catch((error) => {
      return res.send(error).status(500);
    })
})


router.get("/delitos_genero/graph4", async (req, res) => {
  Connection.db.query('SELECT "alcaldiaHecho", COUNT("alcaldiaHecho") from public.delitos_violentos group by "alcaldiaHecho";')
    .then((data) => {
      return res.send(data).status(200);
    })
    .catch((error) => {
      return res.send(error).status(500);
    })
})

module.exports = router;