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
        let arrayCaffe = risposta.data;
        let tBody =''
        //costruisco il tbody da una stringa, assegno poi questa stringa all'elemento html tbody (che prendo dall'id che gli ho assegnato nella pagina html)
        for(let caffe of arrayCaffe){
            tBody+="<tr>";
            for(let x in caffe){
                if(caffe[x]!="[object Object]" && caffe[x]!="[object Object],[object Object]")
                tBody += "<td>" + caffe[x] + "</td>"
                if(caffe[x]==caffe.titolare){
                    for(let y in caffe[x]){
                    tBody += "<td>" + caffe[x][y] + "</td>"
                    }
                }
            }
        tBody+= "</tr>"
        }
        
        document.getElementById("tablebody").innerHTML= tBody
      }
    };
    
    xhttp.open("GET", "http://localhost:8090/services/caffe/list");
    xhttp.send();

}

