//create object
const px = new pixelit({ from: document.getElementById("pixelitimg") });

//stuff for webpage functionality
let paletteList = [
  [
    [7, 5, 5],
    [33, 25, 25],
    [82, 58, 42],
    [138, 107, 62],
    [193, 156, 77],
    [234, 219, 116],
    [160, 179, 53],
    [83, 124, 68],
    [66, 60, 86],
    [89, 111, 175],
    [107, 185, 182],
    [251, 250, 249],
    [184, 170, 176],
    [121, 112, 126],
    [148, 91, 40],
  ],
  [
    [13, 43, 69],
    [32, 60, 86],
    [84, 78, 104],
    [141, 105, 122],
    [208, 129, 89],
    [255, 170, 94],
    [255, 212, 163],
    [255, 236, 214],
  ],
  [
    [43, 15, 84],
    [171, 31, 101],
    [255, 79, 105],
    [255, 247, 248],
    [255, 129, 66],
    [255, 218, 69],
    [51, 104, 220],
    [73, 231, 236],
  ],
  [
    [48, 0, 48],
    [96, 40, 120],
    [248, 144, 32],
    [248, 240, 136],
  ],
  [
    [239, 26, 26],
    [172, 23, 23],
    [243, 216, 216],
    [177, 139, 139],
    [53, 52, 65],
    [27, 26, 29],
  ],
  [
    [26, 28, 44],
    [93, 39, 93],
    [177, 62, 83],
    [239, 125, 87],
    [255, 205, 117],
    [167, 240, 112],
    [56, 183, 100],
    [37, 113, 121],
    [41, 54, 111],
    [59, 93, 201],
    [65, 166, 246],
    [115, 239, 247],
    [244, 244, 244],
    [148, 176, 194],
    [86, 108, 134],
    [51, 60, 87],
  ],
  [
    [44, 33, 55],
    [118, 68, 98],
    [237, 180, 161],
    [169, 104, 104],
  ],

  [
    [171, 97, 135],
    [235, 198, 134],
    [216, 232, 230],
    [101, 219, 115],
    [112, 157, 207],
    [90, 104, 125],
    [33, 30, 51],
  ],
  [
    [140, 143, 174],
    [88, 69, 99],
    [62, 33, 55],
    [154, 99, 72],
    [215, 155, 125],
    [245, 237, 186],
    [192, 199, 65],
    [100, 125, 52],
    [228, 148, 58],
    [157, 48, 59],
    [210, 100, 113],
    [112, 55, 127],
    [126, 196, 193],
    [52, 133, 157],
    [23, 67, 75],
    [31, 14, 28],
  ],
  [
    [94, 96, 110],
    [34, 52, 209],
    [12, 126, 69],
    [68, 170, 204],
    [138, 54, 34],
    [235, 138, 96],
    [0, 0, 0],
    [92, 46, 120],
    [226, 61, 105],
    [170, 92, 61],
    [255, 217, 63],
    [181, 181, 181],
    [255, 255, 255],
  ],
  [
    [49, 31, 95],
    [22, 135, 167],
    [31, 213, 188],
    [237, 255, 177],
  ],
  [
    [21, 25, 26],
    [138, 76, 88],
    [217, 98, 117],
    [230, 184, 193],
    [69, 107, 115],
    [75, 151, 166],
    [165, 189, 194],
    [255, 245, 247],
  ],
];
let currentPalette = 0;
//let maxPalette = paletteList.length;


//*** add palette to custom list
const addPalette = (palette=[]) => {
  let data = JSON.parse(localStorage.getItem("customPalettes"));
  if (data == null) data = [];
  data.push(palette);
  localStorage.setItem("customPalettes", JSON.stringify(data));
};

//*** update from localstorage
const pullFromLocalStorage = () => {
  //*** cards
  let data = JSON.parse(localStorage.getItem("customPalettes"));
  if (data == null) data = [];
  return data;
};
//*** convert rgb color to int array */
const rgbToInt = (rgb) => {
  let r = parseInt(rgb.substring(1, 3), 16);
  let g = parseInt(rgb.substring(3, 5), 16);
  let b = parseInt(rgb.substring(5, 7), 16);
  return [r, g, b];
};
//*** remove duplicates from array */
const removeDuplicates = (arr) => {
  let unique_array = [];
  for (let i = 0; i < arr.length; i++) {
    if (unique_array.indexOf(arr[i]) == -1) {
      unique_array.push(arr[i]);
    }
  }
return unique_array;
};


