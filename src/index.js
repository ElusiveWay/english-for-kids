import drawCard from './scripts/drawCard';
import './styles/cardStyle.scss';
import './styles/togglersStyle.scss';
import cards from './data/cards';
import hug from './data/img/hug.jpg';
import play from './data/img/play.jpg';
import argue from './data/img/argue.jpg';
import big from './data/img/big.jpg';
import dog from './data/img/dog.jpg';
import giraffe from './data/img/giraffe.jpg';
import shirt from './data/img/shirt.jpg';
import angry from './data/img/angry.jpg';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import '../node_modules/@fortawesome/fontawesome-free/js/all';

const doc = global.document;

// Create toggler
const togglerAndStat = doc.createElement('div');
togglerAndStat.style.width = '80vw';
togglerAndStat.style.margin = '30px auto';
togglerAndStat.style.display = 'flex';
togglerAndStat.style.flexDirection = 'column';
togglerAndStat.style.alignItems = 'flex-end';
togglerAndStat.style.justifyContent = 'end';
togglerAndStat.innerHTML = `
<div class="toggle toggle--knob">
  <input onclick="document.body.classList.toggle('play')" type="checkbox" id="toggle--knob" class="toggle--checkbox">
  <label class="toggle--btn" for="toggle--knob"><span class="toggle--feature" data-label-on="Train"  data-label-off="Play"></span></label>
</div>
<div style="padding:12.5px 10px;text-align:center;margin:15px 0;width:120px" class="go-stat btn btn-secondary">
  <span>Statistic</span>
</div>
`;
doc.body.appendChild(togglerAndStat);

// Add cards wrapper
const content = doc.createElement('div');
content.className = 'content-wrapper';
doc.body.appendChild(content);

// Generate main page cards
const cardImagesArray = [hug, play, argue, big, dog, giraffe, shirt, angry];
for (let i = 0; i < cards[0].length; i += 1) {
  drawCard(`.${content.className}`, {
    action: () => {
      console.log('lol');
    },
    title: cards[0][i],
    image: cardImagesArray[i],
  });
}

// Generate page 1 cards
