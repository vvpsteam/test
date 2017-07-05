var container, stats;
      var camera, scene, raycaster, renderer;

      var mouse = new THREE.Vector2(), INTERSECTED;
      var radius = 100, theta = 0;
      InitWindowSize();
      
      function init() {

        container = document.getElementById('3d' );
        

        camera = new THREE.PerspectiveCamera( 70, 1, 1, 10000 );

        scene = new THREE.Scene();

        var light = new THREE.DirectionalLight( 0xffffff, 1 );
        light.position.set( 1, 1, 1 ).normalize();
        scene.add( light );

        var geometry = new THREE.BoxBufferGeometry( 10, 30, 20 );

        for ( var i = 0; i < 70; i ++ ) {

          var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );

          object.position.x = Math.random() * 600 - 400;
          object.position.y = Math.random() * 600 - 400;
          object.position.z = Math.random() * 600 - 400;

          object.rotation.x = Math.random() * 2 * Math.PI;
          object.rotation.y = Math.random() * 2 * Math.PI;
          object.rotation.z = Math.random() * 2 * Math.PI;

          object.scale.x = Math.random() + 0.5;
          object.scale.y = Math.random() + 0.5;
          object.scale.z = Math.random() + 0.5;

          scene.add( object );
        }

        raycaster = new THREE.Raycaster();

        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor( 0xffffff );
        renderer.setPixelRatio( w/h );
        renderer.setSize( w, h );
        renderer.sortObjects = false;
        container.appendChild(renderer.domElement); 
          
        window.addEventListener( 'resize', onWindowResize, false );

      }
      var w,h;
      function InitWindowSize(){
        if(window.innerWidth>1200) {
          w=450;
          h=400;
        }
        if(window.innerWidth<1200 && window.innerWidth>992) {
          w=350;
          h=300;
        }
        if(window.innerWidth<992 && window.innerWidth>768) {
          w=700;
          h=300;
        }
        if(window.innerWidth<768) {
          w=window.innerWidth*0.9;
          h=w*0.8;
        }
      }
      function onWindowResize() {
        InitWindowSize();
        camera.aspect =w/h;
        camera.updateProjectionMatrix();         
        renderer.setSize( w,h );
      }

      

      //

      function animate() {

        requestAnimationFrame( animate );
        render();  
      }

      function render() {

        theta += 0.1;

        camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
        camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
        camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
        camera.lookAt( scene.position );

        camera.updateMatrixWorld();

        // find intersections

        raycaster.setFromCamera( mouse, camera );

        var intersects = raycaster.intersectObjects( scene.children );

        if ( intersects.length > 0 ) {

          if ( INTERSECTED != intersects[ 0 ].object ) {

            if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

            INTERSECTED = intersects[ 0 ].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex( 0xff0000 );

          }

        } else {

          if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

          INTERSECTED = null;

        }

        renderer.render( scene, camera );

      }
