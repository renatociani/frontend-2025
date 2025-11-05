for(let i=0; i<15;i++){
    console.log(`I am number ${i}`)
 }

 const taskInput = document.querySelector('#casella-input');
 const inputButton = document.querySelector('#bottone-input');
 const taskList = document.querySelector('#lista-task');

 //aggiungo nel bottone l'evento di aggiungere un task
 inputButton.addEventListener('click', aggiungiTask);
//aggiungo per ogni elemento della lista dei toDo, la possibilità di eliminarlo
 taskList.addEventListener('click',rimuoviTask);

 function aggiungiTask(evento) {
    console.log('BOTTONE CLICCATO');
    console.log(evento);
    console.log("valore input : " + taskInput.value); // quello che inserisco nel box di input
    if(taskInput.value==="") {
      alert('Scrivi qualcosa');
    }
    //creo nuovo li e aggiungo la classe
    const li = document.createElement('li'); //list item
    li.className = 'task'
    //metto qualcosa dentro il list item tramite la funzione appendChild, cioè quello che inserisco nel box di input,
    //ma non direttamente taskInput.value, perchè è un oggetto js, dobbiamo prima trasformarlo in testo html tramite 
    //la funzione document.createTextNode()
    li.appendChild(document.createTextNode(taskInput.value)); 
    

    //creo un link per cancellare l'elemento (quindi creiamo un <a></a>)
    const link = document.createElement('a');
    //aggiungo classe a <a></a>
    link.className="elimina";
   //aggiungo testo a <a></a>
    link.innerHTML = '<h3>X</h3>';
   //metto il link dentro li
    li.appendChild(link);


   //metto li dentro ul, cioiè dentro taskList
    taskList.appendChild(li);

    //quando clicco add aggiungo il task e pulisco l'input, inmodo tale 
    //che posso riscriverci sopra senza cancellare manualmente quello primo
    taskInput.value="";
    evento.preventDefault();

    console.log(li);
 }

 function rimuoviTask(evento) {
   console.log('evento.target.parentElement.classList: ' + evento.target.parentElement.classList)
   if(evento.target.parentElement.classList.contains('elimina')){
      console.log('cancello todo');
      evento.target.parentElement.parentElement.remove();
   }
 }