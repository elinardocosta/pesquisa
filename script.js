document.addEventListener("DOMContentLoaded", function () {
    const codeForm = document.getElementById("codeForm");
    const codeInput = document.getElementById("code");
    const nameInput = document.getElementById("name");
    const codeList = document.getElementById("codeList");

    // Load existing data from local storage
    const savedData = JSON.parse(localStorage.getItem("codeAndNameData")) || [];

    // Display existing data
    savedData.forEach(item => {
        createListItem(item.code, item.name);
    });

    codeForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const code = codeInput.value.trim();
        const name = nameInput.value.trim();

        if (code && name) {
            // Add the code and name to the list
            createListItem(code, name);

            // Save the data in local storage
            savedData.push({ code, name });
            localStorage.setItem("codeAndNameData", JSON.stringify(savedData));

            // Clear the form inputs
            codeInput.value = "";
            nameInput.value = "";
        }
    });

    function createListItem(code, name) {
        const listItem = document.createElement("li");
        listItem.textContent = `${code}: ${name}`;
        codeList.appendChild(listItem);
    }
});

function ocultarLabel() {
    var label = document.getElementById("minhaLabel");
    label.style.display = "none";
}

function mostrarBarraDeAguarde() {
    var loading = document.getElementById("loading");
    loading.style.display = "block";
}

function ocultarBarraDeAguarde() {
    document.getElementById("minhaLabel").style.display = "none";
    var loading = document.getElementById("loading");
    loading.style.display = "none";
}

function searchCodes() {
    ocultarLabel();
    mostrarBarraDeAguarde();

    const fileInput = document.getElementById('fileInput');
    const resultsDiv = document.getElementById('resultsDiv');

    const selectedFile = fileInput.files[0];
    const codesListWithNames = [
        // Lista de RF a serem pesquisados
        // ... (códigos e nomes)
    ];

    if (selectedFile) {
        const fileReader = new FileReader();
        fileReader.onload = function (e) {
            const pdfData = new Uint8Array(e.target.result);

            pdfjsLib.getDocument(pdfData).promise.then(function (pdfDoc) {
                const textPromises = [];

                for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
                    textPromises.push(pdfDoc.getPage(pageNum).then(function (page) {
                        return page.getTextContent();
                    }));
                }

                Promise.all(textPromises).then(function (pages) {
                    const codeToLinesMap = {};
                    codesListWithNames.forEach(item => {
                        codeToLinesMap[item.code] = { name: item.name, lines: [] };
                    });

                    for (let i = 0; i < pages.length; i++) {
                        const pageText = pages[i].items.map(item => item.str).join('\n');
                        const lines = pageText.split('\n');

                        for (const item of codesListWithNames) {
                            const code = item.code;
                            for (const line of lines) {
                                if (line.includes(code)) {
                                    codeToLinesMap[code].lines.push({ line, page: i + 1 });
                                }
                            }
                        }
                    }

                    if (codesListWithNames.length === 0) {
                        resultsDiv.innerHTML = "Nenhum RF encontrado nesta Edição";
                    } else {
                        resultsDiv.innerHTML = "Busca Concluída... <br><br>" +
                            "Servidores encontrados no Diário Oficial desta Edição <br><br>";

                        let foundRF = false;

                        for (const item of codesListWithNames) {
                            const code = item.code;
                            const lines = codeToLinesMap[code].lines;
                            if (lines.length > 0) {
                                const name = codeToLinesMap[code].name;
                                resultsDiv.innerHTML += ` - RF: ${code} - Nome: ${name} - `;
                                for (const lineObj of lines) {
                                    resultsDiv.innerHTML += `<a href="#" onclick="goToPage(${lineObj.page}, '${selectedFile.name}')">Página ${lineObj.page}</a>, `;
                                }
                                resultsDiv.innerHTML = resultsDiv.innerHTML.slice(0, -2) + "<br>";
                                foundRF = true;
                            }
                        }

                        if (!foundRF) {
                            resultsDiv.innerHTML = " * Nenhum Servidor encontrado nesta Edição<br>";
                        }
                    }
                    ocultarBarraDeAguarde();
                });
            });
        };
        fileReader.readAsArrayBuffer(selectedFile);
    } else {
        resultsDiv.innerHTML = "Atenção: Selecione o arquivo PDF da Edição." + "<br>";
        ocultarBarraDeAguarde();
    }
}

// abre a pagina web do resultado

function goToPage(pageNumber, pdfPath) {
    const pdfViewerUrl = 'path/to/pdfjs/web/viewer.html'; // Atualize para o caminho correto

    // Abre o PDF Viewer em uma nova guia com a página específica
    window.open(`${pdfViewerUrl}?file=${encodeURIComponent(pdfPath)}#page=${pageNumber}`, '_blank');
}
