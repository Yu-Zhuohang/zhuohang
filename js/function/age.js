// 定义生日
const birthDate = new Date('2004-07-29');
// 获取当前日期
const currentDate = new Date();
// 计算年龄
let age = currentDate.getFullYear() - birthDate.getFullYear();
const monthDiff = currentDate.getMonth() - birthDate.getMonth();
if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
    age--;
}
// 获取显示年龄的元素
const ageDisplay = document.getElementById('age-display');
// 更新显示的年龄
ageDisplay.textContent = age;