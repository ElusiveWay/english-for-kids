import drawCard from './drawCard';
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

const drawPage = (query = 'body', page = 'Main') => {
  // Generate main page cards
  global.document.querySelector(query).innerHTML = '';
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
  } else {
    for (let i = 0; i < cards[0].length; i += 1) {
      drawCard(query, {
        action: (e) => {
          if (!doc.body.classList.contains('play')) {
            e.currentTarget.getElementsByTagName('audio')[0].play();
          }
        },
        title: cards[page][i].word,
        image: cards[page][i].image,
        audio: cards[page][i].audioSrc,
        trans: cards[page][i].translation,
      });
    }
  }
};

export default drawPage;
