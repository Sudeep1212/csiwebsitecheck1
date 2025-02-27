// do not chnage ceate different js file


const STAR_COLOR = '#fff';
const STAR_SIZE = 3;
const STAR_MIN_SCALE = 0.2;
const OVERFLOW_THRESHOLD = 50;
const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let scale = 1;
let width;
let height;

let stars = [];
let pointerX = null;
let pointerY = null;

let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };
let touchInput = false;

generate();
resize();
step();

window.onresize = resize;
document.addEventListener('mousemove', onMouseMove, { passive: true });
document.addEventListener('touchmove', onTouchMove, { passive: true });
document.addEventListener('mouseleave', onMouseLeave, { passive: true });

function generate() {
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE)
        });
    }
}

function placeStar(star) {
    star.x = Math.random() * width;
    star.y = Math.random() * height;
}

function recycleStar(star) {
    let direction = 'z';
    let vx = Math.abs(velocity.x),
        vy = Math.abs(velocity.y);

    if (vx > 1 || vy > 1) {
        let axis;

        if (vx > vy) {
            axis = Math.random() < vx / (vx + vy) ? 'h' : 'v';
        } else {
            axis = Math.random() < vy / (vx + vy) ? 'v' : 'h';
        }

        if (axis === 'h') {
            direction = velocity.x > 0 ? 'l' : 'r';
        } else {
            direction = velocity.y > 0 ? 't' : 'b';
        }
    }

    star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

    if (direction === 'z') {
        star.z = 0.1;
        star.x = Math.random() * width;
        star.y = Math.random() * height;
    } else if (direction === 'l') {
        star.x = -OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
    } else if (direction === 'r') {
        star.x = width + OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
    } else if (direction === 't') {
        star.x = width * Math.random();
        star.y = -OVERFLOW_THRESHOLD;
    } else if (direction === 'b') {
        star.x = width * Math.random();
        star.y = height + OVERFLOW_THRESHOLD;
    }
}

function resize() {
    scale = window.devicePixelRatio || 1;
    width = window.innerWidth * scale;
    height = window.innerHeight * scale;
    canvas.width = width;
    canvas.height = height;
    stars.forEach(placeStar);
}

function step() {
    context.clearRect(0, 0, width, height);
    update();
    render();
    requestAnimationFrame(step);
}

function update() {
    velocity.tx *= 0.96;
    velocity.ty *= 0.96;

    velocity.x += (velocity.tx - velocity.x) * 0.5; // Keep the original velocity update
    velocity.y += (velocity.ty - velocity.y) * 0.5;

    stars.forEach((star) => {
        star.x += velocity.x * star.z;
        star.y += velocity.y * star.z;

        star.x += (star.x - width / 2) * velocity.z * star.z;
        star.y += (star.y - height / 2) * velocity.z * star.z;
        star.z += velocity.z;

        if (star.x < -OVERFLOW_THRESHOLD || star.x > width + OVERFLOW_THRESHOLD || star.y < -OVERFLOW_THRESHOLD || star.y > height + OVERFLOW_THRESHOLD) {
            recycleStar(star);
        }
    });
}

function render() {
    stars.forEach((star) => {
        context.beginPath();
        context.lineCap = 'round';
        context.lineWidth = STAR_SIZE * star.z * scale;
        context.globalAlpha = 0.4 + 0.5 * Math.random();
        context.strokeStyle = STAR_COLOR;

        context.moveTo(star.x, star.y);

        var tailX = velocity.x * 0.4;
        var tailY = velocity.y * 0.4;

        if (Math.abs(tailX) < 0.1) tailX = 0.5;
        if (Math.abs(tailY) < 0.1) tailY = 0.5;

        context.lineTo(star.x + tailX, star.y + tailY);
        context.stroke();
    });
}

function movePointer(x, y) {
    if (pointerX !== null && pointerY !== null) {
        let ox = x - pointerX,
            oy = y - pointerY;

        velocity.tx += (ox / 8 * scale) * (touchInput ? 1 : -1);
        velocity.ty += (oy / 8 * scale) * (touchInput ? 1 : -1);
    }

    pointerX = x;
    pointerY = y;
}

function onMouseMove(e) {
    movePointer(e.clientX * scale, e.clientY * scale);
}

function onTouchMove(e) {
    touchInput = true;
    movePointer(e.touches[0].clientX * scale, e.touches[0].clientY * scale);
}

function onMouseLeave() {
    pointerX = null;
    pointerY = null;
}




//////////////////////////////////




canvas = document.getElementById('canvas');
const overlayDivs = document.querySelectorAll('.overlay-div');

overlayDivs.forEach(div => {
    div.addEventListener('mousemove', function(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Create a new event to pass to the canvas
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: mouseX,
            clientY: mouseY,
            bubbles: true,
            cancelable: true,
            view: window
        });

        canvas.dispatchEvent(mouseEvent);
    });
});
