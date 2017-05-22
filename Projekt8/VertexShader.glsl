attribute vec3 aVertexPosition;
attribute vec4 aVertexColor;
attribute vec3 aVertexNormal;
attribute vec2 aVertexTextureCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 uNormalMatrix;
uniform mat3 uTextureMatrix;

varying vec4 vColor;
varying vec2 vTextureCoord;
varying vec3 vNormalEye;
varying vec3 vVertexPositionEye3;

void main() {
    // set color for fragment shaded
    vColor = aVertexColor;

    // calculate the vertex position in eye Coordinate
    vec4 vertexPositionEye4 = uModelViewMatrix * vec4(aVertexPosition, 1.0);
    vVertexPositionEye3 = vertexPositionEye4.xyz / vertexPositionEye4.w;

    // calculate the normal vector in eye coordinates
    vNormalEye = normalize(uNormalMatrix * aVertexNormal);

    // transform and calculate texture coordinates
    vec3 textureCoord = uTextureMatrix * vec3(aVertexTextureCoord, 1);
    vTextureCoord = textureCoord.xy / textureCoord.z;

    // calculate the projected position
    gl_Position = uProjectionMatrix * vertexPositionEye4;
}
