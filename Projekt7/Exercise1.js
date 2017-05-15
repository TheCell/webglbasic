//
// DI Computer Graphics
//
// WebGL Exercises
//

// Register function to call after document has loaded
window.onload = startup;

window.up = false;
window.down = false;
window.left = false;
window.right = false;
window.turnRight = false;

function addEventListenerFunction()
{
    window.addEventListener("keydown", keyPressedCodeToFunction);
    window.addEventListener("keyup", keyReleasedCodeToFunction);
}

function keyPressedCodeToFunction(evt)
{
    // arrow left
    if(evt.keyCode == 37 || evt.keyCode == 65)
    {
        window.left = true;
    }
    // arrow up
    if(evt.keyCode == 38 || evt.keyCode == 87)
    {
        window.up = true;
    }
    // arrow right
    if(evt.keyCode == 39 || evt.keyCode == 68)
    {
        window.right = true;
    }
    // arrow down
    if(evt.keyCode == 40 || evt.keyCode == 83)
    {
        window.down = true;
    }
}

function keyReleasedCodeToFunction(evt)
{
    // arrow left
    if(evt.keyCode == 37 || evt.keyCode == 65)
    {
        window.left = false;
    }
    // arrow up
    if(evt.keyCode == 38 || evt.keyCode == 87)
    {
        window.up = false;
    }
    // arrow right
    if(evt.keyCode == 39 || evt.keyCode == 68)
    {
        window.right = false;
    }
    // arrow down
    if(evt.keyCode == 40 || evt.keyCode == 83)
    {
        window.down = false;
    }
}

// the gl object is saved globally
var gl;

// we keep all local parameters for the program in a single object
var ctx =
    {
    shaderProgram: -1,
    aVertexPositionId: -1,
    uColorId: -1,
    aVertexColorId: -1,
    verticesAndColors: -1,
    uSamplerId: -1,
    aVertexTextureCoordId: -1,
    uModelViewMatrixId: -1,
    uTextureMatrix: -1
    };

var lennaTxt =
    {
        textureObj: {}
    };

var transformationVariables = {
    angle: 2*Math.PI,
    rotateStep: (Math.PI*2)/360
}

var rectangleObject =
    {
    buffer: -1,
    textureBuffer: -1
    }
/**
 * Startup function to be called when the body is loaded
 */
function startup() {
    "use strict";
    addEventListenerFunction();
    var canvas = document.getElementById("myCanvas");
    gl = createGLContext(canvas);
    initGL();
    //draw();
}

/**
 * InitGL should contain the functionality that needs to be executed only once
 */
function initGL() {
    "use strict";
    ctx.shaderProgram = loadAndCompileShaders(gl, 'VertexShader.glsl', 'FragmentShader.glsl');
    setUpAttributesAndUniforms();
    setUpBuffers();
    loadTexture();
    // add more necessary commands here
}

/**
 * Setup all the attribute and uniform variables
 */
function setUpAttributesAndUniforms(){
    "use strict";
    ctx.aVertexPositionId = gl.getAttribLocation(ctx.shaderProgram, "aVertexPosition");
    ctx.aVertexColorId = gl.getAttribLocation(ctx.shaderProgram, "aVertexColor");
    ctx.aVertexTextureCoordId = gl.getAttribLocation(ctx.shaderProgram, "aVertexTextureCoord");
    ctx.uSamplerId = gl.getUniformLocation(ctx.shaderProgram, "uSampler");
    ctx.uModelViewMatrixId = gl.getUniformLocation(ctx.shaderProgram, "uModelViewMatrix");
    ctx.uTextureMatrix = gl.getUniformLocation(ctx.shaderProgram, "uTextureMatrix");
}

/**
 * Setup the buffers to use. If more objects are needed this should be split in a file per object.
 */
