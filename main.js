const miModulo = (() => {
//============= Crear baraja de cartas =========================
    let deck = [];
    let palos = ['C','D', 'H', 'S'];
    let especiales = ['A', 'J', 'K', 'Q'];
    const htmlNombreJugador = document.querySelector('#nombre_jugador');
    const nombreJugador = prompt('¿Cual es tu nombre?');
          htmlNombreJugador.innerText = nombreJugador;


    const createDeck = () =>{

        for(let i = 2; i <= 10; i++){
            for (palo of palos){
                deck.push(i+palo)
            }
        }
        for (especial of especiales){
            for (palo of palos){
                deck.push(especial + palo)    
            }    
        }
        deck = _.shuffle(deck);
        return deck
    }

    // ==========  Pedir carta =======================
    const pedirCarta = ( ) => {
        if (deck.length === 0){
            throw 'No quedan mas cartas en la baraja'
        }
        const carta = deck.pop()
        console.log(carta);
        return carta
    }

    // ==========  Valores de las cartas =======================
    const valorCarta = (carta) => {
        let valor = carta.substring(0, carta.length - 1);
        if( isNaN(valor)){
            if ( valor == 'A'){
                valor = 11
            } else {
                valor = 10
            }
        }
        valor = valor * 1;
        return valor
    }



    // const valor = valorCarta(pedirCarta())
    const btnNuevo          = document.querySelector('#btn_nuevo');
    const btnPedir          = document.querySelector('#btn_pedir');
    const btnDetener        = document.querySelector('#btn_detener');
    const divCartasJugador  = document.querySelector('#jugador');
    const divCartasCpu      = document.querySelector('#cpu');
    const htmlPuntosJugador = document.querySelector('#puntos_jugador');
    const htmlPuntosCpu     = document.querySelector('#puntos_cpu');
    let puntosJugador       = 0;
    let puntosCpu           = 0;




    btnPedir.addEventListener('click', () =>{
        const carta = pedirCarta();
        puntosJugador = puntosJugador + valorCarta(carta);
        htmlPuntosJugador.innerText = puntosJugador;

        const imgCarta = document.createElement('img');
        imgCarta.src = `img/${carta}.png`;
        imgCarta.classList.add('cartas');
        divCartasJugador.append(imgCarta);
        
        if ( puntosJugador > 21 ){
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoCpu(puntosJugador);
        } else if (puntosJugador === 21 ){
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoCpu(puntosJugador);
        } 

    })



    const turnoCpu = (puntosJugador) => {
        
        do {
            const carta = pedirCarta();
            puntosCpu = puntosCpu + valorCarta(carta);
            htmlPuntosCpu.innerText = puntosCpu;
        
            const imgCarta = document.createElement('img');
            imgCarta.src = `/img/${carta}.png`;
            imgCarta.classList.add('cartas');
            divCartasCpu.append(imgCarta);
            if(puntosJugador > 21 ){
                break;
            }
            
        } while (( puntosCpu < puntosJugador ) && (puntosJugador <= 21) )
        setTimeout(() => {
            if (puntosCpu === puntosJugador){
                alert('Es un empate');
            } else if (puntosJugador > 21 ) {
                alert('Has superado los 21 puntos, has perdido');
            } else if ( puntosCpu > 21){
                alert('El jugador gana');
            } else {
                alert('El jugador pierde');
            }
        }, 500);
        }




    // eventos


    btnDetener.addEventListener('click', () =>{
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoCpu(puntosJugador);
    })




    btnNuevo.addEventListener('click', () =>{
        deck = [];
        htmlPuntosCpu.innerText = 0;
        htmlPuntosJugador.innerText = 0;
        btnPedir.disabled = false;
        btnDetener.disabled = false;

        puntosCpu = 0;
        puntosJugador = 0


        divCartasCpu.innerHTML          = '';
        divCartasJugador.innerHTML      = '';

        createDeck();
    
    })
})