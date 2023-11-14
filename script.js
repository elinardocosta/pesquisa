// Espera até que o DOM seja completamente carregado antes de executar o código
document.addEventListener("DOMContentLoaded", function () {
    // Obtém elementos do formulário e da lista
    const codeForm = document.getElementById("codeForm");
    const codeInput = document.getElementById("code");
    const nameInput = document.getElementById("name");
    const codeList = document.getElementById("codeList");

    // Carrega dados existentes do armazenamento local
    const savedData = JSON.parse(localStorage.getItem("codeAndNameData")) || [];

    // Exibe os dados existentes na lista
    savedData.forEach(item => {
        createListItem(item.code, item.name);
    });

    // Adiciona um ouvinte de evento para o formulário de código
    codeForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Obtém valores dos campos do formulário
        const code = codeInput.value.trim();
        const name = nameInput.value.trim();

        // Verifica se ambos os campos estão preenchidos
        if (code && name) {
            // Adiciona o código e o nome à lista
            createListItem(code, name);

            // Salva os dados no armazenamento local
            savedData.push({ code, name });
            localStorage.setItem("codeAndNameData", JSON.stringify(savedData));

            // Limpa os campos do formulário
            codeInput.value = "";
            nameInput.value = "";
        }
    });

    // Função para criar um elemento de lista e adicioná-lo à lista
    function createListItem(code, name) {
        const listItem = document.createElement("li");
        listItem.textContent = `${code}: ${name}`;
        codeList.appendChild(listItem);
    }
});

// Função para ocultar uma label
function ocultarLabel() {
    var label = document.getElementById("minhaLabel");
    label.style.display = "none";
}

// Função para mostrar a barra de aguarde
function mostrarBarraDeAguarde() {
    var loading = document.getElementById("loading");
    loading.style.display = "block";
}

// Função para ocultar a barra de aguarde e uma label
function ocultarBarraDeAguarde() {
    document.getElementById("minhaLabel").style.display = "none";
    var loading = document.getElementById("loading");
    loading.style.display = "none";
}

// Função para realizar a busca de códigos em um arquivo PDF
function searchCodes() {
    // Oculta a label e mostra a barra de aguarde
    ocultarLabel();
    mostrarBarraDeAguarde();

    // Obtém elementos do formulário e do resultado
    const fileInput = document.getElementById('fileInput');
    const resultsDiv = document.getElementById('resultsDiv');

    // Obtém o arquivo selecionado
    const selectedFile = fileInput.files[0];

    // Lista de códigos e nomes a serem pesquisados
    const codesListWithNames = [
        // ... (códigos e nomes)
    ]; // Adicione mais códigos e nomes se necessário na frente do código acima

    // Verifica se um arquivo foi selecionado
    if (selectedFile) {
        // Cria um leitor de arquivo
        const fileReader = new FileReader();

        // Define a função a ser executada quando o arquivo for carregado
        fileReader.onload = function (e) {
            // Converte os dados do PDF para um array de bytes
            const pdfData = new Uint8Array(e.target.result);

            // Usa a biblioteca pdf.js para obter o documento PDF
            pdfjsLib.getDocument(pdfData).promise.then(function (pdfDoc) {
                // Promessas para obter o texto de cada página do PDF
                const textPromises = [];

                for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
                    textPromises.push(pdfDoc.getPage(pageNum).then(function (page) {
                        return page.getTextContent();
                    }));
                }

                // Quando todas as promessas de texto forem resolvidas
                Promise.all(textPromises).then(function (pages) {
                    // Mapeia códigos para as linhas correspondentes nas páginas
                    const codeToLinesMap = {};
                    codesListWithNames.forEach(item => {
                        codeToLinesMap[item.code] = { name: item.name, lines: [] };
                    });

                    // Itera sobre as páginas e verifica a correspondência dos códigos
                    for (let i = 0; i < pages.length; i++) {
                        const pageText = pages[i].items.map(item => item.str).join('\n');
                        for (const item of codesListWithNames) {
                            const code = item.code;
                            const regex = new RegExp(`\\b${code}\\b`, 'g'); // Usa regex para correspondência de palavra inteira
                            const matches = pageText.match(regex);
                            if (matches) {
                                codeToLinesMap[code].lines.push({ page: i + 1, matches });
                            }
                        }
                    }

                    // Exibe os resultados na página
                    if (codesListWithNames.length === 0) {
                        resultsDiv.innerHTML = "Nenhum RF encontrado nesta Edição";
                    } else {
                        resultsDiv.innerHTML = "Busca Concluída... <br><br>" +
                            "Servidores encontrados no Diário Oficial desta Edição <br><br>";

                        let foundRF = false;

                        for (const item of codesListWithNames) {
                            const code = item.code;
                            const linesInfo = codeToLinesMap[code].lines;
                            if (linesInfo.length > 0) {
                                const name = codeToLinesMap[code].name;
                                const resultDivContent = ` - RF: ${code} - Nome: ${name} - `;

                                linesInfo.forEach(info => {
                                    const link = document.createElement('a');
                                    link.href = '#';
                                    link.textContent = `Página ${info.page}`;
                                    link.onclick = function (event) {
                                        event.preventDefault(); // Evita a recarga da página
                                        goToPage(info.page);
                                    };

                                    resultDivContent += link.outerHTML + ', ';
                                });

                                resultsDiv.innerHTML += resultDivContent.slice(0, -2) + "<br>";
                                foundRF = true;
                            }
                        }

                        // Se nenhum RF for encontrado
                        if (!foundRF) {
                            resultsDiv.innerHTML = " * Nenhum Servidor encontrado nesta Edição<br>";
                        }
                    }

                    // Oculta a barra de aguarde
                    ocultarBarraDeAguarde();
                });
            });
        };

        // Lê o arquivo como um array de bytes
        fileReader.readAsArrayBuffer(selectedFile);
    } else {
        // Se nenhum arquivo for selecionado
        resultsDiv.innerHTML = "Atenção: Selecione o arquivo PDF da Edição." + "<br>";
        ocultarBarraDeAguarde();
    }
}

// Função para navegar até uma página específica do PDF
function goToPage(pageNumber) {
    // Adicione a lógica para navegar até a página específica do PDF
    // Dependendo da biblioteca usada para exibir o PDF, ajuste este código
    console.log("Navegar até a página:", pageNumber);
}
