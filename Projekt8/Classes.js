/**
 * Created by simon on 15.05.2017.
 */

function WireFrameCube(gl, color)
{
    function defineVertices(gl)
    {
        var vertices = [
            -0.5, 0.5, 0.5,    // v0
            -0.5, -0.5, 0.5,    // v1
            0.5, -0.5, 0.5,     // v2
            0.5, 0.5, 0.5,     // v3
            -0.5, 0.5, -0.5,     // v4
            -0.5, -0.5, -0.5,     // v5
            0.5, -0.5, -0.5,     // v6
            0.5, 0.5, -0.5     // v7
        ];
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        return buffer;
    }

    function defineEdges(gl)
    {
        var vertexIndices = [
            0, 1,
            0, 3,
            0, 4,
            6, 2,
            6, 7,
            6, 5,
            1, 2,
            1, 5,
            4, 7,
            4, 5,
            3, 2,
            3, 7
        ];

        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);

        return buffer;
    }

    return {
        bufferVertices: defineVertices(gl),
        bufferEdges: defineEdges(gl),
        color: color,
        draw: function (gl, aVertexPositionId, aVertexColorId)
        {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferVertices);
            gl.vertexAttribPointer(aVertexPositionId, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aVertexPositionId);

            gl.disableVertexAttribArray(aVertexColorId);
            gl.vertexAttrib4fv(aVertexColorId, this.color);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferEdges);
            gl.drawElements(gl.LINES, 24, gl.UNSIGNED_SHORT, 0);
        }
    }
}

/**
 * Created by toko on 13.05.17.
 */

/**
 *
 * Define a solid cube with methods for drawing it.
 *
 * @param gl
 * @param backColor
 * @param frontColor
 * @param rightColor
 * @param leftColor
 * @param topColor
 * @param bottomColor
 * @returns object with draw method
 * @constructor
 */
function SolidCube(gl, backColor, frontColor, rightColor, leftColor, topColor, bottomColor) {
    function defineVertices(gl) {
        // define the vertices of the cube
        var vertices = [
            // back
            -0.5, -0.5, -0.5,       // v0
            0.5, -0.5, -0.5,       // v1
            0.5,  0.5, -0.5,       // v2
            -0.5,  0.5, -0.5,       // v3
                                    // front
            -0.5, -0.5, 0.5,        // v4
            0.5, -0.5, 0.5,        // v5
            0.5,  0.5, 0.5,        // v6
            -0.5,  0.5, 0.5,        // v7
                                    // right
            0.5, -0.5, -0.5,       // v8 = v1
            0.5,  0.5, -0.5,       // v9 = v2
            0.5,  0.5,  0.5,       // v10 = v6
            0.5, -0.5,  0.5,       // v11 = v5
                                   // left
            -0.5, -0.5, -0.5,       // v12 = v0
            -0.5,  0.5, -0.5,       // v13 = v3
            -0.5,  0.5,  0.5,       // v14 = v7
            -0.5, -0.5,  0.5,       // v15 = v4
                                    // top
            -0.5, 0.5, -0.5,        // v16 = v3
            -0.5, 0.5,  0.5,        // v17 = v7
            0.5, 0.5,  0.5,        // v18 = v6
            0.5, 0.5, -0.5,        // v19 = v2
                                   //bottom
            -0.5, -0.5, -0.5,       // v20 = v0
            -0.5, -0.5, 0.5,        // v21 = v4
            0.5, -0.5, 0.5,        // v22 = v5
            0.5, -0.5, -0.5        // v23 = v1
        ];
        var buffer  = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        return buffer;
    }

    function defineSides(gl) {
        // define the edges for the cube, there are 12 edges in a cube
        var vertexIndices = [
            0,2,1, // face 0 (back)
            2,0,3,
            4,5,6, // face 1 (front)
            4,6,7,
            8,9,10, // face 2 (right)
            10,11,8,
            12,15,14, // face 3 (left)
            14,13,12,
            16,17,18, // face 4 (top)
            18,19,16,
            20,23,22, // face 5 (bottom)
            22,21,20
        ];
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);

        return buffer;
    }

    function defineColors(gl, backColor, frontColor, rightColor, leftColor, topColor, bottomColor) {
        // make 4 entries, one for each vertex
        var backSide = backColor.concat(backColor, backColor, backColor);
        var frontSide = frontColor.concat(frontColor, frontColor, frontColor);
        var rightSide = rightColor.concat(rightColor, rightColor, rightColor);
        var leftSide = leftColor.concat(leftColor, leftColor, leftColor);
        var topSide = topColor.concat(topColor, topColor, topColor);
        var bottomSide = bottomColor.concat(bottomColor, bottomColor, bottomColor);

        var allSides = backSide.concat(frontSide, rightSide, leftSide, topSide, bottomSide);

        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(allSides), gl.STATIC_DRAW);
        return buffer;
    }

    function defineNormals(gl) {
        var backNormal = [0.0, 0.0, -1.0];
        var frontNormal = [0.0, 0.0, 1.0];
        var rightNormal = [1.0, 0.0, 0.0];
        var leftNormal = [-1.0, 0.0, 0.0];
        var topNormal = [0.0, 1.0, 0.0];
        var bottomNormal = [0.0, -1.0, 0.0];

        // make 4 entries, one for each vertex
        var backSideNormal    = backNormal.concat(backNormal, backNormal, backNormal);
        var frontSideNormal   = frontNormal.concat(frontNormal, frontNormal, frontNormal);
        var rightSideNormal   = rightNormal.concat(rightNormal, rightNormal, rightNormal);
        var leftSideNormal    = leftNormal.concat(leftNormal, leftNormal, leftNormal);
        var topSideNormal     = topNormal.concat(topNormal, topNormal, topNormal);
        var bottomSideNormal  = bottomNormal.concat(bottomNormal, bottomNormal, bottomNormal);

        var allSidesNormal = backSideNormal.concat(frontSideNormal, rightSideNormal, leftSideNormal, topSideNormal, bottomSideNormal);

        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(allSidesNormal), gl.STATIC_DRAW);
        return buffer;
    }




    return {
        bufferVertices: defineVertices(gl),
        bufferSides: defineSides(gl),
        bufferColors: defineColors(gl, backColor, frontColor, rightColor, leftColor, topColor, bottomColor),
        bufferNormals: defineNormals(gl),

        draw: function(gl, aVertexPositionId, aVertexColorId, aVertexNormalId) {
            // ositionp
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferVertices);
            gl.vertexAttribPointer(aVertexPositionId, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aVertexPositionId);

            // color buffer
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferColors);
            gl.vertexAttribPointer(aVertexColorId, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aVertexColorId);

            // normal
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferNormals);
            gl.vertexAttribPointer(aVertexNormalId, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aVertexNormalId);


            // bind the element array
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferSides);
            gl.drawElements(gl.TRIANGLES, 36 ,gl.UNSIGNED_SHORT, 0);

        }
    }
}

