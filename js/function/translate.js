// 存储当前语言
let currentLanguage = 'en';

// 获取语言切换按钮
const languageButtons = document.querySelectorAll('.art-language-change a');

// 为每个按钮添加点击事件监听器
languageButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        // 获取目标语言
        const targetLang = this.getAttribute('data-lang');
        // 若目标语言与当前语言不同，切换语言
        if (targetLang!== currentLanguage) {
            switchLanguage(targetLang);
            currentLanguage = targetLang;
            // 更新活动语言按钮的样式
            updateActiveLanguageButton(targetLang);
        }
    });
});

// 切换语言的函数
async function switchLanguage(lang) {
    try {
        // 从对应的 JSON 文件加载语言数据
        const response = await fetch(`languages/${lang}.json`);
        if (!response.ok) {
            throw new Error(`无法加载 ${lang} 语言文件`);
        }
        const languageData = await response.json();
        // 获取所有需要翻译的元素
        const elements = document.querySelectorAll('[data-lang-key]');
        elements.forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (languageData[key]) {
                // 遍历元素的子节点
                element.childNodes.forEach(child => {
                    if (child.nodeType === Node.TEXT_NODE) {
                        // 仅更新文本节点的内容
                        child.textContent = languageData[key];
                    }
                });
            }
        });
    } catch (error) {
        console.error('语言切换出错:', error);
    }
}

// 更新活动语言按钮的样式
function updateActiveLanguageButton(lang) {
    // 移除所有按钮的活动类
    languageButtons.forEach(button => {
        button.parentNode.classList.remove('art-active-lang');
    });
    // 添加活动类到当前语言按钮
    const activeButton = document.querySelector(`.art-language-change a[data-lang="${lang}"]`);
    activeButton.parentNode.classList.add('art-active-lang');
}

// 页面加载时初始化语言
document.addEventListener('DOMContentLoaded', () => {
    switchLanguage(currentLanguage);
});    