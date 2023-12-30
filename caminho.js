function redirecionar(url) {
 window.location.href = url;
}


 



        // Função para habilitar a edição do cabeçalho
        function habilitarEdicao() {
            var header = document.getElementById("headerText");
            header.focus();
        }

  
  
  
  
  
        // Função para selecionar e exibir uma imagem
        function selecionarImagem() {
            var imagemInput = document.getElementById("imagemInput");
            imagemInput.click();

            imagemInput.addEventListener("change", function () {
                var logo = document.getElementById("logo");
                var file = imagemInput.files[0];
                var reader = new FileReader();

                reader.onload = function () {
                    logo.src = reader.result;
                    // Salvar a imagem no armazenamento local
                    localStorage.setItem("imagem", reader.result);
                };

                if (file) {
                    reader.readAsDataURL(file);
                }
            });
        }

        // Carregar imagem do armazenamento local ao carregar a página
        var imagemSalva = localStorage.getItem("imagem");
        if (imagemSalva) {
            var logo = document.getElementById("logo");
            logo.src = imagemSalva;
        }

  
  
  
  
  
  
  
        // Restante do seu código JavaScript para salvar edições automaticamente
        var headerText = document.getElementById("headerText");

        headerText.addEventListener("input", function () {
            // Salvar o texto do cabeçalho no armazenamento local
            localStorage.setItem("cabecalho", headerText.textContent);
        });

        // Carregar texto do cabeçalho do armazenamento local ao carregar a página
        var cabecalhoSalvo = localStorage.getItem("cabecalho");
        if (cabecalhoSalvo) {
            headerText.textContent = cabecalhoSalvo;
        }
    
    



 

        