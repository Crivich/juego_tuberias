var canvas = document.getElementById("canv");
var c = canvas.getContext("2d");

class jugador 
{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 40;
        this.h = 40;
        this.ySpeed = 3;
    }
    mostrar() {
        c.fillStyle = 'green';
        c.fillRect(this.x, this.y, this.w, this.h);
    }
    actualizar() {
        this.y += this.ySpeed;
        this.ySpeed += gravedad;
    }
}

class TuboSuperior 
{
    constructor(x, y) 
    {
        this.x = x;
        this.y = y;
        this.w = 40;
        this.h = Math.floor(Math.random() * 500) + 100;
        this.xSpeed = 1;
        
        this.needsAdd = true;
    }
    mostrar() 
    {
        c.fillStyle = 'red';
        c.fillRect(this.x, this.y, this.w, this.h);
    }
    actualizar() 
    {
        this.x -= this.xSpeed;
        
        if (p.x < this.x + this.w && p.x + p.w > this.x && p.y < this.y + this.h && p.y + p.h > this.y) {
            volar = false;
            for (let i = 0; i < tubosSuperiores.length; i++) {
                tubosSuperiores[i].xSpeed = 0;
                tubosInferiores[i].xSpeed = 0;
            }
        }
        //añadir puntaje
        if (p.x < this.x + this.w && p.x + p.w-10 > this.x && this.needsAdd) {
            puntaje++;
            this.needsAdd = false
        }
    }
}

class TuboInferior {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 40;
        this.h = 800;
        this.xSpeed = 1;
    }
    mostrar() {
        c.fillStyle = 'red';
        c.fillRect(this.x, this.y, this.w, this.h);
    }
    actualizar() {
        this.x -= this.xSpeed;
        
        if (p.x < this.x + this.w && p.x + p.w > this.x && p.y < this.y + this.h && p.y + p.h > this.y) {
            volar = false;
            for (let i = 0; i < tubosSuperiores.length; i++) {
                tubosSuperiores[i].xSpeed = 0;
                tubosInferiores[i].xSpeed = 0;
            }
        }
    }
}

var p;

var gravedad = 0.1;

var tubosSuperiores = [];
var tubosInferiores = [];
var tuboX = 800;

var puntaje = 0;

var volar = true;

window.onload = function() {
    empezar();
    setInterval(actualizar, 10);
}
//bucle de la cantidad de tubos a utilizar 
function empezar() {
    p = new jugador(400, 400);
    
    for (let i = 0; i < 50; i++) {
        var tp = new TuboSuperior(tuboX, 0);
        tubosSuperiores.push(tp);
        
        var bp = new TuboInferior(tuboX, tp.h+110);
        tubosInferiores.push(bp);
        
        tuboX+=300;
    }
}

function actualizar() {
    canvas.width=canvas.width;
    //jugador
    p.mostrar();
    p.actualizar();
    //suelo
    c.fillStyle = 'green';
    c.fillRect(0, 750, 800, 100);
    //techo
    c.fillRect(0, 0, 800, 50);
    //colisión con suelo y techo
    if (p.y >= 750-40) {
        location.reload();
    }
    if (p.y <= 0+40) {
        location.reload();
    }
    //tubos
    for (let i = 0; i < tubosSuperiores.length; i++) {
        tubosSuperiores[i].mostrar();
        tubosInferiores[i].mostrar();        
        tubosSuperiores[i].actualizar();
        tubosInferiores[i].actualizar();
    }
    //puntaje
    document.getElementById("mostrarPuntaje").innerHTML = "puntaje: "+ puntaje;
}

function teclaAbajo(e) {
    if (volar) {
        p.ySpeed = -3;
    }
}

document.onkeydown = teclaAbajo;