/**
 *
 * Define a sphere that can be drawn with texture or color.
 */

/**
 *
 * @param gl the gl object for which to define the sphere
 * @param latitudeBands the number of bands along the latitude direction
 * @param longitudeBands the number of bands along the longitude direction
 *
 */
function SolidSphere(gl, latitudeBands, longitudeBands) {

    function defineVerticesAndTexture(latitudeBands, longitudeBands) {
        "use strict";
        // define the vertices of the sphere
        var vertices = [];
        var normals = [];
        var textures = [];

        for (var latNumber = 0; latNumber <= latitudeBands; latNumber++) {
            var theta = latNumber * Math.PI / latitudeBands;
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);

            for (var longNumber = 0; longNumber <= longitudeBands; longNumber++) {
                var phi = longNumber * 2 * Math.PI / longitudeBands;
                var sinPhi = Math.sin(phi);
                var cosPhi = Math.cos(phi);

                // position (and normals as it is a unit sphere)
                var x = cosPhi * sinTheta;
                var y = cosTheta;
                var z = sinPhi * sinTheta;

                // texture coordinates
                var u = 1 - (longNumber / longitudeBands);
                var v = 1 - (latNumber / latitudeBands);

                vertices.push(x);
                vertices.push(y);
                vertices.push(z);

                normals.push(x);
                normals.push(y);
                normals.push(z);

                textures.push(u);
                textures.push(v);
            }
        }
        return {
            vertices: vertices,
            normals: normals,
            textures: textures
        }
    }

    function defineIndices(latitudeBands, longitudeBands) {
        var indices = [];
        for (var latNumber = 0; latNumber < latitudeBands; latNumber++) {
            for (var longNumber = 0; longNumber < longitudeBands; longNumber++) {
                var first = (latNumber * (longitudeBands + 1)) + longNumber;
                var second = first + longitudeBands + 1;

                indices.push(first);
                indices.push(first + 1);
                indices.push(second);

                indices.push(second);
                indices.push(first + 1);
                indices.push(second + 1);
            }
        }
        return indices;
    }

    function drawWithColor(gl, aVertexPositionId, aVertexColorId, aVertexNormalId,  color) {
        "use strict";

        // position
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferVertices);
        gl.vertexAttribPointer(aVertexPositionId, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(aVertexPositionId);

        // color is directly specified as an attribute here, as it is valid for the whole object
        gl.disableVertexAttribArray(aVertexColorId);
        gl.vertexAttrib3f(aVertexColorId, color[0], color[1], color[2]);

        // normal
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferNormals);
        gl.vertexAttribPointer(aVertexNormalId, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(aVertexNormalId);

        // elements
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphere.bufferIndices);
        gl.drawElements(gl.TRIANGLES, this.numberOfTriangles*3 ,gl.UNSIGNED_SHORT, 0);
    }

    var verticesAndTextures = defineVerticesAndTexture(latitudeBands, longitudeBands);
    var indices = defineIndices(latitudeBands, longitudeBands);

    var sphere = {};
    sphere.bufferVertices  = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphere.bufferVertices);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesAndTextures.vertices), gl.STATIC_DRAW);


    sphere.bufferNormals = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphere.bufferNormals);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesAndTextures.normals), gl.STATIC_DRAW);

    sphere.bufferTextures = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphere.bufferTextures);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesAndTextures.textures), gl.STATIC_DRAW);

    sphere.bufferIndices = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphere.bufferIndices);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    sphere.numberOfTriangles = latitudeBands*longitudeBands*2;
    sphere.drawWithColor = drawWithColor;
    return sphere;
}

