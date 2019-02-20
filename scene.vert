layout(location = SCENE_POSITION_ATTRIB_LOCATION)
in vec4 Position;

layout(location = SCENE_TEXCOORD_ATTRIB_LOCATION)
in vec2 TexCoord;

layout(location = SCENE_NORMAL_ATTRIB_LOCATION)
in vec3 Normal;

uniform mat4 ModelWorld;
uniform mat4 ModelViewProjection;
uniform mat3 Normal_ModelWorld;

uniform mat4 lightMatrix;

out vec2 FragCoord;
out vec3 FragNormal;
out vec3 VertPos;

out vec4 shadowMapCoord;

void main()
{
    // TODO: Set to MVP * P
    gl_Position = ModelViewProjection * Position;
    
    // TODO: Pass vertex attributes to fragment shader
    FragCoord = TexCoord;
    FragNormal = Normal;
    VertPos = vec3(Position)/Position.w;

    shadowMapCoord = lightMatrix * Position;

}
