document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const mailtoLink = `mailto:yuzhuohang2004@foxmail.com?subject=Message from ${name}&body=From: ${email}%0D%0A%0D%0A${message}`;
    window.location.href = mailtoLink;
});