/**@type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 700;
let canvasPosition = canvas.getBoundingClientRect();

const explosions = [];

class Explosion {
    constructor(x, y){
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.7; // x * 0.5 faster than x / 2
        this.height = this.spriteHeight * 0.7;  // y * 0.5 faster than y / 2
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;
        this.image = new Image(); // create new blank html image element
        this.image.src = 'boom.webp';
        this.frame = 0;
        this.timer = 0;
        this.angle = Math.random() * 6.2;
        this.sound = new Audio();
        this.sound.src = 'boom.wav';
    }
    update(){
        if (this.frame === 0) this.sound.play();

        ++this.timer;

        if (this.timer % 10 === 0) {

            ++this.frame;            
        }
    }
    draw(){

        ctx.save();

        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.drawImage(this.image, 
            this.spriteWidth * this.frame, 0, 
            this.spriteWidth, 
            this.spriteHeight, 
            0 - this.width * 0.5, 
            0 - this.height * 0.5, 
            this.width, this.height);

        ctx.restore();
    }
}

window.addEventListener('click', function(e){

    createAnimation(e);
});

// window.addEventListener('mousemove', function(e){

//     createAnimation(e);
// });

function createAnimation(e){
    
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top;
    explosions.push(new Explosion(positionX, positionY));
}

function animate(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < explosions.length; ++i) {
        
        explosions[i].update();
        explosions[i].draw();

        if (explosions[i].frame > 5) {
            
            explosions.splice(i, 1);
            --i;
        }
    }
    requestAnimationFrame(animate);
}
animate();
