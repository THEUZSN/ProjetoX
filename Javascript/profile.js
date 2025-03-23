 // Elementos do DOM
 const profileImage = document.getElementById('profile-image');
 const uploadPicInput = document.getElementById('upload-pic');
 const changePicButton = document.getElementById('change-pic');
 
 const editProfileButton = document.getElementById('edit-profile');
 const saveProfileButton = document.getElementById('save-profile');
 const body = document.body;
 const profileName = document.getElementById('profile-name');
 const profileBio = document.getElementById('profile-bio');
 const editNameInput = document.getElementById('edit-name');
 const editBioInput = document.getElementById('edit-bio');
 const bookInput = document.getElementById('book-input');
 const forumInput = document.getElementById('forum-input');
 const favoriteBooksList = document.getElementById('favorite-books');
 const forumList = document.getElementById('forum-list');

 // API de fotos aleatórias
 const RANDOM_PIC_API = 'https://picsum.photos/150';

 // Carregar dados do LocalStorage ao iniciar
 document.addEventListener('DOMContentLoaded', () => {
     loadProfile();
     loadBooks();
     loadForums();
 });

 // Escolher imagem do dispositivo
 changePicButton.addEventListener('click', () => {
     uploadPicInput.click();
 });

 uploadPicInput.addEventListener('change', (event) => {
     const file = event.target.files[0];
     if (file) {
         const reader = new FileReader();
         reader.onload = (e) => {
             profileImage.src = e.target.result;
             localStorage.setItem('profileImage', e.target.result);
         };
         reader.readAsDataURL(file);
     }
 });

 // Entrar no modo de edição
 editProfileButton.addEventListener('click', () => {
     body.classList.add('editing');
     // Preencher os campos de edição com os dados atuais
     editNameInput.value = profileName.textContent;
     editBioInput.value = profileBio.textContent;
 });

 // Sair do modo de edição
 saveProfileButton.addEventListener('click', () => {
     body.classList.remove('editing');
     // Atualizar nome e bio com os valores dos campos de edição
     profileName.textContent = editNameInput.value;
     profileBio.textContent = editBioInput.value;
     saveProfile();
 });

 // Adicionar livro
 function addBook() {
     const title = bookInput.value.trim();
     if (title) {
         const li = document.createElement('li');
         li.textContent = title;
         const deleteButton = document.createElement('button');
         deleteButton.textContent = 'Excluir';
         deleteButton.classList.add('delete-button');
         deleteButton.onclick = () => {
             li.remove();
             saveBooks();
         };
         li.appendChild(deleteButton);
         favoriteBooksList.appendChild(li);
         bookInput.value = '';
         saveBooks();
     }
 }

 // Adicionar fórum
 function addForum() {
     const name = forumInput.value.trim();
     if (name) {
         const li = document.createElement('li');
         li.textContent = name;
         const deleteButton = document.createElement('button');
         deleteButton.textContent = 'Excluir';
         deleteButton.classList.add('delete-button');
         deleteButton.onclick = () => {
             li.remove();
             saveForums();
         };
         li.appendChild(deleteButton);
         forumList.appendChild(li);
         forumInput.value = '';
         saveForums();
     }
 }

 // Salvar perfil
 function saveProfile() {
     localStorage.setItem('profileName', profileName.textContent);
     localStorage.setItem('profileBio', profileBio.textContent);
     saveBooks();
     saveForums();
 }

 // Salvar livros no LocalStorage
 function saveBooks() {
     const books = [];
     document.querySelectorAll('#favorite-books li').forEach(li => books.push(li.childNodes[0].textContent));
     localStorage.setItem('books', JSON.stringify(books));
 }

 // Salvar fóruns no LocalStorage
 function saveForums() {
     const forums = [];
     document.querySelectorAll('#forum-list li').forEach(li => forums.push(li.childNodes[0].textContent));
     localStorage.setItem('forums', JSON.stringify(forums));
 }

 // Carregar perfil
 function loadProfile() {
     const savedImage = localStorage.getItem('profileImage');
     const savedName = localStorage.getItem('profileName');
     const savedBio = localStorage.getItem('profileBio');

     if (savedImage) profileImage.src = savedImage;
     if (savedName) profileName.textContent = savedName;
     if (savedBio) profileBio.textContent = savedBio;
 }

 // Carregar livros
 function loadBooks() {
     const books = JSON.parse(localStorage.getItem('books')) || [];
     books.forEach(book => {
         const li = document.createElement('li');
         li.textContent = book;
         const deleteButton = document.createElement('button');
         deleteButton.textContent = 'Excluir';
         deleteButton.classList.add('delete-button');
         deleteButton.onclick = () => {
             li.remove();
             saveBooks();
         };
         li.appendChild(deleteButton);
         favoriteBooksList.appendChild(li);
     });
 }

 // Carregar fóruns
 function loadForums() {
     const forums = JSON.parse(localStorage.getItem('forums')) || [];
     forums.forEach(forum => {
         const li = document.createElement('li');
         li.textContent = forum;
         const deleteButton = document.createElement('button');
         deleteButton.textContent = 'Excluir';
         deleteButton.classList.add('delete-button');
         deleteButton.onclick = () => {
             li.remove();
             saveForums();
         };
         li.appendChild(deleteButton);
         forumList.appendChild(li);
     });
 }