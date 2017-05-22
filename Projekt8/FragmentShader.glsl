precision mediump float;
varying vec4 vColor;

void main() {
    //aVertexColor = vec4(1, 1, 1, 1);
    gl_FragColor = vColor;
    //gl_FragColor = texture2D(uSampler, vTextureCoord);
}