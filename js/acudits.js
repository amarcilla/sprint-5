var reportJokes = [];

// Exercici 1 i 2
function nouacudit() {

    let promiseUrl = 'https://icanhazdadjoke.com/slack';

    //Al fer sol·licitud HTTP com a operació asíncrona, Fetch no retornarà cap dada, tornarà una promesa de resposta.     
    const fetchPromise = fetch("https://icanhazdadjoke.com/slack");

    //Quan registrem la resposta, mostrarà que aquesta promesa està en estat pendent. 
    //Això vol dir que la resposta HTTP que esperem es farà, 
    //però en el moment de registrar, aquesta resposta no estava preparada per registrar-se.
    //Ara pot passar a un estat complert si tot va bé o a un estat rebutjat si hi ha un error durant l'obtenció. 
    //Un cop resolta la Promesa, ja no pot canviar d'estat.
    console.log(fetchPromise);

    // Utilitzem el mètode Promise.prototype.then per retornar una resposta un cop s'hagi complert la nostra promesa.    
    // Estem registrant la resposta, per veure quina informació rebem de l'API.     
    //hauríem d'obtenir un objecte de resposta amb informació que inclou capçaleres, cos, tipus i fins i tot codi d'estat.
    fetchPromise.then(response => response.json())
        //Quan rebem resposta de q l'API funciona, continuem per obtenir el cos de la resposta => Cridant el mètode json().
        //el mètode json(), també és asíncron, per tant tb retorna una Promesa. 
        .then(json => {
            // This is the JSON from our response, accedim al node on esta l'acudit.               
            console.log(json);
            let acudit = json.attachments[0].text;

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
}

function meteocat() {

    //var contenido = document.querySelector('#contenido');

    fetch('https://api.meteo.cat/referencia/v1/municipis', {
        headers: { 
            'X-Api-Key': 'ydQzSUWjaR9EgbsPiiLmv7nhgY9UKSqqS7WhK5tf', }
    })
        .then(r => r.json())
        .then(data => {
        })



    //const primseUrl = 'https://api.openweathermap.org/data';
    // const primseUrl = '';
    // el fecth devuelve una promesa

    /* fetch(primseUrl)
         .then(response => response.json())
         .then(json => {
             // This is the JSON from our response, accedim al node on esta l'acudit.               
             //let temps = json.attachments[0].text;
 
             // const p1 = document.createElement("p");
             // p1.id = "el temps";
             // const p1_content = document.createTextNode(temps);
             // p1.appendChild(p1_content);
             // const p2 = document.getElementById("eltemps");
             // const parentDiv = p2.parentNode;
             // parentDiv.replaceChild(p1, p2);
 
             console.log(json);
         }).catch(function (err) {
             // There was an error
             console.warn('Something went wrong.', err);
         });*/

}

