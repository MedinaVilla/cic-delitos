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
  Connection.db.query('	SELECT * from delitos_hour_genero;')
    .then((data) => {
      let rangoHoras = ['00:00 - 02:00', '02:00 - 4:00', '04:00 - 06:00','06:00 - 08:00', '08:00 - 10:00', '10:00 - 12:00',
      '12:00 - 14:00','14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00', '20:00 - 22:00', '22:00 - 00:00'];

      for(let i =0;i<data.length;i++){
        data[i].rangoHora = rangoHoras[i];
      }
      return res.send(data).status(200);
    })
    .catch((error) => {
      return res.send(error).status(500);
    })

})

router.get("/delitos_genero/graph3", async (req, res) => {
  Connection.db.query(' SELECT * from delitos_edad_genero;')
    .then((data) => {

      let rangoEdades = ['0 - 5', '6 - 12', '13 - 17','18 - 25', '26 - 30', '36 - 40', '41 - 55','56 +'];

      for(let i =0;i<data.length;i++){
        data[i].rangoEdad= rangoEdades[i];
      }


      return res.send(data).status(200);
    })
    .catch((error) => {
      return res.send(error).status(500);
    })

})

module.exports = router;