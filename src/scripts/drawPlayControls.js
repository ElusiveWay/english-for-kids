const doc = global.document;

const drawPlayControls = (query, target) => {
  global.localStorage.setItem('current', JSON.stringify(target));
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
};

export default drawPlayControls;
