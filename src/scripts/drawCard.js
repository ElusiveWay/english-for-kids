import cardStyle from './cardStyle';

const doc = global.document;

const drawCard = (querySelector = 'body', options = {}) => {
  const card = doc.createElement('div');
  const modStyle = options.style || {};
  const action = options.action || undefined;
  const title = options.title || 'untitled';
  const trans = options.trans || 'нет перевода';
  const image = options.image || 'https://via.placeholder.com/390x260?text=No+image';
  const style = {
    ...cardStyle,
    ...modStyle,
  };
  card.onclick = action;
  card.classList.add('efk-card');
  if (options.circle) card.classList.add('type');
  if (options.class) card.classList.add(options.class);
  card.innerHTML = `
  <div style="background:white;height:100%;cursor:pointer"class="card card-cascade wider">
    <div class="view view-cascade overlay">
        <img style="width:100%;${options.circle ? 'border-bottom-left-radius:100%;' : ''}" class="card-img-top" onerror="this.src='https://via.placeholder.com/390x260?text=No+image'" src="${image}" alt="Card image cap">
        <div style="cursor:pointer;" class="mask rgba-white-slight"></div>
    </div>
    <div class="card-body card-body-cascade text-center pb-0">
        <h4 style="text-align:center;padding-top: 15px;" class="src-text card-title"><strong>${title}</strong></h4>
        <h4 style="text-align:center;" class="trans-text card-title"><strong>${trans}</strong></h4>
        <i onclick="event.stopPropagation();let obj = this.parentNode.parentNode.parentNode; obj.classList.add('rot'); obj.onmouseleave = (e) => e.currentTarget.classList.remove('rot')" class="switcher fas fa-sync-alt"></i>
    </div>
    ${options.audio ? `<audio src="${options.audio}"></audio>` : ''}
  </div>`;
  for (let i = 0; i < Object.keys(style).length; i += 1) {
    card.style[Object.keys(style)[i]] = style[Object.keys(style)[i]];
  }
  doc.querySelector(querySelector).appendChild(card);
};

export default drawCard;
