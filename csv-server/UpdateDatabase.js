const { Connection } = require("./postgres");

const DelitosGeneroJSON = require("./output/Delitos_Genero_Procesado.json");
const DelitosViolentosJSON = require("./output/Delitos_Violentos_Procesado.json");

Connection.open();

if (Connection.db) {
    Connection.db.query("DELETE from public.delitos_genero").then(() => {
        DelitosGeneroJSON.map((delito, index) => {
            let horaHecho = true;
            if (delito.HoraHecho === "NA") {
                horaHecho = false;
            }
            // console.log(`INSERT INTO public.delitos_genero ("identifier","idCarpeta", "delito", "sexo", "fechaHecho", "alcaldiaHecho", "coloniaHecho", "calleHecho", "latitud", "longitud", "numClas", "edad"${horaHecho ? ',"horaHecho"' : ''}) VALUES(${index}, ${parseInt(delito.idCarpeta)},'${delito.Delito}','${delito.Sexo}', '${delito.FechaHecho}', '${delito.AlcaldiaHechos}', '${delito.ColoniaHechos.replace("'", "''")}', '${delito.Calle_hechos.replace("'", "''")}', '${delito.latitud}', '${delito.longitud}', '${delito.NumClas}', '${delito.Edad}' ${horaHecho ? ", '" + delito.HoraHecho + "'" : ''});`);
            Connection.db.query(`INSERT INTO public.delitos_genero ("identifier","idCarpeta", "delito", "sexo", "fechaHecho", "alcaldiaHecho", "coloniaHecho", "calleHecho", "latitud", "longitud", "numClas", "edad"${horaHecho ? ',"horaHecho"' : ''}) VALUES(${index}, ${parseInt(delito.idCarpeta)},'${delito.Delito}','${delito.Sexo}', '${delito.FechaHecho}', '${delito.AlcaldiaHechos}', '${delito.ColoniaHechos.replace("'", "''")}', '${delito.Calle_hechos.replace("'", "''")}', '${delito.latitud}', '${delito.longitud}', '${delito.NumClas}', '${delito.Edad}' ${horaHecho ? ", '" + delito.HoraHecho + "'" : ''});`)
                .then((success) => {
                    console.log("Registro " + (index + 1) + " se ha guardado exitosamente")
                    return true;
                })
                .catch((error) => {
                    console.log(error)
                    console.log("idCarpeta: " + delito.idCarpeta + " NOTIFICAR AL PROGRAMADOR")
                    process.exit();
                })
            return true;
        })
    }).catch((error) => {
        console.log(error)
        process.exit();
    })

    Connection.db.query("DELETE from public.delitos_violentos").then(() => {
        DelitosViolentosJSON.map((delito, index) => {
            let horaHecho = true;
            if (delito.HoraHecho === "NA") {
                horaHecho = false;
            }
            Connection.db.query(`INSERT INTO public.delitos_violentos ("identifier","idCarpeta", "delito", "sexo", "fechaHecho", "alcaldiaHecho", "coloniaHecho", "calleHecho", "latitud", "longitud", "numClas", "edad"${horaHecho ? ',"horaHecho"' : ''}) VALUES(${index}, ${parseInt(delito.idCarpeta)},'${delito.Delito}','${delito.Sexo}', '${delito.FechaHecho}', '${delito.AlcaldiaHechos}', '${delito.ColoniaHechos.replace("'", "''")}', '${delito.Calle_hechos.replace("'", "''")}', '${delito.latitud}', '${delito.longitud}', '${delito.NumClas}', '${delito.Edad}' ${horaHecho ? ", '" + delito.HoraHecho + "'" : ''});`)

                .then((success) => {
                    console.log("Registro " + (index + 1) + " se ha guardado exitosamente")
                    return true;
                })
                .catch((error) => {
                    console.log(error)
                    console.log("idCarpeta: " + delito.idCarpeta + " NOTIFICAR AL PROGRAMADOR")
                    process.exit();
                })
            return true;
        })
    }).catch((error) => {
        console.log(error)
        process.exit();
    })
}