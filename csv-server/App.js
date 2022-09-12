const fs = require("fs");
// const csv = fs.readFileSync("./Delitos_Violentos_Presprocesado.csv")
const csv = fs.readFileSync("./Delitos_Genero_Preproceso2.csv")


const array = csv.toString().split("\n");
array.map((item, i)=>{
    console.log(item)
    console.log(item.startsWith('"') + " " + item.endsWith('"') );
    if(item.startsWith('"' && item.endsWith('"'))){
        console.log("ENTRA")
        return array[i] = item.substring(1, item.length - 1);
    }
    return 0;
})

const csvToJsonResult = [];

const headers = array[0].split(",")
headers.map((header, i)=>{
    return headers[i] = header.replace(/(\r\n|\n|\r|^\uFEFF|;)/gm, "")
})


for (let i = 1; i < array.length - 1; i++) {
    const jsonObject = {};

    let dataRow = array[i].split(",");
    for (let j in headers) {
            jsonObject[headers[j]] = dataRow[j].replace(/(\r\n|\n|\r|;)/gm, "");
    }

    csvToJsonResult.push(jsonObject)
}
/* Convert the final array to JSON */
const json = JSON.stringify(csvToJsonResult);
console.log(json)

fs.writeFileSync("Delitos_Genero_Preproceso2.json", json, 'utf8', function(err) {
    if (err) {
        console.log(err);
    }
});