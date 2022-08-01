// éléments pour collecter les informations
const form = document.getElementById('form');

// déclenche l'évènement du submit des informations
form.addEventListener('submit', function(e) {
    e.preventDefault();
        if(!$('#fname').val() || !$("#lname").val() || !$("#avis").val() || !$("#Note").val() || !$("#formation").val())
        {
            alert("veuillez completer tous les champs!")
        }else{
            // crée une instance de XMLHttpRequest() dans l'objet xhr
    const xhr = new XMLHttpRequest();
    let form_data = new FormData(form);

    xhr.open('POST', 'http://localhost:3000/go', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            return new Error('Acces de connecter entre le client et server');
        }
        else {
            return new Error('Probleme de connection');
        }
    };

    console.log(formatJson(form_data));
    xhr.send(formatJson(form_data)); // envoie les données
    $("#form").trigger('reset');
        }    
    
});

// function pour convertir données objet en format JSON 
function formatJson(_form_data) {
    let _obj = {};
    for (const item of _form_data.keys()) {
        _obj[item] = _form_data.get(item);
    }
    return JSON.stringify(_obj, null, 2);
}
      