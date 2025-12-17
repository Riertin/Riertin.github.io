document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.message-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name && email && subject && message) {
                alert('感谢您的留言！我会尽快回复您。');
                form.reset();
            } else {
                alert('请填写所有必填项。');
            }
        });
    }
});
