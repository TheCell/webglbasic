precision mediump float;
varying vec4 vColor;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main() {
    //aVertexColor = vec4(1, 1, 1, 1);
    //gl_FragColor = vColor;
    gl_FragColor = texture2D(uSampler, vTextureCoord);
}