// Função para obter a chave da página
        function pageKey() {
            return 'pagina1';
        }

        // Use uma chave específica para esta página
        const storageKey = `categories_${pageKey()}`;

        const addButton = document.getElementById('addCategory');
        const searchInput = document.getElementById('searchCategory');
        const categoriesContainer = document.getElementById('categoriesContainer');

        // Carregar categorias do localStorage ao carregar a página
        window.addEventListener('load', loadCategories);

        addButton.addEventListener('click', showCategoryMessage);

        function loadCategories() {
            const savedCategories = JSON.parse(localStorage.getItem(storageKey)) || [];
            savedCategories.forEach((categoryData) => {
                createCategory(categoryData);
            });
        }

        function showCategoryMessage() {
            const categoryName = prompt("Nome da pessoa:");
            if (categoryName) {
                const categoryData = {
                    name: categoryName,
                    description: "Contato",
                    nome: "",
                    publicacões: "",
                    conversa: "",
                    proximoEstudo: "",
                    dia: "",
                    horario: "",
                    endereco: "",
                    casa: "",
                  
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
                <!-- Resto do seu código HTML aqui -->
          </div>
          <div>
          
          
          <label for="nome">Nome:</label>
                    <input type="text" id="nome" value="${categoryData.nome}" oninput="updateCategoryField(this, 'nome')">
                </div>
                <div>
                    <label for="publicacões">Publicações:</label>
                    <input type="text" id="publicacões" value="${categoryData.publicacões}" oninput="updateCategoryField(this, 'publicacões')">
                </div>
                <div>
                    <label for="conversa">Primeira conversa:</label>
                    <input type="text" id="conversa" value="${categoryData.conversa}" oninput="updateCategoryField(this, 'conversa')">
                </div>
                <div>
                    <label for="proximoEstudo">Proxima conversa:</label>
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
  <div>
    
  <label for="endereco">Endereço:</label>
  <input type="text" id="endereco" value="${categoryData.endereco}" oninput="updateCategoryField(this, 'endereco')">
  </div>
  <div>
       
  <label for="casa">Numero da casa:</label>
  <input type="text" id="casa" value="${categoryData.casa}" oninput="updateCategoryField(this, 'casa')">
  </div>
  <div>               
                  
                  
                </div>
                <span class="delete-button" onclick="deleteCategory(this)">Excluir</span>
                <button onclick="redirectToWhatsApp(this)">Conversar</button>
            

          
          
          
            `;

            categoriesContainer.appendChild(categoryDiv);
        }

        // Função para salvar o número de telefone ao editar
        function saveCategoriesPhoneNumber(input) {
            const categoryDiv = input.parentElement;
            const categoryName = categoryDiv.querySelector('h3').textContent;
            const phoneNumber = input.value;
            updateCategoryField(categoryName, 'phoneNumber', phoneNumber);
        }

        // Função para excluir uma categoria
        function deleteCategory(deleteButton) {
            const categoryDiv = deleteButton.parentElement;
            categoryDiv.remove();
            saveCategories();
        }

        // Função para atualizar um campo de categoria
        function updateCategoryField(categoryName, field, value) {
            const savedCategories = JSON.parse(localStorage.getItem(storageKey)) || [];
            const updatedCategories = savedCategories.map((category) => {
                if (category.name === categoryName) {
                    category[field] = value;
                }
                return category;
            });
            localStorage.setItem(storageKey, JSON.stringify(updatedCategories));
            saveCategories();
        }

        // Função para salvar todas as categorias
        function saveCategories() {
            const categories = Array.from(categoriesContainer.children);
            const categoriesData = categories.map((category) => ({
                name: category.querySelector('h3').textContent,
                description: category.querySelector('p').textContent,
                phoneNumber: category.querySelector('input[type="number"]').value,
                nome: category.querySelector('#nome').value,
                publicacões: category.querySelector('#publicacões').value,
                conversa: category.querySelector('#conversa').value,
                proximoEstudo: category.querySelector('#proximoEstudo').value,
                dia: category.querySelector('#dia').value,
                horario: category.querySelector('#horario').value,
                endereco: category.querySelector('#endereco').value,
                casa: category.querySelector('#casa').value,
              
              
            }));
            localStorage.setItem(storageKey, JSON.stringify(categoriesData));
        }

        // Função para redirecionar para o WhatsApp
        function redirectToWhatsApp(button) {
            const categoryDiv = button.parentElement;
            const categoryName = categoryDiv.querySelector('h3').textContent;
            const savedCategories = JSON.parse(localStorage.getItem(storageKey)) || [];
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

        // Função para pesquisar categorias
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

        // Função para formatar a hora
        function formatHora(input) {
            const hora = input.value;
            if (hora.length === 2 && hora.indexOf(':') === -1) {
                input.value = hora + ':00';
            }
            saveCategories();
        }

        function saveHorario() {
            const horarioInput = document.getElementById("horario");
            const horario = horarioInput.value;
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