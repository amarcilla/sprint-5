function nouacudit() {
    console.log("nou acudit");
    const acudit=fetch('https://icanhazdadjoke.com/slack')
        .then(response => response.json())
        .then(json => console.log(json))

}

