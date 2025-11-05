function caricaDati(){
    const xhttp = new XMLHttpRequest();
    /*
    onredaystatechange
Questo evento è diventato molto famoso dopo l'introduzione massiva delle tecniche Ajax.
Si può utilizzare anche con l'oggetto document in alternativa a 
DOMContentLoaded o a onload per verificare il caricamento degli elementi 
delle pagine HTML. Questa è la funzione di callback che viene chiamata automaticamente su javascript quando
    il readyState cambia da 0,1 , 2 ecc*/
    xhttp.onreadystatechange = function(){
        console.log(this.readyState)
     if(this.readyState === 4 && this.status === 200){
        console.log(this.responseText);
        //trasformo la risposta da json in un oggetto javascript
        let risposta = JSON.parse(this.responseText)
        console.log(risposta)
        //metto la risposta all'interno dell' <h1>
        document.getElementById("messaggio").innerHTML = risposta.messaggio;
        let arrayMedici = risposta.data;
        let tBody =''
        //costruisco il tbody da una stringa, assegno poi questa stringa all'elemento html tbody (che prendo dall'id che gli ho assegnato nella pagina html)
        for(let medico of arrayMedici){
            tBody+="<tr>";
            for(let x in medico){
                if(medico[x]!="[object Object]" && medico[x]!="[object Object],[object Object]")
                tBody += "<td>" + medico[x] + "</td>"
                if(medico[x]==medico.coordinataBancaria){
                    for(let y in medico[x]){
                    tBody += "<td>" + medico[x][y] + "</td>"
                    }
                }
            }
        tBody+= "</tr>"
        }
        
        document.getElementById("tablebody").innerHTML= tBody
      }
    };
    
    xhttp.open("GET", "http://localhost:8090/services/medico/list");
    xhttp.send();

}

