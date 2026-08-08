# 缓动类型

0. Linear
```typescript
function linear(x: number): number {
    return x;
}
```

1. InQuad
```typescript
function easeInQuad(x: number): number {
    return x * x;
}
```
2. OutQuad
```typescript
function easeOutQuad(x: number): number {
    return 1 - (1 - x) * (1 - x);
}
```
3. InOutQuad
```typescript
function easeInOutQuad(x: number): number {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}
```
4. InCubic
```typescript
function easeInCubic(x: number): number {
    return x * x * x;
}
```
5. OutCubic
```typescript
function easeOutCubic(x: number): number {
    return 1 - Math.pow(1 - x, 3);
}
```
6. InOutCubic
```typescript
function easeInOutCubic(x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
```
7. InQuart
```typescript
function easeInQuart(x: number): number {
    return x * x * x * x;
}
```
8. OutQuart
```typescript
function easeOutQuart(x: number): number {
    return 1 - Math.pow(1 - x, 4);
}
```
9. InOutQuart
```typescript
function easeInOutQuart(x: number): number {
    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}
```
10. InQuint
```typescript
function easeInQuint(x: number): number {
    return x * x * x * x * x;
}
```
11. OutQuint
```typescript
function easeOutQuint(x: number): number {
    return 1 - Math.pow(1 - x, 5);
}
```
12. InOutQuint
```typescript
function easeInOutQuint(x: number): number {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}
```
13. Zero
```typescript
function easeZero(x: number): number {
    return 0;
}
```
14. One
```typescript
function easeOne(x: number): number {
    return 1;
}
```
15. InCirc
```typescript
function easeInCirc(x: number): number {
    return 1 - Math.sqrt(1 - Math.pow(x, 2));
}
```
16. OutCirc
```typescript
function easeOutCirc(x: number): number {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
}
```
17. OutSine
```typescript
function easeOutSine(x: number): number {
    return Math.sin((x * Math.PI) / 2);
}
```
18. InSine
```typescript
function easeInSine(x: number): number {
    return 1 - Math.cos((x * Math.PI) / 2);
}
```
