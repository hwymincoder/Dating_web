const gif = document.getElementById('gif');
const question = document.getElementById('question');
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const sound1 = document.getElementById('bg-music1');
const sound2 = document.getElementById('bg-music2');
const sound3 = document.getElementById('bg-music3');
const sound4 = document.getElementById('bg-music4');

const content = [
  { gif: 'https://i.pinimg.com/originals/7a/ef/73/7aef734a86dce4dc206976d4f0586f2c.gif', message: 'Đừng dỗi tui nữa mà 🥺' },
  { gif: 'https://i.pinimg.com/originals/c8/07/e2/c807e26d8aed392f172f0bf441f60626.gif', message: 'Hết dỗi nha, thương mà 😢' },
  { gif: 'https://i.pinimg.com/originals/0d/ac/7e/0dac7e14010362ff081e2167be218341.gif', message: 'Đừng dỗi tui nữa mà, thương đó 💔' },
  { gif: 'https://i.pinimg.com/originals/88/e7/86/88e786492cc527584feee199936813dd.gif', message: 'Đừng giận nữa nha 😭' },
  { gif: 'https://i.pinimg.com/originals/82/be/ae/82beaeb21c686871437f88bbc1593288.gif', message: 'Tui năn nỉ đó, hết dỗi đi 😞' },
  { gif: 'https://i.pinimg.com/originals/97/91/de/9791de11497556c4a5e800427c48fc47.gif', message: 'Dỗi nữa là tui buồn thiệt đó 😔' },
];

let clickCount = 0;

// ─── HISTORY LOG ─────────────────────────────────────────────────────────────
const historyLog = [];

const logBox = document.createElement('div');
logBox.id = 'log-box';
logBox.innerHTML = '<div id="log-title">📋 Lịch sử</div>';
document.body.appendChild(logBox);

function logAction(action) {
  const time = new Date().toLocaleTimeString('vi-VN', { hour12: false });
  historyLog.push({ time, action });

  const item = document.createElement('div');
  item.className = 'log-item';
  item.textContent = `[${time}] ${action}`;
  logBox.appendChild(item);
  logBox.scrollTop = logBox.scrollHeight;
}

logAction('👀 Mở trang');
// ─────────────────────────────────────────────────────────────────────────────

function program(delay = 200) {
  (function () {
    const _b = (s) => decodeURIComponent(escape(atob(s)));
    const _d = [
      "QuG6o24gcXV54buBbiB0aHXhu5ljIHbhu4IgRHIuR2lmdGVy",
      "VGlrdG9rOiBodHRwczovL3d3dy50aWt0b2suY29tL0Bkci5naWZ0ZXIzMDY=",
      "R2l0aHViOiBodHRwczovL2dpdGh1Yi5jb20vRHJHaWZ0ZXI="
    ];
    setTimeout(() => { _d.forEach(x => console.log(_b(x))); }, delay);
  })();
}

noBtn.addEventListener('click', () => {
  const index = clickCount % content.length;
  gif.src = content[index].gif;
  question.textContent = content[index].message;
  clickCount++;

  logAction(`❌ Bấm Không (lần ${clickCount})`); // LOG

//   const growth = 1 + (clickCount * 0.2); 
//   yesBtn.style.fontSize = `${growth}rem`;
  
//   const scaleRatio = 1 + (clickCount * 0.3); 
//   yesBtn.style.transform = `scale(${scaleRatio})`;
  yesBtn.style.zIndex = "100"; 

  if (clickCount === 3) {
    noBtn.textContent = 'Bấm Có đi 😭';
  } else if (clickCount === 7) {
    noBtn.textContent = 'Năn nỉ đó bấm Có đi 😭';
  }

  if (clickCount <= 5) {
    sound1.play(); 
  } else if (clickCount <= 8) {
    sound2.play(); 
  } else {
    sound3.play();
  }

  const emoji = document.createElement('div');
  emoji.textContent = '😭';
  emoji.classList.add('emoji-effect');

  const rect = noBtn.getBoundingClientRect();
  const scrollY = window.scrollY || window.pageYOffset;
  emoji.style.left = `${rect.left + rect.width / 2}px`;
  emoji.style.top = `${rect.top + scrollY}px`;

  document.body.appendChild(emoji);

  setTimeout(() => emoji.remove(), 1000);
  noBtn.classList.add('shake');
  setTimeout(() => noBtn.classList.remove('shake'), 600);
});

yesBtn.addEventListener('click', () => {
  logAction(`✅ Bấm Có — sau ${clickCount} lần từ chối ❤️`); // LOG

  question.textContent = 'Tớ biết mà, tớ biết là cậu sẽ cho tớ một cơ hội nữa mà ❤️';
  gif.src = 'https://i.pinimg.com/originals/7e/f6/9c/7ef69cd0a6b0b78526c8ce983b3296fc.gif';
  noBtn.style.display = 'none';
  yesBtn.style.display = 'none';
  explodeHearts();
  sound4.currentTime = 103.5;
  sound4.play();
  program();
});

function explodeHearts() {
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement('div');
    const icons = ['❤️', '💖'];
    heart.textContent = icons[Math.floor(Math.random() * icons.length)];
    heart.classList.add('emoji-effect');

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.fontSize = `${Math.random() * 1.5 + 1}rem`;

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  }

  setTimeout(explodeHearts, 500);
}