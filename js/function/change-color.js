document.addEventListener('DOMContentLoaded', function() {
    // 获取元素
    const settingsBtn = document.querySelector('.art-settings-btn');
    const colorPanel = document.querySelector('.art-color-panel');
    const colorButtons = document.querySelectorAll('.art-color-btn');
    
    // 切换颜色面板
    settingsBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      colorPanel.classList.toggle('active');
    });
    
    // 颜色按钮点击事件
    colorButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.stopPropagation();
        
        colorButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const color = this.getAttribute('data-color');
        document.documentElement.style.setProperty('--main-color', color);
        localStorage.setItem('themeColor', color);
      });
    });
    
    // 点击页面其他位置关闭面板
    document.addEventListener('click', function() {
      colorPanel.classList.remove('active');
    });
    
    // 阻止面板点击事件冒泡
    colorPanel.addEventListener('click', function(e) {
      e.stopPropagation();
    });
    
    // 加载保存的颜色
    const savedColor = localStorage.getItem('themeColor');
    if (savedColor) {
      document.documentElement.style.setProperty('--main-color', savedColor);
      colorButtons.forEach(button => {
        if (button.getAttribute('data-color') === savedColor) {
          button.classList.add('active');
        }
      });
    } else {
      // 默认激活第一个按钮
      colorButtons[0].classList.add('active');
    }
  });