/**
 *
 * Define a sphere that can be drawn with texture or color.
 */

/**
 *
 * @param gl the gl object for which to define the sphere
 * @param latitudeBands the number of bands along the latitude direction
 * @param longitudeBands the number of bands along the longitude direction
 *
 */
function SolidSphere(gl, latitudeBands, longitudeBands) {

    function defineVerticesAndTexture(latitudeBands, longitudeBands) {
        "use strict";
        // define the vertices of the sphere
        var vertices = [];
        var normals = [];
        var textures = [];

        for (var latNumber = 0; latNumber <= latitudeBands; latNumber++) {
            var theta = latNumber * Math.PI / latitudeBands;
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);

            for (var longNumber = 0; longNumber <= longitudeBands; longNumber++) {
                var phi = longNumber * 2 * Math.PI / longitudeBands;
                var sinPhi = Math.sin(phi);
                var cosPhi = Math.cos(phi);

                // position (and normals as it is a unit sphere)
                var x = cosPhi * sinTheta;
                var y = cosTheta;
                var z = sinPhi * sinTheta;

                // texture coordinates
                var u = 1 - (longNumber / longitudeBands);
                var v = 1 - (latNumber / latitudeBands);

                vertices.push(x);
                vertices.push(y);
                vertices.push(z);

                normals.push(x);
                normals.push(y);
                normals.push(z);

                textures.push(u);
                textures.push(v);
            }
        }
        return {
            vertices: vertices,
            normals: normals,
            textures: textures
        }
    }

    function defineIndices(latitudeBands, longitudeBands) {
        var indices = [];
        for (var latNumber = 0; latNumber < latitudeBands; latNumber++) {
            for (var longNumber = 0; longNumber < longitudeBands; longNumber++) {
                var first = (latNumber * (longitudeBands + 1)) + longNumber;
                var second = first + longitudeBands + 1;

                indices.push(first);
                indices.push(first + 1);
                indices.push(second);

                indices.push(second);
                indices.push(first + 1);
                indices.push(second + 1);
            }
        }
        return indices;
    }

    function drawWithColor(gl, aVertexPositionId, aVertexColorId, aVertexNormalId,  color) {
        "use strict";

        // position
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferVertices);
        gl.vertexAttribPointer(aVertexPositionId, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(aVertexPositionId);

        // color is directly specified as an attribute here, as it is valid for the whole object
        gl.disableVertexAttribArray(aVertexColorId);
        gl.vertexAttrib3f(aVertexColorId, color[0], color[1], color[2]);

        // normal
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferNormals);
        gl.vertexAttribPointer(aVertexNormalId, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(aVertexNormalId);

        // elements
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphere.bufferIndices);
        gl.drawElements(gl.TRIANGLES, this.numberOfTriangles*3 ,gl.UNSIGNED_SHORT, 0);
    }

    var verticesAndTextures = defineVerticesAndTexture(latitudeBands, longitudeBands);
    var indices = defineIndices(latitudeBands, longitudeBands);

    var sphere = {};
    sphere.bufferVertices  = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphere.bufferVertices);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesAndTextures.vertices), gl.STATIC_DRAW);


    sphere.bufferNormals = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphere.bufferNormals);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesAndTextures.normals), gl.STATIC_DRAW);

    sphere.bufferTextures = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphere.bufferTextures);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesAndTextures.textures), gl.STATIC_DRAW);

    sphere.bufferIndices = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphere.bufferIndices);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    sphere.numberOfTriangles = latitudeBands*longitudeBands*2;
    sphere.drawWithColor = drawWithColor;
    return sphere;
}