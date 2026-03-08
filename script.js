let filtersData = {
  brightness: {
    value: 100,
    min: 0,
    max: 200,
  },
  contrast: {
    value: 100,
    min: 0,
    max: 200,
  },
  saturation: {
    value: 100,
    min: 0,
    max: 200,
  },
  blur: {
    value: 0,
    min: 0,
    max: 20,
  },
  hue: {
    value: 0,
    min: -180,
    max: 180,
  },
  grayscale: {
    value: 0,
    min: 0,
    max: 100,
  },
  sepia: {
    value: 0,
    min: 0,
    max: 100,
  },
  invert: {
    value: 0,
    min: 0,
    max: 100,
  },
};
const defaultFilters = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
  hue: 0,
  grayscale: 0,
  sepia: 0,
  invert: 0,
};
const presets = {

  normal:{
    brightness:100,
    contrast:100,
    saturation:100,
    blur:0,
    hue:0,
    grayscale:0,
    sepia:0,
    invert:0
  },

  vintage:{
    brightness:110,
    contrast:120,
    saturation:90,
    blur:0,
    hue:10,
    grayscale:20,
    sepia:40,
    invert:0
  },

  noir:{
    brightness:100,
    contrast:130,
    saturation:0,
    blur:0,
    hue:0,
    grayscale:100,
    sepia:0,
    invert:0
  },

  cyberpunk:{
    brightness:120,
    contrast:140,
    saturation:160,
    blur:0,
    hue:40,
    grayscale:0,
    sepia:0,
    invert:0
  },

  warmSunset:{
    brightness:115,
    contrast:110,
    saturation:140,
    blur:0,
    hue:15,
    grayscale:0,
    sepia:25,
    invert:0
  },

  coolTone:{
    brightness:105,
    contrast:105,
    saturation:110,
    blur:0,
    hue:-20,
    grayscale:0,
    sepia:0,
    invert:0
  },

  softGlow:{
    brightness:120,
    contrast:90,
    saturation:110,
    blur:2,
    hue:0,
    grayscale:0,
    sepia:10,
    invert:0
  },

  retroPop:{
    brightness:110,
    contrast:140,
    saturation:160,
    blur:0,
    hue:20,
    grayscale:0,
    sepia:15,
    invert:0
  }

}

let imageInput = document.getElementById("image-input");
let canvas = document.getElementById("image-canvas");
let ctx = canvas.getContext("2d");
let resetBtn = document.querySelector(".resetbtn");
let downloadBtn = document.querySelector(".downloadbtn");
let file = null;
let image = null;

function createFilter(filterName) {
  let filters = document.getElementById("filters");
  let filterContainer = document.createElement("div");
  filterContainer.classList.add("filter");
  let label = document.createElement("label");
  label.innerText = filterName;
  let input = document.createElement("input");
  input.type = "range";
  input.min = filtersData[filterName].min;
  input.max = filtersData[filterName].max;
  input.value = filtersData[filterName].value;

  filterContainer.appendChild(label);
  filterContainer.appendChild(input);
  filters.appendChild(filterContainer);

  input.addEventListener("input", applyFilters);

  return filterContainer;
}

Object.keys(filtersData).forEach((filterName) => {
  let filterElement = createFilter(filterName);
  let input = filterElement.querySelector("input");

  input.addEventListener("input", (e) => {
    filtersData[filterName].value = e.target.value;
    applyFilters();
  });
});

imageInput.addEventListener("change", (e) => {
  let noimg = document.getElementById("noimg");
  noimg.style.display = "none";
  canvas.style.display = "block";

  resetBtn.click();

  file = e.target.files[0];

  let img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = function () {
    image = img;

    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0);
  };
});

function applyFilters() {
    if(!image) return;

  let canvas = document.getElementById("image-canvas");
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.filter = `brightness(${filtersData.brightness.value}%) contrast(${filtersData.contrast.value}%) saturate(${filtersData.saturation.value}%) blur(${filtersData.blur.value}px) hue-rotate(${filtersData.hue.value}deg) grayscale(${filtersData.grayscale.value}%) sepia(${filtersData.sepia.value}%) invert(${filtersData.invert.value}%)`;
  ctx.drawImage(image, 0, 0);
}

function applyPreset(presetName){
    let preset = presets[presetName];
    document.querySelectorAll("#filters input").forEach((input, i) => {
        let key = Object.keys(filtersData)[i];
        filtersData[key].value = preset[key];
        input.value = preset[key];
    });
    applyFilters();
}


resetBtn.addEventListener("click", () => {
  document.querySelectorAll("#filters input").forEach((input, i) => {
    let key = Object.keys(filtersData)[i];

    filtersData[key].value = defaultFilters[key];
    input.value = defaultFilters[key];
  });

  applyFilters();
});

downloadBtn.addEventListener("click", () => {
    let link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = canvas.toDataURL();
    link.click();
});