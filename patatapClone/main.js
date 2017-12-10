var sound = new Howl({
    urls: ['sounds/bubbles.mp3']
});
var circles = [];


function onKeyDown(event){
    
    sound.play() 
    var maxPoint = new Point(view.size.width, view.size.height);
    var randomPoint = Point.random();
    var point = maxPoint * randomPoint;
    circles.push(new Path.Circle(point, 50).fillColor ='orange');
    
}


   var animatedCircle =  new Path.Circle(new Point(300,300), 300);
    animatedCircle.fillColor = 'red';
    
    function onFrame(event){
        for(var i = 0; i < circles.length; i++){
            circles[i].fillColor.hue += 1;
        }
        animatedCircle.fillColor.hue += 1;
        animatedCircle.scale(.9)
    }