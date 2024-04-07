
import * as THREE from 'three'

class Camion extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // El material se usa desde varios métodos. Por eso se alamacena en un atributo
    this.mat = new THREE.MeshStandardMaterial({color: 0xFF0000});
    // A la base no se accede desde ningún método. Se almacena en una variable local del constructor
    this.tam = 0.15;   // 15 cm de largo. Las unidades son metros
    var tamano = this.tam;
    this.primerpendulo = this.createPrimer(tamano);
    this.primerpendulo.position.y = -0.045;
    this.prinpendulo = this.createPrin(tamano);
    // Al nodo  this, la grapadora, se le cuelgan como hijos la base y la parte móvil
    //this.add (base);
    this.add (this.primerpendulo);
    this.add(this.prinpendulo);

  }
  
  createPrimer(tam){
    var primer = new THREE.Object3D();
    
    var m1 = new THREE.MeshStandardMaterial({color: 0x00AAAA});
    var boxg = new THREE.BoxGeometry(tam*0.5,tam*2,tam*0.1);
    boxg.translate(0,-tam,0);
    this.box = new THREE.Mesh(boxg,m1);
    var ci = new THREE.Mesh(new THREE.CylinderGeometry(tam*0.1,tam*0.1,tam*0.1,24,1),this.verde);

    this.box.position.y = tam*0.2;
    ci.rotateX(Math.PI/2);
    ci.position.z += tam*0.1;

    primer.add(this.box);
    primer.add(ci);
    primer.scale.set(0.5,0.5,0.5);
    primer.position.z += tam*0.1;
    return primer;
  }

  createPrin(tam){
    var principal = new THREE.Object3D();
    
    var m1 = new THREE.MeshStandardMaterial({color: 0x00AA00});
    var m2 = new THREE.MeshStandardMaterial({color: 0xAA00AA});
    var m3 = new THREE.MeshStandardMaterial({color: 0xFF0000});
    

    var pen1 = new THREE.Mesh(new THREE.BoxGeometry(tam/2,tam/2,tam*0.16),m1);

    var pen2g = new THREE.BoxGeometry(tam/2,tam/2,tam*0.16);
    pen2g.translate(0,-tam/4,0);
    this.pen2 = new THREE.Mesh(pen2g,m3);
    this.pen2.position.y = -tam/4;
    
    var pen3g = new THREE.BoxGeometry(tam/2,tam/2,tam*0.16);
    pen3g.translate(0,-tam/4,0);
    this.pen3 = new THREE.Mesh(pen3g,m1);
    this.pen3.position.y = -tam*0.75;

    var ci = new THREE.Mesh(new THREE.CylinderGeometry(tam*0.15,tam*0.15,tam*0.1,16,1),m2);
    ci.rotateX(Math.PI/2);
    ci.position.z += tam*0.1;
    principal.add(pen1);
    principal.add(this.pen2);
    principal.add(this.pen3);
    principal.add(ci);
    return principal;
  }

  
  createGUI (gui,titleGui) {
    // Controles para el movimiento de la parte móvil
    this.guiControls = {
      rotacion : 0,
      rotaciont: 0,
      dim: 10,
      dimp:10,
      des:0.1,
    } 
    
    // Se crea una sección para los controles de la caja
    var folder1 = gui.addFolder (titleGui);
    folder1.add (this.guiControls, 'rotaciont', -0.8, 0.8, 0.01)
      .name ('Apertura : ')
      .onChange ( (value) => this.setAng (-value) );

      folder1.add(this.guiControls, 'dimp',10,20,1).name('Dimension: ').onChange((d) => this.setDimp(d));

    var folder2 = gui.addFolder ("Controles péndulo secundario");

    folder2.add(this.guiControls, 'des',0.1,0.9,0.1).name('Desplazamiento: ').onChange((d) => this.setPen(d));
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    folder2.add (this.guiControls, 'rotacion', -0.8, 0.8, 0.01)
      .name ('Apertura : ')
      .onChange ( (value) => this.setAngulo (-value) );

    folder2.add(this.guiControls, 'dim',10,20,1).name('Dimension: ').onChange((d) => this.setDim(d));
  }
  
  setAng(valor){
    this.rotation.z = valor;
  }
  setAngulo (valor) {
    this.primerpendulo.rotation.z = valor;
  }
  setDim(d) {
    this.box.scale.y = d/10;
    console.log(this.box.position.y);
}
setDimp(d) {
  this.pen2.scale.y = d/10;
  //console.log("PEN3: "+this.pen2.geometry.parameters.height*d/10);
  //altura*escala+tam/4
  this.pen3.position.y = -(this.pen2.geometry.parameters.height*d/10)-this.tam/4;
  this.primerpendulo.position.y = -(this.pen2.geometry.parameters.height*d/10);
}
setPen(d){
// Calcular la altura permitida para pen2
var pen2Height = this.pen2.geometry.parameters.height;

// Calcular la nueva posición Y para primerpendulo dentro del rango de alturas de pen2
var newPositionY = pen2Height * d*this.guiControls.dimp/10;

// Establecer la nueva posición Y para primerpendulo
this.primerpendulo.position.y = -this.tam/4 - newPositionY;
//console.log(this.primerpendulo.position.y);
}
  update () {
    // No hay nada que actualizar ya que la apertura de la grapadora se ha actualizado desde la interfaz
  }
}

export { Pendulo }
