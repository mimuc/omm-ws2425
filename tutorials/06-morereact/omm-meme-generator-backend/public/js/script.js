const URLS = {
  'MEMES': '/memes',
};

class MemeMUC {

  constructor () {
    this.availableMemes = { };
    this.meme = null;

    const inputs = [ ...document.querySelectorAll('.controls input') ];
    inputs.forEach((i) => i.disabled = true);

    const listOfMemes = document.querySelector('aside ul');

    fetch(URLS.MEMES, { method: 'GET' })
      .then((res) => res.json())
      .then((memes) => {
        this.availableMemes = memes;

        listOfMemes.innerHTML = '';
        this.availableMemes.forEach(({ name, link }) => {
          const li = document.createElement('li');
          const img = document.createElement('img');
          img.src = link;
          li.addEventListener('click', () => {
            listOfMemes.querySelectorAll('li')
              .forEach((li) => li.classList.remove('selected'))
            li.classList.add('selected');
            this.meme = name
            this.update();
          });

          li.appendChild(img);
          listOfMemes.appendChild(li);
        })
      });

    document.querySelector('.controls button')
      .addEventListener('click', () => this.update());
  }

  get parameters () {
    const inputs = document.querySelectorAll('.controls input');
    return {
      text: inputs[0].value || '',
      x: parseInt(inputs[1].value) || 0,
      y: parseInt(inputs[2].value) || 0,
      text2: inputs[3].value || '',
      x2: parseInt(inputs[4].value) || 0,
      y2: parseInt(inputs[5].value) || 0,
    };
  }

  update () {
    if (this.meme) {
      const url = new URL(`${URLS.MEMES}/${this.meme}`, window.location.origin);
      Object.keys(this.parameters)
        .forEach((key) => url.searchParams.append(key, this.parameters[key]));
      document.querySelector('.result img').src = url;
    }

    const inputs = [ ...document.querySelectorAll('.controls input') ];
    inputs.forEach((i) => i.disabled = !Boolean(this.meme));
  }
}

window.addEventListener('DOMContentLoaded', () => new MemeMUC());
