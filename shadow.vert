in vec4 Position;
uniform mat4 lightModelProjection;

void main()
{
    gl_Position = lightModelProjection * Position;
}
