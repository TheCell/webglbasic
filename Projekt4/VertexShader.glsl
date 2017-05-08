attribute vec2 aVertexPosition;
attribute vec4 aVertexColor;
attribute vec2 aVertexTextureCoord;
uniform mat4 uModelViewMatrix;

varying vec4 vColor;
varying vec2 vTextureCoord;

void main() {
    // umrechnen von Kartesische Koordinaten in homogene Koordinaten
    vTextureCoord = aVertexTextureCoord;
    vec4 position = vec4(aVertexPosition, 0.0, 1.0);
    position = uModelViewMatrix * position;
    gl_Position = position;
}
