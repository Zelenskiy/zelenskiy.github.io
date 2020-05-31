let canvas = document.getElementById('c1');
let ctx = canvas.getContext('2d');
let myColor = 'red';
let cW = canvas.style.width;
let cH = canvas.style.height;
cW = 500;
cH = 688;

let mmm = {
    0: 0.2,
    1: 0.4,
    2: 0.6,
    3: 0.8,
    4: 1,
    5: 1.2,
    6: 1.4,
    7: 1.6,
    8: 1.8,
    9: 2,
    10: 2.2,
    11: 2.4,
    12: 2.6,
    13: 2.8,
    14: 3,
    15: 3.2,
    16: 3.4,
    17: 3.6,
    18: 3.8,
    19: 4
};

let x0 = 0;
let y0 = 0;
let wimage = 0;
let himage = 0;
let platform = "Desktop";
if ((navigator.userAgent.match('iPhone')) || (navigator.userAgent.match('Android')) ||
    (navigator.userAgent.match('iPad')) ||
    (navigator.userAgent.match('RIM'))) {
    platform = "Mobile";
} else {
    platform = "Desktop";
}

let mash = 4;

// let canv = document.getElementById('c1').style.width = cW;
// let canv = document.getElementById('c1').style.height = cH;


let mode = 0; // 0 - виставлення маркерів, 1 - калібрування (точка 1), 2 - перетягування
let kalibr_btn = 0;
let mark_btn = 0;


let k1 = {
    x: 10,
    y: -1000000,
    color: "red",
};
let k2 = {
    x: 10,
    y: -1000000,
    color: "red",
};

let m1 = {
    x: 10,
    y: -1000000,
    color: "red",
};
let m2 = {
    x: 50,
    y: -1000000,
    color: "green",
};
let m3 = {
    x: 100,
    y: -1000000, color: "blue",
};

make_base();

function mk_trans(c, shift) {
    return mmm[mash] * (c + shift) ;
}

function draw_markers() {


    ctx.beginPath();
    ctx.rect(mk_trans(m1.x, x0) - 5, mk_trans(m1.y, y0) - 5, 10, 10);
    ctx.strokeStyle = m1.color;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(mk_trans(m2.x, x0) - 5, mk_trans(m2.y, y0) - 5, 10, 10);
    ctx.strokeStyle = m2.color;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(mk_trans(m3.x, x0) - 5, mk_trans(m3.y, y0) - 5, 10, 10);
    ctx.strokeStyle = m3.color;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(mk_trans(k1.x, x0) - 5, mk_trans(k1.y, y0) - 5, 10, 10);
    ctx.strokeStyle = k1.color;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(mk_trans(k2.x, x0) - 5, mk_trans(k2.y, y0) - 5, 10, 10);
    ctx.strokeStyle = k2.color;
    ctx.stroke();
    ctx.closePath();


};


function make_base() {
    base_image = new Image();
    base_image.src = './track.png';
    wimage = base_image.width;
    himage = base_image.height;

    // ctx.drawImage(base_image, x0, y0);
    ctx.drawImage(base_image, x0 * mmm[mash], y0 * mmm[mash], wimage * mmm[mash], himage * mmm[mash]);

}

function draw_chordes() {
    // обчислюємо центр кола, центри відрізків, радіус кола

    let ma = (m2.y - m1.y) / (m2.x - m1.x);
    let mb = (m3.y - m2.y) / (m3.x - m2.x);
    let xc0 = (ma * mb * (m1.y - m3.y) + mb * (m1.x + m2.x) - ma * (m2.x + m3.x)) / (2 * (mb - ma));
    let yc0 = -1 / ma * (xc0 - (m1.x + m2.x) / 2) + (m1.y + m2.y) / 2;
    let x12 = (m1.x + m2.x) / 2;
    let y12 = (m1.y + m2.y) / 2;
    let x23 = (m2.x + m3.x) / 2;
    let y23 = (m2.y + m3.y) / 2;
    let r = Math.sqrt((m1.x - xc0) * (m1.x - xc0) + (m1.y - yc0) * (m1.y - yc0));
    let tmp = document.getElementById("calibr_edit").value;

    tmp = tmp.replace(',', '.');
    let mashtab = parseFloat(tmp);
    console.log("mashtab->" + mashtab);
    let kalibr_length = Math.sqrt((k1.x - k2.x) * (k1.x - k2.x) + (k1.y - k2.y) * (k1.y - k2.y));
    let R = r * mashtab / kalibr_length;
    document.getElementById("lbl2").innerText = "R = " + R;

    ctx.beginPath();
    ctx.moveTo(mk_trans(m1.x, x0), mk_trans(m1.y, y0));
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.lineTo(mk_trans(m2.x, x0), mk_trans(m2.y, y0));
    ctx.stroke();
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.moveTo(mk_trans(x12, x0), mk_trans(y12, y0));
    ctx.lineTo(mk_trans(xc0, x0), mk_trans(yc0, y0));
    ctx.stroke()
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(mk_trans(m2.x, x0), mk_trans(m2.y, y0));
    ctx.strokeStyle = "blue";
    ctx.stroke();
    ctx.lineTo(mk_trans(m3.x, x0), mk_trans(m3.y, y0));
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.moveTo(mk_trans(x23, x0), mk_trans(y23, y0));
    ctx.lineTo(mk_trans(xc0, x0), mk_trans(yc0, y0));
    ctx.stroke()
    ctx.closePath();

    //Малюємо дугу
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "green";
    ctx.arc(mk_trans(xc0, x0), mk_trans(yc0, y0), r * mmm[mash], 0, 2 * Math.PI);
    ctx.stroke()
    ctx.closePath();
};

