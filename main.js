const columns = 10;
const lines = 10;
const backgroundColorTable = "white";
const fruitColor = "green";
const snakeColor = "black";
const snakeRaboColor = "gray";
const speed = 500; //miliseconds -> velocidade da cobra
var score = 0;

/**
 * historico de movimentacao para manter o rabo da cobra
 * posicao do elemento filho
*/
var rabo = new Array();



var table = document.getElementById("table");

data = new Array(columns * lines);
for(let k=0;k<columns*lines;k++){
    data[k] = k;
}


function drawTable(){
    var contador = -1;
    for(var i=0; i < data.length; i++){
        contador++;
        if(contador >= columns){
            table.innerHTML += '<br>';
            contador = 0;
        }
        table.innerHTML += `<div class='table'>${data[i]}</div>`;
        
    }
}

drawTable()


/**
 * @param {string} color - The string
 */
function changeBackgroundColor(color){
    var contador = 0;
    for(var i=0; i < data.length; i++){
        if(table.children[i].classList[0] == 'table'){
            //table.children[i].style.backgroundColor = snakeColor;
        }else{
            contador++;
        }
    }
    for(var i=0; i < data.length + contador; i++){
        if(table.children[i].classList[0] == 'table'){
            table.children[i].style.backgroundColor = color;
        }else{
            table.children[i].style.cssText = '';
        }
        
    }
    //retornando o numero total de alementos
    return data.length+contador;
}
var totalElementos = changeBackgroundColor(backgroundColorTable)

//set interval times
var runLeftInterval;
var runRightInterval;
var runUpInterval;
var runDownInterval;

//capture arrows of keyboard
document.addEventListener('keydown', function(event) {
    const key = event.key; 
    switch (event.key) {
      case "ArrowLeft":
          console.log("Left arrow!")
          clearInterval( runUpInterval );
          clearInterval( runDownInterval );
          clearInterval( runRightInterval );
          runLeft(findCurrentNumber());
          runLeftInterval = setInterval(function(){
            runLeft(findCurrentNumber());
          }, speed);
          
          break;
          
      case "ArrowRight":
          console.log("Right arrow!")
          clearInterval( runUpInterval );
          clearInterval( runDownInterval );
          clearInterval( runLeftInterval );
          runRight(findCurrentNumber());
          runRightInterval = setInterval(function(){
            runRight(findCurrentNumber());
          }, speed);
          break;

      case "ArrowUp":
          console.log("Up arrow!")
          clearInterval( runLeftInterval );
          clearInterval( runDownInterval );
          clearInterval( runRightInterval );
          runUp(findCurrentNumber());
          runUpInterval = setInterval(function(){
            runUp(findCurrentNumber());
          }, speed);
          break;
      case "ArrowDown":
          console.log("Down arrow!")
          clearInterval( runLeftInterval );
          clearInterval( runUpInterval );
          clearInterval( runRightInterval );
          runDown(findCurrentNumber());
          runDownInterval = setInterval(function(){
            runDown(findCurrentNumber());
          }, speed);
          break;
          
     }
});

function findCurrentNumber(){
    for(var i=0; i < totalElementos; i++){
        if(table.children[i].classList[0] == 'table'){
            if(table.children[i].style.backgroundColor == snakeColor){
                console.log('currentNumber: '+ table.children[i].textContent);
                return table.children[i].textContent;
            }
        }
    }
}

//rabo da cobrinha
setInterval(function(){
    //desenhando o rabo da cobrinha conforme ela vai comendo
    let tamanho = rabo.length;
    try{
        table.children[rabo[tamanho-2]].style.backgroundColor = snakeRaboColor;
    }catch{
    }
    try{
        table.children[rabo[tamanho-(2+score)]].style.backgroundColor = backgroundColorTable;
    }catch{
    }
    //printando o score na tela
    document.getElementById("score").innerText = "Score: "+score;
    
}, 20);

setInterval(function(){
    seNaoTiverFrutaNaTelaGerarFruta();
    if(score > 3){speed = speed - 20;}
    if(score > 6){speed = speed - 50;}
    if(score > 10){speed = speed - 100;}
    if(score > 20){speed = speed - 150;}
    if(score > 50){speed = speed - 250;}
}, 2000);

function seNaoTiverFrutaNaTelaGerarFruta(){
    var encontrei = false;
    for(var i=0; i < totalElementos; i++){
        if(table.children[i].classList[0] == 'table'){
            if(table.children[i].style.backgroundColor == fruitColor){
                encontrei = true;
            }
        }
    }
    if(encontrei == false){
        dropFruits();
    }
}

