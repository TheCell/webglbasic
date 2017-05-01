attribute vec2 aVertexPosition;
uniform vec4 uColor;
varying vec4 vColor;

void main() {
    // umrechnen von Kartesische Koordinaten in homogene Koordinaten
    vColor = uColor;
    gl_Position = vec4(aVertexPosition, 0, 1);
}
