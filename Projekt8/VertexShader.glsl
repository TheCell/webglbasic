attribute vec3 aVertexPosition;
attribute vec4 aVertexColor;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying vec4 vColor;

void main() {
    // umrechnen von Kartesische Koordinaten in homogene Koordinaten
    vColor = aVertexColor;
    vec4 position = vec4(aVertexPosition, 1.0);
    position = uProjectionMatrix * uModelViewMatrix * position;
    gl_Position = position;
}
