'use strict';

/* eslint-env browser */
/* eslint-disable consistent-return */

const images = {
  0: 'O',
  1: 'RE',
};

const lefts = {
  O: 0,
  RE: 20,
  Ov: 0,
};

const tops = {
  O: {
    O: 30,
    Ov: 30,
    RE: 55,
  },
  Ov: {
    O: 20,
    Ov: 20,
    RE: 20,
  },
  RE: {
    O: -5,
    Ov: 80,
    RE: 13,
  },
};

function validateInput(event) {
  const key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
  if (!/^[EORore]$/.test(key)) {
    event.preventDefault();
    return false;
  }
}

function updateOreo(event) {
  const oreo = document.getElementById('oreo');
  while (oreo.firstChild) {
    oreo.removeChild(oreo.firstChild);
  }

  const str = event.target.value.replace(/O/gi, '0').replace(/RE/gi, '1').replace(/[^01]/g, '');
  event.target.value = str.replace(/0/g, 'O').replace(/1/g, 'RE');

  let top = 0;
  for (let i = 0; i < str.length; i++) {
    const image = document.createElement('img');
    let currentLayer = images[str[i]];
    if (i !== 0 && i === str.length - 1 && currentLayer === 'O') {
      currentLayer = 'Ov';
    }

    image.setAttribute('src', `img/${currentLayer}.png`);
    image.style['z-index'] = str.length - i;
    image.style.left = `${lefts[currentLayer]}px`;
    image.style.top = `${top}px`;
    image.classList.add('layer');
    oreo.appendChild(image);

    if (i < str.length - 1) {
      top += tops[currentLayer][images[str[i + 1]]];
    }
  }
}

function init() {
  document.getElementById('oreo-in').addEventListener('keypress', validateInput);
  document.getElementById('oreo-in').addEventListener('keyup', updateOreo);
}

if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
