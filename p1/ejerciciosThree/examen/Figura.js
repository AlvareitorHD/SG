import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class Figura extends THREE.Object3D {

  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    var shape = this.createShape();
    this.createExtrusion(shape);
  }
  // Crea el shape de la figura principal con su agujero
  createShape(){
    
    var shape = new THREE.Shape();
    shape.moveTo(-0.5,-0.1);
    shape.lineTo(0.5,-0.1);
    shape.lineTo(0.5,1);
    shape.lineTo(-0.2,1);
    shape.quadraticCurveTo(-0.5,1,-0.5,0);

    var agujero = new THREE.Shape();
    agujero.moveTo(0.1,0.2);
    agujero.quadraticCurveTo(0.3,0.2,0.3,0.4);
    agujero.quadraticCurveTo(0.3,0.6,0.1,0.6);
    agujero.quadraticCurveTo(-0.1,0.6,-0.1,0.4);
    agujero.quadraticCurveTo(-0.1,0.2,0.1,0.2);

    shape.holes.push(agujero);

    return shape;
  }

  // Crea la geometría para restarla al principal y así hacer el hueco
  createDif(){
    var shape = new THREE.Shape();
    shape.moveTo(-0.3,0.3);
    shape.quadraticCurveTo(-0.3,0.1,0,0.1);
    shape.quadraticCurveTo(0.3,0.1,0.3,0.3);
    shape.lineTo(0.3,5);
    shape.lineTo(-0.3,5);
    shape.lineTo(-0.3,0.3);
    
    var options = {depth: 2, steps:1 ,bevelEnabled:false};
    var geo = new THREE.ExtrudeGeometry(shape,options);
    return geo;
  }

  // Aquí se hace lo chido
  createExtrusion(shape){

    var options1 = { depth : 0.8 , steps : 5 , bevelEnabled : true,curveSegments:16,bevelSegments:10 };
    
    // Hacemos la geometría principal
    var romboGeo = new THREE.ExtrudeGeometry(shape, options1);
    romboGeo.translate(0,0,-0.4);
    var romboMat = new THREE.MeshNormalMaterial();
    var rombo = new THREE.Mesh(romboGeo, romboMat);
    
    // Caja para restarle  abajo y así dejar plana la base (sin bevel)
    var boxg = new THREE.BoxGeometry(5,1,5);
    boxg.translate(0,-0.5,0.1);
    var box = new THREE.Mesh(boxg,romboMat);

    //Hacer el hueco
    var sh = this.createDif();
    sh.scale(1.2,1,1);
    sh.rotateY(Math.PI/2);
    sh.rotateZ(Math.PI/20);
    sh.translate(-1,-0.1,0);
    var dif = new THREE.Mesh(sh,romboMat);
    //this.add(dif);

    //Agujero base
    var cg = new THREE.CylinderGeometry(0.2,0.0001,0.4);
    cg.scale(1,1,0.6);
    
    var cil = new THREE.Mesh(cg,romboMat);

    var csg = new CSG();
    csg.subtract([rombo,box,dif]);
    csg.subtract([cil]);
    this.rombo = csg.toMesh();
    
    this.add(this.rombo);
    //EJES:
    this.axis = new THREE.AxesHelper (1.0);
    this.add (this.axis);
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
    //this.guiControls.rotY +=0.01;
    //this.guiControls.rotZ +=0.01;
    this.rombo.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
    this.rombo.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
    this.rombo.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
  }
}

export { Figura };