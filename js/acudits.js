// Exercici 1
function nouacudit() {
    console.log("nou acudit");
    let url = 'https://icanhazdadjoke.com/slack';
    // el fecth devuelve una promesa

    fetch(url)
    .then(response => response.json())
    .then(json => {
        // This is the JSON from our response        
        console.log(json.attachments[0].text);
        
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });
}
