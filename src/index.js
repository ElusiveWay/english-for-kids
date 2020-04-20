import drawPage from './scripts/drawPage';
import drawStat from './scripts/drawStat';
import './styles/cardStyle.scss';
import './styles/togglersStyle.scss';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import '../node_modules/@fortawesome/fontawesome-free/js/all';

// Preset
const doc = global.document;
const contentClass = 'content-wrapper';
const switchMenu = () => {
  doc.querySelector('.menu').classList.toggle('active');
  doc.querySelector('.menu-button').classList.toggle('active');
};
const hideMenu = () => {
  doc.querySelector('.menu').classList.remove('active');
  doc.querySelector('.menu-button').classList.remove('active');
};

// Hide menu on click outside of menu
doc.onclick = (e) => {
  if (e.x > 210) {
    hideMenu();
  }
};

// Create audio
const audio = doc.createElement('audio');
audio.id = 'notice';
doc.body.appendChild(audio);

// Create menu
const menuButtons = doc.createElement('div');
const menu = doc.createElement('div');
menuButtons.innerHTML = `
<div class="menu-button">
  <i onclick="document.querySelector('.menu').classList.toggle('active');document.querySelector('.menu-button').classList.toggle('active')" style="cursor: pointer" class="close-menu fas fa-times"></i>
  <i onclick="document.querySelector('.menu').classList.toggle('active');document.querySelector('.menu-button').classList.toggle('active')" style="cursor: pointer" class="open-menu fas fa-bars"></i>
</div>`;
menu.className = 'menu';
const menuItemsTitles = ['Main menu', 'Action (set A)', 'Action (set B)', 'Action (set C)', 'Adjective', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotions'];
for (let i = 0; i < menuItemsTitles.length; i += 1) {
  const button = doc.createElement('button');
  button.onclick = (i === 0) ? () => {
    drawPage(`.${contentClass}`);
    switchMenu();
  } : () => {
    drawPage(`.${contentClass}`, i);
    switchMenu();
  };
  button.innerText = menuItemsTitles[i];
  button.className = 'btn';
  menu.appendChild(button);
}
doc.body.appendChild(menuButtons);
doc.body.appendChild(menu);

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
  <input onclick="document.querySelectorAll('.rate').forEach(v=>v.parentNode.removeChild(v));document.querySelectorAll('.success-mask').forEach(v=>v.parentNode.removeChild(v));document.body.classList.remove('playing');document.body.classList.toggle('play')" type="checkbox" id="toggle--knob" class="toggle--checkbox">
  <label class="toggle--btn" for="toggle--knob"><span class="toggle--feature" data-label-on="Train"  data-label-off="Play"></span></label>
</div>
<span style="cursor:pointer;color:darkred;padding:12.5px 10px;text-align:right;margin:15px 0;width:120px" class="go-stat">
  <span><i class="far fa-clipboard"></i> Statistics</span>
</span>
`;
doc.body.appendChild(togglerAndStat);
doc.getElementsByClassName('go-stat')[0].onclick = drawStat;

// Add cards wrapper
const content = doc.createElement('div');
content.className = contentClass;
doc.body.appendChild(content);
// Draw main page
drawPage(`.${content.className}`);

// Generate page 1 cards
