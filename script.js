/* Adicione os scripts para abrir e fechar o popup --> */
function openPopup() {
    document.getElementById("overlay").style.display = "flex";
}

function closePopup() {
    document.getElementById("overlay").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("overlay").style.display = "flex";
    const codeForm = document.getElementById("codeForm");
    const codeInput = document.getElementById("code");
    const nameInput = document.getElementById("name");
    const codeList = document.getElementById("codeList");

    const savedData = JSON.parse(localStorage.getItem("codeAndNameData")) || [];

    savedData.forEach(item => {
        createListItem(item.code, item.name);
    });

    function openPopup() {
        $("#overlay").fadeIn();
    }

    function closePopup() {
        $("#overlay").fadeOut();
    }

    codeForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const code = codeInput.value.trim();
        const name = nameInput.value.trim();

        if (code && name) {
            createListItem(code, name);

            savedData.push({ code, name });
            localStorage.setItem("codeAndNameData", JSON.stringify(savedData));

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

    resultsDiv.innerHTML = "";

    const selectedFile = fileInput.files[0];
    const codesListWithNames = [
    // Lista de RF a serem pesquisados
    { code: "9233521", name: "ADRIANO ANTUNES DE SALVES" }, { code: "8285187", name: "ALESSANDRA RAYMUNDO" }, { code: "7971427", name: "ALESSANDRA SERICAWA BROCCO SILVA" }, { code: "8398542", name: "AMANDA ALVES DOS SANTOS PEDRO" }, { code: "8029482", name: "ANA LUCIA CARVALHO" }, { code: "8791210", name: "ANA PAULA RODRIGUES HONORIO" }, { code: "8063494", name: "ANA PAULA VIANA COSTA" }, { code: "8821186", name: "ANGELA MARIA DE OLIVEIRA" },
    { code: "8259640", name: "APARECIDA VIEIRA DA SILVA" }, { code: "8171831", name: "BEATRIZ CAROLINE BISPO DIAS IBANHEZ" }, { code: "8421790", name: "BEATRIZ NOGUEIRA DE SOUSA" }, { code: "7822529", name: "CARLA FERNANDA BARRETO" }, { code: "8495955", name: "CAROLINA LIMA ANTUNES" }, { code: "8279071", name: "CELIA REGINA LUNA TOPGIAN" }, { code: "8163481", name: "CLAUDIA MARIA AMADOR RUSSO" }, { code: "8259011", name: "CLAUDINEI DA SILVA CRUZ" },
    { code: "7736835", name: "CLAUDIO VIEIRA DA SILVA" }, { code: "8139539", name: "CRISTINA APARECIDA DA SILVA DE OLIVEIRA" }, { code: "8469504", name: "DANIELE DE MELO OLIVEIRA DE CARVALHO" }, { code: "8500860", name: "DAVI AUGUSTO DE ARAUJO MACEDO" }, { code: "9229787", name: "DEBORA SEGURA PAIXAO" }, { code: "9233563", name: "DIRCE MARIA ROSA DE OLIVEIRA" }, { code: "7106921", name: "DORVAL DA COSTA TORRES" }, { code: "7989946", name: "EDSON LIMA" },
    { code: "6865682", name: "ELAINE CRISTINA CARDOSO SETRINI" }, { code: "8471622", name: "ELDIENE SOARES DE OLIVEIRA" }, { code: "8830649", name: "ELINARDO NOGUEIRA COSTA" }, { code: "9233512", name: "ELIONAI CRUZ CONCEICAO COELHO" }, { code: "8815585", name: "EMERICK RANNYERY CHICOLLI AGUIAR" }, { code: "8230901", name: "FABIANA ANDRADE DE LACERDA SILVA" }, { code: "8257833", name: "FABIO FERREIRA RAMOS" }, { code: "7871643", name: "FERNANDA DIAS DA SILVA" },
    { code: "9191364", name: "GABRIELA DA SILVA FERREIRA DE LIMA" }, { code: "9114696", name: "HANNA TEIXEIRA DIAS" }, { code: "8087539", name: "HEROS RODRIGUES DE MORAIS" }, { code: "8840989", name: "IVONE SIQUEIRA LUIZ" }, { code: "8428930", name: "JANAINA STEFANIE ALVARES HUBNER" }, { code: "9212451", name: "JULIA AZEREDO DA SILVA" }, { code: "8964327", name: "JOELMA DOS SANTOS" },
    { code: "8183031", name: "JOSE AUGUSTO LOPES DE ALENCAR" }, { code: "8970661", name: "KAUANE SILVA SEVERINO" }, { code: "8031304", name: "LAERCIO JOSE DE DEUS JUNIOR" }, { code: "8514631", name: "LIGIA PERPETUO CAPELO FURUGUEM" }, { code: "9156011", name: "LILIANE REGINA LIMA SILVA" }, { code: "6789587", name: "LUIZ CARLOS CRISTAN" }, { code: "8497036", name: "MARIA APARECIDA PACCA DA SILVA" }, { code: "7487959", name: "MARIA DE FATIMA LIMA VIEIRA" },
    { code: "7514981", name: "NUBIA VIEIRA DE ARAUJO CERQUEIRA" }, { code: "8839131", name: "OLINDA ROBERTO LEANDRO" }, { code: "7176783", name: "ORLANDO NUNES DE BRITO" }, { code: "7590547", name: "PAULINA APARECIDA ZEFERINO" }, { code: "8482985", name: "PAULO SERGIO BRAZ" }, { code: "8470634", name: "RAFAEL BELMONTE SILVA" }, { code: "9239863", name: "RAFAEL DE MELO FERRAZ" }, { code: "8427071", name: "REJANE BORBA SANTIAGO SILVA" },
    { code: "8964858", name: "RENATA DE ANDRADE ALVES" }, { code: "8456542", name: "RONALDO DE OLIVEIRA" }, { code: "8456054", name: "ROSANE ALEXANDRE ALVES" }, { code: "7976470", name: "ROSANGELA APARECIDA FONSECA" }, { code: "8251592", name: "SAMUEL FERNANDES CALDAS" }, { code: "8346178", name: "SAMUEL FERREIRA DE CAMPOS" }, { code: "8163111", name: "SANDRO RAMOS DOS SANTOS" }, { code: "9145770", name: "SARA GOIS NASCIMENTO" },
    { code: "8482616", name: "SUE ELLEN CRISTINA LUZ DE MELO CADETE" }, { code: "8795568", name: "TIANE MARISE RODRIGUES CHAGAS" }, { code: "8821917", name: "TAUANA LOPES NEPONUCENO" }, { code: "7546823", name: "VERA LUCIA AYKO TAKARA" }, { code: "8044368", name: "VERONICE TAVEIRA DE MELO" }, { code: "7919905", name: "VIVIANE CARVALHO DE OLIVEIRA" }        // Adicione mais códigos e nomes se necessário
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

                    let tableHTML = `
                        <table>
                            <tr>
                                <th>RF</th>
                                <th>Nome</th>
                                <th>Páginas do D.O</th>
                            </tr>`;

                    let foundRF = false;

                    for (const item of codesListWithNames) {
                        const code = item.code;
                        const lines = codeToLinesMap[code].lines;

                        if (lines.length > 0) {
                            const name = codeToLinesMap[code].name;

                            tableHTML += `
                            <tr>
                                <td>${code}</td>
                                <td>${name}</td>
                                <td>`;

                            for (let i = 0; i < lines.length; i++) {
                                const lineObj = lines[i];
                                const pdfLink = `<a href="javascript:void(0);" onclick="openPdf('D_O_BAIXADOS/${selectedFile.name}', ${lineObj.page}, '${code}', ${i})">Página ${lineObj.page}</a>`;
                                tableHTML += pdfLink;

                                if (i < lines.length - 1) {
                                    tableHTML += ', ';
                                }
                            }

                            tableHTML += `</td></tr>`;
                            foundRF = true;
                        }
                    }

                    tableHTML += "<br><span style='font-size: 20px;'> * Servidores da Unidade encontrado neste Arquivo</span><br><br>";

                    tableHTML += `</table><br>`;

                    if (!foundRF) {
                        tableHTML = "<br><span style='font-size: 20px;'> * Nenhum Servidor da Unidade encontrado neste Arquivo<br></span>";
                    }

                    resultsDiv.innerHTML = tableHTML;

                    ocultarBarraDeAguarde();
                });
            });
        };
        fileReader.readAsArrayBuffer(selectedFile);
    } else {
        resultsDiv.innerHTML = "<br><span style='font-size: 20px;'>Atenção: Selecione o arquivo PDF da Edição.</span>" + "<br>";
        ocultarBarraDeAguarde();
    }
}

function openPdf(pdfFileName, pageNum, codeToHighlight, lineIndex) {
    const pdfLink = `${pdfFileName}#page=${pageNum}`;
    window.open(pdfLink, '_blank');

    const codeList = document.getElementById("codeList");
    const codeItems = codeList.getElementsByTagName("li");

    for (const codeItem of codeItems) {
        const code = codeItem.textContent.split(":")[0].trim();
        if (code === codeToHighlight) {
            codeItem.style.backgroundColor = 'yellow';
        } else {
            codeItem.style.backgroundColor = 'transparent';
        }
    }

    const pageElementId = `page${pageNum}`;
    const pageElement = document.getElementById(pageElementId);

    if (pageElement) {
        const lines = pageElement.getElementsByTagName('span');
        for (let i = 0; i < lines.length; i++) {
            if (i === lineIndex) {
                lines[i].style.backgroundColor = 'yellow';
            } else {
                lines[i].style.backgroundColor = 'transparent';
            }
        }
    }
}
