function main() {
    //Access the canvas through DOM: Document Object Model
    var canvas = document.getElementById('myCanvas');   // The paper
    var gl = canvas.getContext('webgl');                // The brush and the paints

    var init_left_vertices = [
        // x y R G B
        -0.6, -0.55, 1.0, 1.0, 1.0,     //leftdownfoot
        -0.4, -0.55, 1.0, 1.0, 1.0,     //rightdownfoot

        -0.7, -0.45, 1.0, 1.0, 1.0,     // leftdownbody
        -0.3, -0.45, 1.0, 1.0, 1.0,      // rightdownbody

        -0.7, 0.2, 1.0, 1.0, 1.0,     // leftupbody
        -0.3, 0.2, 1.0, 1.0, 1.0,     // rightupbody

        -0.65,  0.3, 0.0, 0.0, 1.0,     //leftdownhead
        -0.35,  0.3, 0.0, 0.0, 1.0,     //rightdownhead
        
        -0.65,  0.4, 0.0, 0.0, 1.0,     //leftuphead
        -0.35,  0.4, 0.0, 0.0, 1.0      //rightuphead
    ];
    var init_right_vertices = [
        // x y R G B
        0.6, -0.55, 1.0, 1.0, 1.0,     //leftdownfoot
        0.4, -0.55, 1.0, 1.0, 1.0,     //rightdownfoot

        0.7, -0.45, 1.0, 1.0, 1.0,     // leftdownbody
        0.3, -0.45, 1.0, 1.0, 1.0,      // rightdownbody

        0.7, 0.2, 1.0, 1.0, 1.0,     // leftupbody
        0.3, 0.2, 1.0, 1.0, 1.0,     // rightupbody

        0.65,  0.3, 0.0, 0.0, 1.0,     //leftdownhead
        0.35,  0.3, 0.0, 0.0, 1.0,     //rightdownhead
        
        0.65,  0.4, 0.0, 0.0, 1.0,     //leftuphead
        0.35,  0.4, 0.0, 0.0, 1.0      //rightuphead
    ];

    //Generate triangles from init_vertices
    var right_vertices = [];
    var left_vertices = [];
    let count = 10;
    for (let i = 0; i < 8; i++)//total
    {
        for(let k = 0; k < 3; k++) //triangle
            {
                if(k==1) count = count - 15;
                for(let j = 0; j < 5; j++) //X Y R G B
                    {
                        right_vertices[(i*15) + (k*5) + j] = init_right_vertices[count];
                        left_vertices[(i*15) + (k*5) + j] = init_left_vertices[count];

                        //triangle include tutup biar GAK biru
                        if((i==4 || i==5) && (count%5==2 || count%5==3)) 
                            {
                                left_vertices[(i*15) + (k*5) + j] = 1.0;
                                right_vertices[(i*15) + (k*5) + j] = 1.0;
                            }
                        count++;
                    }
            }
        count = count + 5;
    }   
    var vertices = [...left_vertices,...right_vertices]; 
    

    // Create a linked-list for storing the vertices data
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        var vertexShaderSource = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying  vec3 vColor;
        uniform mat4 uTranslate;
        void main(){
            gl_Position = uTranslate * vec4(aPosition, 0.0, 1.0); // Center of the coordinate
            vColor = aColor;
        }
    `;

    var fragmentShaderSource = `
        precision mediump float;
        varying vec3 vColor;
        void main(){
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;

    // Create .c in GPU
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    // Compile .c into .o
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    // Prepare a .exe shell (shader program)
    var shaderProgram = gl.createProgram();

    // Put the two .o files into the shell
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    // Link the two .o files, so together they can be a runnable program/context.
    gl.linkProgram(shaderProgram);

    // Start using the context (analogy: start using the paints and the brushes)
    gl.useProgram(shaderProgram);

    // Teach the computer how to collect
    //  the positional values from ARRAY_BUFFER
    //  to each vertex being processed
    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(aPosition);

    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(aColor);

    var speed = 0.0176;
    var dy = 0;
    // Create a uniform to animate the vertices
    const uTranslate = gl.getUniformLocation(shaderProgram, 'uTranslate');
    
    function render() {
        //control the bouncing range
        if (dy >= 0.75 || dy <= -0.55) speed = -speed;
		dy += speed;
        
        const rightPosition = [
		1.0, 0.0, 0.0, 0.0,
		0.0, 1.0, 0.0, 0.0,
		0.0, 0.0, 1.0, 0.0,
		0, dy, 0.0, 1.0,
	]   

	const leftPosition = [
		1.0, 0.0, 0.0, 0.0,
		0.0, 1.0, 0.0, 0.0,
		0.0, 0.0, 1.0, 0.0,
		0, 0.0, 0.0, 1.0,
	]
		
        //coloring canvas
	gl.clearColor(0.87, 0.87, 0.87, 1); 
	gl.clear(gl.COLOR_BUFFER_BIT);

        gl.uniformMatrix4fv(uTranslate, false, leftPosition);
        gl.drawArrays(gl.TRIANGLES, 0, left_vertices.length/5);

		gl.uniformMatrix4fv(uTranslate, false, rightPosition);
        gl.drawArrays(gl.TRIANGLES, left_vertices.length/5, right_vertices.length/5);
            
        requestAnimationFrame(render);
    }
    render();   
   
    
   
}