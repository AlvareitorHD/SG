import * as THREE from '../libs/three.module.js'
 
class Rombo extends THREE.Object3D {

  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    var shape = this.createShape();
    this.createExtrusion(shape);
  }

  createShape(){
    
    var shape = new THREE.Shape();
    shape.moveTo(0,-1);
    shape.lineTo(0.5,0);
    shape.lineTo(0,1);
    shape.lineTo(-0.5,0);
    shape.lineTo(0,-1);

    
    return shape;
  }
  createExtrusion(shape){
    var options1 = { depth: 1, bevelEnable:false }; // Ajustar la profundidad a 0.05
    var romboGeo = new THREE.ExtrudeGeometry(shape, options1);
    //romboGeo.scale(1,1,0.2);
    var romboMat = new THREE.MeshStandardMaterial({color: 0x00FF00, flatShading: true}); //new THREE.MeshNormalMaterial({ flatShading: false });
    this.rombo = new THREE.Mesh(romboGeo, romboMat);
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
    this.guiControls.rotY +=0.01;
    //this.guiControls.rotZ +=0.01;
    this.rombo.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
    this.rombo.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
    this.rombo.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
  }
}

class Trebol extends THREE.Object3D {

  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    var shape = this.createShape();
    this.createExtrusion(shape);
  }

  createShape(){
    
    var shape = new THREE.Shape();
    shape.moveTo(-0.5, -0.5);
    shape.lineTo(0.5, -0.5);
    shape.lineTo(0.5, -0.4);
    shape.bezierCurveTo(0.2, -0.35, 0.2, -0.15, 0.5, 0);
    shape.bezierCurveTo(1.2, 0.6, 0.2, 0.6, 0.2, 0.25); // Ajuste del punto final del primer bezier
    shape.quadraticCurveTo(0.1, 1, -0.2, 0.25); // Ajuste del quadratic curve
    shape.bezierCurveTo(-0.2, 0.6, -1.2, 0.6, -0.5, 0); // Ajuste del punto inicial del último bezier
    shape.bezierCurveTo(-0.2, -0.15, -0.2, -0.35, -0.5, -0.4);
    shape.lineTo(-0.5, -0.5);

    
    return shape;
  }
  generarTornillo(numeroVueltas, altura, radioTornillo) {
    const puntos = [];
    const pasoAngular = Math.PI / 24; // Ajusta el paso angular según la resolución deseada

    for (let t = 0; t <= numeroVueltas * 2 * Math.PI; t += pasoAngular) {
        const x = radioTornillo * Math.cos(t);
        const y = t * altura / (numeroVueltas * 2 * Math.PI);
        const z = radioTornillo * Math.sin(t);
        puntos.push(new THREE.Vector3(x, y, z));
    }

    return puntos;
}

getPathFromTorusKnot (torusKnot) {
  // La codificación de este método está basado
  //   en el código fuente de la página oficial de Three.js
  // https://github.com/mrdoob/three.js/blob/master/src/geometries/TorusKnotGeometry.js
  const p = torusKnot.parameters.p;
  const q = torusKnot.parameters.q;
  const radius = torusKnot.parameters.radius;
  const resolution = torusKnot.parameters.tubularSegments;
  var u, cu, su, quOverP, cs;
  var x,y,z;
  // En  points  se almacenan los puntos que extraemos del torusKnot
  const points = [];
  for ( let i = 0; i < resolution; ++ i ) {
    u = i / resolution * p * Math.PI * 2;
    cu = Math.cos( u );
    su = Math.sin( u );
    quOverP = q / p * u;
    cs = Math.cos( quOverP );

    x = radius * ( 2 + cs ) * 0.5 * cu;
    y = radius * ( 2 + cs ) * su * 0.5;
    z = radius * Math.sin( quOverP ) * 0.5;

    points.push (new THREE.Vector3 (x,y,z));
  }
  // Una vez tenemos el array de puntos 3D construimos y devolvemos el CatmullRomCurve3
  return new THREE.CatmullRomCurve3 (points, true);
}
hacerRuta(){
  ruta = [];

  return ruta;
}

  createExtrusion(shape){
    //var pts = this.generarTornillo(2,4,2);
    //var path = new THREE.CatmullRomCurve3(pts);
    //var torus = new THREE.TorusKnotGeometry();
    path = hacerRuta()
    var options1 = {steps: 1, curveSegments: 20, extrudePath: };
    var romboGeo = new THREE.ExtrudeGeometry(shape,options1);

    var romboMat = new THREE.MeshNormalMaterial({flatShading: true});
    this.rombo = new THREE.Mesh(romboGeo,romboMat);
    this.add(this.rombo);
    //EJES:
    this.axis = new THREE.AxesHelper (1.0);
    this.add (this.axis);

    this.position.x = 3;
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
    this.rombo.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
    this.rombo.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
    this.rombo.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
  }
}

export { Rombo, Trebol };