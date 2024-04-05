import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class Taza extends THREE.Object3D {

  constructor(gui,titleGui) {
    super();
    
    this.createGUI(gui,titleGui);

    var mat = new THREE.MeshNormalMaterial();

    var cilExt = new THREE.CylinderGeometry(5,5,10,24,1);
    var cilInt = new THREE.CylinderGeometry(4.7,4.7,10,24,1);

    var torog = new THREE.TorusGeometry(3,0.5,24,24);

    cilInt.translate(0,0.3,0);
    torog.translate(-5,0,0);

    var cile = new THREE.Mesh(cilExt,mat);
    var cili = new THREE.Mesh(cilInt,mat);
    var toro = new THREE.Mesh(torog,mat);

    var csg = new CSG();
    csg.union([cile,toro]);
    csg.subtract([cili]);

    this.taza = csg.toMesh();
    this.taza.geometry.scale(0.2,0.2,0.2);
    this.add(this.taza);
  }

  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
      //controles CUBO
      sizeX : 1.0,
      sizeY : 1.0,
      sizeZ : 1.0,
      
      rotX : 0.0,
      rotY : 0.0,
      rotZ : 0.0,
      
      posX : 0.0,
      posY : 0.0,
      posZ : 0.0,
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      reset : () => {
        //CUBO
        this.guiControls.sizeX = 1.0;
        this.guiControls.sizeY = 1.0;
        this.guiControls.sizeZ = 1.0;
        
        this.guiControls.rotX = 0.0;
        this.guiControls.rotY = 0.0;
        this.guiControls.rotZ = 0.0;
        
        this.guiControls.posX = 0.0;
        this.guiControls.posY = 0.0;
        this.guiControls.posZ = 0.0;
      }
    } 
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'sizeX', 0.1, 5.0, 0.01).name ('Tamaño X : ').listen();
    folder.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.01).name ('Tamaño Y : ').listen();
    folder.add (this.guiControls, 'sizeZ', 0.1, 5.0, 0.01).name ('Tamaño Z : ').listen();
    
    //folder.add (this.guiControls, 'rotX', 0.0, Math.PI/2, 0.01).name ('Rotación X : ').listen();
    //folder.add (this.guiControls, 'rotY', 0.0, Math.PI/2, 0.01).name ('Rotación Y : ').listen();
    //folder.add (this.guiControls, 'rotZ', 0.0, Math.PI/2, 0.01).name ('Rotación Z : ').listen();
    
    folder.add (this.guiControls, 'posX', -20.0, 20.0, 0.01).name ('Posición X : ').listen();
    folder.add (this.guiControls, 'posY', 0.0, 10.0, 0.01).name ('Posición Y : ').listen();
    folder.add (this.guiControls, 'posZ', -20.0, 20.0, 0.01).name ('Posición Z : ').listen();
    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }
  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    //this.guiControls.rotX +=0.01;
    this.guiControls.rotY +=0.01;
    //this.guiControls.rotZ +=0.01;
    this.taza.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
    this.taza.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
    this.taza.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
  }
}

class Tuerca extends THREE.Object3D {

  constructor(gui,titleGui) {
    super();
    
    this.createGUI(gui,titleGui);

    var mat = new THREE.MeshNormalMaterial();

    var base = new THREE.CylinderGeometry(1,1,0.5,6,1);
    var agujero = new THREE.CylinderGeometry(0.5,0.5,1,24,1);
    agujero.translate(0,-0.1,0);

    var csg = new CSG();

    var baseg = new THREE.Mesh(base,mat);
    var agug = new THREE.Mesh(agujero,mat);
    csg.union([baseg]);
    csg.subtract([agug]);
    this.tuerca = csg.toMesh();
    this.add(this.tuerca);

  }

  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
      //controles CUBO
      sizeX : 1.0,
      sizeY : 1.0,
      sizeZ : 1.0,
      
      rotX : 0.0,
      rotY : 0.0,
      rotZ : 0.0,
      