function reset_color_markers_btn() {
    document.getElementById('o1').style.background = "rgba(250, 50, 50, .5)";
    document.getElementById('o2').style.background = "rgba(50, 150, 50, .5)";
    document.getElementById('o3').style.background = "rgba(50, 50, 150, .5)";
    document.getElementById('k1').style.background = "rgba(50, 50, 50, 1)";
    document.getElementById('k2').style.background = "rgba(50, 50, 50, 1)";
}

document.getElementById('o1').onclick = function () {
    mode = 0;
    mark_btn = 1;
    reset_color_markers_btn();
    document.getElementById('o1').style.background = "rgba(255, 50, 50, 1)";
};
document.getElementById('o2').onclick = function () {
    mode = 0;
    mark_btn = 2;
    reset_color_markers_btn();
    document.getElementById('o2').style.background = "rgba(50, 255, 50, 1)";
};
document.getElementById('o3').onclick = function () {
    mode = 0;
    mark_btn = 3;
    reset_color_markers_btn();
    document.getElementById('o3').style.background = "rgba(50, 50, 255, 1)";
};
document.getElementById('k1').onclick = function () {
    mode = 1;
    kalibr_btn = 1;
};
document.getElementById('k2').onclick = function () {
    mode = 1;
    kalibr_btn = 2;
};

// document.getElementById('calibr').onclick = function(){
// 	let card = document.getElementById("calibr");
// 	if (mode != 1) card.selectedIndex = 1;
// 	mode = 1;
// };

document.getElementById('btn_draw').onclick = function () {
    make_base();
    draw_markers();
    if ((m1.y > 0) && (m2.y > 0) && (m3.y > 0)) {
        draw_chordes();
    }
};

// document.getElementById('btn_calibr').onclick = function(){
// 	mode = 1;
// 	let card = document.getElementById("calibr");
// 	card.selectedIndex = 0;
//
// };

document.getElementById('btn_clear').onclick = function () {
    ctx.clearRect(0, 0, cW, cH);
    make_base();
};

document.getElementById('btn_zoom_up').onclick = function () {
    console.log("btn_zoom_up");
    mash++;
    if (mash > 19) mash = 19;
    //Модифікація координат маркерів
    // m1.x = (m1.x)*mmm[mash];
    // m1.y = (m1.y)*mmm[mash];


    //==============================


    ctx.clearRect(0, 0, cW, cH);
    make_base();
    draw_markers();
    if ((m1.y > 0) && (m2.y > 0) && (m3.y > 0)) {
        draw_chordes();
    }
};

document.getElementById('btn_zoom_default').onclick = function () {
    mash = 4;
    x0 = 0;
    y0 = 0;
    ctx.clearRect(0, 0, cW, cH);
    make_base();
    draw_markers();
    if ((m1.y > 0) && (m2.y > 0) && (m3.y > 0)) {
        draw_chordes();
    }
};

document.getElementById('btn_zoom_down').onclick = function () {
    //Модифікація координат маркерів
    // m1.x -= (m1.x)*0.2;
    // m1.y -= (m1.y)*0.2;


    //==============================
    mash--;
    if (mash < 0) mash = 0;
    ctx.clearRect(0, 0, cW, cH);
    make_base();
    draw_markers();
    if ((m1.y > 0) && (m2.y > 0) && (m3.y > 0)) {
        draw_chordes();
    }
};

