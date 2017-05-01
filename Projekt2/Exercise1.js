//
// DI Computer Graphics
//
// WebGL Exercises
//

// Register function to call after document has loaded
window.onload = startup;

// the gl object is saved globally
var gl;

// we keep all local parameters for the program in a single object
var ctx = {
    shaderProgram: -1,
    aVertexPositionId: -1,
    uColorId: -1,
    aVertexColorId: -1,
    verticesAndColors: -1
};

/**
 * Startup function to be called when the body is loaded
 */
function startup() {
    "use strict";
    var canvas = document.getElementById("myCanvas");
    gl = createGLContext(canvas);
    initGL();
    draw();
}

/**
 * InitGL should contain the functionality that needs to be executed only once
 */
function initGL() {
    "use strict";
    ctx.shaderProgram = loadAndCompileShaders(gl, 'VertexShader.glsl', 'FragmentShader.glsl');
    setUpAttributesAndUniforms();
    setUpBuffers();

    // add more necessary commands here
}

/**
 * Setup all the attribute and uniform variables
 */
function setUpAttributesAndUniforms(){
    "use strict";
    ctx.aVertexPositionId = gl.getAttribLocation(ctx.shaderProgram, "aVertexPosition");
    //ctx.uColorId = gl.getUniformLocation(ctx.shaderProgram, "uColor");
    ctx.aVertexColorId = gl.getAttribLocation(ctx.shaderProgram, "aVertexColor");
}

/**
 * Setup the buffers to use. If more objects are needed this should be split in a file per object.
 */
function setUpBuffers(){
    "use strict";
    rectangleObject.buffer = gl.createBuffer();

    /*
    var vertices = [
    -0.2, 0.5,
    0.2, 0.5,
    0.2, -0.5,
    -0.2, -0.5
    ]
    */

    // x, y, r, g, b, a
    ctx.verticesAndColors = [
        -0.2, 0.5, 1, 0.2, 1, 1,
        0.2, 0.5, 0.3, 0.2, 0, 1,
        0.2, -0.5, 0, 1, 1, 1,
        -0.2, -0.5, 1, 1, 1, 1
    ];

    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.buffer);
    //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ctx.verticesAndColors), gl.STATIC_DRAW);

    //gl.uniform4f(ctx.uColorId, 1, 0, 1, 1);
}

/**
 * Draw the scene.
 */
function draw() {
    "use strict";
    // set background color
    gl.clearColor(0.3, 1, 0.3, 1);
    // clear image with defined color
    gl.clear(gl.COLOR_BUFFER_BIT);

    // bind buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.buffer);
    // Pointer data
    gl.vertexAttribPointer(ctx.aVertexPositionId, 2, gl.FLOAT, false, 24, 0);
    gl.vertexAttribPointer(ctx.aVertexColorId, 2, gl.FLOAT, false, 24, 8);
    //
    gl.enableVertexAttribArray(ctx.aVertexPositionId);
    gl.enableVertexAttribArray(ctx.aVertexColorId);

    gl.drawArrays(gl.LINE_LOOP, 0, 4);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

    console.log("Drawing");

    // add drawing routines here
}

var rectangleObject = {
    buffer: -1
}