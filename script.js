const contactForm = document.getElementById('contactForm');
const contactList = document.getElementById('contactList');
const searchInput = document.getElementById('search');

let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

function saveContacts() {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

function renderContacts(filter = '') {
  contactList.innerHTML = '';
  contacts
    .filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach((contact, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${contact.name}</strong><br>
        ${contact.email}<br>
        ${contact.phone}
        <div class="contact-actions">
          <button class="edit-btn" onclick="editContact(${index})">
            <i class="fas fa-pen"></i>
          </button>
          <button class="delete-btn" onclick="deleteContact(${index})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
      contactList.appendChild(li);
    });
}

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();

  contacts.push({ name, email, phone });
  saveContacts();
  renderContacts();

  contactForm.reset();
});

function deleteContact(index) {
  if (confirm('Supprimer ce contact ?')) {
    contacts.splice(index, 1);
    saveContacts();
    renderContacts();
  }
}

function editContact(index) {
  const contact = contacts[index];
  const newName = prompt('Nom:', contact.name);
  const newEmail = prompt('Email:', contact.email);
  const newPhone = prompt('Téléphone:', contact.phone);

  if (newName && newEmail && newPhone) {
    contacts[index] = { name: newName, email: newEmail, phone: newPhone };
    saveContacts();
    renderContacts();
  }
}

searchInput.addEventListener('input', () => {
  renderContacts(searchInput.value);
});

// Initial render
renderContacts();
