attribute vec2 aVertexPosition;
attribute vec4 aVertexColor;
/*
uniform vec4 uColor;
*/
varying vec4 vColor;

void main() {
    // umrechnen von Kartesische Koordinaten in homogene Koordinaten
    vColor = aVertexColor;
    gl_Position = vec4(aVertexPosition, 0, 1);
}
