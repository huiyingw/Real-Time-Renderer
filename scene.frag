uniform vec3 CameraPos;

uniform vec3 Ambient;
uniform vec3 Diffuse;
uniform vec3 Specular;
uniform float Shininess;

uniform int HasDiffuseMap;
uniform sampler2D DiffuseMap;

uniform sampler2DShadow ShadowMap;

in vec2 FragCoord;
in vec3 FragNormal;
in vec3 VertPos;

in vec4 shadowMapCoord;

out vec4 FragColor;

void main()
{
    // TODO: Replace with Phong shading
    vec3 lightDir = normalize(CameraPos - VertPos);
    float lambertian = max(dot(lightDir,FragNormal), 0.0);
    vec3 ViewDir = normalize(-VertPos);
    vec3 ReflectDir = reflect(-lightDir, FragNormal);
    float specAngle = max(dot(ReflectDir, ViewDir), 0.0);
    float specular = pow(specAngle, Shininess);

    float visibility = textureProj(ShadowMap, shadowMapCoord) + 0.5;

    vec3 diffuseColor;
    if (HasDiffuseMap != 0) {

        vec3 Color = texture(DiffuseMap, FragCoord).rgb;
        diffuseColor = lambertian*Color;

    } else {

        diffuseColor = lambertian*Diffuse;

    }

    vec3 colorLinear = (Ambient*0.1+diffuseColor+specular*Specular)*visibility;
    FragColor = vec4(colorLinear, 1.0);
}