      posX : 0.0,
      posY : 0.0,
      posZ : 0.0,
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      reset : () => {
        //CUBO
        this.guiControls.sizeX = 1.0;
        this.guiControls.sizeY = 1.0;
        this.guiControls.sizeZ = 1.0;
        
        this.guiControls.rotX = 0.0;
        this.guiControls.rotY = 0.0;
        this.guiControls.rotZ = 0.0;
        
        this.guiControls.posX = 0.0;
        this.guiControls.posY = 0.0;
        this.guiControls.posZ = 0.0;
      }
    } 
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'sizeX', 0.1, 5.0, 0.01).name ('Tamaño X : ').listen();
    folder.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.01).name ('Tamaño Y : ').listen();
    folder.add (this.guiControls, 'sizeZ', 0.1, 5.0, 0.01).name ('Tamaño Z : ').listen();
    
    //folder.add (this.guiControls, 'rotX', 0.0, Math.PI/2, 0.01).name ('Rotación X : ').listen();
    //folder.add (this.guiControls, 'rotY', 0.0, Math.PI/2, 0.01).name ('Rotación Y : ').listen();
    //folder.add (this.guiControls, 'rotZ', 0.0, Math.PI/2, 0.01).name ('Rotación Z : ').listen();
    
    folder.add (this.guiControls, 'posX', -20.0, 20.0, 0.01).name ('Posición X : ').listen();
    folder.add (this.guiControls, 'posY', 0.0, 10.0, 0.01).name ('Posición Y : ').listen();
    folder.add (this.guiControls, 'posZ', -20.0, 20.0, 0.01).name ('Posición Z : ').listen();
    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }
  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    //this.guiControls.rotX +=0.01;
    this.guiControls.rotY +=0.01;
    //this.guiControls.rotZ +=0.01;
    this.tuerca.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
    this.tuerca.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
    this.tuerca.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
  }
}

class Prueba extends THREE.Object3D {

  constructor(gui,titleGui) {
    super();
    
    this.createGUI(gui,titleGui);

    var mat1 = new THREE.MeshStandardMaterial({color: 0xFF0000});
    var mat2 = new THREE.MeshStandardMaterial({color: 0x0000FF});

    var cg = new THREE.BoxGeometry(1,1,1);
    var sg = new THREE.SphereGeometry(0.65);

    var c1 = new THREE.Mesh( new THREE.CylinderGeometry(0.3,0.3,1.5,24,1),mat1);
    var c2g = new THREE.CylinderGeometry(0.3,0.3,1.5,24,1);
    c2g.rotateX(Math.PI/2);
    var c2 = new THREE.Mesh(c2g,mat1);
    var c3 =new THREE.Mesh( new THREE.CylinderGeometry(0.3,0.3,1.5,24,1),mat1);
    c3.rotateZ(Math.PI/2);
    var cc = new CSG();
    cc.union([c1,c2,c3]);

    var corte = cc.toMesh();

    var cube = new THREE.Mesh(cg,mat1);
    var sphere = new THREE.Mesh(sg,mat2);

    var csg = new CSG();
    csg.intersect([cube,sphere]);
    csg.subtract([corte]);
    this.prueba = csg.toMesh();
    this.add(this.prueba);

    this.position.set(2,0,0);
  }

  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
      //controles CUBO
      sizeX : 1.0,
      sizeY : 1.0,
      sizeZ : 1.0,
      
      rotX : 0.0,
      rotY : 0.0,
      rotZ : 0.0,
      
      posX : 0.0,
      posY : 0.0,
      posZ : 0.0,
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      reset : () => {
        //CUBO
        this.guiControls.sizeX = 1.0;
        this.guiControls.sizeY = 1.0;
        this.guiControls.sizeZ = 1.0;
        
        this.guiControls.rotX = 0.0;
        this.guiControls.rotY = 0.0;
        this.guiControls.rotZ = 0.0;
        
        this.guiControls.posX = 0.0;
        this.guiControls.posY = 0.0;
        this.guiControls.posZ = 0.0;
      }
    } 
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'sizeX', 0.1, 5.0, 0.01).name ('Tamaño X : ').listen();
    folder.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.01).name ('Tamaño Y : ').listen();
    folder.add (this.guiControls, 'sizeZ', 0.1, 5.0, 0.01).name ('Tamaño Z : ').listen();
    
    //folder.add (this.guiControls, 'rotX', 0.0, Math.PI/2, 0.01).name ('Rotación X : ').listen();
    //folder.add (this.guiControls, 'rotY', 0.0, Math.PI/2, 0.01).name ('Rotación Y : ').listen();
    //folder.add (this.guiControls, 'rotZ', 0.0, Math.PI/2, 0.01).name ('Rotación Z : ').listen();
    
    folder.add (this.guiControls, 'posX', -20.0, 20.0, 0.01).name ('Posición X : ').listen();
    folder.add (this.guiControls, 'posY', 0.0, 10.0, 0.01).name ('Posición Y : ').listen();
    folder.add (this.guiControls, 'posZ', -20.0, 20.0, 0.01).name ('Posición Z : ').listen();
    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }
  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    //this.guiControls.rotX +=0.01;
    this.guiControls.rotY +=0.01;
    //this.guiControls.rotZ +=0.01;
    this.prueba.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
    this.prueba.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
    this.prueba.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
  }
}

export { Taza, Tuerca, Prueba };