document.getElementById('btn_drag').onclick = function () {
    mode = 2;
};

let xx0 = 0;
let yy0 = 0;
ssss();

function ssss() {
    if (platform == "Mobile") {
        // document.getElementById("c1").style.width = "100%";

        // document.getElementById("c1").style.height = yImage
        let w = window.innerWidth - 40;
        let h = window.innerHeight - 40;
        // let xImage = document.getElementById("c1").offsetWidth;
        // let yImage = document.getElementById("c1").offsetHeight;
        document.getElementById("c1").style.width = w + "px";
        document.getElementById("c1").style.height = parseInt(h - h / 10) + "px";
        document.getElementById("c1").setAttribute("width", String(w));
        document.getElementById("c1").setAttribute("height", String(parseInt(h - h / 10)));

        document.getElementById("xcont").style.position = "absolute";
        document.getElementById("xcont").style.width = "50%";
        document.getElementById("xcont").style.zIndex = "1";
        document.getElementById("xcont").style.top = "-100px";
        document.getElementById("xcont").style.left = "20px";
        document.getElementById("xcont").style.padding = "20px 20px 20px 20px";


        /*#xcont {*/
        /*	position: absolute;*/
        /*	width: 50%;*/
        /*	z-index: 1;*/
        /*	top: 50px;*/
        /*	left: 50px;*/
        /*	padding: 20px 20px 20px 20px ;*/
        /*}*/


        make_base();
    } else {
        document.getElementById("c1").style.width = "500px";
        document.getElementById("c1").style.height = "688px";
        document.getElementById("c1").setAttribute("width", "500");
        document.getElementById("c1").setAttribute("height", "688");
        // document.getElementById("c1").style.top = 0+"px";
        make_base();
    }
}

window.onresize = function () {
    ssss();
}

//document.querySelector('#out').innerHTML = navigator.userAgent;


function mk_anti_trans(y, shift) {
    return y/mmm[mash]-shift;
}

