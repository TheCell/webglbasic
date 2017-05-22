precision mediump float;

const float ambientFactor = 0.2;
const float shininess = 10.0;
const vec3 specularMaterialColor = vec3(0.4, 0.4, 0.4);


varying vec4 vColor;
varying vec2 vTextureCoord;
varying vec3 vNormalEye;
varying vec3 vVertexPositionEye3;


uniform bool uEnableTexture;
uniform bool uEnableLighting;

uniform vec3 uLightPosition;
uniform vec3 uLightColor;
uniform sampler2D uSampler;

void main() {
    vec4 baseColor = vColor;
    if (uEnableTexture)
    {
        baseColor = vec4(texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)).rgb,1);
    }
    if (uEnableLighting)
    {
        // calculate light direction as seen from the vertex position
        vec3 lightDirectionEye = normalize(uLightPosition -vVertexPositionEye3);
        vec3 normal = normalize(vNormalEye);

        // ambient lighting
        vec3 ambientColor = ambientFactor * baseColor.rgb;

        // diffuse lighting
        float diffuseFactor = max(dot(normal, lightDirectionEye), 0.0);
        vec3 diffuseColor = vec3(0.5, 0.5, 0.5);
        //diffuseColor = diffuseColor * baseColor * uLightColor;

        // specular lighting
        vec3 specularColor = vec3(0, 0, 0);
        if (diffuseFactor > 0.0) {
           vec3 reflectionDir = normalize(reflect(-lightDirectionEye, normal));
           vec3 eyeDir = -normalize(vVertexPositionEye3);
           float cosPhi = max(dot(reflectionDir, eyeDir), 0.0);
           float specularFactor = pow(cosPhi, shininess);
           specularColor = specularFactor * specularMaterialColor * uLightColor;
        }

        vec3 color = ambientColor + diffuseColor + specularColor;
        gl_FragColor = vec4(color, 1.0);
    }
    else
    {
        gl_FragColor = vColor;
    }

}