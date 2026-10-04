# Unlit_TouchEffect.glsl

> 源文件：`shaders/Unlit_TouchEffect.glsl`

````glsl
// shader   : Unlit/TouchEffect
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
uniform 	vec4 _ProjectionParams;
uniform 	vec4 hlslcc_mtx4x4unity_ObjectToWorld[4];
uniform 	vec4 hlslcc_mtx4x4unity_MatrixVP[4];
uniform 	vec4 _DisplaceMap_ST;
uniform 	vec4 _NoiseMap_ST;
in highp vec4 in_POSITION0;
in highp vec2 in_TEXCOORD0;
out highp vec2 vs_TEXCOORD0;
out highp vec2 vs_TEXCOORD1;
out highp vec2 vs_TEXCOORD2;
out highp vec2 vs_TEXCOORD3;
vec4 u_xlat0;
vec4 u_xlat1;
void main()
{
    vs_TEXCOORD1.xy = in_TEXCOORD0.xy * _DisplaceMap_ST.xy + _DisplaceMap_ST.zw;
    vs_TEXCOORD0.xy = in_TEXCOORD0.xy;
    u_xlat0 = in_POSITION0.yyyy * hlslcc_mtx4x4unity_ObjectToWorld[1];
    u_xlat0 = hlslcc_mtx4x4unity_ObjectToWorld[0] * in_POSITION0.xxxx + u_xlat0;
    u_xlat0 = hlslcc_mtx4x4unity_ObjectToWorld[2] * in_POSITION0.zzzz + u_xlat0;
    u_xlat0 = u_xlat0 + hlslcc_mtx4x4unity_ObjectToWorld[3];
    u_xlat1 = u_xlat0.yyyy * hlslcc_mtx4x4unity_MatrixVP[1];
    u_xlat1 = hlslcc_mtx4x4unity_MatrixVP[0] * u_xlat0.xxxx + u_xlat1;
    u_xlat1 = hlslcc_mtx4x4unity_MatrixVP[2] * u_xlat0.zzzz + u_xlat1;
    u_xlat0 = hlslcc_mtx4x4unity_MatrixVP[3] * u_xlat0.wwww + u_xlat1;
    gl_Position = u_xlat0;
    u_xlat0.y = u_xlat0.y * _ProjectionParams.x;
    u_xlat1.xzw = u_xlat0.xwy * vec3(0.5, 0.5, 0.5);
    u_xlat0.xy = u_xlat1.zz + u_xlat1.xw;
    vs_TEXCOORD3.xy = u_xlat0.xy / u_xlat0.ww;
    vs_TEXCOORD2.xy = in_TEXCOORD0.xy * _NoiseMap_ST.xy + _NoiseMap_ST.zw;
    return;
}