document.addEventListener("DOMContentLoaded", function () {
  // Modal logic
  const uploadModal = document.getElementById("uploadModal");
  const openUploadModalBtn = document.getElementById("openUploadModalBtn");
  const closeUploadModal = document.getElementById("closeUploadModal");
  const modalTabs = document.querySelectorAll(".modal-tab");
  const tabContents = document.querySelectorAll(".tab-content");
  const pasteArea = document.getElementById("pasteArea");

  const openModal = () => {
    uploadModal.classList.add("active");
    switchTab("tab-paste");
  };

  const closeModal = () => {
    uploadModal.classList.remove("active");
  };

  const switchTab = (tabId) => {
    modalTabs.forEach(t => t.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));
    document.querySelector(`[data-tab="${tabId}"]`).classList.add("active");
    document.getElementById(tabId).classList.add("active");
    if (tabId === "tab-paste") {
      setTimeout(() => pasteArea.focus(), 50);
    }
  };

  if (openUploadModalBtn) openUploadModalBtn.addEventListener("click", openModal);
  if (closeUploadModal) closeUploadModal.addEventListener("click", closeModal);
  if (uploadModal) {
    uploadModal.addEventListener("click", (e) => {
      if (e.target === uploadModal) closeModal();
    });
  }

  modalTabs.forEach(tab => {
    tab.addEventListener("click", () => switchTab(tab.getAttribute("data-tab")));
  });

  // load image to canvas from file input
  document.getElementById("pixlInput").onchange = function (e) {
    if (!this.files || !this.files[0]) return;
    var img = new Image();
    img.src = URL.createObjectURL(this.files[0]);
    img.onload = () => {
      px.setFromImgSource(img.src);
      pixelit();
      closeModal();
    };
  };

  // paste image from clipboard ONLY in the pasteArea
  pasteArea.addEventListener("paste", function (e) {
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    for (let index in items) {
      const item = items[index];
      if (item.kind === 'file' && item.type.startsWith('image/')) {
        const blob = item.getAsFile();
        const img = new Image();
        img.src = URL.createObjectURL(blob);
        img.onload = () => {
          px.setFromImgSource(img.src);
          pixelit();
          closeModal();
        };
      }
    }
  });

  //load color to palette
  const fileInput = document.getElementById('uploadpalettefile');
  fileInput.onchange = function (e) {
      const file = fileInput.files[0];
      if (!file) {
          return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
          // Remove the previous palette
          const currentPalette = document.getElementById('currentpallete');
          while (currentPalette.firstChild) {
              currentPalette.removeChild(currentPalette.firstChild);
          }

          const rawData = event.target.result;
          // This can handle ';' comments, hexvalues separated by ',' and by newline
          const textByteData = rawData.split(/[\r\n,]/).filter(elem => elem && elem[0] != ';');
          textByteData.forEach(color => {
              // Data might be prefixed by something like 0x or FF
              color = color.slice(-6);
              const colorSpan = document.createElement('span');
              colorSpan.style.backgroundColor = `#${color}`;
              colorSpan.dataset.color = rgbToInt(`#${color}`).join(',');
              colorSpan.classList.add('colorblock');
              document.getElementById('currentpallete').appendChild(colorSpan);
          });
      };

      reader.onerror = (err) => {
          console.error("Failed to read file: ", err);
      };

      reader.readAsText(file);
  };

  //add color to palette
  const addColor = document.getElementById('addcustomcolor');
  const customColorInput = document.getElementById('customcolor');
  const colorInputText = document.getElementById('colorinputtext');
  
  if (customColorInput && colorInputText) {
    customColorInput.addEventListener('input', (e) => {
      colorInputText.value = e.target.value;
    });
  }

  addColor.addEventListener('click', () => {
    let inputText = colorInputText ? colorInputText.value.trim() : '';
    if (!inputText) {
      inputText = customColorInput ? customColorInput.value : '';
    }

    // Split by comma or space if multiple colors are provided
    const colors = inputText.split(/[,]+/).map(c => c.trim()).filter(c => c);
    
    colors.forEach(colorStr => {
      // Create a temporary element to let the browser parse the color string
      const tempDiv = document.createElement('div');
      tempDiv.style.color = colorStr;
      document.body.appendChild(tempDiv);
      const computedColor = window.getComputedStyle(tempDiv).color; // rgb(...) or rgba(...)
      document.body.removeChild(tempDiv);

      if (computedColor && computedColor !== 'rgba(0, 0, 0, 0)') { // ignore invalid parsing
        const rgbMatch = computedColor.match(/\d+/g);
        if (rgbMatch && rgbMatch.length >= 3) {
          const r = parseInt(rgbMatch[0]);
          const g = parseInt(rgbMatch[1]);
          const b = parseInt(rgbMatch[2]);
          
          const colorSpan = document.createElement('span');
          colorSpan.style.backgroundColor = computedColor;
          colorSpan.dataset.color = `${r},${g},${b}`;
          colorSpan.classList.add('colorblock');
          document.getElementById('currentpallete').appendChild(colorSpan);
        }
      }
    });

    if (colorInputText) colorInputText.value = '';
  });
  //save custom palette
  const savePalette = document.getElementById('savecustompalette');
  savePalette.addEventListener('click', () => {
    let palette = [];
    let colors = document.querySelectorAll('#currentpallete .colorblock');
    colors.forEach((color) => {
      palette.push(color.dataset.color);
    });
    //console.log(palette);
    //remove duplicates and make array of string
    palette = removeDuplicates(palette).map((color) => {
      return color.split(',');
    });
    addPalette(palette);
    //remove all children from element
    const currentPalette = document.getElementById('currentpallete');
    while (currentPalette.firstChild) {
      currentPalette.removeChild(currentPalette.firstChild);
    }
  });
  //clear custom palettes
  const clearPalette = document.getElementById('clearcustompalettes');
  clearPalette.addEventListener('click', () => {
    localStorage.setItem("customPalettes", JSON.stringify([]));
  });


  //function to apply effects
  const pixelit = () => {
    document.querySelector(".loader").classList.toggle("active");
    setTimeout(() => {
      document.querySelector(".loader").classList.toggle("active");
    }, 800);
    
    const mode = document.querySelector("input[name='sizemode']:checked").value;
    const pixelblock = document.querySelector("#pixelblock");
    if (mode === 'percent') {
      px.setScale(blocksize.value);
    } else {
      px.setPixelSize(pixelblock.value);
    }

    px.setPalette(paletteList[currentPalette])
      .draw()
      .pixelate();

    greyscale.checked ? px.convertGrayscale() : null;
    palette.checked ? px.convertPalette() : null;
    maxheight.value ? px.setMaxHeight(maxheight.value).resizeImage() : null;
    maxwidth.value ? px.setMaxWidth(maxwidth.value).resizeImage() : null;

    const imgElem = document.getElementById("pixelitimg");
    if (imgElem && imgElem.src) {
        const natW = imgElem.naturalWidth || imgElem.width;
        const natH = imgElem.naturalHeight || imgElem.height;
        const dimElem = document.getElementById("image_dimensions");
        if (dimElem && natW && natH) dimElem.innerText = `Kích thước: ${natW} x ${natH} px`;
        const mode = document.querySelector("input[name='sizemode']:checked").value;
        if (mode === 'percent') {
            let workScale = blocksize.value * 0.01;
            if (natW > 900 || natH > 900) {
                workScale *= 0.5;
            }
            const scaledW = Math.max(1, Math.floor(natW * workScale));
            const scaledH = Math.max(1, Math.floor(natH * workScale));
            const pixElem = document.getElementById("pixel_dimensions");
            if (pixElem && natW && natH) pixElem.innerText = `(${scaledW} x ${scaledH} pixels)`;
        } else {
            const pixelblock = document.querySelector("#pixelblock");
            const blockP = parseInt(pixelblock.value);
            const workScale = Math.min(1, blockP / natW);
            const scaledW = Math.max(1, Math.floor(natW * workScale));
            const scaledH = Math.max(1, Math.floor(natH * workScale));
            const absElem = document.getElementById("pixel_dimensions_abs");
            if (absElem) absElem.innerText = `(${scaledW} x ${scaledH} px)`;
        }
    }
  };



  const makePaletteGradient = () => {
    //create palette
    let pdivs = "";
    //create palette of colors
    document.querySelector("#palettecolor").innerHTML = "";
    const customPallete = pullFromLocalStorage();
    paletteList = [ ...paletteList,...customPallete];
    paletteList.forEach((palette, i) => {
      const option = document.createElement("option");
      option.value = i;
      palette.forEach((elem) => {
        let div = document.createElement("div");
        div.classList = "colorblock";
        div.style.backgroundColor = `rgba(${elem[0]},${elem[1]},${elem[2]},1)`;
        //div.innerHTML = `<div class="colorblock" style="background-color: rgba(${elem[0]},${elem[1]},${elem[2]},1)"></div>`;
        option.appendChild(div);
        //pdivs += `<div class="colorblock" style="background-color: rgba(${elem[0]},${elem[1]},${elem[2]},1)"></div>`;
      });
      document.getElementById("paletteselector").appendChild(option);
    });

    //document.querySelector('#palettecolor').innerHTML = pdivs;
  };

  makePaletteGradient();
  //special select
  new SlimSelect({
    hideSelectedOption: true,
    showSearch: false,
    select: "#paletteselector",
    onChange: (info) => {
      currentPalette = info.value;
      palette.checked = true;
      pixelit();
      //console.log(info)
    },
  });

  //block size
  const blocksize = document.querySelector("#blocksize");
  blocksize.addEventListener("change", function (e) {
    document.querySelector("#blockvalue").innerText = this.value;
    pixelit();
  });
  
  // pixel block size
  const pixelblock = document.querySelector("#pixelblock");
  if (pixelblock) {
    pixelblock.addEventListener("change", function (e) {
      document.querySelector("#pixelblockvalue").innerText = this.value;
      pixelit();
    });
  }

  // size mode toggle
  const sizemodes = document.querySelectorAll("input[name='sizemode']");
  sizemodes.forEach(radio => {
    radio.addEventListener('change', (e) => {
      const containerBlocksize = document.querySelector("#container-blocksize");
      const containerPixelblock = document.querySelector("#container-pixelblock");
      if (e.target.value === 'percent') {
        containerBlocksize.style.display = 'flex';
        containerPixelblock.style.display = 'none';
      } else {
        containerBlocksize.style.display = 'none';
        containerPixelblock.style.display = 'flex';
      }
      pixelit();
    });
  });
  //greyscale
  const greyscale = document.querySelector("#greyscale");
  greyscale.addEventListener("change", pixelit);
  //palette
  const palette = document.querySelector("#palette");
  palette.addEventListener("change", pixelit);
  //maxheight
  const maxheight = document.querySelector("#maxheight");
  maxheight.addEventListener("change", pixelit);
  //maxwidth
  const maxwidth = document.querySelector("#maxwidth");
  maxwidth.addEventListener("change", pixelit);
  //change palette deprecated
  /*
  const changePalette = document.querySelector("#changepalette");
  changePalette.addEventListener("click", function (e) {
    currentPalette > 0 ? currentPalette-- : (currentPalette = maxPalette - 1);
    makePaletteGradient();
    palette.checked = true;
    pixelit();
  });
  */
  //downloadimage options
  const downloadimage = document.querySelector("#downloadimage");

  downloadimage.addEventListener("click", function (e) {
    //download image
    px.saveImage();
  });

  //run on page boot to pixelit default image
  const defaultImg = document.getElementById("pixelitimg");
  if (defaultImg && !defaultImg.complete) {
    defaultImg.onload = pixelit;
  } else {
    pixelit();
  }

  // Zoom logic for canvas
  let currentZoom = 1;
  const canvasContainer = document.getElementById('canvas-container');
  const canvas = document.getElementById('pixelitcanvas');
  if (canvasContainer && canvas) {
    canvasContainer.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        currentZoom += 0.1;
      } else {
        currentZoom = Math.max(0.1, currentZoom - 0.1);
      }
      canvas.style.transform = `scale(${currentZoom})`;
    });

    // Reset zoom on double click
    canvasContainer.addEventListener('dblclick', () => {
      currentZoom = 1;
      canvas.style.transform = `scale(${currentZoom})`;
    });
  }
});
