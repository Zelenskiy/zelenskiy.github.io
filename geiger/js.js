window.onload = function () {
    set_pos_elem();


    window.onresize = function(){
        set_pos_elem();
    }

    function set_pos_elem(){
        var im = document.getElementById("image");
        var im_w = im.width;
        var im_h = im.height;
        var b_w = parseInt(im_w/5);
        var b_h = parseInt(im_h/6.5);
        var b_t = parseInt(im_h / 6);
        var l_t = parseInt(im_h / 2.5+12);
        var l_w = parseInt(im_w / 2.2);
        var l_h = parseInt(im_h / 14);


        document.getElementById("button_on").style.width = b_w +"px";
        document.getElementById("button_on").style.height = b_h +"px";
        document.getElementById("button_on").style.right = 10 +"px";
        document.getElementById("button_on").style.top = b_t +"px";

        document.getElementById("lbl").style.width = l_w +"px";
        document.getElementById("lbl").style.height = l_h +"px";
        document.getElementById("lbl").style.right = parseInt(im_w/3.5+15) +"px";
        document.getElementById("lbl").style.top = l_t +"px";
        document.getElementById("lbl").style.fontSize = parseInt(im_h/15)+"px";

    }

    // document.getElementById('mn').innerText = "hello";

    // base_image = new Image();
    // base_image.src = './images/d1.png';

    let k = 0.5001;
    let t = 100;
    let fon = 0;
    let count_beep = 0;
    let count_no_beep = 0;
    let start = false;
    const engine = new Audio('./audio/alarm.mp3');
    const bip = new Audio('./audio/bip1.mp3');
    // const audio = new Audio('./audio/car.mp3');
    engine.loop = true;
    bip.loop = false;
    engine.volume = 0.3;
    bip.volume = 0.3;
    var tik = 0;

    function sayBeep() {
        if (start){
            setTimeout(sayBeep, t);
            fon = count_beep/count_no_beep*11;
            if (Math.random()<k){
                count_beep++;
                bip.play();

            } else {
                count_no_beep++;
            }
            if (++tik%5==0) {
                if (count_no_beep + count_beep < 50) {
                    if (document.getElementById("lbl").innerText == "")
                        document.getElementById("lbl").innerText = "0.00";
                    else {
                        document.getElementById("lbl").innerText = "";
                    }
                } else {

                    document.getElementById("lbl").innerText = (fon / 100).toFixed(2);
                }

            }
        }
    }

    // setTimeout(sayBip, 1000);

    function float_to_fix2(f){
        s =String(f);
        l = s.length;
        n = s.indexOf('.');
        if(l-n<3){
            sot = s.substring(0,n);
            drob = s.substring(n+1);
            s=sot+'.'+drob+'0';
        }
        if (s.length>5){
            s = s.substring(0,5);
        }
        return s;
    }

    document.querySelector('.start').addEventListener('click', function () {
        if (start === false) {
            start = true;
            tik = 0;
            setTimeout(sayBeep, t);
            this.innerHTML = 'stop';
            document.getElementById("lbl").innerText ="0.00";
            // engine.play();
        }
        else {
            // глушим
            start = false;
            this.innerHTML = 'start';
            count_beep = 0;
            count_no_beep = 0;
            document.getElementById("lbl").innerText ="";
            // engine.pause();

        }
    });


}