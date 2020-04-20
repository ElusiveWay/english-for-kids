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
  // Presets
  global.localStorage.setItem('mistakes', 0);
  global.localStorage.setItem('target', '');
  doc.body.classList.remove('playing');

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
  } else {
    for (let i = 0; i < cards[0].length; i += 1) {
      drawCard(query, {
        action: (e) => {
          if (!doc.body.classList.contains('play')) {
            e.currentTarget.getElementsByTagName('audio')[0].play();
            global.localStorage[`${e.currentTarget.id}clicked`] = Number(global.localStorage.getItem(`${e.currentTarget.id}clicked`)) + 1;
          } else if (doc.body.classList.contains('playing')) {
            if (e.currentTarget.id === global.localStorage.target) {
              e.currentTarget.innerHTML += `
              <div class="success-mask" onclick="event.stopPropagation()" style="position:absolute;top:0;display:flex;justify-content:center;align-items:center;width:100%;height:100%;background:#fff9;">
                <h1 style="background:transparent;color:green"><i style="font-size: 90px"class="fas fa-check"></i></h1>
              </div>
              `;
              global.localStorage.setItem('pool', JSON.stringify(JSON.parse(global.localStorage.getItem('pool')).filter((v) => v !== global.localStorage.target)));
              if (JSON.parse(global.localStorage.pool).length > 0) {
                doc.getElementById('notice').src = 'audio/right.mp3';
                doc.getElementById('notice').play();
                global.localStorage[`${global.localStorage.target}win`] = Number(global.localStorage.getItem(`${global.localStorage.target}win`)) + 1;
                doc.getElementById('rateLine').innerHTML = `<i style="color:green" class="rate fas fa-thumbs-up"></i> ${doc.getElementById('rateLine').innerHTML}`;
                global.localStorage.setItem('target', JSON.parse(global.localStorage.getItem('pool'))[Math.floor(Math.random() * JSON.parse(global.localStorage.getItem('pool')).length)]);
                global.setTimeout(() => doc.getElementById(global.localStorage.target).getElementsByTagName('audio')[0].play(), 1500);
              } else {
                global.localStorage[`${global.localStorage.target}win`] = Number(global.localStorage.getItem(`${global.localStorage.target}win`)) + 1;
                global.localStorage.setItem('target', '');
                doc.querySelector(query).innerHTML = `
                <div style="top:0;left:0;width:100%;height:100%;position:fixed;background:white;z-index:10000;flex-direction:column;display:flex;justify-content:center;align-items:center;">
                  ${Number(global.localStorage.mistakes) === 0 ? `
                  <i style="color:green;font-size:200px"class="fas fa-laugh-beam"></i>
                  <h1 style="background: white;color: green;">You WIN!</h1>
                  ` : `
                  <i style="color:red;font-size:200px"class="fas fa-sad-cry"></i>
                  <h1 style="background: white;color: red;">${Number(global.localStorage.mistakes)} mistake(s)!</h1>
                  `}
                </div>
                `;
                doc.getElementById('notice').src = Number(global.localStorage.mistakes) === 0 ? 'audio/win.mp3' : 'audio/lose.mp3';
                doc.getElementById('notice').play();
                global.setTimeout(() => drawPage(query), 3500);
              }
            } else {
              doc.getElementById('notice').src = 'audio/mistake.mp3';
              global.localStorage[`${global.localStorage.target}lose`] = Number(global.localStorage.getItem(`${global.localStorage.target}lose`)) + 1;
              doc.getElementById('notice').play();
              doc.getElementById('rateLine').innerHTML = `<i style="color:darkred" class="rate fas fa-thumbs-down"></i> ${doc.getElementById('rateLine').innerHTML}`;
              global.localStorage.mistakes = Number(global.localStorage.mistakes) + 1;
            }
          }
        },
        title: cards[page][i].word,
        image: cards[page][i].image,
        audio: cards[page][i].audioSrc,
        trans: cards[page][i].translation,
      });
    }
    global.localStorage.setItem('current', JSON.stringify(cards[page]));
    const playBtn = doc.createElement('span');
    const repeat = doc.createElement('span');
    playBtn.className = 'playBtn';
    repeat.className = 'repeat';
    playBtn.innerHTML = '<i class="fas fa-play-circle"></i> Start game';
    repeat.innerHTML = '<i class="fas fa-redo"></i> Repeat';
    playBtn.onclick = () => {
      doc.body.classList.add('playing');
      global.localStorage.setItem('pool', JSON.stringify(JSON.parse(global.localStorage.getItem('current')).map((v) => v.word)));
      global.localStorage.setItem('target', JSON.parse(global.localStorage.getItem('pool'))[Math.floor(Math.random() * JSON.parse(global.localStorage.getItem('pool')).length)]);
      doc.getElementById(global.localStorage.target).getElementsByTagName('audio')[0].play();
    };
    repeat.onclick = () => {
      doc.getElementById(global.localStorage.target).getElementsByTagName('audio')[0].play();
    };
    doc.querySelector(query).appendChild(playBtn);
    doc.querySelector(query).appendChild(repeat);
  }
};

export default drawPage;
