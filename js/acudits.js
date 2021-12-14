var reportJokes = [];
var codiComarca = "";

// Exercici 1 i 2 i 5
function fetchPromise(url, source) {
    //Al fer sol·licitud HTTP com a operació asíncrona, Fetch no retornarà cap dada, tornarà una promesa de resposta.     
    const fetchPromise = fetch(url);

    //Quan registrem la resposta, mostrarà que aquesta promesa està en estat pendent. 
    //Això vol dir que la resposta HTTP que esperem es farà, 
    //però en el moment de registrar, aquesta resposta no estava preparada per registrar-se.
    //Ara pot passar a un estat complert si tot va bé o a un estat rebutjat si hi ha un error durant l'obtenció. 
    //Un cop resolta la Promesa, ja no pot canviar d'estat.
    console.log(fetchPromise);


    // Utilitzem el mètode Promise.prototype.then per retornar una resposta un cop s'hagi complert la nostra promesa.    
    // Estem registrant la resposta, per veure quina informació rebem de l'API.     
    // hauríem d'obtenir un objecte de resposta amb informació que inclou capçaleres, cos, tipus i fins i tot codi d'estat.
    fetchPromise.then(response => response.json())
        //Quan rebem resposta de q l'API funciona, continuem per obtenir el cos de la resposta => Cridant el mètode json().
        //el mètode json(), també és asíncron, per tant tb retorna una Promesa. 
        .then(json => {
            // This is the JSON from our response, accedim al node on esta l'acudit.               
            console.log(json);
            let acudit = "";
            switch (source) {
                case 0:
                    acudit = json.attachments[0].text;
                    break;
                case 1:
                    acudit = json.value;
                    break;
                default:
                    console.log(`Sorry, There is an error with the API. Contact with Admin`);
                    exit;
            }


            // Fiquem l'acudit al <p="acudit">
            // Fem tota aquest historia de p1 i p2.. per tal de que no acumuli acudits a la p.
            // Create an empty element node
            // without an ID, any attributes, or any content
            const p1 = document.createElement("p");

            // Give it an id attribute called 'newSpan'
            p1.id = "acudit";

            // Create some content for the new element.
            const p1_content = document.createTextNode(acudit);

            // Apply that content to the new element
            p1.appendChild(p1_content);

            // Build a reference to the existing node to be replaced
            const p2 = document.getElementById("acudit");
            const parentDiv = p2.parentNode;

            // Replace existing node sp2 with the new span element sp1
            parentDiv.replaceChild(p1, p2);

            console.log(acudit);
        }).catch(function (err) {
            // There was an error
            console.warn('Something went wrong.', err);
        });
}


// Exercici 1 i 2 i 5
function nouacudit() {
    // canviem imatge de fons de la capa segons random de 0 a 9
    let numImage=Math.floor(Math.random() * 10);
    document.getElementById("fons").style.backgroundImage = "url('/images/fons"+ numImage +".svg')";

    // Retorna 0 o 1
    const fuenteChistes = Math.round(Math.random());

    if (fuenteChistes == 0)
        url = "https://icanhazdadjoke.com/slack"
    else
        url = "https://api.chucknorris.io/jokes/random"

    // cridem a una de les dues APIS.. segons el random 0 o 1
    fetchPromise(url, fuenteChistes);

}

// Exercici 3
function puntuaAcudit(score) {
    // La data  valoració en format ISO.https://www.w3schools.com/Jsref/jsref_toisostring.asp
    const d = new Date();
    let text = d.toISOString();
    //The . innerHTML property refers to the literal HTML markup that is, once assigned, interpreted and incorporated into the DOM (Document Object Model) for the current document. ... value property simply refers to the content of typically an HTML input control,
    const p2 = document.getElementById("acudit").innerHTML;
    // afegim votació
    let joke = { 'joke': p2, 'Score': score, 'date': text };
    reportJokes.push(joke);
    console.table(reportJokes);
    alert('Acabes de puntuar l\'acudit amb: ' + score)
}

// exercici 4, 6
function meteocat() {

    //var contenido = document.querySelector('#contenido');
    fetch('https://api.meteo.cat/referencia/v1/municipis', {
        headers: {
            'X-Api-Key': 'ydQzSUWjaR9EgbsPiiLmv7nhgY9UKSqqS7WhK5tf',
        }
    })
        .then(response => response.json())
        .then(json => {
            console.log(json);

            //Afegim un option a la llista de comarques, per afegir el codi de mataró
            const llista = document.querySelector("#comarca"); //Obtenemos el select            
            let nuevaOpcion = document.createElement("option");
            nuevaOpcion.value = "081213";
            nuevaOpcion.text = "Mataró";
            llista.add(nuevaOpcion);

            //Filtrem per mataró            
            var codiSeleccionat = llista.options[0].text;
            const comarca = json.find(json => json.nom == "Mataró");

            codiComarca = comarca.codi
            console.log(comarca.codi)
            console.log(comarca.nom)

            URLComarca = "https://api.meteo.cat/pronostic/v1/municipal/" + codiComarca;
            //URLComarca = "https://api.meteo.cat/pronostic/v1/municipal/081213";
            fetch(URLComarca, {
                headers: {
                    'X-Api-Key': 'ydQzSUWjaR9EgbsPiiLmv7nhgY9UKSqqS7WhK5tf',
                }
            })
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    const dies_temps = json.dies.map((dia, i) => {
                        let tempMax;
                        let tempMin;
                        let icon = "<i class='fas fa-sun'></i>"
                        let pluja = parseFloat(dia.variables.precipitacio.valor);
                        if (pluja > 10) icon = "<i class='fas fa-cloud'></i>"
                        if (pluja > 25) icon = "<i class='fas fa-cloud-rain'></i>"
                        tempMax = "<i class='fas fa-temperature-high'></i>" + dia.variables.tmax.valor
                        tempMin = "<i class='fas fa-temperature-low'></i>" + dia.variables.tmin.valor
                        return dia.data + " | " + tempMax + " | " + tempMin + " | " + icon + "<br>"
                    }).join("\n")


                    const temps = document.getElementById("temps");
                    temps.innerHTML = dies_temps;

                    /*    console.log(dies_temps);
                        dies_temps.forEach((item) => {
                            console.log("dia: " + item.data);
                            console.log("Temperatura max:" + item.variables.tmax.valor);
                            console.log("Temperatura min:" + item.variables.tmin.valor);
                        })
                    */
                })
        })


}