function runUp(currentNumber){
    for(var i=0; i < totalElementos; i++){
        try {
            if(table.children[i].textContent == currentNumber){
                if(table.children[i-(columns+1)].classList[0] == 'table'){
                    if(table.children[i-(columns+1)].style.backgroundColor == fruitColor){
                        score++;
                        console.log("SCORE: "+ score);
                        table.children[i-(columns+1)].style.backgroundColor = snakeColor;
                        rabo.push(i-(columns+1));
                        table.children[i].style.backgroundColor = backgroundColorTable;
                        dropFruits();
                    }else{
                        if(table.children[i-(columns+1)].style.backgroundColor == fruitColor){
                            clearInterval( runUpInterval );
                            alert("Fim de Jogo!!");
                            window.location.reload();
                        }else{
                            table.children[i-(columns+1)].style.backgroundColor = snakeColor;
                            rabo.push(i-(columns+1));
                            table.children[i].style.backgroundColor = backgroundColorTable;
                        }
                    }
                }else{
                    console.log("movimento invalido para cima");
                    
                }
            }
        } catch (error) {
            console.log("movimento invalido para cima");
            clearInterval( runUpInterval );
            alert("Fim de Jogo!!");
            window.location.reload();
        }
        
    } 
}

function runDown(currentNumber){
    for(var i=0; i < totalElementos; i++){
        if(table.children[i].textContent == currentNumber){
            try {
                if(table.children[i+columns+1].classList[0] == 'table'){
                    if(table.children[i+columns+1].style.backgroundColor == fruitColor){
                        score++;
                        console.log("SCORE: "+ score);
                        table.children[i+columns+1].style.backgroundColor = snakeColor;
                        rabo.push(i+columns+1);
                        table.children[i].style.backgroundColor = backgroundColorTable;
                        dropFruits();
                    }else{
                        if(table.children[i+columns+1].style.backgroundColor == snakeRaboColor){
                            clearInterval( runDownInterval );
                            alert("Fim de Jogo!!");
                            window.location.reload();
                        }else{
                            table.children[i+columns+1].style.backgroundColor = snakeColor;
                            rabo.push(i+columns+1);
                            table.children[i].style.backgroundColor = backgroundColorTable;
                        }
                    }
                }else{
                    console.log("movimento invalido para baixo");
                }
            } catch (error) {
                console.log("movimento invalido para baixo");
                clearInterval( runDownInterval );
                alert("Fim de Jogo!!");
                window.location.reload();
            }
            
        }
    } 
}

function runLeft(currentNumber){
    for(var i=0; i < totalElementos; i++){
        if(table.children[i].textContent == currentNumber){
            if(table.children[i-1].classList[0] == 'table'){
                if(table.children[i-1].style.backgroundColor == fruitColor){
                    score++;
                    console.log("SCORE: "+ score);
                    table.children[i-1].style.backgroundColor = snakeColor;
                    rabo.push(i-1);
                    table.children[i].style.backgroundColor = backgroundColorTable;
                    dropFruits()
                }else{
                    if(table.children[i-1].style.backgroundColor == snakeRaboColor){
                        clearInterval( runLeftInterval );
                        alert("Fim de Jogo!!");
                        window.location.reload();
                    }else{
                        table.children[i-1].style.backgroundColor = snakeColor;
                        rabo.push(i-1);
                        table.children[i].style.backgroundColor = backgroundColorTable;
                    }
                }
            }else{
                console.log("movimento invalido para esquerda");
                clearInterval( runLeftInterval );
                alert("Fim de Jogo!!");
                window.location.reload();
            }
        }
    } 
}

function runRight(currentNumber){
    for(var i=0; i < totalElementos; i++){
        if(table.children[i].textContent == currentNumber){
            if(table.children[i+1].classList[0] == 'table'){
                if(table.children[i+1].style.backgroundColor == fruitColor){
                    score++;
                    console.log("SCORE: "+ score);
                    table.children[i+1].style.backgroundColor = snakeColor;
                    rabo.push(i+1);
                    table.children[i].style.backgroundColor = backgroundColorTable;
                    dropFruits();
                }else{
                    if(table.children[i+1].style.backgroundColor == snakeRaboColor){
                        clearInterval( runRightInterval );
                        alert("Fim de Jogo!!");
                        window.location.reload();
                    }else{
                        table.children[i+1].style.backgroundColor = snakeColor;
                        rabo.push(i+1);
                        table.children[i].style.backgroundColor = backgroundColorTable;
                    }
                }
            }else{
                console.log("movimento invalido para direita");
                clearInterval( runRightInterval );
                alert("Fim de Jogo!!");
                window.location.reload();
            }
        }
    } 
}
//iniciar em determinada posicao
function startIn(positionNumber){
    for(var i=0; i < totalElementos; i++){
        if(table.children[i].textContent == positionNumber){
            table.children[i].style.backgroundColor = snakeColor;
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

//iniciando em posicao randomica do tabuleiro
startIn(getRandomInt(0, data.length))


function dropFruits(){
    let numeroSorteado = getRandomInt(0, data.length);
    for(var i=0; i < totalElementos; i++){
        if(table.children[i].textContent == numeroSorteado){
            if(table.children[i].style.backgroundColor == snakeColor){
                dropFruits();
            }else{
                if(table.children[i].style.backgroundColor == snakeRaboColor){
                    dropFruits();
                }else{
                    table.children[i].style.backgroundColor = fruitColor;
                }
            }
            
        }
    }
}
dropFruits()
