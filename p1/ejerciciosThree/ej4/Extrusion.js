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
    var options1 = { depth : 2 , steps : 2 , bevelEnabled : true,bevelSegments:10 }; // Ajustar la profundidad a 0.05
    var romboGeo = new THREE.ExtrudeGeometry(shape, options1);
    //romboGeo.scale(1,1,0.2);
    var romboMat = new THREE.MeshStandardMaterial({color: 0x00AA00, flatShading: true}); //new THREE.MeshNormalMaterial({ flatShading: false });
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
    // Una vuelta = 2*PI, t será cada punto
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

//Hará media función cuadrática
hacerRuta(){
  var puntos = [];
  puntos.push(new THREE.Vector3(0,0,0));
  for (var i = 1; i <= 5; i++) {
    var x = i * 0.5; // Coordenada x
    var y = Math.pow(x, 2); // Coordenada y, usando una función cuadrática para la curva
    var z = 0; // Coordenada z, en este caso, la curva es plana en el plano xy
    var punto = new THREE.Vector3(x, y, z);
    puntos.push(punto);
}
return puntos;
}

rotateShape ( aShape , angle=0 , res = 16 , center = new THREE. Vector2 (0 ,0) ) {
  var points = aShape.extractPoints( res ).shape;
  points.forEach ( ( p ) => {
    p.rotateAround ( center , angle ) ; // Los giramos
  } ) ;
  return new THREE.Shape ( points ) ; // Construimos y devolvemos un nuevo shape
  }

  createExtrusion(shape){

    shape = this.rotateShape(shape,Math.PI);


    var path = new THREE.CatmullRomCurve3(this.generarTornillo(2,10,2),false,"chordal");
    //var torus = new THREE.TorusKnotGeometry();

    var options1 = {steps: 50, curveSegments: 20, extrudePath: path, bevelEnabled: true};
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


class Gato extends THREE.Object3D {

  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    var shape = this.createShape();
    this.createExtrusion(shape);
  }

  createShape(){
    //cara
    var shape = new THREE.Shape();
    shape.moveTo(-10, -15);
    shape.lineTo(-10,15);
    shape.bezierCurveTo(-5,0,5,0,10,15);
    shape.splineThru([new THREE.Vector2 (12 , 5) ,
      new THREE.Vector2 (8 , -5), new THREE.Vector2 (10 , -15) ] );
    shape.quadraticCurveTo(0,-10,-10,-15);
    //ojo
    var hole = new THREE.Shape();
    hole.absellipse(-4,-1,2,3,0,Math.PI*2);
    shape.holes.push(hole);
    //boca
    hole = new THREE.Shape();
    hole.absarc(0,-9,2,Math.PI*2,Math.PI);
    shape.holes.push(hole);
    
    return shape;
  }

  generarTornillo(numeroVueltas, altura, radioTornillo) {
    const puntos = [];
    const pasoAngular = Math.PI / 24; // Ajusta el paso angular según la resolución deseada
    // Una vuelta = 2*PI, t será cada punto
    for (let t = 0; t <= numeroVueltas * 2 * Math.PI; t += pasoAngular) {
        const x = radioTornillo * Math.cos(t);
        const y = t * altura / (numeroVueltas * 2 * Math.PI);
        const z = radioTornillo * Math.sin(t);
        puntos.push(new THREE.Vector3(x, y, z));
    }

    return puntos;
}

rotateShape ( aShape , angle=0 , res = 16 , center = new THREE. Vector2 (0 ,0) ) {
  var points = aShape.extractPoints( res ).shape;
  points.forEach ( ( p ) => {
    p.rotateAround ( center , angle ) ; // Los giramos
  } ) ;
  return new THREE.Shape ( points ) ; // Construimos y devolvemos un nuevo shape
  }

  createExtrusion(shape){
    //rotate quita los agujeros del shape
    //shape = this.rotateShape(shape,Math.PI);


    var path = new THREE.CatmullRomCurve3(this.generarTornillo(1,100,20));
    var options1 = {steps: 50, curveSegments: 20, extrudePath: path, bevelEnabled: false};
    var romboGeo = new THREE.ExtrudeGeometry(shape,options1);
    romboGeo.scale(0.05,0.05,0.05);
    var romboMat = new THREE.MeshNormalMaterial({flatShading: true});
    this.rombo = new THREE.Mesh(romboGeo,romboMat);
    //this.rombo.geometry.scale(0.1,0.1,0.1);
    this.add(this.rombo);
    //EJES:
    this.axis = new THREE.AxesHelper (1.0);
    this.add (this.axis);

    this.position.y = -10;
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


export { Rombo, Trebol,Gato };