#endif
#ifdef FRAGMENT
#version 300 es
#ifdef GL_EXT_shader_texture_lod
#extension GL_EXT_shader_texture_lod : enable
#endif

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
uniform 	vec4 _ScreenParams;
uniform 	float _DisplaceSpeed;
uniform 	float _DisplaceStrength;
uniform 	vec4 _DisplaceDirection;
uniform 	mediump vec4 _NoiseTint;
uniform 	float _NoiseEvoSpeed;
uniform 	float _NoiseDirChangeSpeed;
uniform 	float _NoiseDisplaceStrength;
uniform 	float _NoiseRadius;
uniform 	float _NoiseSmoothness;
uniform 	float _SDFCellSize;
uniform 	float _SDFSmoothness;
uniform 	float _SDFFalloff;
uniform 	float _SDFMoveSpeed;
uniform 	mediump vec4 _GlowColor;
uniform 	mediump float _BackgroundPixelScale;
UNITY_LOCATION(0) uniform mediump sampler2D _DisplaceMap;
UNITY_LOCATION(1) uniform mediump sampler2D _TouchHoverRT;
UNITY_LOCATION(2) uniform mediump sampler2D _NoiseMap;
in highp vec2 vs_TEXCOORD0;
in highp vec2 vs_TEXCOORD1;
in highp vec2 vs_TEXCOORD2;
in highp vec2 vs_TEXCOORD3;
layout(location = 0) out mediump vec4 SV_Target0;
vec4 u_xlat0;
mediump float u_xlat16_0;
bvec3 u_xlatb0;
vec4 u_xlat1;
vec4 u_xlat2;
vec4 u_xlat3;
mediump vec2 u_xlat16_3;
vec4 u_xlat4;
mediump vec3 u_xlat16_5;
mediump vec3 u_xlat16_6;
mediump vec3 u_xlat16_7;
mediump vec3 u_xlat16_8;
vec3 u_xlat9;
mediump vec2 u_xlat16_9;
bool u_xlatb9;
float u_xlat10;
vec2 u_xlat18;
vec2 u_xlat19;
vec2 u_xlat20;
float u_xlat27;
float u_xlat28;
mediump float u_xlat16_32;
mediump float u_xlat16_33;
void main()
{
    u_xlat0.x = _Time.x * _DisplaceSpeed;
    u_xlat9.x = dot(_DisplaceDirection.xy, _DisplaceDirection.xy);
    u_xlat9.x = inversesqrt(u_xlat9.x);
    u_xlat1.xy = u_xlat9.xx * _DisplaceDirection.xy;
    u_xlat1.zw = (-u_xlat1.yy);
    u_xlat0.yz = u_xlat1.zx * u_xlat0.xx + vs_TEXCOORD1.xy;
    u_xlat0.xw = u_xlat1.xy * u_xlat0.xx + vs_TEXCOORD1.xy;
    u_xlat0 = u_xlat0 * _ScreenParams.xxyy;
    u_xlat19.x = max(_BackgroundPixelScale, 1.0);
    u_xlat9.xy = u_xlat0.yz / u_xlat19.xx;
    u_xlat9.xy = floor(u_xlat9.xy);
    u_xlat2.x = u_xlat19.x * 0.5;
    u_xlat9.xy = u_xlat9.xy * u_xlat19.xx + u_xlat2.xx;
    u_xlat9.xy = u_xlat9.xy / _ScreenParams.xy;
    u_xlat16_9.x = textureLod(_DisplaceMap, u_xlat9.xy, 0.0).x;
    u_xlat16_3.x = u_xlat16_9.x + -0.5;
    u_xlat9.xy = u_xlat1.wx * u_xlat16_3.xx;
    u_xlat0.xw = u_xlat0.xw / u_xlat19.xx;
    u_xlat0.xw = floor(u_xlat0.xw);
    u_xlat0.xw = u_xlat0.xw * u_xlat19.xx + u_xlat2.xx;
    u_xlat0.xw = u_xlat0.xw / _ScreenParams.xy;
    u_xlat16_0 = textureLod(_DisplaceMap, u_xlat0.xw, 0.0).x;
    u_xlat16_3.x = u_xlat16_0 + -0.5;
    u_xlat0.xy = u_xlat1.xy * u_xlat16_3.xx + u_xlat9.xy;
    u_xlat0.xy = u_xlat0.xy * vec2(vec2(_DisplaceStrength, _DisplaceStrength)) + vs_TEXCOORD0.xy;
    u_xlat16_0 = textureLod(_TouchHoverRT, u_xlat0.xy, 0.0).x;
    u_xlat16_3.x = u_xlat16_0 + -9.99999975e-05;
    u_xlatb9 = u_xlat16_3.x<0.0;
    if(u_xlatb9){discard;}
    u_xlat1.y = float(0.381470025);
    u_xlat1.w = float(0.93821007);
    u_xlat9.x = _Time.y * _NoiseDirChangeSpeed;
    u_xlat18.x = floor(u_xlat9.x);
    u_xlat9.x = fract(u_xlat9.x);
    u_xlat27 = u_xlat18.x + 1.0;
    u_xlat2.xz = u_xlat18.xx * vec2(0.103100002, 0.103100002);
    u_xlat1.xz = vec2(u_xlat27) * vec2(0.103100002, 0.103100002);
    u_xlat1 = fract(u_xlat1);
    u_xlat4.xyz = u_xlat1.yxx + vec3(33.3300018, 33.3300018, 33.3300018);
    u_xlat18.x = dot(u_xlat1.xyx, u_xlat4.xyz);
    u_xlat18.xy = u_xlat18.xx + u_xlat1.xy;
    u_xlat27 = u_xlat18.y + u_xlat18.x;
    u_xlat18.x = u_xlat18.x * u_xlat27;
    u_xlat1.x = fract(u_xlat18.x);
    u_xlat4.xyz = u_xlat1.wzz + vec3(33.3300018, 33.3300018, 33.3300018);
    u_xlat18.x = dot(u_xlat1.zwz, u_xlat4.xyz);
    u_xlat18.xy = u_xlat18.xx + u_xlat1.zw;
    u_xlat27 = u_xlat18.y + u_xlat18.x;
    u_xlat18.x = u_xlat18.x * u_xlat27;
    u_xlat1.y = fract(u_xlat18.x);
    u_xlat18.xy = u_xlat1.xy * vec2(2.0, 2.0) + vec2(-1.0, -1.0);
    u_xlat2.y = float(0.381470025);
    u_xlat2.w = float(0.93821007);
    u_xlat1 = fract(u_xlat2);
    u_xlat2.xyz = u_xlat1.yxx + vec3(33.3300018, 33.3300018, 33.3300018);
    u_xlat2.x = dot(u_xlat1.xyx, u_xlat2.xyz);
    u_xlat1.xy = u_xlat1.xy + u_xlat2.xx;
    u_xlat10 = u_xlat1.y + u_xlat1.x;
    u_xlat1.x = u_xlat1.x * u_xlat10;
    u_xlat2.xyz = u_xlat1.wzz + vec3(33.3300018, 33.3300018, 33.3300018);
    u_xlat2.x = dot(u_xlat1.zwz, u_xlat2.xyz);
    u_xlat19.xy = u_xlat1.zw + u_xlat2.xx;
    u_xlat28 = u_xlat19.y + u_xlat19.x;
    u_xlat1.z = u_xlat19.x * u_xlat28;
    u_xlat1.xy = fract(u_xlat1.xz);
    u_xlat1.xy = u_xlat1.xy * vec2(2.0, 2.0) + vec2(-1.0, -1.0);
    u_xlat18.xy = u_xlat18.xy + (-u_xlat1.xy);
    u_xlat19.x = u_xlat9.x * u_xlat9.x;
    u_xlat9.x = (-u_xlat9.x) * 2.0 + 3.0;
    u_xlat9.x = u_xlat9.x * u_xlat19.x;
    u_xlat9.xy = u_xlat9.xx * u_xlat18.xy + u_xlat1.xy;
    u_xlat9.xy = u_xlat9.xy * vec2(_NoiseEvoSpeed) + vs_TEXCOORD2.xy;
    u_xlat16_9.xy = textureLod(_NoiseMap, u_xlat9.xy, 0.0).xy;
    u_xlat9.xy = u_xlat16_9.xy + vec2(-0.5, -0.5);
    u_xlat16_3.xy = u_xlat9.xy + u_xlat9.xy;
    u_xlat9.xy = u_xlat16_3.xy * vec2(vec2(_NoiseDisplaceStrength, _NoiseDisplaceStrength));
    u_xlat27 = _ScreenParams.y * _SDFCellSize;
    u_xlat9.xy = vec2(u_xlat27) * u_xlat9.xy;
    u_xlat9.xy = u_xlat9.xy / _ScreenParams.xy;
    u_xlat9.xy = u_xlat9.xy + vs_TEXCOORD3.xy;
    u_xlat9.xy = u_xlat9.xy * _ScreenParams.xy;
    u_xlat9.xy = u_xlat9.xy / vec2(u_xlat27);
    u_xlat1.xy = floor(u_xlat9.xy);
    u_xlat9.z = _Time.y * _SDFMoveSpeed;
    u_xlat19.x = floor(u_xlat9.z);
    u_xlat9.xyz = fract(u_xlat9.xyz);
    u_xlat1.xy = u_xlat19.xx + u_xlat1.xy;
    u_xlat19.xy = u_xlat1.xy + vec2(18.1700001, 18.1700001);
    u_xlat19.xy = u_xlat19.xy * vec2(0.103100002, 0.103100002);
    u_xlat19.xy = fract(u_xlat19.xy);
    u_xlat2.xyz = u_xlat19.yxx + vec3(33.3300018, 33.3300018, 33.3300018);
    u_xlat2.x = dot(u_xlat19.xyx, u_xlat2.xyz);
    u_xlat19.xy = u_xlat19.xy + u_xlat2.xx;
    u_xlat28 = u_xlat19.y + u_xlat19.x;
    u_xlat19.x = u_xlat19.x * u_xlat28;
    u_xlat2.y = fract(u_xlat19.x);
    u_xlat19.xy = u_xlat1.xy * vec2(0.103100002, 0.103100002);
    u_xlat3 = u_xlat1.yxyx + vec4(17.1700001, 17.1700001, 1.0, 1.0);
    u_xlat3 = u_xlat3 * vec4(0.103100002, 0.103100002, 0.103100002, 0.103100002);
    u_xlat3 = fract(u_xlat3);
    u_xlat1.xy = fract(u_xlat19.xy);
    u_xlat4.xyz = u_xlat1.yxx + vec3(33.3300018, 33.3300018, 33.3300018);
    u_xlat19.x = dot(u_xlat1.xyx, u_xlat4.xyz);
    u_xlat1.xy = u_xlat19.xx + u_xlat1.xy;
    u_xlat10 = u_xlat1.y + u_xlat1.x;
    u_xlat1.x = u_xlat1.x * u_xlat10;
    u_xlat4 = u_xlat3 + vec4(33.3300018, 33.3300018, 33.3300018, 33.3300018);
    u_xlat19.x = dot(u_xlat3.wzw, u_xlat4.zww);
    u_xlat28 = dot(u_xlat3.yxy, u_xlat4.xyy);
    u_xlat20.xy = vec2(u_xlat28) + u_xlat3.yx;
    u_xlat19.xy = u_xlat19.xx + u_xlat3.wz;
    u_xlat28 = u_xlat19.y + u_xlat19.x;
    u_xlat19.x = u_xlat19.x * u_xlat28;
    u_xlat2.x = fract(u_xlat19.x);
    u_xlat19.x = u_xlat20.y + u_xlat20.x;
    u_xlat1.z = u_xlat20.x * u_xlat19.x;
    u_xlat1.xy = fract(u_xlat1.xz);
    u_xlat19.xy = (-u_xlat1.xy) + u_xlat2.xy;
    u_xlat2.x = u_xlat9.z * u_xlat9.z;
    u_xlat27 = (-u_xlat9.z) * 2.0 + 3.0;
    u_xlat27 = u_xlat27 * u_xlat2.x;
    u_xlat1.xy = vec2(u_xlat27) * u_xlat19.xy + u_xlat1.xy;
    u_xlat9.xy = u_xlat9.xy + (-u_xlat1.xy);
    u_xlat9.x = dot(u_xlat9.xy, u_xlat9.xy);
    u_xlat9.x = sqrt(u_xlat9.x);
    u_xlat9.x = u_xlat9.x + (-_SDFFalloff);
    u_xlat18.x = float(1.0) / _SDFSmoothness;
    u_xlat9.x = u_xlat18.x * u_xlat9.x;
    u_xlat9.x = clamp(u_xlat9.x, 0.0, 1.0);
    u_xlat18.x = u_xlat9.x * -2.0 + 3.0;
    u_xlat9.x = u_xlat9.x * u_xlat9.x;
    u_xlat9.x = u_xlat9.x * u_xlat18.x;
    u_xlat16_5.xyz = u_xlat9.xxx * _NoiseTint.xyz + u_xlat9.xxx;
    u_xlat16_5.xyz = clamp(u_xlat16_5.xyz, 0.0, 1.0);
    u_xlat9.x = _NoiseRadius + (-_NoiseSmoothness);
    u_xlat18.x = (-u_xlat9.x) + u_xlat16_0;
    u_xlat16_32 = u_xlat16_0;
    u_xlat16_32 = clamp(u_xlat16_32, 0.0, 1.0);
    u_xlat0.x = _NoiseRadius + _NoiseSmoothness;
    u_xlat0.x = (-u_xlat9.x) + u_xlat0.x;
    u_xlat0.x = float(1.0) / u_xlat0.x;
    u_xlat0.x = u_xlat0.x * u_xlat18.x;
    u_xlat0.x = clamp(u_xlat0.x, 0.0, 1.0);
    u_xlat9.x = u_xlat0.x * -2.0 + 3.0;
    u_xlat0.x = u_xlat0.x * u_xlat0.x;
    u_xlat18.x = u_xlat0.x * u_xlat9.x;
    u_xlat16_6.xyz = (-u_xlat16_5.xyz) * u_xlat18.xxx + vec3(1.0, 1.0, 1.0);
    u_xlat16_5.xyz = u_xlat18.xxx * u_xlat16_5.xyz;
    u_xlat16_6.xyz = u_xlat16_6.xyz + u_xlat16_6.xyz;
    u_xlat16_33 = u_xlat16_32 * -2.0 + 3.0;
    u_xlat16_32 = u_xlat16_32 * u_xlat16_32;
    u_xlat16_32 = u_xlat16_32 * u_xlat16_33;
    u_xlat16_7.xyz = (-vec3(u_xlat16_32)) * _GlowColor.xyz + vec3(1.0, 1.0, 1.0);
    u_xlat16_6.xyz = (-u_xlat16_6.xyz) * u_xlat16_7.xyz + vec3(1.0, 1.0, 1.0);
    u_xlat16_7.xyz = vec3(u_xlat16_32) * _GlowColor.xyz;
    u_xlat16_32 = u_xlat9.x * u_xlat0.x + u_xlat16_32;
    SV_Target0.w = min(u_xlat16_32, 1.0);
    u_xlat16_8.xyz = u_xlat16_5.xyz * u_xlat16_7.xyz;
    u_xlatb0.xyz = greaterThanEqual(u_xlat16_5.xyzx, vec4(0.5, 0.5, 0.5, 0.0)).xyz;
    u_xlat0.x = u_xlatb0.x ? float(1.0) : 0.0;
    u_xlat0.y = u_xlatb0.y ? float(1.0) : 0.0;
    u_xlat0.z = u_xlatb0.z ? float(1.0) : 0.0;
;
    u_xlat1.xyz = (-u_xlat16_8.xyz) * vec3(2.0, 2.0, 2.0) + u_xlat16_6.xyz;
    u_xlat16_5.xyz = u_xlat16_8.xyz + u_xlat16_8.xyz;
    u_xlat0.xyz = u_xlat0.xyz * u_xlat1.xyz + u_xlat16_5.xyz;
    u_xlat0.xyz = clamp(u_xlat0.xyz, 0.0, 1.0);
    SV_Target0.xyz = u_xlat16_7.xyz * vec3(0.5, 0.5, 0.5) + u_xlat0.xyz;
    return;
}

#endif
````
