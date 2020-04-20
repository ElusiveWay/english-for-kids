import cards from '../data/cards';

const doc = global.document;

const drawStat = () => {
  const modalMask = doc.createElement('div');
  const modalPage = doc.createElement('div');
  modalMask.className = 'modal-mask';
  modalMask.onclick = (e) => e.currentTarget.parentNode.removeChild(e.currentTarget);
  modalPage.onclick = (e) => e.stopPropagation();
  // Page styles
  modalPage.style.maxWidth = '1000px';
  modalPage.style.width = '100%';
  modalPage.style.height = '80%';
  modalPage.style.backgroundColor = '#292929';
  modalPage.style.display = 'flex';
  modalPage.style.flexDirection = 'column';
  modalPage.style.alignItems = 'stretch';
  modalMask.appendChild(modalPage);
  // Create page header
  const h1 = doc.createElement('h1');
  h1.innerText = 'Statistics';
  modalPage.appendChild(h1);
  // Create Reset and Repeat difficult words buttons
  const reset = doc.createElement('button');
  reset.className = 'btn btn-secondary';
  reset.innerText = 'Reset';
  const repeat = doc.createElement('button');
  repeat.className = 'btn btn-primary';
  repeat.innerText = 'Repeat difficult words buttons';
  repeat.style.marginBottom = '10px';
  reset.onclick = () => {
    global.localStorage.clear();
    doc.getElementsByClassName('modal-mask')[0].click();
    doc.getElementsByClassName('go-stat')[0].click();
  };
  repeat.onclick = () => {
    const message = 'You never made a mistake!';
    const extraModal = doc.createElement('div');
    extraModal.style.width = '100%';
    extraModal.style.height = '100%';
    extraModal.style.position = 'absolute';
    extraModal.style.left = '0';
    extraModal.style.top = '0';
    extraModal.style.backgroundColor = '#000d';
    extraModal.style.color = 'white';
    extraModal.style.textAlign = 'center';
    extraModal.style.transition = '1s 1.5s';
    extraModal.style.opacity = '1';
    extraModal.style.fontSize = '50px';
    extraModal.style.display = 'flex';
    extraModal.style.justifyContent = 'center';
    extraModal.style.alignItems = 'center';
    extraModal.innerText = message;
    modalPage.appendChild(extraModal);
    global.setTimeout(() => { extraModal.style.opacity = '0'; }, 0);
    global.setTimeout(() => modalPage.removeChild(extraModal), 2500);
  };
  modalPage.appendChild(reset);
  modalPage.appendChild(repeat);
  // Create page table
  const theadKeys = ['Word', 'Translation', 'Train clicks', 'Right', 'Mistakes', 'Right percentage, %'];
  let wordsArray = cards.map((v) => v);
  wordsArray = wordsArray.filter((v) => v[0].word !== undefined).reduce((t, c) => t.concat(c), []);
  const tableWrapper = doc.createElement('div');
  const table = doc.createElement('table');
  const tbody = doc.createElement('tbody');
  const thead = doc.createElement('thead');
  const trHead = doc.createElement('tr');
  for (let i = 0; i < theadKeys.length; i += 1) {
    const th = doc.createElement('th');
    th.style.whiteSpace = 'pre';
    th.style.minWidth = `${(100 / 12) * 0.8}vw`;
    th.style.width = '1px';
    th.innerText = theadKeys[i];
    trHead.appendChild(th);
  }
  for (let i = 0; i < wordsArray.length; i += 1) {
    const tdWithStyles = (text) => {
      const word = doc.createElement('td');
      word.style.whiteSpace = 'pre';
      word.style.minWidth = `${(100 / 12) * 0.8}vw`;
      word.style.width = '1px';
      word.innerText = (Number.isNaN(text)) ? 0 : text;
      return word;
    };
    const tr = doc.createElement('tr');
    const word = tdWithStyles(wordsArray[i].word);
    const translation = tdWithStyles(wordsArray[i].translation);
    const clicks = tdWithStyles(Number(global.localStorage.getItem(`${wordsArray[i].word}clicked`)));
    const guessed = tdWithStyles(Number(global.localStorage.getItem(`${wordsArray[i].word}win`)));
    const mistakes = tdWithStyles(Number(global.localStorage.getItem(`${wordsArray[i].word}lose`)));
    const percentage = tdWithStyles(Math.floor((Number(global.localStorage.getItem(`${wordsArray[i].word}win`)) / (Number(global.localStorage.getItem(`${wordsArray[i].word}win`)) + Number(global.localStorage.getItem(`${wordsArray[i].word}lose`)))) * 100));
    tr.appendChild(word);
    tr.appendChild(translation);
    tr.appendChild(clicks);
    tr.appendChild(guessed);
    tr.appendChild(mistakes);
    tr.appendChild(percentage);
    tbody.appendChild(tr);
  }
  table.className = 'statTable table table-dark';
  table.style.maxWidth = '100%';
  tableWrapper.style.overflowX = 'scroll';
  tableWrapper.style.overflowY = 'scroll';
  thead.appendChild(trHead);
  table.appendChild(thead);
  table.appendChild(tbody);
  tableWrapper.appendChild(table);
  modalPage.appendChild(tableWrapper);
  // Render page
  doc.body.appendChild(modalMask);
};

export default drawStat;
