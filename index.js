// console.log("I am in index.js")

// const canvas = new fabric.Canvas('canvas', {
//     width: 500,
//     height: 500,
// });


// canvas.renderAll();

// fabric.Image.fromURL('https://static.thenounproject.com/png/3322766-200.png', (img) => {
//     canvas.backgroundImage = img
//     canvas.renderAll();
// })

//creating a canvas

const initCanvas = (id) => {
    return new fabric.Canvas(id, {
        width: 1000,
        height: 500,
        backgroundColor: "beige"
    });

}


const setBackground = (url, canvas) => {
    fabric.Image.fromURL(url, (img) => {
        canvas.backgroundImage = img
        canvas.renderAll();
    })
}

const canvas = initCanvas('canvas');
// setBackground('https://static.thenounproject.com/png/3322766-200.png', canvas);

//uploading image to the canvas

const imgAdded = (e) => {
    console.log(e);
    const inputElem = document.getElementById('myImg');
    const file = inputElem.files[0]

    // console.log(inputFile.files[0])


    reader.readAsDataURL(file);
}

const reader = new FileReader();

const inputFile = document.getElementById('myImg');
inputFile.addEventListener('change', imgAdded);



reader.addEventListener("load", () => {
    console.log(reader.result);
    fabric.Image.fromURL(reader.result, img => {
        canvas.add(img);
        canvas.requestRenderAll();
        img.scaleToWidth(250);
        img.scaleToHeight(250);
    })

})

//adding zoom in and zoom out functionality

canvas.on('mouse:wheel', function (opt) {
    var delta = opt.e.deltaY;
    var zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 1) zoom = 1;
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
    var vpt = this.viewportTransform;
    if (zoom < 400 / 1000) {
        vpt[4] = 200 - 1000 * zoom / 2;
        vpt[5] = 200 - 1000 * zoom / 2;
    } else {
        if (vpt[4] >= 0) {
            vpt[4] = 0;
        } else if (vpt[4] < canvas.getWidth() - 1000 * zoom) {
            vpt[4] = canvas.getWidth() - 1000 * zoom;
        }
        if (vpt[5] >= 0) {
            vpt[5] = 0;
        } else if (vpt[5] < canvas.getHeight() - 1000 * zoom) {
            vpt[5] = canvas.getHeight() - 1000 * zoom;
        }
    }
})






