# Unlit_DisabledBlock.glsl

> 源文件：`shaders/Unlit_DisabledBlock.glsl`

````glsl
// shader   : Unlit/DisabledBlock
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
uniform 	vec4 _SparkMap_ST;
uniform 	mediump vec4 _DisplaceMap_ST;
in highp vec4 in_POSITION0;
in highp vec4 in_COLOR0;
in highp vec2 in_TEXCOORD0;
out highp vec2 vs_TEXCOORD0;
out highp vec2 vs_TEXCOORD2;
out highp vec2 vs_TEXCOORD3;
out highp vec4 vs_COLOR0;
vec4 u_xlat0;
vec4 u_xlat1;
void main()
{
    vs_TEXCOORD2.xy = in_TEXCOORD0.xy * _DisplaceMap_ST.xy + _DisplaceMap_ST.zw;
    vs_TEXCOORD0.xy = in_TEXCOORD0.xy;
    vs_TEXCOORD3.xy = in_TEXCOORD0.xy * _SparkMap_ST.xy + _SparkMap_ST.zw;
    vs_COLOR0 = in_COLOR0;
    u_xlat0 = in_POSITION0.yyyy * hlslcc_mtx4x4unity_ObjectToWorld[1];
    u_xlat0 = hlslcc_mtx4x4unity_ObjectToWorld[0] * in_POSITION0.xxxx + u_xlat0;
    u_xlat0 = hlslcc_mtx4x4unity_ObjectToWorld[2] * in_POSITION0.zzzz + u_xlat0;
    u_xlat0 = u_xlat0 + hlslcc_mtx4x4unity_ObjectToWorld[3];
    u_xlat1 = u_xlat0.yyyy * hlslcc_mtx4x4unity_MatrixVP[1];
    u_xlat1 = hlslcc_mtx4x4unity_MatrixVP[0] * u_xlat0.xxxx + u_xlat1;
    u_xlat1 = hlslcc_mtx4x4unity_MatrixVP[2] * u_xlat0.zzzz + u_xlat1;
    gl_Position = hlslcc_mtx4x4unity_MatrixVP[3] * u_xlat0.wwww + u_xlat1;
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
uniform 	mediump vec4 _FillColor;
uniform 	mediump float _FillOpacity;
uniform 	mediump vec3 _SparkTint;
uniform 	float _SparkMapOpacity;
uniform 	mediump float _SparkDisplaceIntensity;
uniform 	mediump float _DisplaceSpeed;
uniform 	mediump vec4 _DisplaceDirection;
UNITY_LOCATION(0) uniform mediump sampler2D _ComposeRT;
UNITY_LOCATION(1) uniform mediump sampler2D _DisplaceMap;
UNITY_LOCATION(2) uniform mediump sampler2D _SparkMap;
in highp vec2 vs_TEXCOORD0;
in highp vec2 vs_TEXCOORD2;
in highp vec2 vs_TEXCOORD3;
in highp vec4 vs_COLOR0;
layout(location = 0) out mediump vec4 SV_Target0;
mediump float u_xlat16_0;
mediump vec3 u_xlat16_1;
vec4 u_xlat2;
mediump float u_xlat16_3;
vec3 u_xlat4;
mediump float u_xlat16_4;
bool u_xlatb4;
mediump float u_xlat16_8;
mediump float u_xlat16_9;
mediump float u_xlat16_13;
void main()
{
    u_xlat16_0 = texture(_ComposeRT, vs_TEXCOORD0.xy).x;
    u_xlat16_1.x = u_xlat16_0 + -9.99999975e-05;
    u_xlatb4 = u_xlat16_1.x<0.0;
    if(u_xlatb4){discard;}
    u_xlat4.x = _Time.x * _DisplaceSpeed;
    u_xlat16_1.x = dot(_DisplaceDirection.xy, _DisplaceDirection.xy);
    u_xlat16_1.x = inversesqrt(u_xlat16_1.x);
    u_xlat16_1.xy = u_xlat16_1.xx * _DisplaceDirection.xy;
    u_xlat2.xyw = u_xlat4.xxx * u_xlat16_1.xyx;
    u_xlat2.z = u_xlat4.x * (-u_xlat16_1.y);
    u_xlat2 = u_xlat2 + vs_TEXCOORD2.xyxy;
    u_xlat16_4 = texture(_DisplaceMap, u_xlat2.zw).x;
    u_xlat16_8 = texture(_DisplaceMap, u_xlat2.xy).x;
    u_xlat16_9 = u_xlat16_4 + -0.5;
    u_xlat16_13 = u_xlat16_4 + u_xlat16_8;
    u_xlat16_3 = u_xlat16_8 + -0.5;
    u_xlat16_13 = u_xlat16_13 * 0.5;
    u_xlat2.x = u_xlat16_9 * (-u_xlat16_1.y);
    u_xlat2.y = u_xlat16_9 * u_xlat16_1.x;
    u_xlat4.xy = u_xlat16_1.xy * vec2(u_xlat16_3) + u_xlat2.xy;
    u_xlat4.xy = u_xlat4.xy * vec2(_SparkDisplaceIntensity) + vs_TEXCOORD3.xy;
    u_xlat16_4 = texture(_SparkMap, u_xlat4.xy).x;
    u_xlat4.xyz = vec3(u_xlat16_4) * _SparkTint.xyz;
    u_xlat4.xyz = vec3(u_xlat16_13) * u_xlat4.xyz;
    u_xlat16_1.xyz = _FillColor.xyz * vec3(_FillOpacity);
    u_xlat16_1.xyz = u_xlat4.xyz * vec3(_SparkMapOpacity) + u_xlat16_1.xyz;
    SV_Target0.xyz = vec3(u_xlat16_0) * u_xlat16_1.xyz;
    SV_Target0.w = vs_COLOR0.w;
    return;
}

#endif
````
