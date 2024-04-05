import * as THREE from '../libs/three.module.js'
 
class Cubo extends THREE.Object3D {

  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    this.createCubo();
  }

  createCubo(){
    
    // Un Mesh se compone de geometría y material
    var boxGeom = new THREE.BoxGeometry (1,1,1);
    // Como material se crea uno a partir de un color
    var boxMat = new THREE.MeshStandardMaterial({color: 0xCF0000});
    // Ya podemos construir el Mesh
    this.box = new THREE.Mesh (boxGeom, boxMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.box);
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura

    this.axis = new THREE.AxesHelper (1.0);
    this.add (this.axis);
    this.position.y = 0.5;
    this.position.x = 1.0;
    this.scale.set(0.5,0.5,0.5);
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
    var foldercubo = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    foldercubo.add (this.guiControls, 'sizeX', 0.1, 5.0, 0.01).name ('Tamaño X : ').listen();
    foldercubo.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.01).name ('Tamaño Y : ').listen();
    foldercubo.add (this.guiControls, 'sizeZ', 0.1, 5.0, 0.01).name ('Tamaño Z : ').listen();
    
    //foldercubo.add (this.guiControls, 'rotX', 0.0, Math.PI/2, 0.01).name ('Rotación X : ').listen();
    //foldercubo.add (this.guiControls, 'rotY', 0.0, Math.PI/2, 0.01).name ('Rotación Y : ').listen();
    //foldercubo.add (this.guiControls, 'rotZ', 0.0, Math.PI/2, 0.01).name ('Rotación Z : ').listen();
    
    foldercubo.add (this.guiControls, 'posX', -20.0, 20.0, 0.01).name ('Posición X : ').listen();
    foldercubo.add (this.guiControls, 'posY', 0.0, 10.0, 0.01).name ('Posición Y : ').listen();
    foldercubo.add (this.guiControls, 'posZ', -20.0, 20.0, 0.01).name ('Posición Z : ').listen();
    
    foldercubo.add (this.guiControls, 'reset').name ('[ Reset ]');
  }
  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    this.guiControls.rotX +=0.01;
    this.guiControls.rotY +=0.01;
    this.guiControls.rotZ +=0.01;
    this.box.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
    this.box.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
    this.box.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
  }
}

class Cono extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde al cono
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    this.createCono();
  }
  createCono(){
    var conoGeom = new THREE.ConeGeometry(0.5,1,3);
    var conoMat = new THREE.MeshStandardMaterial({color: 0xCF0000});
    this.cone = new THREE.Mesh(conoGeom,conoMat);
    this.add(this.cone);

    this.axis = new THREE.AxesHelper (1.0);
    this.add (this.axis);
    this.position.x = -2.0;
  }

  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
      
      //controles CONO
      nradio : 0.5,
      naltura : 1.0,
      nres : 3,
            
      nrotX : 0.0,
      nrotY : 0.0,
      nrotZ : 0.0,

      reset: () => {
        this.guiControls.nradio = 0.5;
        this.guiControls.naltura = 1.0;
        this.guiControls.nres = 3;
              
        this.guiControls.nrotX = 0.0;
        this.guiControls.nrotY = 0.0;
        this.guiControls.nrotZ = 0.0;
      }
    }

    // Se crea una sección para los controles del cono
    var foldercono = gui.addFolder(titleGui);
    
    foldercono.add(this.guiControls,'nradio',0.1,5.0,0.1).name('Radio: ').listen();
    foldercono.add (this.guiControls, 'naltura',0.1,5.0,0.1).name ('Altura: ').listen();
    foldercono.add (this.guiControls, 'nres',3,50,1).name ('Resolución: ').listen();
    foldercono.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  update () {
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    this.guiControls.nrotX +=0.01;
    this.guiControls.nrotY +=0.01;
    this.guiControls.nrotZ +=0.01;
    
    this.cone.scale.set(this.guiControls.nradio, this.guiControls.naltura, this.guiControls.nradio);
    this.cone.rotation.set (this.guiControls.nrotX,this.guiControls.nrotY,this.guiControls.nrotZ);
    //console.log(this.cone.geometry.parameters.radialSegments);
    if(this.guiControls.nres != this.cone.geometry.parameters.radialSegments){
      this.cone.geometry.dispose();
      this.cone.geometry = new THREE.ConeGeometry(0.5,1.0,this.guiControls.nres);
    }
  }

}

