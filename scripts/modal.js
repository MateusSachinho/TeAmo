document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('modal');
    var modalImg = document.getElementById('modal-img');
    var closeBtn = document.getElementsByClassName('close')[0];
    var fotos = document.querySelectorAll('.foto img');

    fotos.forEach(function(img) {
        img.onclick = function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            modalImg.classList.add('fade-in');
        }
    });

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});