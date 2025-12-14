// ページ管理
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById(pageId).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // 統計記録
  trackPageView(pageId);
}

// 統計データ管理（localStorageに保存）
function trackPageView(pageId) {
  const stats = JSON.parse(localStorage.getItem('fortuneStats') || '{}');
  const today = new Date().toISOString().split('T')[0];

  if (!stats[today]) {
    stats[today] = {
      pageViews: {},
      fortunes: 0,
      lineRegistrations: 0,
      payments: 0,
      courseSignups: 0
    };
  }

  stats[today].pageViews[pageId] = (stats[today].pageViews[pageId] || 0) + 1;
  localStorage.setItem('fortuneStats', JSON.stringify(stats));
}

function trackEvent(eventType) {
  const stats = JSON.parse(localStorage.getItem('fortuneStats') || '{}');
  const today = new Date().toISOString().split('T')[0];

  if (!stats[today]) {
    stats[today] = {
      pageViews: {},
      fortunes: 0,
      lineRegistrations: 0,
      payments: 0,
      courseSignups: 0
    };
  }

  stats[today][eventType] = (stats[today][eventType] || 0) + 1;
  localStorage.setItem('fortuneStats', JSON.stringify(stats));
}

// 統計表示（開発用 - コンソールで確認）
function showStats() {
  const stats = JSON.parse(localStorage.getItem('fortuneStats') || '{}');
  console.log('=== 統計データ ===');
  console.table(stats);
  return stats;
}

// 年月日のセレクトボックスを生成
function initializeDateSelects() {
  const yearSelect = document.getElementById('year');
  const monthSelect = document.getElementById('month');
  const daySelect = document.getElementById('day');

  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 1940; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = `${year}年`;
    yearSelect.appendChild(option);
  }

  for (let month = 1; month <= 12; month++) {
    const option = document.createElement('option');
    option.value = month;
    option.textContent = `${month}月`;
    monthSelect.appendChild(option);
  }

  for (let day = 1; day <= 31; day++) {
    const option = document.createElement('option');
    option.value = day;
    option.textContent = `${day}日`;
    daySelect.appendChild(option);
  }
}

// 五行の判定
function getElement(year, month, day) {
  const sum = (year + month * 10 + day) % 5;
  const elements = [
    { name: '木', color: '#4CAF50', meaning: '成長の気質',
      description: '新しいことにチャレンジする力を持つあなた。創造性と柔軟性が特徴です。' },
    { name: '火', color: '#FF5722', meaning: '情熱の気質',
      description: '情熱的で行動力のあるあなた。周りを明るく照らす存在です。' },
    { name: '土', color: '#D4AF37', meaning: '安定の気質',
      description: '安定感があり信頼される存在。調和を大切にするあなたです。' },
    { name: '金', color: '#FFD700', meaning: '洗練の気質',
      description: '美しいものを愛し、品格のあるあなた。芸術的センスに恵まれています。' },
    { name: '水', color: '#2196F3', meaning: '柔軟の気質',
      description: '柔軟で適応力が高いあなた。直感力に優れています。' }
  ];
  return elements[sum];
}

// （以降、ユーザー貼り付けのJS全文を入れてください）

// 初期化
initializeDateSelects();

// ページ読み込み時の統計記録
trackPageView('topPage');
