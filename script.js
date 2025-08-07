/*Adicione os scripts para abrir e fechar o popup-- >*/

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
	
	   { code: "MARIA APARECIDA DO NASCIMENTO", name: "MARIA APARECIDA DO NASCIMENTO"}, {code: "Maria Aparecida do Nascimento", name: "Maria Aparecida do Nascimento"},
        { code: "8556342", name: "ALESSANDRA MOREIRA GUMENES DANTAS" }, { code: "855.634.2", name: "ALESSANDRA MOREIRA GUMENES DANTAS" },
        { code: "8285187", name: "ALESSANDRA RAYMUNDO" }, { code: "828.518.7", name: "ALESSANDRA RAYMUNDO" },
        { code: "7971427", name: "ALESSANDRA SERICAWA BROCCO SILVA" }, { code: "797.142.7", name: "ALESSANDRA SERICAWA BROCCO SILVA" },
        { code: "8398542", name: "AMANDA ALVES DOS SANTOS PEDRO" }, { code: "839.854.2", name: "AMANDA ALVES DOS SANTOS PEDRO" },
        { code: "8029482", name: "ANA LUCIA CARVALHO" }, { code: "802.948.2", name: "ANA LUCIA CARVALHO" },
        { code: "8050422", name: "ANA PAULA BARBOSA TENORIO" }, { code: "805.042.2", name: "ANA LUCIA BARBOSA TENORIO" },
        { code: "8791210", name: "ANA PAULA RODRIGUES DOS SANTOS" }, { code: "879.121.0", name: "ANA PAULA RODRIGUES HONORIO" },
        { code: "8063494", name: "ANA PAULA VIANA COSTA" }, { code: "806.349.4", name: "ANA PAULA VIANA COSTA" },
        { code: "9191291", name: "ANDRE RUIZ MUNOZ" }, { code: "919.129.1", name: "ANDRE RUIZ MUNOZ" },
        { code: "8978620", name: "ANGELA SELMA DA SILVA E MELO" }, { code: "897.862.0", name: "ANGELA SELMA DA SILVA E MELO" },
        { code: "8470456", name: "ARIE SANTOS BRITO DE CAMPOS" }, { code: "847.045.6", name: "ARIE SANTOS BRITO DE CAMPOS" },
        { code: "8171831", name: "BEATRIZ CAROLINE BISPO DIAS" }, { code: "817.183.1", name: "BEATRIZ CAROLINE BISPO DIAS" }, 
        { code: "7779968", name: "BEATRIZ NARDY" }, { code: "777.996.8", name: "BEATRIZ NARDY" },       
        { code: "7449607", name: "BENEDITA LIMA KECEK" }, { code: "744.960.7", name: "BENEDITA LIMA KECEK" },       
        { code: "7822529", name: "CARLA FERNANDA BARRETO" }, { code: "782.252.9", name: "CARLA FERNANDA BARRETO" },        
        { code: "8495955", name: "CAROLINA LIMA ANTUNES" }, { code: "849.595.5", name: "CAROLINA LIMA ANTUNES" },
        { code: "9338438", name: "CASSIA MARIANE DE LIMA PEREIRA" }, { code: "933.843.8", name: "CASSIA MARIANE DE LIMA PEREIRA" },
        { code: "8279071", name: "CELIA REGINA LUNA TOPGIAN" }, { code: "827.907.1", name: "CELIA REGINA LUNA TOPGIAN" },
        { code: "8023646", name: "CILENE APARECIDA PALMA SOARES GUIERO" }, { code: "802.364.6", name: "CILENE APARECIDA PALMA SOARES GUIERO" },
        { code: "9433589", name: "CLAUDIA DO NASCIMENTO OLIVEIRA" }, { code: "943.358.9", name: "CLAUDIA DO NASCIMENTO OLIVEIRA" },
        { code: "9400516", name: "CLAUDIA MARIA DA SILVA LOPES" }, { code: "940.051.6", name: "CLAUDIA MARIA DA SILVA LOPES"},
        { code: "8163481", name: "CLAUDIA MARIA AMADOR RUSSO" }, { code: "816.348.1", name: "CLAUDIA MARIA AMADOR RUSSO" },
        { code: "7736835", name: "CLAUDIO VIEIRA DA SILVA" }, { code: "773.683.5", name: "CLAUDIO VIEIRA DA SILVA" },        
        { code: "8816565", name: "DAIANA CRISTINA CUBAS" }, { code: "881.656.5", name: "DAIANA CRISTINA CUBAS" },      
        { code: "8469504", name: "DANIELE DE MELO OLIVEIRA DE CARVALHO" }, { code: "846.950.4", name: "DANIELE DE MELO OLIVEIRA DE CARVALHO" },
        { code: "8500860", name: "DAVI AUGUSTO DE ARAUJO MACEDO" }, { code: "850.086.0", name: "DAVI AUGUSTO DE ARAUJO MACEDO" },
        { code: "8039950", name: "DAYANA CUNHA ZANETTI" }, { code: "803.995.0", name: "DAYANA CUNHA ZANETTI" }, 
	{ code: "9334769", name: "DEBORA APARECIDA ZACARELLI PIMENTA" }, { code: "933.476.9", name: "DEBORA APARECIDA ZACARELLI PIMENTA" },      
        { code: "9233563", name: "DIRCE MARIA ROSA DE OLIVEIRA" }, { code: "923.356.3", name: "DIRCE MARIA ROSA DE OLIVEIRA" },
        { code: "7989946", name: "EDSON LIMA" }, { code: "798.994.6", name: "EDSON LIMA" }, 
        { code: "7422181", name: "EDVALDO DE CASTRO" }, { code: "742.218.1", name: "EDVALDO DE CASTRO" }, 
        { code: "6865682", name: "ELAINE CRISTINA CARDOSO SETRINI" }, { code: "686.568.2", name: "ELAINE CRISTINA CARDOSO SETRINI" },     
        { code: "8471622", name: "ELDIENE SOARES DE OLIVEIRA" }, { code: "847.162.2", name: "ELDIENE SOARES DE OLIVEIRA" },
        { code: "8830649", name: "ELINARDO NOGUEIRA COSTA" }, { code: "883.064.9", name: "ELINARDO NOGUEIRA COSTA" },
        { code: "9289283", name: "ELLEN MOREIRA RAMOS FERREIRA" }, { code: "928.928.3", name: "ELLEN MOREIRA RAMOS FERREIRA" },  
        { code: "9232818", name: "ELIANE QUELE VIANA DA SILVA" }, { code: "923.281.8", name: "ELIANE QUELE VIANA DA SILVA" },
        { code: "7954123", name: "ELOIZA DA SILVA SOUZA" }, { code: "795.412.3", name: "ELOIZA DA SILVA SOUZA" },
        { code: "8936803", name: "ESTEVAO MARIO LINO" }, { code: "893.680.3", name: "ESTEVAO MARIO LINO" },
        { code: "9237534", name: "EVERTON SANTANA DA CONCEIÇÃO" }, { code: "923.753.4", name: "EVERTON SANTANA DA CONCEIÇÃO" },
        { code: "7270984", name: "FABIANE DOS SANTOS" }, { code: "727.098.4", name: "FABIANE DOS SANTOS" },       
        { code: "9230343", name: "FERNANDA ALVES DO NASCIMENTO LIMA" }, { code: "923.034.3", name: "FERNANDA ALVES DO NASCIMENTO LIMA" },
        { code: "7871643", name: "FERNANDA DIAS DA SILVA" }, { code: "787.164.3", name: "FERNANDA DIAS DA SILVA" },
        { code: "8087539", name: "HEROS RODRIGUES DE MORAIS" }, { code: "808.753.9", name: "HEROS RODRIGUES DE MORAIS" },
        { code: "9286616", name: "INGRID SANTOS SILVA" }, { code: "928.661.6", name: "INGRID SANTOS SILVA" },
        { code: "8011176", name: "ISABEL ARAUJO MONTEIRO CRUZ" }, { code: "801.117.6", name: "ISABEL ARAUJO MONTEIRO CRUZ" },
        { code: "8428930", name: "JANAINA STEFANIE ALVARES HUBNER" }, { code: "842.893.0", name: "JANAINA STEFANIE ALVARES HUBNER" },
        { code: "8923892", name: "JAQUELINE COSTA DOS AJOS AZAVEDO" }, { code: "892.389.2", name: "JAQUELINE COSTA DOS AJOS AZAVEDO" },
        { code: "9250450", name: "JESSICA ALVES DE LIMA" }, { code: "925.045.0", name: "JESSICA ALVES DE LIMA" }, 	    
        { code: "8964327", name: "JOELMA DOS SANTOS" }, { code: "896.432.7", name: "JOELMA DOS SANTOS" },       
        { code: "8183031", name: "JOSE AUGUSTO LOPES DE ALENCAR" }, { code: "818.303.1", name: "JOSE AUGUSTO LOPES DE ALENCAR" },        
        { code: "9232923", name: "KELLY CRISTINA ALVES FEITOSA" }, { code: "923.292.3", name: "KELLY CRISTINA ALVES FEITOSA" },
        { code: "8031304", name: "LAERCIO JOSE DE DEUS JUNIOR" }, { code: "803.130.4", name: "LAERCIO JOSE DE DEUS JUNIOR" },        
        { code: "6137296", name: "LILIAN PEREIRA DE CALDAS SILVA" }, { code: "613.729.6", name: "LILIAN PEREIRA DE CALDAS SILVA" },
        { code: "9406000", name: "LUANDA GOMES DOS SANTOS JULIÃO" }, { code: "940.600.0", name: "LUANDA GOMES DOS SANTOS JULIÃO" },
        { code: "6789587", name: "LUIZ CARLOS CRISTAN" }, { code: "678.958.7", name: "LUIZ CARLOS CRISTAN" },
        { code: "8108641", name: "MARCELO VIEIRA DA SILVA" }, { code: "810.864.1", name: "MARCELO VIEIRA DA SILVA" },
        { code: "8497036", name: "MARIA APARECIDA PACCA DA SILVA" }, { code: "849.703.6", name: "MARIA APARECIDA PACCA DA SILVA" },
        { code: "6885349", name: "MARIA JOSE DA SILVA" }, { code: "688.534.9", name: "MARIA JOSE DA SILVA" },
        { code: "8013543", name: "MARILEIDE SANTOS ARAUJO" }, { code: "801.354.3", name: "MARILEIDE SANTOS ARAUJO" },
        { code: "6560008", name: "MAURA CRISTINA ALVES OGATA" }, { code: "656.000.8", name: "MAURA CRISTINA ALVES OGATA" },

        { code: "7969520", name: "MARIA APARECIDA FERNANDES DOS SANTOS SEVERINO " }, { code: "796.952.0", name: "MARIA APARECIDA FERNANDES DOS SANTOS SEVERINO " },


        { code: "7910657", name: "MICHELE GESTEIRA ROCHA" }, { code: "7910657", name: "MICHELE GESTEIRA ROCHA" },         
        { code: "8083452", name: "PATRICIA APARECIDA DA SILVA GRANDE" }, { code: "808.345.2", name: "PATRICIA APARECIDA DA SILVA GRANDE" },
        { code: "8482985", name: "PAULO SERGIO BRAZ" }, { code: "848.298.5", name: "PAULO SERGIO BRAZ" },
        { code: "8470634", name: "RAFAEL BELMONTE SILVA" }, { code: "847.063.4", name: "RAFAEL BELMONTE SILVA" },
        { code: "8427071", name: "REJANE BORBA SANTIAGO SILVA" }, { code: "842.707.1", name: "REJANE BORBA SANTIAGO SILVA" },
        { code: "9416102", name: "REGINA ALVES SOARES SIMOES" }, { code: "941.610.2", name: "REGINA ALVES SOARES SIMOES" },
        { code: "6782485", name: "ROBERTO DA SILVA" }, { code: "678.248.5", name: "ROBERTO DA SILVA" },        
        { code: "8456542", name: "RONALDO DE OLIVEIRA" }, { code: "845.654.2", name: "RONALDO DE OLIVEIRA" },
        { code: "8456054", name: "ROSANE ALEXANDRE ALVES" }, { code: "845.605.4", name: "ROSANE ALEXANDRE ALVES" },
        { code: "7976470", name: "ROSANGELA APARECIDA FONSECA" }, { code: "797.647.0", name: "ROSANGELA APARECIDA FONSECA" },             
        { code: "8346178", name: "SAMUEL FERREIRA DE CAMPOS" }, { code: "834.617.8", name: "SAMUEL FERREIRA DE CAMPOS" },
        { code: "7308574", name: "SILVANA CALIXTO DOS SANTOS" }, { code: "730.857.4", name: "SILVANA CALIXTO DOS SANTOS" },
        { code: "8425019", name: "SIMONE PAES GONCALVES NOGUEIRA" }, { code: "842.501.9", name: "SIMONE PAES GONCALVES NOGUEIRA" },        
        { code: "8185531", name: "STEFANIE CRISTINA DE OLIVEIRA TERRA" }, { code: "818.553.1", name: "STEFANIE CRISTINA DE OLIVEIRA TERRA" },
        { code: "9433503", name: "SYDINEIA REIS DE OLIVIERA" }, { code: "943.350.3", name: "SYDINEIA REIS DE OLIVIERA" },
        { code: "8795568", name: "TATIANE MARISE RODRIGUES CHAGAS" }, { code: "879.556.8", name: "TATIANE MARISE RODRIGUES CHAGAS" },
        { code: "8821917", name: "TAUANA LOPES NEPONUCENO" }, { code: "882.191.7", name: "TAUANA LOPES NEPONUCENO" },
        { code: "8400369", name: "VAGNER APARECIDO DE MOURA" }, { code: "840.036.9", name: "VAGNER APARECIDO DE MOURA" },
        { code: "7400446", name: "VANIA CRISTINA MAJORAL" }, { code: "740.044.6", name: "VANIA CRISTINA MAJORAL" },        
        { code: "8044368", name: "VERONICE TAVEIRA DE MELO" }, { code: "804.436.8", name: "VERONICE TAVEIRA DE MELO" },
        { code: "9405836", name: "VINICIUS MATHEUS SILVA DA CUNHA" }, { code: "940.583.6", name: "VINICIUS MATHEUS SILVA DA CUNHA" },
        { code: "7919905", name: "VIVIANE CARVALHO DE OLIVEIRA" }, { code: "791.990.5", name: "VIVIANE CARVALHO DE OLIVEIRA" },
        { code: "9191330", name: "WILLIAN RAMOS DEL BELLO DA SILVA" }, { code: "919.133.0", name: "WILLIAN RAMOS DEL BELLO DA SILVA" }
        // Adicione mais códigos e nomes se necessário
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
                        <table style="text-align: left;">
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
function printResults() {
    const resultsDiv = document.getElementById('resultsDiv');
    const resultsHTML = resultsDiv.innerHTML;

    // Abre uma nova janela para imprimir os resultados
    const printWindow = window.open('', '_blank', 'width=1000,height=800');
    printWindow.document.open();
    printWindow.document.write(`
        <html>
        <head>
            <title>Resultados da Busca</title>
            <style>
                table {
                    border-collapse: collapse;
                    width: 100%;
                }
                th, td {
                    border: 1px solid black;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <h2>Resultados da Busca</h2>
            ${resultsHTML}
        </body>
        </html>
    `);
    printWindow.document.close();

    // Espera que o conteúdo seja carregado antes de imprimir
    printWindow.onload = function() {
        printWindow.print();
    };
}