if (platform == "Mobile") {
    canvas.onpointerdown = function (event) {
        let r1 = Math.sqrt((event.offsetX - m1.x) * (event.offsetX - m1.x) + (event.offsetY - m1.y) * (event.offsetY - m1.y));
        let r2 = Math.sqrt((event.offsetX - m2.x) * (event.offsetX - m2.x) + (event.offsetY - m2.y) * (event.offsetY - m2.y));
        let r3 = Math.sqrt((event.offsetX - m3.x) * (event.offsetX - m3.x) + (event.offsetY - m3.y) * (event.offsetY - m3.y));
        if (r1 < 5) {
            mark_btn = 1;
        } else if (r2 < 5) {
            mark_btn = 2;
        } else if (r3 < 5) {
            mark_btn = 3;
        }
        ;
        xx0 = event.offsetX;
        yy0 = event.offsetY;

        draw_markers();

        canvas.onpointermove = function (event) {
            ctx.clearRect(0, 0, cW, cH);
            if (mode == 0) {

                let card = document.getElementById("markers");
                if (mark_btn == 1) {
                    m1.x = event.offsetX;
                    m1.y = event.offsetY;
                } else if (mark_btn == 2) {
                    m2.x = event.offsetX;
                    m2.y = event.offsetY;
                } else if (mark_btn == 3) {
                    m3.x = event.offsetX;
                    m3.y = event.offsetY;
                }
                ;


                make_base();
                draw_markers();

                if ((m1.y > 0) && (m2.y > 0) && (m3.y > 0)) {
                    draw_chordes();
                }
            } else if (mode == 1) {
                let card = document.getElementById("calibr");
                if (kalibr_btn == 1) {
                    k1.x = event.offsetX;
                    k1.y = event.offsetY;
                } else if (kalibr_btn == 2) {
                    k2.x = event.offsetX;
                    k2.y = event.offsetY;
                }
                make_base();
                draw_markers();
                if ((m1.y > 0) && (m2.y > 0) && (m3.y > 0)) {
                    draw_chordes();
                }
            } else if (mode == 2) {
                x0 += event.offsetX - xx0;
                y0 += event.offsetY - yy0;
                xx0 = event.offsetX;
                yy0 = event.offsetY;
                make_base();
                draw_markers();
                if ((m1.y > 0) && (m2.y > 0) && (m3.y > 0)) {
                    draw_chordes();
                }
            }


        }
        canvas.onpointerup = function () {
            canvas.onpointermove = null;
            console.log("x0=" + x0 + "  y0=" + y0);
        }
    }
} else {

    canvas.onmousedown = function (event) {
        console.log("m1.x->" + m1.x + "	m1.y->" + m1.y);
        console.log("x0->" + x0 + "	y0->" + y0);
        console.log("mash" + mash);


        let rk1 = Math.sqrt(Math.pow(event.offsetX - mk_trans(k1.x, x0), 2) +
            Math.pow(event.offsetY - mk_trans(k1.y, y0), 2));
        let rk2 = Math.sqrt(Math.pow(event.offsetX - mk_trans(k2.x, x0), 2) +
            Math.pow(event.offsetY - mk_trans(k2.y, y0), 2));
        let r1 = Math.sqrt(Math.pow(event.offsetX - mk_trans(m1.x, x0), 2) +
            Math.pow(event.offsetY - mk_trans(m1.y, y0), 2));
        let r2 = Math.sqrt(Math.pow(event.offsetX - mk_trans(m2.x, x0), 2) +
            Math.pow(event.offsetY - mk_trans(m2.y, y0), 2));
        let r3 = Math.sqrt(Math.pow(event.offsetX - mk_trans(m3.x, x0), 2) +
            Math.pow(event.offsetY - mk_trans(m3.y, y0), 2));
        if (rk1 < 5) {
            mode = 1;
            kalibr_btn = 1;
            reset_color_markers_btn();
            document.getElementById('k1').style.background = "rgba(255, 50, 50, 1)";
        } else
        if (rk2 < 5) {
            mode = 1;
            kalibr_btn = 2;
            reset_color_markers_btn();
            document.getElementById('k2').style.background = "rgba(255, 50, 50, 1)";
        } else

        if (r1 < 5) {
            mark_btn = 1;
            reset_color_markers_btn();
            document.getElementById('o1').style.background = "rgba(255, 50, 50, 1)";
        } else if (r2 < 5) {
            mark_btn = 2;
            reset_color_markers_btn();
            document.getElementById('o2').style.background = "rgba(50, 255, 50, 1)";
        } else if (r3 < 5) {
            mark_btn = 3;
            mode = 0;
            mark_btn = 3;
            reset_color_markers_btn();
            document.getElementById('o3').style.background = "rgba(50, 50, 255, 1)";
        };
        xx0 = event.offsetX;
        yy0 = event.offsetY;

        canvas.onmousemove = function (event) {
            ctx.clearRect(0, 0, cW, cH);
            if (mode == 0) {
                let card = document.getElementById("markers");
                if (mark_btn == 1) {
                    m1.x = mk_anti_trans(event.offsetX, x0) ;
                    m1.y = mk_anti_trans(event.offsetY, y0) ;
                } else if (mark_btn == 2) {
                    m2.x = mk_anti_trans(event.offsetX, x0) ;
                    m2.y = mk_anti_trans(event.offsetY, y0) ;
                } else if (mark_btn == 3) {
                    m3.x = mk_anti_trans(event.offsetX, x0) ;
                    m3.y = mk_anti_trans(event.offsetY, y0) ;
                };


                make_base();
                draw_markers();

                if ((m1.y > 0) && (m2.y > 0) && (m3.y > 0)) {
                    draw_chordes();
                }
            } else if (mode == 1) {
                let card = document.getElementById("calibr");
                if (kalibr_btn == 1) {
                    k1.x =mk_anti_trans(event.offsetX, x0) ;
                    k1.y = mk_anti_trans(event.offsetY,y0) ;
                } else if (kalibr_btn == 2) {
                    k2.x = mk_anti_trans(event.offsetX, x0) ;
                    k2.y = mk_anti_trans(event.offsetY, y0) ;
                }
                make_base();
                draw_markers();
                if ((m1.y > 0) && (m2.y > 0) && (m3.y > 0)) {
                    draw_chordes();
                }
            } else if (mode == 2) {
                let evX = event.offsetX;
                let evY = event.offsetY;
                x0 += (evX - xx0);
                y0 += (evY - yy0);


                xx0 = evX;
                yy0 = evY;
                make_base();
                draw_markers();
                if ((m1.y > 0) && (m2.y > 0) && (m3.y > 0)) {
                    draw_chordes();
                }
            }


        }
        canvas.onmouseup = function () {
            canvas.onmousemove = null;
            console.log("x0=" + x0 + "  y0=" + y0);
        }

        draw_markers();


    }


    document.getElementById('test').onclick = function () {
        // ctx.translate(0, 20)
    }
}