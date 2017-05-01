attribute vec2 aVertexPosition;
attribute vec4 aVertexColor;
attribute vec2 aVertexTextureCoord;

varying vec4 vColor;
varying vec2 vTextureCoord;

void main() {
    // umrechnen von Kartesische Koordinaten in homogene Koordinaten
    vTextureCoord = aVertexTextureCoord;
    gl_Position = vec4(aVertexPosition, 0, 1);
}
