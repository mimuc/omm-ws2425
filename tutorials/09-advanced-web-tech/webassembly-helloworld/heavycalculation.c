#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
int multiply(int x, int y){
    return x*y;
}