function setUpBuffers(){
    "use strict";
    rectangleObject.buffer = gl.createBuffer();

    // x, y, r, g, b, a
    ctx.verticesAndColors = [
        -0.5, 0.5, 1, 0, 0, 1,
        0.5, 0.5, 0, 1, 0, 1,
        0.5, -0.5, 0, 0, 1, 1,
        -0.5, -0.5, 0, 0.85, 1, 1
    ];

    var textureCoord =
        [
            0, 1,
            1, 1,
            1, 0,
            0, 0
        ];

    rectangleObject.textureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.textureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoord), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ctx.verticesAndColors), gl.STATIC_DRAW);

    //gl.uniform4f(ctx.uColorId, 1, 0, 1, 1);

}

/**
 * Draw the scene.
 */
function draw() {
    "use strict";
    console.log("Drawing");

    // set background color
    gl.clearColor(0.3, 1, 0.3, 1);
    // clear image with defined color
    gl.clear(gl.COLOR_BUFFER_BIT);

    // bind buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.buffer);
    gl.vertexAttribPointer(ctx.aVertexPositionId, 2, gl.FLOAT, false, 24, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.textureBuffer);
    gl.vertexAttribPointer(ctx.aVertexTextureCoordId, 2, gl.FLOAT, false, 0, 0);

    // Pointer data
    //gl.vertexAttribPointer(ctx.aVertexColorId, 4, gl.FLOAT, false, 24, 8);

    //
    gl.enableVertexAttribArray(ctx.aVertexPositionId);
    //gl.enableVertexAttribArray(ctx.aVertexColorId);
    gl.enableVertexAttribArray(ctx.aVertexTextureCoordId);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, lennaTxt.textureObj);
    gl.uniform1i(ctx.uSamplerId, 0);

    //gl.drawArrays(gl.LINE_LOOP, 0, 4);
    var modelViewMatrix = mat4.create();
    var textureMatrix = mat3.create();

    //gl.clear(gl.COLOR_BUFFER_BIT);
    //mat4.fromTranslation(modelViewMatrix, [0.3, 0.1, 0.0]);
    //mat4.fromRotation(modelViewMatrix, angle,  [0.0, 0.0, 1.0]);
    mat4.fromRotation(modelViewMatrix, transformationVariables.angle, [0.0, 0.0, 1.0]);

    mat3.fromTranslation(textureMatrix, [0.5, 0.5]);
    mat3.scale(textureMatrix, textureMatrix, [0.7, 0.7]);
    mat3.rotate(textureMatrix, textureMatrix, transformationVariables.angle, [0.0, 0.0, 1.0]);
    mat3.translate(textureMatrix, textureMatrix, [-0.5, -0.5]);

    gl.uniformMatrix3fv(ctx.uTextureMatrix, false, textureMatrix);
    gl.uniformMatrix4fv(ctx.uModelViewMatrixId, false, modelViewMatrix);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}

/**
 * Initialize a texture from an image
 * @param image the loaded image
 * @param textureObject WebGL Texture Object
 */
function initTexture(image, textureObject)
{
    // create a new texture
    gl.bindTexture(gl.TEXTURE_2D, textureObject);

    // set parameters for the texture
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);

    // turn texture off again
    gl.bindTexture(gl.TEXTURE_2D, null);
}

/**
 * Load an image as a texture
 */
function loadTexture()
{
    var image = new Image();
    // create a texture object

    image.onload = function ()
    {
        lennaTxt.textureObj = gl.createTexture();
        initTexture(image, lennaTxt.textureObj);

        // make sure there is a redraw after the loading of the texture
        //draw();
        drawAnimated();
    }
    // setting the src will trigger onload
    image.src = "lena512.png";
}

function drawAnimated( timestamp )
{
    if(window.right)
    {
        window.turnRight = true;
    }
    else if(window.left)
    {
        window.turnRight = false;
    }

    if(window.turnRight)
    {
        if(transformationVariables.angle < 0)
        {
            transformationVariables.angle = Math.PI*2;
        }
        transformationVariables.angle -= transformationVariables.rotateStep;
    }
    else
    {
        if(transformationVariables.angle > Math.PI*2)
        {
            transformationVariables.angle = 0;
        }
        transformationVariables.angle += transformationVariables.rotateStep;
    }

    draw();
    window.requestAnimationFrame(drawAnimated);
}