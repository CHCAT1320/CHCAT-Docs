# Unlit_ReadyBlock.glsl

> 源文件：`shaders/Unlit_ReadyBlock.glsl`

````glsl
// shader   : Unlit/ReadyBlock
// asset    : sharedassets12.assets
// platform : 9

#ifdef VERTEX
#version 300 es

#define HLSLCC_ENABLE_UNIFORM_BUFFERS 1
#if HLSLCC_ENABLE_UNIFORM_BUFFERS
#define UNITY_UNIFORM
#else
#define UNITY_UNIFORM uniform
#endif
#define UNITY_SUPPORTS_UNIFORM_LOCATION 1
#if UNITY_SUPPORTS_UNIFORM_LOCATION
#define UNITY_LOCATION(x) layout(location = x)
#define UNITY_BINDING(x) layout(binding = x, std140)
#else
#define UNITY_LOCATION(x)
#define UNITY_BINDING(x) layout(std140)
#endif
uniform 	vec4 hlslcc_mtx4x4unity_ObjectToWorld[4];
uniform 	vec4 hlslcc_mtx4x4unity_MatrixVP[4];
in highp vec4 in_POSITION0;
in highp vec2 in_TEXCOORD0;
in highp vec4 in_COLOR0;
out highp vec2 vs_TEXCOORD0;
out highp vec4 vs_COLOR0;
vec4 u_xlat0;
vec4 u_xlat1;
void main()
{
    vs_TEXCOORD0.xy = in_TEXCOORD0.xy;
    u_xlat0 = in_POSITION0.yyyy * hlslcc_mtx4x4unity_ObjectToWorld[1];
    u_xlat0 = hlslcc_mtx4x4unity_ObjectToWorld[0] * in_POSITION0.xxxx + u_xlat0;
    u_xlat0 = hlslcc_mtx4x4unity_ObjectToWorld[2] * in_POSITION0.zzzz + u_xlat0;
    u_xlat0 = u_xlat0 + hlslcc_mtx4x4unity_ObjectToWorld[3];
    u_xlat1 = u_xlat0.yyyy * hlslcc_mtx4x4unity_MatrixVP[1];
    u_xlat1 = hlslcc_mtx4x4unity_MatrixVP[0] * u_xlat0.xxxx + u_xlat1;
    u_xlat1 = hlslcc_mtx4x4unity_MatrixVP[2] * u_xlat0.zzzz + u_xlat1;
    gl_Position = hlslcc_mtx4x4unity_MatrixVP[3] * u_xlat0.wwww + u_xlat1;
    vs_COLOR0 = in_COLOR0;
    return;
}

#endif
#ifdef FRAGMENT
#version 300 es

precision highp float;
precision highp int;
#define HLSLCC_ENABLE_UNIFORM_BUFFERS 1
#if HLSLCC_ENABLE_UNIFORM_BUFFERS
#define UNITY_UNIFORM
#else
#define UNITY_UNIFORM uniform
#endif
#define UNITY_SUPPORTS_UNIFORM_LOCATION 1
#if UNITY_SUPPORTS_UNIFORM_LOCATION
#define UNITY_LOCATION(x) layout(location = x)
#define UNITY_BINDING(x) layout(binding = x, std140)
#else
#define UNITY_LOCATION(x)
#define UNITY_BINDING(x) layout(std140)
#endif
uniform 	vec4 _Time;
uniform 	float _ShineSpeed;
uniform 	float _ShineBrightness;
uniform 	vec4 _ShineColor;
UNITY_LOCATION(0) uniform mediump sampler2D _DisabledNormalBlockRT;
UNITY_LOCATION(1) uniform mediump sampler2D _DisabledSubtractBlockRT;
UNITY_LOCATION(2) uniform mediump sampler2D _ComposeRT;
in highp vec2 vs_TEXCOORD0;
layout(location = 0) out mediump vec4 SV_Target0;
vec3 u_xlat0;
mediump float u_xlat16_0;
bool u_xlatb0;
mediump float u_xlat16_1;
vec3 u_xlat2;
mediump float u_xlat16_2;
mediump float u_xlat16_3;
void main()
{
    u_xlat16_0 = texture(_DisabledNormalBlockRT, vs_TEXCOORD0.xy).x;
    u_xlat16_2 = texture(_DisabledSubtractBlockRT, vs_TEXCOORD0.xy).y;
    u_xlat16_1 = (-u_xlat16_0) + u_xlat16_2;
    u_xlat16_0 = texture(_ComposeRT, vs_TEXCOORD0.xy).x;
    u_xlat16_3 = abs(u_xlat16_1) * u_xlat16_0 + -9.99999975e-05;
    u_xlat16_1 = u_xlat16_0 * abs(u_xlat16_1);
    u_xlatb0 = u_xlat16_3<0.0;
    if(u_xlatb0){discard;}
    u_xlat0.x = _Time.y * _ShineSpeed;
    u_xlat0.x = sin(u_xlat0.x);
    u_xlat0.x = u_xlat0.x * 0.5 + 1.0;
    u_xlat2.xyz = vec3(vec3(_ShineBrightness, _ShineBrightness, _ShineBrightness)) * _ShineColor.xyz;
    u_xlat0.xyz = u_xlat0.xxx * u_xlat2.xyz;
    u_xlat0.xyz = vec3(u_xlat16_1) * u_xlat0.xyz;
    SV_Target0.w = u_xlat16_1;
    SV_Target0.xyz = u_xlat0.xyz;
    return;
}

#endif
````
