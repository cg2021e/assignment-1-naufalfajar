let cubeLight = [
    // Face A Back
    -0.1, -0.1, -0.1,      255, 255, 255,        0, 0, -1, 10, // 0
    0.1, -0.1, -0.1,        255, 255, 255,        0, 0, -1, 10, // 1
    0.1, 0.1, -0.1,         255, 255, 255,        0, 0, -1, 10, // 2
    -0.1, 0.1, -0.1,        255, 255, 255,        0, 0, -1, 10, // 3

    // Face B Front
    -0.1, -0.1, 0.1,        255, 255, 255,        0, 0, 1, 10, // 4
    0.1, -0.1, 0.1,         255, 255, 255,        0, 0, 1, 10, // 5
    0.1, 0.1, 0.1,          255, 255, 255,        0, 0, 1, 10, // 6
    -0.1, 0.1, 0.1,         255, 255, 255,        0, 0, 1, 10, // 7

    // Face C Left
    -0.1, -0.1, -0.1,       255, 255, 255,        -1, 0, 0, 10, // 8
    -0.1,  0.1, -0.1,        255, 255, 255,        -1, 0, 0, 10, // 9
    -0.1,  0.1,  0.1,         255, 255, 255,        -1, 0, 0, 10, // 10
    -0.1, -0.1, -0.1,        255, 255, 255,        -1, 0, 0, 10, // 11

    // Face D Right
    0.1, -0.1, -0.1,       255, 255, 255,        1, 0, 0, 10, // 12
    0.1, 0.1, -0.1,         255, 255, 255,        1, 0, 0, 10, // 13
    0.1, 0.1, 0.1,          255, 255, 255,        1, 0, 0, 10, // 14
    0.1, -0.1, 0.1,         255, 255, 255,        1, 0, 0, 10, // 15

    // Face E Top
    -0.1, -0.1, -0.1,       255, 255, 255,        0, -1, 0, 10, // 16
    -0.1, -0.1, 0.1,        255, 255, 255,        0, -1, 0, 10, // 17
    0.1, -0.1, 0.1,         255, 255, 255,        0, -1, 0, 10, // 18
    0.1, -0.1, -0.1,        255, 255, 255,        0, -1, 0, 10, // 19

    // Face F Down
    -0.1, 0.1, -0.1,        255, 255, 255,        0, 1, 0, 10, // 20
    -0.1, 0.1,  0.1,         255, 255, 255,        0, 1, 0, 10, // 21
     0.1, 0.1,  0.1,          255, 255, 255,        0, 1, 0, 10, // 22
     0.1, 0.1, -0.1,         255, 255, 255,        0, 1, 0, 10, // 23

]

var indices_cl = [
    0, 1, 2,     0, 2, 3,     // Face A
    4, 5, 6,     4, 6, 7,     // Face B
    8, 9, 10,    8, 10, 11,   // Face C
    12, 13, 14,  12, 14, 15,  // Face D
    16, 17, 18,  16, 18, 19,  // Face E
    20, 21, 22,  20, 22, 23,  // Face F     
];