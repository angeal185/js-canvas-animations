(function() {
  var Logo, Model, ThreePointLighting, ThreeScene,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ({
    Logo: Logo = (function(superClass) {
      extend(Logo, superClass);

      function Logo() {
        var loader, manager, particleGeometry, particleMaterial, particles;
        Logo.__super__.constructor.apply(this, arguments);
        manager = new THREE.LoadingManager();
        manager.onProgress = function(item, loaded, total) {};
        particleGeometry = new THREE.Geometry();
        particleMaterial = new THREE.ParticleBasicMaterial({
          color: "whitesmoke",
          size: 1.5
        });
        particles = new THREE.ParticleSystem(particleGeometry, particleMaterial);
        loader = new THREE.OBJLoader(manager);
        loader.load("images/3D/model.obj", (function(_this) {
          return function(object) {
            return _this.add(object);
          };
        })(this));
      }

      return Logo;

    })(THREE.Object3D),
    Model: Model = (function(superClass) {
      extend(Model, superClass);

      function Model() {
        var geometry, i, material, mesh, object;
        Model.__super__.constructor.apply(this, arguments);
        object = new THREE.Object3D();
        this.add(object);
        geometry = new THREE.SphereGeometry(1, 4, 4);
        material = new THREE.MeshPhongMaterial({
          color: 0xFFFFFF,
          shading: THREE.FlatShading
        });
        i = 0;
        while (i < 50) {
          mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
          mesh.position.multiplyScalar(Math.random() * 400);
          mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
          mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 5;
          object.add(mesh);
          i++;
        }
      }

      return Model;

    })(THREE.Object3D),
    ThreePointLighting: ThreePointLighting = (function(superClass) {
      extend(ThreePointLighting, superClass);

      function ThreePointLighting() {
        var ambient, front, rear;
        ThreePointLighting.__super__.constructor.apply(this, arguments);
        ambient = new THREE.AmbientLight(0x444444);
        this.add(ambient);
        front = new THREE.DirectionalLight("white", 1);
        front.position.set(1, 1, 1);
        this.add(front);
        rear = new THREE.DirectionalLight("white", 0.75);
        rear.position.set(-0.5, -0.5, -2);
        this.add(rear);
      }

      return ThreePointLighting;

    })(THREE.Object3D)
  });

  ThreeScene = (function() {
    function ThreeScene() {
      this.animate = bind(this.animate, this);
      this.render = bind(this.render, this);
      this.initRenderer = bind(this.initRenderer, this);
      this.updateCamera = bind(this.updateCamera, this);
      this.createCamera = bind(this.createCamera, this);
      this.onMouseMove = bind(this.onMouseMove, this);
      this.onResize = bind(this.onResize, this);
      this.setupEventListeners = bind(this.setupEventListeners, this);
      this.createWorld = bind(this.createWorld, this);
      this.setupStats = bind(this.setupStats, this);
      this.init = bind(this.init, this);
      this.$window = $(window);
      this.$document = $(document);
      this.$body = $("body");
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.mouseX = 0;
      this.mouseY = 0;
      this.updateFcts = [];
      this.init();
      this.animate();
    }

    ThreeScene.prototype.init = function() {
      var bloom, grain, scanlines, vignette, vignetteOffset;
      if (!Modernizr.webgl) {
      //  alert("Your browser dosent support WebGL");
      }
      this.clock = new THREE.Clock();
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.Fog(0x000000, 1, 300);
      this.mouse = new THREE.Vector2();
      this.renderer = new THREE.WebGLRenderer({
        clearColor: 0x000000,
        alpha: true,
        clearAlpha: 1,
        antialias: true
      });
      bloom = 0.6;
      grain = 0.25;
      scanlines = 0.025;
      vignette = 1.5;
      vignetteOffset = 1.0;
      this.createCamera();
      this.initRenderer();
      this.setupEventListeners();
      return this.createWorld();
    };

    ThreeScene.prototype.setupStats = function() {
      this.stats = new Stats();
      this.stats.domElement.style.position = "absolute";
      this.stats.domElement.style.top = "0px";
      return this.container.appendChild(this.stats.domElement);
    };

    ThreeScene.prototype.createWorld = function() {
      this.sphere = new Model();
      this.tuc = new Logo();
      this.scene.add(this.tuc);
      this.lighting = new ThreePointLighting();
      return this.scene.add(this.lighting);
    };

    ThreeScene.prototype.setupEventListeners = function() {
      this.$window.on("resize", this.onResize);
      return this.$document.on("mousemove", this.onMouseMove);
    };

    ThreeScene.prototype.onResize = function(e) {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.updateCamera();
      this.renderer.setSize(this.width, this.height);
      if (this.composer) {
        return this.composer.reset();
      }
    };

    ThreeScene.prototype.onMouseMove = function(e) {
      this.mouse.x = e.clientX - this.width / 2;
      return this.mouse.y = e.clientY - this.height / 2;
    };

    ThreeScene.prototype.createCamera = function() {
      this.camera1 = new THREE.PerspectiveCamera(35, this.width / this.height, 1, 5000);
      this.scene.add(this.camera1);
      this.currentCamera = this.camera1;
      this.currentCamera.position.z = 100;
      return this.currentCamera.position.y = -150;
    };

    ThreeScene.prototype.updateCamera = function() {
      this.currentCamera.aspect = this.width / this.height;
      return this.currentCamera.updateProjectionMatrix();
    };

    ThreeScene.prototype.initRenderer = function() {
      this.$body.append("<div id='particles'></div>");
      this.container = $("#container")[0];
      this.renderer.setSize(this.width, this.height);
      this.renderer.autoClear = false;
      this.container.appendChild(this.renderer.domElement);
      this.composer = new THREE.EffectComposer(this.renderer);
      this.composer.addPass(new THREE.RenderPass(this.scene, this.currentCamera));
      this.effect = new THREE.ShaderPass(THREE.DotScreenShader);
      this.effect.uniforms["scale"].value = 2;
      this.composer.addPass(this.effect);
      this.effect = new THREE.ShaderPass(THREE.VignetteShader);
      this.effect.uniforms['darkness'].value = 2;
      this.composer.addPass(this.effect);
      this.effect = new THREE.ShaderPass(THREE.RGBShiftShader);
      this.effect.uniforms["amount"].value = 0.01;
      this.effect = new THREE.GlitchPass();
      this.effect.uniforms["amount"].value = 0.005;
      this.effect.renderToScreen = true;
      return this.composer.addPass(this.effect);
    };

    ThreeScene.prototype.render = function(time, delta) {
      this.renderer.clear();
      this.renderer.render(this.scene, this.currentCamera);
      if (this.composer) {
        return this.composer.render();
      } else {
        return this.renderer.render(this.scene, this.currentCamera);
      }
    };

    ThreeScene.prototype.animate = function() {
      var delta, time;
      delta = this.clock.getDelta();
      time = this.clock.getElapsedTime() * 1;
      if (this.stats) {
        this.stats.update();
      }
      this.render(time, delta);
      requestAnimationFrame(this.animate);
      this.tuc.rotation.y += 0.4 * delta;
      this.currentCamera.position.y += (-this.mouse.y - this.currentCamera.position.y) * 0.015;
      return this.currentCamera.lookAt(this.scene.position);
    };

    return ThreeScene;

  })();

  ThreeScene = new ThreeScene();

}).call(this);