class Cilindro extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde al cono
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    this.createCilindro();
  }
  createCilindro(){
    var cilindroGeom = new THREE.CylinderGeometry(0.5,0.5,1,3);
    var cilindroMat = new THREE.MeshStandardMaterial({color: 0xAAFFFF, flatShading: true});
    this.cilindro = new THREE.Mesh(cilindroGeom,cilindroMat);
    this.add(this.cilindro);

    this.axis = new THREE.AxesHelper (1.0);
    this.add (this.axis);
    this.position.x = -2.0;
    this.position.y = -2.0;
  }

  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
      
      //controles CONO
      radioinf : 0.5,
      radiosup : 0.5,
      altura : 1.0,
      res : 3,
            
      nrotX : 0.0,
      nrotY : 0.0,
      nrotZ : 0.0,

      reset: () => {
        this.guiControls.radioinf = 0.5;
        this.guiControls.radiosup = 0.5;
        this.guiControls.altura = 1.0;
        this.guiControls.res = 3;
              
        this.guiControls.nrotX = 0.0;
        this.guiControls.nrotY = 0.0;
        this.guiControls.nrotZ = 0.0;
      }
    }

    // Se crea una sección para los controles del cono
    var foldercilindro = gui.addFolder(titleGui);
    
    foldercilindro.add(this.guiControls,'radioinf',0.1,5.0,0.1).name('Radio Inferior: ').listen();
    foldercilindro.add(this.guiControls,'radiosup',0.1,5.0,0.1).name('Radio Superior: ').listen();
    foldercilindro.add (this.guiControls, 'altura',0.1,5.0,0.1).name ('Altura: ').listen();
    foldercilindro.add (this.guiControls, 'res',3,50,1).name ('Resolución: ').listen();
    foldercilindro.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  update () {
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    this.guiControls.nrotX +=0.01;
    this.guiControls.nrotY +=0.01;
    this.guiControls.nrotZ +=0.01;
    
    this.cilindro.scale.set(1.0, this.guiControls.altura, 1.0);
    this.cilindro.rotation.set (this.guiControls.nrotX,this.guiControls.nrotY,this.guiControls.nrotZ);
    //console.log(this.cilindro.geometry.parameters);
    if(this.guiControls.radioinf != this.cilindro.geometry.parameters.radiusBottom ||
      this.guiControls.radiosup != this.cilindro.geometry.parameters.radiusTop ||
      this.guiControls.res != this.cilindro.geometry.parameters.radialSegments){
        this.cilindro.geometry.dispose();
        this.cilindro.geometry = new THREE.CylinderGeometry(this.guiControls.radiosup,this.guiControls.radioinf,1.0,this.guiControls.res);
      }
  }
}

class Esfera extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde al cono
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    this.createEsfera();
  }
  createEsfera(){
    var esferaGeom = new THREE.SphereGeometry(1.0,3,2)
    var esferaMat = new THREE.MeshStandardMaterial({color: 0x00FF00, flatShading: true});
    this.sphere = new THREE.Mesh(esferaGeom,esferaMat);
    this.add(this.sphere);

    this.axis = new THREE.AxesHelper (1.0);
    this.add (this.axis);
    this.position.x = -2.0;
    this.position.z = -2.0;
  }

  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
      
      //controles CONO
      radio: 0.5,
      resW: 3,
      resH : 2,
            
      nrotX : 0.0,
      nrotY : 0.0,
      nrotZ : 0.0,

      reset: () => {
        this.guiControls.radio = 0.5;
        this.guiControls.resW = 3;
        this.guiControls.resH = 2;
        this.guiControls.nrotX = 0.0;
        this.guiControls.nrotY = 0.0;
        this.guiControls.nrotZ = 0.0;
      }
    }

    // Se crea una sección para los controles del cono
    var folderesfera = gui.addFolder(titleGui);
    
    folderesfera.add(this.guiControls,'radio',0.1,5.0,0.1).name('Radio: ').listen();
    folderesfera.add (this.guiControls, 'resW',3,50,1).name ('ResoluciónEcuador: ').listen();
    folderesfera.add (this.guiControls, 'resH',2,50,1).name ('ResoluciónMeridiano: ').listen();
    folderesfera.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  update () {
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    this.guiControls.nrotX +=0.01;
    this.guiControls.nrotY +=0.01;
    this.guiControls.nrotZ +=0.01;
    
    this.sphere.scale.set(this.guiControls.radio, this.guiControls.radio,this.guiControls.radio);
    this.sphere.rotation.set (this.guiControls.nrotX,this.guiControls.nrotY,this.guiControls.nrotZ);
    if(this.guiControls.resH != this.sphere.geometry.parameters.heightSegments ||
      this.guiControls.resW != this.sphere.geometry.parameters.widthSegments){
        this.sphere.geometry.dispose();
        this.sphere.geometry = new THREE.SphereGeometry(1.0,this.guiControls.resW,this.guiControls.resH);
      }
  }
}

