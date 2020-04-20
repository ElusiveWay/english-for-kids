import drawCard from './drawCard';
import drawPlayControls from './drawPlayControls';
import cardAction from './cardAction';
import cards from '../data/cards';
import hug from '../data/img/hug.jpg';
import swim from '../data/img/swim.jpg';
import argue from '../data/img/argue.jpg';
import big from '../data/img/big.jpg';
import dog from '../data/img/dog.jpg';
import giraffe from '../data/img/giraffe.jpg';
import shirt from '../data/img/shirt.jpg';
import smile from '../data/img/smile.jpg';

const doc = global.document;

const drawPage = (query = 'body', page = 'Main', options = {}) => {
  // Presets
  global.localStorage.setItem('mistakes', 0);
  global.localStorage.setItem('target', '');
  doc.body.classList.remove('playing');
  const keys = options.keys || [];
  // Generate main page cards
  global.document.querySelector(query).innerHTML = '';

  // Create rating wrapper
  const line = doc.createElement('div');
  line.id = 'rateLine';
  doc.querySelector(query).appendChild(line);

  // Page Type
  if (page === 'Main') {
    const cardTypesArray = [hug, swim, argue, big, dog, giraffe, shirt, smile];
    for (let i = 0; i < cards[0].length; i += 1) {
      drawCard(query, {
        action: () => drawPage(query, i + 1),
        title: cards[0][i],
        image: cardTypesArray[i],
        circle: true,
      });
    }
    global.localStorage.setItem('current', null);
  } else if (page === 'Custom') {
    let wa = cards.map((v) => v);
    wa = wa.filter((v) => v[0].word !== undefined).reduce((t, c) => t.concat(c), []);
    const subCase = wa.filter((v) => keys.some((q) => q === v.word));
    for (let i = 0; i < subCase.length; i += 1) {
      drawCard(query, {
        action: (e) => cardAction(e, query, drawPage),
        title: subCase[i].word,
        image: subCase[i].image,
        audio: subCase[i].audioSrc,
        trans: subCase[i].translation,
      });
    }
    drawPlayControls(query, subCase);
  } else {
    for (let i = 0; i < cards[0].length; i += 1) {
      drawCard(query, {
        action: (e) => cardAction(e, query, drawPage),
        title: cards[page][i].word,
        image: cards[page][i].image,
        audio: cards[page][i].audioSrc,
        trans: cards[page][i].translation,
      });
    }
    drawPlayControls(query, cards[page]);
  }
};

export default drawPage;
