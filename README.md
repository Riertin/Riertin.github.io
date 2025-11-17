# Riertin.github.io
我的个人网站
const works = [
  {
    img: "work1.jpg",
    info: `
      <strong>作品名称：</strong>绿意生生<br>
      <strong>年份：</strong>2024<br>
      <strong>介绍：</strong>自然的绿意随处流淌，整个画面让空间焕然一新，体验春天的舒适与活力。
    `
  },
  {
    img: "work2.jpg",
    info: `
      <strong>作品名称：</strong>晨曦薄荷<br>
      <strong>年份：</strong>2023<br>
      <strong>介绍：</strong>清新薄荷色结合柔软晨光，唤醒一天的灵感与活力。
    `
  },
  {
    img: "work3.jpg",
    info: `
      <strong>作品名称：</strong>水光潋滟<br>
      <strong>年份：</strong>2023<br>
      <strong>介绍：</strong>作品灵感来自初夏湖面，透明感和层次让观者心情清爽。
    `
  }
];

let current = 0;

function renderWork(index) {
  const work = works[index];
  document.getElementById('work').innerHTML = `
    <img src="${work.img}" alt="作品${index+1}">
    <div class="info">${work.info}</div>
  `;
}

document.getElementById('prev').onclick = function() {
  current = (current - 1 + works.length) % works.length;
  renderWork(current);
};

document.getElementById('next').onclick = function() {
  current = (current + 1) % works.length;
  renderWork(current);
};

renderWork(current);
