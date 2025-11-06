const form = document.getElementById('form');
const sendBtn = document.getElementById('sendEmailBtn');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    sendBtn.innerHTML = "Please wait..."
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                sendBtn.innerHTML = json.message;
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    },
                    title: 'Message sent successfully!',
                    icon: 'success',
                })
            } else {
                console.log(response);
                sendBtn.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            sendBtn.innerHTML = "Something went wrong!";
        })
        .then(function () {
            form.reset();
            setTimeout(() => {
                sendBtn.innerHTML = "Send Message";
            }, 3000);
        });
});