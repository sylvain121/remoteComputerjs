window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (/* function */ callback, /* DOMElement */ element) {
      window.setTimeout(callback, 1000 / 60);
    };
})();



var App = angular.module("remoteComputerJS", ['ngMaterial']);
App.controller("screenController", function ($scope, $window) {
  
  var socket = io();
  $scope.currentFPS = 20;

  $scope.start = function() {
    socket.emit("startStream", $scope.currentFPS)
  }

  $scope.stop = function() {
    socket.emit("stopStream", $scope.currentFPS)
  }

  $window.addEventListener("keydown", function(event){
  socket.emit("keyDown", event.key);
  });

 $window.addEventListener("keyup", function(event){
  socket.emit("keyUp", event.key); 
 });

  $window.addEventListener("mousemove", function(event){
    console.log(event);
  });

  const DATA_HANDLER_TIMEOUT = 500;

  var frameCanvas = document.getElementById("frameCanvas");
  var pointerCanvas = document.getElementById("pointerCanvas");
  frameCanvas.width = screen.width;
  frameCanvas.height = screen.height;
  var jpeg = null;

  socket.on('frame', function(data){
    jpeg = data; 
  });

  function loop() {
    requestAnimFrame(loop);
    drawFrame();
  }

  function resetFrame() {
    frameContext.clearRect(0, 0, frameCanvas.width, frameCanvas.height);
  }

  function drawFrame() {

    if (jpeg !== null ) {

      var img = new Image();
      img.src = 'data:image/jpg;base64,' + jpeg.data;
      img.onload = function () {
        frameContext.drawImage(img, 0, 0, frameCanvas.width, frameCanvas.height);
      }
    }   
  }

  //start loop
  loop();
});






