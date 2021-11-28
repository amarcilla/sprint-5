var reportJokes = [];

// Exercici 1 i 2
function nouacudit() {    
    
    let url = 'https://icanhazdadjoke.com/slack';
    // el fecth devuelve una promesa

    fetch(url)
        .then(response => response.json())
        .then(json => {
            // This is the JSON from our response, accedim al node on esta l'acudit.               
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
function puntuaAcudit(score){    
    // La data  valoració en format ISO.https://www.w3schools.com/Jsref/jsref_toisostring.asp
    const d = new Date();
    let text = d.toISOString();
    //The . innerHTML property refers to the literal HTML markup that is, once assigned, interpreted and incorporated into the DOM (Document Object Model) for the current document. ... value property simply refers to the content of typically an HTML input control,
    const p2 = document.getElementById("acudit").innerHTML;
    // afegim votació
    let joke = { 'joke': p2 , 'Score' : score, 'date':text} ;
    reportJokes.push( [joke,  1]);
    console.table(reportJokes);
}

