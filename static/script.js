document.getElementById('orderBtn').onclick = function() {
    document.getElementById('modal').style.display = 'flex';
}

document.querySelector('.close').onclick = function() {
    document.getElementById('modal').style.display = 'none';
}

document.getElementById('orderForm').onsubmit = function(e) {
    e.preventDefault();
    const formData = new FormData(this);

    fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === 'success') {
            document.getElementById('successMsg').style.display = 'block';
            document.getElementById('errorMsg').style.display = 'none';
            loadReviews();
            setTimeout(() => {
                document.getElementById('modal').style.display = 'none';
                document.getElementById('orderForm').reset();
                document.getElementById('successMsg').style.display = 'none';
            }, 2000);
        } else {
            document.getElementById('errorMsg').style.display = 'block';
        }
    })
    .catch(() => {
        document.getElementById('errorMsg').style.display = 'block';
    });
};

function loadReviews() {
    fetch('/orders')
        .then(res => res.json())
        .then(data => {
            const reviewsDiv = document.getElementById('reviews');
            reviewsDiv.innerHTML = '';
            data.slice(0, 3).forEach(order => {
                const p = document.createElement('p');
                p.innerHTML = `<i>"${order[2]}"</i> — ${order[0]}`;
                reviewsDiv.appendChild(p);
            });
        });
}

document.addEventListener('DOMContentLoaded', loadReviews);