
import * as THREE from 'three'

class Pendulo extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // El material se usa desde varios métodos. Por eso se alamacena en un atributo
    this.material = new THREE.MeshStandardMaterial({color: 0xCF0000});
    this.verde = new THREE.MeshStandardMaterial({color: 0x00CF00});
    // A la base no se accede desde ningún método. Se almacena en una variable local del constructor
    this.tam = 0.15;   // 15 cm de largo. Las unidades son metros
    var tamano = this.tam;
    this.primerpendulo = this.createPrimer(tamano);
    this.prinpendulo = this.createPrin(tamano);
    // Al nodo que contiene la transformación interactiva que abre y cierra la grapadora se accede desde el método update, se almacena en un atributo.
    this.movil = this.createMovil(tamano);
    
    // Al nodo  this, la grapadora, se le cuelgan como hijos la base y la parte móvil
    //this.add (base);
    this.add (this.primerpendulo);
    this.add(this.prinpendulo);

  }
  
  createPrimer(tam){
    var primer = new THREE.Object3D();
    
    var m1 = new THREE.MeshStandardMaterial({color: 0x00AAAA});
    this.box = new THREE.Mesh(new THREE.BoxGeometry(tam*0.5,tam*2,tam*0.1),m1);
    var ci = new THREE.Mesh(new THREE.CylinderGeometry(tam*0.1,tam*0.1,tam*0.1,24,1),this.verde);

    this.box.position.y -= tam*0.8;
    ci.rotateX(Math.PI/2);
    ci.position.z += tam*0.1;

    primer.add(this.box);
    primer.add(ci);
    primer.scale.set(0.5,0.5,0.5);
    primer.position.z += tam*0.1;
    return primer;
  }

  createPrin(tam){
    var primer = new THREE.Object3D();
    
    var m1 = new THREE.MeshStandardMaterial({color: 0x00AA00});
    var m2 = new THREE.MeshStandardMaterial({color: 0xAA00AA});

    
    this.pen = new THREE.Mesh(new THREE.BoxGeometry(tam/2,tam/2,tam*0.16),m1);
    var ci = new THREE.Mesh(new THREE.CylinderGeometry(tam*0.15,tam*0.15,tam*0.1,16,1),m2);
    ci.rotateX(Math.PI/2);
    ci.position.z += tam*0.1;
    primer.add(this.pen);
    primer.add(ci);
    return primer;
  }

  createBase(tama) {
    // El nodo del que van a colgar la caja y los 2 conos y que se va a devolver
    var base = new THREE.Object3D();
    // Cada figura, un Mesh, está compuesto de una geometría y un material
    var cajaBase = new THREE.Mesh (new THREE.BoxGeometry (tama,tama*0.08,tama*0.2), this.material);
    cajaBase.position.y = tama*0.04;
    // La componente geometría se puede compartir entre varios meshes
    var geometriaPivote = new THREE.ConeGeometry (tama*0.05, tama*0.12);
    var pivote1 = new THREE.Mesh (geometriaPivote, this.material);
    var pivote2 = new THREE.Mesh (geometriaPivote, this.material);
    // Se posicionan los pivotes con respecto a la base
    pivote1.position.set (tama*0.45, tama*0.14, tama*0.05);
    pivote2.position.set (tama*0.45, tama*0.14, -tama*0.05);
    base.add(cajaBase);
    base.add(pivote1);
    base.add(pivote2);
    return base;
  }
  
  createGUI (gui,titleGui) {
    // Controles para el movimiento de la parte móvil
    this.guiControls = {
      rotacion : 0,
      rotaciont: 0,
      dim: 10,
    } 
    
    // Se crea una sección para los controles de la caja
    var folder1 = gui.addFolder ("Controles péndulo");
    folder1.add (this.guiControls, 'rotaciont', -0.8, 0.8, 0.01)
      .name ('Apertura : ')
      .onChange ( (value) => this.setAng (-value) );
    var folder2 = gui.addFolder ("Controles péndulo secundario");
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    folder2.add (this.guiControls, 'rotacion', -0.8, 0.8, 0.01)
      .name ('Apertura : ')
      .onChange ( (value) => this.setAngulo (-value) );

    folder2.add(this.guiControls, 'dim',10,20,1).name('Dimension: ').onChange((d) => this.setDim(d));
  }
  
  createMovil (tama) {
    // Se crea la parte móvil
    var cajaMovil = new THREE.Mesh (
        new THREE.BoxGeometry (tama, tama*0.12, tama*0.2),
        this.material
    );
    cajaMovil.position.set (-tama*0.45, tama*0.06, 0);
    
    var movil = new THREE.Object3D();
    // IMPORTANTE: Con independencia del orden en el que se escriban las 2 líneas siguientes, SIEMPRE se aplica primero la rotación y después la traslación. Prueba a intercambiar las dos líneas siguientes y verás que no se produce ningún cambio al ejecutar.    
    movil.rotation.z = this.guiControls.rotacion;
    movil.position.set(tama*0.45,tama*0.2,0);
    movil.add(cajaMovil);
    return movil;
  }
  setAng(valor){
    this.rotation.z = valor;
  }
  setAngulo (valor) {
    this.primerpendulo.rotation.z = valor;
  }
  setDim(d) {
    this.box.scale.y = d/10;
    //console.log(this.box.scale.y);
    this.box.position.y = -(this.box.scale.y * this.tam);
    this.box.position.y += this.tam*0.2;
    console.log(this.box.position.y);
}

  update () {
    // No hay nada que actualizar ya que la apertura de la grapadora se ha actualizado desde la interfaz
  }
}

export { Pendulo }
