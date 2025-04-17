// 打开弹窗
function openModal(modalId) {
    const modal = document.getElementById(modalId + '-modal');
    document.body.style.overflow = 'hidden';
    modal.classList.add('active');
  }

  // 关闭弹窗
  function closeModal() {
    const modals = document.querySelectorAll('.modal');
    document.body.style.overflow = '';
    modals.forEach(modal => {
      modal.classList.remove('active');
    });
  }

  // 点击外部关闭
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      closeModal();
    }
  });

  // ESC键关闭
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // 复制功能
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      alert(`已复制: ${text}`);
    }).catch(err => {
      console.error('复制失败:', err);
      // 降级方案
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert(`已复制: ${text}`);
    });
  }