function ocultarLabel() {
    var label = document.getElementById("minhaLabel");
    label.style.display = "none";
    // document.getElementById("minhaLabel").style.display = "block"; // Exibe a label quando 
}

function mostrarBarraDeAguarde() {

    var loading = document.getElementById("loading");
    loading.style.display = "block";
}

function ocultarBarraDeAguarde() {
    document.getElementById("minhaLabel").style.display = "none"; // Oculta a label
    var loading = document.getElementById("loading");
    loading.style.display = "none";

}

function searchCodes() {
    // Chame a função para ocultar a label
    ocultarLabel();

    // Chame a função para mostrar a barra de aguarde
    mostrarBarraDeAguarde();

    const fileInput = document.getElementById('fileInput');
    const resultsDiv = document.getElementById('resultsDiv');

    const selectedFile = fileInput.files[0];
    const codesList = [
        // Lista de RF a serem pesquisados
        "9233521",  // ADRIANO ANTUNES DE SALVES
        "8285187",  // ALESSANDRA RAYMUNDO       
        "7971427",  //ALESSANDRA SERICAWA BROCCO SILVA
        "8398542",  //AMANDA ALVES DOS SANTOS PEDRO
        "8029482",  //ANA LUCIA CARVALHO
        "8791210",  //ANA PAULA RODRIGUES HONORIO
        "8063494",  //ANA PAULA VIANA COSTA
        "8821186",  //ANGELA MARIA DE OLIVEIRA
        "8259640",  //APARECIDA VIEIRA DA SILVA
        "8171831",  //BEATRIZ CAROLINE BISPO DIAS
        "8421790",  //BEATRIZ NOGUEIRA DE SOUSA
        "7822529",  //CARLA FERNANDA BARRETO
        "8495955",  //CAROLINA LIMA ANTUNES
        "8279071",  //CELIA REGINA LUNA TOPGIAN
        "8163481",  //CLAUDIA MARIA AMADOR RUSSO
        "8259011",  //CLAUDINEI DA SILVA CRUZ
        "7736835",  //CLAUDIO VIEIRA DA SILVA
        "8139539",  //CRISTINA APARECIDA DA SILVA DE OLIVEIRA
        "8469504",  //DANIELE DE MELO OLIVEIRA DE CARVALHO
        "8500860",  //DAVI AUGUSTO DE ARAUJO MACEDO
        "9229787",  //DEBORA SEGURA PAIXAO
        "9233563",  //DIRCE MARIA ROSA DE OLIVEIRA
        "7106921",  //DORVAL DA COSTA TORRES
        "7989946",  //EDSON LIMA
        "6865682",  //ELAINE CRISTINA CARDOSO SETRINI
        "8471622",  //ELDIENE SOARES DE OLIVEIRA
        "8830649",  //ELINARDO NOGUEIRA COSTA
        "9233512",  //ELIONAI CRUZ CONCEICAO COELHO
        "8815585",  //EMERICK RANNYERY CHICOLLI AGUIAR
        "8230901",  //FABIANA ANDRADE DE LACERDA SILVA
        "8257833",  //FABIO FERREIRA RAMOS
        "7871643",  //FERNANDA DIAS DA SILVA
        "9191364",  //GABRIELA DA SILVA FERREIRA DE LIMA
        "9114696",  //HANNA TEIXEIRA DIAS
        "8087539",  //HEROS RODRIGUES DE MORAIS
        "8840989",  //IVONE SIQUEIRA LUIZ
        "8428930",  //JANAINA STEFANIE ALVARES HUBNER
        "9212451",  //JULIA AZEREDO DA SILVA
        "8964327",  //JOELMA DOS SANTOS
        "8183031",  //JOSE AUGUSTO LOPES DE ALENCAR
        "8970661",  //KAUANE SILVA SEVERINO
        "8031304",  //LAERCIO JOSE DE DEUS JUNIOR
        "8514631",  //LIGIA PERPETUO CAPELO FURUGUEM
        "9156011",  //LILIANE REGINA LIMA SILVA
        "6789587",  //LUIZ CARLOS CRISTAN
        "8497036",  //MARIA APARECIDA PACCA DA SILVA
        "7487959",  //MARIA DE FATIMA LIMA VIEIRA              
        "7514981",  //NUBIA VIEIRA DE ARAUJO CERQUEIRA
        "8839131",  //OLINDA ROBERTO LEANDRO
        "7176783",  //ORLANDO NUNES DE BRITO
        "7590547",  //PAULINA APARECIDA ZEFERINO
        "8482985",  //PAULO SERGIO BRAZ
        "8470634",  //RAFAEL BELMONTE SILVA
        "9239863",  //RAFAEL DE MELO FERRAZ
        "8427071",  //REJANE BORBA SANTIAGO SILVA
        "8964858",  //RENATA DE ANDRADE ALVES
        "8456542",  //RONALDO DE OLIVEIRA
        "8456054",  //ROSANE ALEXANDRE ALVES
        "7976470",  //ROSANGELA APARECIDA FONSECA
        "8251592",  //SAMUEL FERNANDES CALDAS
        "8346178",  //SAMUEL FERREIRA DE CAMPOS
        "8163111",  //SANDRO RAMOS DOS SANTOS
        "9145770",  //SARA GOIS NASCIMENTO
        "8482616", // SUE ELLEN CRISTINA LUZ DE MELO CADETE
        "8795568", // TIANE MARISE RODRIGUES CHAGAS
        "8821917",  // TAUANA LOPES NEPONUCENO
        "7546823",  //VERA LUCIA AYKO TAKARA
        "8044368",  //VERONICE TAVEIRA DE MELO
        "7919905",]  // VIVIANE CARVALHO DE OLIVEIRA
    // ADICIONE OS RF NO FINAL DA LISTA ACIMA
    // Lista de códigos a serem pesquisados

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
                    // Inicializa um objeto que mapeia os códigos às linhas
                    const codeToLinesMap = {};
                    codesList.forEach(code => {
                        codeToLinesMap[code] = [];
                    });

                    // Percorre as páginas e busca os códigos
                    for (let i = 0; i < pages.length; i++) {
                        const pageText = pages[i].items.map(item => item.str).join('\n');
                        const lines = pageText.split('\n');

                        for (const code of codesList) {
                            for (const line of lines) {
                                if (line.includes(code)) {
                                    codeToLinesMap[code].push(line);
                                }
                            }
                        }
                    }

                    // Exibe os resultados
                    if (codesList.length === 0) {
                        resultsDiv.innerHTML = "Nenhum RF encontrado nesta Edição";
                    } else {
                        resultsDiv.innerHTML = "Busca Concluída... <br><br>" +
                            "RFs encontradas no Diário Oficial desta Edição <br><br>";

                        let foundRF = false; // Variável para verificar se pelo menos um RF foi encontrado

                        for (const code of codesList) {
                            const lines = codeToLinesMap[code];
                            if (lines.length > 0) {
                                resultsDiv.innerHTML += `RF :     -  ${code} <br>`;
                                foundRF = true; // Um RF foi encontrado
                            }
                        }

                        if (!foundRF) {
                            resultsDiv.innerHTML = " * Nenhum RF encontrado nesta Edição<br>"; // Exibe a mensagem se nenhum RF for encontrado
                        }
                    }

                    // Chame a função para ocultar a barra de aguarde após a busca estar completa
                    ocultarBarraDeAguarde();

                });
            });
        };
        fileReader.readAsArrayBuffer(selectedFile);
    } else {
        resultsDiv.innerHTML = "Atenção: Selecione o arquivo PDF da Edição." + "<br>";
        // Chame a função para ocultar a barra de aguarde em caso de erro
        ocultarBarraDeAguarde();
    }
}
