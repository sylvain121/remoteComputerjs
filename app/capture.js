const {screen } = require('robotjs');
const jpg = require('jpeg-turbo');

const DEFAULT_FPS = 24;
var destWidth = 0;
var destHeight = 0;
var capture = false;
var socket = undefined;

var jpeg_codec_options = {
  format: jpg.FORMAT_BGRA,
  width: 0,
  height: 0,
  subsampling: jpg.SAMP_444
};

var jpeg_preallocated_buffer = null; 


module.exports.setSocket = function(s) {
  socket = s;
}

module.exports.setDistantScreenSize = function (w,h) {
  destWidth = w;
  destHeight = h;
}


module.exports.toggle = function(fps) {

  //if(socket === undefined) return;
  if(!capture) {
    capture = true;
    fps ? setInterval(sendFrame, 1000/fps) : setInterval(sendFrame, 1000 / DEFAULT_FPS);
  }
  else  {
    capture = false;
  }
}

module.exports.sendFrame = sendFrame;

function sendFrame() {

  if(destWidth === 0 || destHeight === 0) return;

  var date1 = Date.now();
  var bitmap  = screen.capture();
  console.log("Ximage capture time : "+ (Date.now() - date1));

  var resizedBitmap;
  if(destWidth !== bitmap.width || destHeight !== bitmap.height){
    let t = Date.now();
    resizedBitmap = pixelResize(bitmap, destWidth, destHeight);
    console.log("resize time : "+(Date.now()- t));
  } else  {
    resizedBitmap = bitmap;
  }

  if(jpeg_codec_options.width !== destWidth || jpeg_codec_options.height !== destHeight) {

    jpeg_codec_options = {
      format: jpg.FORMAT_BGRA,
      width: destWidth,
      height: destHeight,
      subsampling: jpg.SAMP_444,
    }

    jpeg_preallocated_buffer = new Buffer(jpg.bufferSize(jpeg_codec_options));

  }
  let t = Date.now();
  var encoded = jpg.compressSync(resizedBitmap.image, jpeg_preallocated_buffer, jpeg_codec_options);	
  console.log("Compression time : "+(Date.now()- t));
  var base = encoded.toString('base64');

  var frame = {
    width: destWidth,
    height: destHeight,
    data: base 
  };

  console.log("Frame Size : "+frame.data.length);


}

function pixelResize(bitmap, destWidth, destHeight) {

  var result = {
    width: destWidth,
    height: destHeight,
    image : new Buffer(destWidth * destHeight * 4) 
  };

  var x_ratio = bitmap.width/destWidth;
  var y_ratio = bitmap.height/destHeight;

  for(var i=0; i<destHeight; i++ ){
    for(var j=0; j<destWidth; j++){
      var px = Math.floor(j*x_ratio);
      var py = Math.floor(i*y_ratio);
      bitmap.image.copy(result.image,(i*destWidth+j)*4, ((py*bitmap.width)+px)*4, (((py*bitmap.width)+px)*4)+4);
    }

  }
  return result; 
};
