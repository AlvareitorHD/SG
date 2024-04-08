import * as THREE from '../libs/three.module.js'
 
class Peon extends THREE.Object3D {

  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    this.createPerfil();
    this.createPeon();
    this.rot = 0;
  }

  createPerfil(){
    var shape = new THREE.Shape();
    shape.moveTo(0.0001,0);
    shape.lineTo(1,0);
    shape.lineTo(1,0.2);
    shape.quadraticCurveTo(0.5,0.5,0.4,2);
    shape.bezierCurveTo(0.75,2.25,0.75,2.75,0.0001,2.75);
    this.perfil = shape.extractPoints().shape;
  }
  createPeon(){
    var latheGeometry = new THREE.LatheGeometry(this.perfil , 3 , 0 , Math.PI * 2);
    var mat = new THREE.MeshStandardMaterial({color: 0xFF0000, flatShading: true, side:THREE.DoubleSide});
    this.peon = new THREE.Mesh(latheGeometry,mat);
    this.peon.position.y= -0.5;
    this.add(this.peon);
  }

  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
      //controles peon
      sizeX : 1.0,
      sizeY : 1.0,
      sizeZ : 1.0,
      
      rotX : 0.0,
      rotY : 0.0,
      rotZ : 0.0,
      
      posX : 0.0,
      posY : 0.0,
      posZ : 0.0,

      res: 3,
      angulo: 0.1,
      ani: false,
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

        this.guiControls.res = 3;
        this.guiControls.angulo = 0.1;
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
    
    //foldercubo.add (this.guiControls, 'rotX', 0.0, Math.PI/2, 0.01).name ('Rotación X : ').listen();
    //foldercubo.add (this.guiControls, 'rotY', 0.0, Math.PI/2, 0.01).name ('Rotación Y : ').listen();
    //foldercubo.add (this.guiControls, 'rotZ', 0.0, Math.PI/2, 0.01).name ('Rotación Z : ').listen();
    
    folder.add (this.guiControls, 'res', 3, 15, 1).name ('Resolución : ').listen();

    folder.add (this.guiControls, 'angulo', 0.00, Math.PI*2, 0.1).name ('Ángulo : ').listen();
    //folder.add (this.guiControls, 'posX', -20.0, 20.0, 0.01).name ('Posición X : ').listen();
    //folder.add (this.guiControls, 'posY', 0.0, 10.0, 0.01).name ('Posición Y : ').listen();
    //folder.add (this.guiControls, 'posZ', -20.0, 20.0, 0.01).name ('Posición Z : ').listen();
    folder.add(this.guiControls,'ani').name('Animar: ').listen();
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }
  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    if(this.peon.geometry.parameters.segments != this.guiControls.res ||
      this.peon.geometry.parameters.phiLength != this.guiControls.angulo){
        this.peon.geometry.dispose();
        this.peon.geometry = new THREE.LatheGeometry(this.perfil, this.guiControls.res, 0, this.guiControls.angulo);
      }
      this.peon.scale.set(this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
      if(this.guiControls.ani){
        this.rot += 0.01;
        this.peon.rotation.set(this.rot,this.rot,this.rot);
      }
    }
}

export { Peon};