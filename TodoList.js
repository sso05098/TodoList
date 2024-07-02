document.addEventListener("DOMContentLoaded", function() {
    const termList = document.getElementById('termList');
    const addTermBtn = document.getElementById('addTermBtn');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementsByClassName('close')[0];
    const saveTermBtn = document.getElementById('saveTermBtn');
    const newTermInput = document.getElementById('newTerm');

    function loadTerms() {
        const terms = JSON.parse(localStorage.getItem('terms')) || [];
        terms.forEach(term => addTermToList(term));
    }

    function addTermToList(term) {
        const li = document.createElement('li');

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';

        const span = document.createElement('span');
        span.className = 'term-text';
        span.textContent = term;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'deleteBtn';
        deleteBtn.textContent = '삭제';
        deleteBtn.onclick = function() {
            termList.removeChild(li);
            removeTermFromStorage(term);
        };

        li.appendChild(checkBox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        termList.appendChild(li);
    }

    function removeTermFromStorage(term) {
        let terms = JSON.parse(localStorage.getItem('terms')) || [];
        terms = terms.filter(t => t !== term);
        localStorage.setItem('terms', JSON.stringify(terms));
    }

    addTermBtn.onclick = function() {
        modal.style.display = 'block';
    }

    closeModal.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }

    saveTermBtn.onclick = function() {
        const newTerm = newTermInput.value.trim();
        if (newTerm) {
            addTermToList(newTerm);
            saveTermToStorage(newTerm);
            newTermInput.value = '';
            modal.style.display = 'none';
        }
    }

    function saveTermToStorage(term) {
        const terms = JSON.parse(localStorage.getItem('terms')) || [];
        terms.push(term);
        localStorage.setItem('terms', JSON.stringify(terms));
    }

    loadTerms();
});
