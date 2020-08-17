'use strict';

/* eslint-env browser */
/* eslint-disable consistent-return */

const images = {
  O: 'O',
  RE: 'RE',
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

function updateOreo() {
  const oreo = document.getElementById('oreo');
  const oreoIn = document.getElementById('oreo-in')

  while (oreo.firstChild) {
    oreo.removeChild(oreo.firstChild);
  }

  oreoIn.value = oreoIn.value.replace(/[^ore]/ig, '');
  const tokens = oreoIn.value.match(/o|re/ig).map(e => e.toUpperCase());

  let top = 0;
  for (let i = 0; i < tokens.length; i++) {
    const image = document.createElement('img');
    let currentLayer = images[tokens[i]];
    if (i !== 0 && i === tokens.length - 1 && currentLayer === 'O') {
      currentLayer = 'Ov';
    }

    image.setAttribute('src', `img/${currentLayer}.png`);
    image.style['z-index'] = tokens.length - i;
    image.style.left = `${lefts[currentLayer]}px`;
    image.style.top = `${top}px`;
    image.classList.add('layer');
    oreo.appendChild(image);

    if (i < tokens.length - 1) {
      top += tops[currentLayer][images[tokens[i + 1]]];
    }
  }
}

function init() {
  document.getElementById('oreo-in').addEventListener('keyup', updateOreo);
  document.getElementById('oreo-in').value = 'OREO'
  updateOreo()
}

if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
