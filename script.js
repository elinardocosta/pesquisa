function searchCodes() {
    const fileInput = document.getElementById('fileInput');
    const resultsDiv = document.getElementById('results');

    const selectedFile = fileInput.files[0];
    const codesList = [
        "8087539",
        "9233521",
        "8285187",
        "7971427",
        "8398542",
        "8029482",
        "8791210",
        "8821186",
        "8259640",
        "8171831",
        "8171831",
        "8421790",
        "7822529",
        "8495955",
        "8279071",
        "8163481",
        "8259011",
        "7736835",
        "8139539",
        "8469504",
        "8500860",
        "9229787",
        "9233563",
        "7106921",
        "7989946",
        "6865682",
        "8471622",
        "8830649",
        "9233512",
        "8815585",
        "8230901",
        "8257833",
        "7871643",
        "9191364",
        "9114696",
        "8840989",
        "8428930",
        "9212451",
        "8964327",
        "8183031",
        "8970661",
        "8031304",
        "8514631",
        "9156011",
        "6789587",
        "8497036",
        "7487959",
        "7514981",
        "8839131",
        "7176783",
        "7590547",
        "8482985",
        "8470634",
        "9239863",
        "8427071",
        "8964858",
        "8456542",
        "8456054",
        "7976470",
        "8251592",
        "8346178",
        "8163111",
        "9145770",
        "8482616",
        "8795568",
        "8821917",
        "7546823",
        "8044368",
        "7919905"
    ]; // Lista de códigos a serem pesquisados

    if (selectedFile) {
        const fileReader = new FileReader();
        fileReader.onload = function (e) {
            const pdfData = new Uint8Array(e.target.result);

            // Use a biblioteca pdf.js para carregar o PDF
            pdfjsLib.getDocument(pdfData).promise.then(function (pdfDoc) {
                const textPromises = [];

                for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
                    textPromises.push(pdfDoc.getPage(pageNum).then(function (page) {
                        return page.getTextContent();
                    }));
                }

                Promise.all(textPromises).then(function (pages) {
                    const allText = pages.map(page => page.items.map(item => item.str).join('\n'));

                    // Inicializa um objeto que mapeia os códigos às linhas
                    const codeToLineMap = {};
                    codesList.forEach(code => {
                        codeToLineMap[code] = [];
                    });

                    // Percorre as páginas e busca os códigos
                    for (let i = 0; i < allText.length; i++) {
                        for (const code of codesList) {
                            const lines = allText[i].split('\n');
                            for (const line of lines) {
                                if (line.includes(code)) {
                                    codeToLineMap[code].push(line);
                                }
                            }
                        }
                    }

                    // Exibe os resultados
                    resultsDiv.innerHTML = "RF e Linhas encontradas no Diário Oficial:" + "<br><br>";
                    for (const code of codesList) {
                        const lines = codeToLineMap[code];
                        if (lines.length > 0) {
                            //  resultsDiv.innerHTML += `RF ${code}:<br><br>`;
                            resultsDiv.innerHTML += lines.join(' <br>') + " <br>";
                        }

                    }

                });
            });
        };
        fileReader.readAsArrayBuffer(selectedFile);
    } else {
        resultsDiv.innerHTML = "Selecione o arquivo PDF da Edição." + "<br><br>";
    }
}