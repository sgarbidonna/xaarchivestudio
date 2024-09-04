console.log(window.innerWidth , 'WIDTH');
console.log(window.innerHeight , 'HEIGHT');

if (screen.width > 1300) {
    var body = document.body,
    scrollWrap = document.getElementsByClassName("smooth-scroll-wrapper")[0],
    height = scrollWrap.getBoundingClientRect().height - 1,
    speed = 0.1 ;

    console.log(speed);
} else {
    var body = document.body,
    scrollWrap = document.getElementsByClassName("smooth-scroll-wrapper")[0],
    height = scrollWrap.getBoundingClientRect().height - 1,
    speed = 1 ;

    console.log(speed);
}


var offset = 0;
body.style.height = Math.floor(height) + "px";


function smoothScroll() {
    
    offset += (window.scrollY - offset) * speed;
    var scroll = "translateY(-" + offset + "px) translateZ(0)";
    scrollWrap.style.transform = scroll;

    callScroll = requestAnimationFrame(smoothScroll);
}

smoothScroll();


addEventListener("resize", (event) => {
    

    
    if (screen.width > 1300) {
        var body = document.body,
        scrollWrap = document.getElementsByClassName("smooth-scroll-wrapper")[0],
        height = scrollWrap.getBoundingClientRect().height - 1,
        speed = 0.1 ;
    
        console.log(speed);
    } else {
        var body = document.body,
        scrollWrap = document.getElementsByClassName("smooth-scroll-wrapper")[0],
        height = scrollWrap.getBoundingClientRect().height - 1,
        speed = 1 ;
    
        console.log(speed);
    }

    body.style.height = Math.floor(height) + "px";
    

    smoothScroll();
});