class Toro extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde al cono
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    this.createToro();
  }
  createToro(){
    var toroGeom = new THREE.TorusGeometry(1.0,0.2,3,3);
    var toroMat = new THREE.MeshNormalMaterial({flatShading: true});
    this.torus = new THREE.Mesh(toroGeom,toroMat);
    this.add(this.torus);

    this.axis = new THREE.AxesHelper (1.0);
    this.add (this.axis);
    this.position.x = -2.0;
    this.position.y = -1.0;
    this.position.z = 2.0;
  }

  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
      
      //controles CONO
      radiop: 1.0,
      radiot: 0.2,
      resp: 3,
      rest: 3,
            
      nrotX : 0.0,
      nrotY : 0.0,
      nrotZ : 0.0,

      reset: () => {
        this.guiControls.radiop = 1.0;
        this.guiControls.radiot = 0.2;
        this.guiControls.resp = 3;
        this.guiControls.rest = 3;

        this.guiControls.nrotX = 0.0;
        this.guiControls.nrotY = 0.0;
        this.guiControls.nrotZ = 0.0;
      }
    }

    // Se crea una sección para los controles del cono
    var foldertoro = gui.addFolder(titleGui);
    
    foldertoro.add(this.guiControls,'radiop',1.0,5.0,0.1).name('RadioPrincipal: ').listen();
    foldertoro.add(this.guiControls,'radiot',0.2,5.0,0.1).name('RadioTubo: ').listen();
    foldertoro.add (this.guiControls, 'resp',3,50,1).name ('ResPrincipal: ').listen();
    foldertoro.add (this.guiControls, 'rest',3,25,1).name ('ResTubo: ').listen();
    
    foldertoro.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  update () {
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    this.guiControls.nrotX +=0.01;
    this.guiControls.nrotY +=0.01;
    this.guiControls.nrotZ +=0.01;
    
    //this.torus.scale.set(this.guiControls.radiop, this.guiControls.radiop,this.guiControls.radiop);
    this.torus.rotation.set (this.guiControls.nrotX,this.guiControls.nrotY,this.guiControls.nrotZ);
    if(this.guiControls.resp != this.torus.geometry.parameters.radialSegments ||
      this.guiControls.rest != this.torus.geometry.parameters.tubularSegments ||
      this.guiControls.radiot != this.torus.geometry.parameters.tube ||
      this.guiControls.radiop != this.torus.geometry.parameters.radius){
        this.torus.geometry.dispose();
        this.torus.geometry = new THREE.TorusGeometry(this.guiControls.radiop,this.guiControls.radiot,this.guiControls.resp,this.guiControls.rest);
      }
  }
}

class Icosaedro extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde al cono
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    this.createIcosaedro();
  }
  createIcosaedro(){
    var icoGeom = new THREE.IcosahedronGeometry(0.5,0);
    var icoMat = new THREE.MeshNormalMaterial({flatShading: true});
    icoMat.needsUpdate = true;
    this.ico = new THREE.Mesh(icoGeom,icoMat);
    this.add(this.ico);

    this.axis = new THREE.AxesHelper (1.0);
    this.add (this.axis);
    this.position.x = 2.0;
    this.position.z = 2.0;
  }

  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
      
      radio: 0.5,
      sub: 0,
            
      nrotX : 0.0,
      nrotY : 0.0,
      nrotZ : 0.0,

      reset: () => {
        this.guiControls.radio = 0.5;
        this.guiControls.sub = 0;

        this.guiControls.nrotX = 0.0;
        this.guiControls.nrotY = 0.0;
        this.guiControls.nrotZ = 0.0;
      }
    }

    // Se crea una sección para los controles del cono
    var folderico = gui.addFolder(titleGui);
    
    folderico.add(this.guiControls,'radio',0.1,5.0,0.1).name('RadioPrincipal: ').listen();
    folderico.add(this.guiControls,'sub',0,3,1).name('Subdivisión: ').listen();
    
    folderico.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  update () {
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    this.guiControls.nrotX +=0.01;
    this.guiControls.nrotY +=0.01;
    this.guiControls.nrotZ +=0.01;
    
    this.ico.rotation.set (this.guiControls.nrotX,this.guiControls.nrotY,this.guiControls.nrotZ);
    if(this.guiControls.radio != this.ico.geometry.parameters.radius ||
      this.guiControls.sub != this.ico.geometry.parameters.detail){
        this.ico.geometry.dispose();
        this.ico.geometry = new THREE.IcosahedronGeometry(this.guiControls.radio,this.guiControls.sub);
      }
  }
}

export { Cubo, Cono, Cilindro, Esfera, Toro, Icosaedro };