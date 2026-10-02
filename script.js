document.title = 'Hộp Thư THPTTrinhHoaiDuc';

const mailbox = document.getElementById('mailbox');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const url = mailbox.href;
const DELAY = 900; // ms, chỉnh theo thời lượng animation thật

// Tải trước Google Form ngay khi trang hòm thư mở (trình duyệt nào không hỗ trợ sẽ tự bỏ qua)
if (window.HTMLScriptElement && HTMLScriptElement.supports && HTMLScriptElement.supports('speculationrules')) {
  const rules = document.createElement('script');
  rules.type = 'speculationrules';
  rules.textContent = JSON.stringify({
    prefetch: [{ source: 'list', urls: [url], eagerness: 'immediate' }]
  });
  document.head.appendChild(rules);
}

let leaving = false;

mailbox.addEventListener('click', (e) => {
  e.preventDefault();
  if (leaving) return; // chặn bấm nhiều lần
  leaving = true;

  // Người dùng tắt hiệu ứng thì chuyển trang luôn
  if (reduceMotion) {
    window.location.href = url;
    return;
  }

  // Chạy hiệu ứng thư rơi, xong thì mở Google Form
  mailbox.classList.add('sent');
  setTimeout(() => {
    window.location.href = url;
  }, DELAY);
});

// Bấm Back từ Google Form quay lại thì trả hòm thư về trạng thái ban đầu
window.addEventListener('pageshow', (e) => {
  if (e.persisted) {
    leaving = false;
    mailbox.classList.remove('sent');
  }
});