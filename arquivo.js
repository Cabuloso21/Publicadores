const addButton = document.getElementById('addCategory');
        const searchInput = document.getElementById('searchCategory');

        const categoriesContainer = document.getElementById('categoriesContainer');

  
        // Carregar categorias do localStorage ao carregar a página
        window.addEventListener('load', loadCategories);

        addButton.addEventListener('click', showCategoryMessage);

        function loadCategories() {
            const savedCategories = JSON.parse(localStorage.getItem('categories')) || [];
            savedCategories.forEach((categoryData) => {
                createCategory(categoryData);
            });
        }

        function showCategoryMessage() {
            const categoryName = prompt("Nome do Estudante:");
            if (categoryName) {
                const categoryData = {
                    name: categoryName,
                    description: "Contato",
                    livro: "",
                    tema: "",
                    capitulo: "",
                    proximoEstudo: "",
                    dia: "",
                    horario: "",
                    phoneNumber: "",
                };
                createCategory(categoryData);
                saveCategories();
            }
        }

        function createCategory(categoryData) {
            const categoryDiv = document.createElement('div');
            categoryDiv.innerHTML = `
                
          <h3 contenteditable="true" oninput="saveCategories()">${categoryData.name}</h3>
                <p contenteditable="true" oninput="saveCategories()">${categoryData.description}</p>
                <input type="number" placeholder="Número do WhatsApp" value="${categoryData.phoneNumber}" oninput="saveCategoriesPhoneNumber(this)">
                <div>
                    <label for="livro">Livro de estudo:</label>
                    <input type="text" id="livro" value="${categoryData.livro}" oninput="updateCategoryField(this, 'livro')">
                </div>
                <div>
                    <label for="tema">Capitulo:</label>
                    <input type="text" id="tema" value="${categoryData.tema}" oninput="updateCategoryField(this, 'tema')">
                </div>
                <div>
                    <label for="capitulo">Lição:</label>
                    <input type="text" id="capitulo" value="${categoryData.capitulo}" oninput="updateCategoryField(this, 'capitulo')">
                </div>
                <div>
                    <label for="proximoEstudo">Próximo estudo:</label>
                    <input type="text" id="proximoEstudo" value="${categoryData.proximoEstudo}" oninput="updateCategoryField(this, 'proximoEstudo')">
                </div>
                <div>
                    <label for="dia">Dia:</label>
                    <input type="text" id="dia" value="${categoryData.dia}" oninput="updateCategoryField(this, 'dia')">
                </div>
                <div>
                    
                  
   <label for="horario">Horario:</label>
  <input type="text" id="horario" value="${categoryData.horario}" oninput="formatHora(this)">

                  
                  
                  
                </div>
                <span class="delete-button" onclick="deleteCategory(this)">Excluir</span>
                <button onclick="redirectToWhatsApp(this)">Conversar</button>
            `;

          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
            categoriesContainer.appendChild(categoryDiv);
        }

        function saveCategoriesPhoneNumber(input) {
            const categoryDiv = input.parentElement;
            const categoryName = categoryDiv.querySelector('h3').textContent;
            const phoneNumber = input.value;
            updateCategoryField(categoryName, 'phoneNumber', phoneNumber);
        }

        function deleteCategory(deleteButton) {
            const categoryDiv = deleteButton.parentElement;
            categoryDiv.remove();
            saveCategories();
        }

        function updateCategoryField(categoryName, field, value) {
            const savedCategories = JSON.parse(localStorage.getItem('categories')) || [];
            const updatedCategories = savedCategories.map((category) => {
                if (category.name === categoryName) {
                    category[field] = value;
                }
                return category;
            });
            localStorage.setItem('categories', JSON.stringify(updatedCategories));
            saveCategories();
        }

        function saveCategories() {
            const categories = Array.from(categoriesContainer.children);
            const categoriesData = categories.map((category) => ({
                name: category.querySelector('h3').textContent,
                description: category.querySelector('p').textContent,
                phoneNumber: category.querySelector('input[type="number"]').value,
                livro: category.querySelector('#livro').value,
                tema: category.querySelector('#tema').value,
                capitulo: category.querySelector('#capitulo').value,
                proximoEstudo: category.querySelector('#proximoEstudo').value,
                dia: category.querySelector('#dia').value,
                horario: category.querySelector('#horario').value,
            }));
            localStorage.setItem('categories', JSON.stringify(categoriesData));
        }

        function redirectToWhatsApp(button) {
            const categoryDiv = button.parentElement;
            const categoryName = categoryDiv.querySelector('h3').textContent;
            const savedCategories = JSON.parse(localStorage.getItem('categories')) || [];
            const categoryData = savedCategories.find(category => category.name === categoryName);

            if (categoryData) {
                const phoneNumber = categoryData.phoneNumber;
                if (phoneNumber) {
                    window.location.href = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
                } else {
                    alert("Para conversar com seu estudante, adicione o número do WhatsApp dele.");
                }
            }
        }









        function searchCategories() {
            const searchTerm = searchInput.value.toLowerCase();
            const categories = categoriesContainer.children;

            for (let i = 0; i < categories.length; i++) {
                const category = categories[i];
                const categoryName = category.querySelector('h3').textContent.toLowerCase();

                if (categoryName.includes(searchTerm)) {
                    category.style.display = 'block';
                } else {
                    category.style.display = 'none';
                }
            }
        }










function formatHora(input) {
  const hora = input.value;
  if (hora.length === 2 && hora.indexOf(':') === -1) {
    input.value = hora + ':00';
  }
  saveCategories(); // Altere de saveHorario() para saveCategories()
}
    
    
    
    
    
  

  function saveHorario() {
    const horarioInput = document.getElementById("horario");
    const horario = horarioInput.value;

    // Use o localStorage para armazenar a hora
    localStorage.setItem("horario", horario);
  }

  function loadHorario() {
    const horarioSaved = localStorage.getItem("horario");
    if (horarioSaved) {
      document.getElementById("horario").value = horarioSaved;
    }
  }

  document.getElementById("horario").addEventListener("input", formatHora);
  loadHorario();
















