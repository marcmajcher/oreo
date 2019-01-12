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

function validateInput(event) {
  const key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
  if (!/^[10]$/.test(key)) {
    event.preventDefault();
    return false;
  }
}

function updateOreo(event) {
  const str = event.target.value;
  document.getElementById('oreo-out').innerText = str.replace(/1/g, 'RE').replace(/0/g, 'O');

  const oreo = document.getElementById('oreo');
  while (oreo.firstChild) {
    oreo.removeChild(oreo.firstChild);
  }

  let top = 0;
  for (let i = 0; i < str.length; i++) {
    const image = document.createElement('img');
    let thing = images[str[i]];
    if (i !== 0 && i === str.length - 1 && thing === 'O') {
      thing = 'Ov';
    }
    image.setAttribute('src', `/img/${thing}.png`);
    image.style['z-index'] = str.length - i;
    image.style.left = `${lefts[thing]}px`;
    image.style.top = `${top}px`;
    top += 30;
    if (images[str[i + 1]] === 'RE') {
      top += 40;
    }
    image.classList.add('layer');
    oreo.appendChild(image);
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
