function ocultarLabel(){var n=document.getElementById("minhaLabel");n.style.display="none"}function mostrarBarraDeAguarde(){var n=document.getElementById("loading");n.style.display="block"}function ocultarBarraDeAguarde(){document.getElementById("minhaLabel").style.display="none";var n=document.getElementById("loading");n.style.display="none"}function searchCodes(){ocultarLabel();mostrarBarraDeAguarde();const r=document.getElementById("fileInput"),n=document.getElementById("resultsDiv");n.innerHTML="";const i=r.files[0],t=[{code:"9233521",name:"ADRIANO ANTUNES DE SALVES"},{code:"8285187",name:"ALESSANDRA RAYMUNDO"},{code:"7971427",name:"ALESSANDRA SERICAWA BROCCO SILVA"},{code:"8398542",name:"AMANDA ALVES DOS SANTOS PEDRO"},{code:"8029482",name:"ANA LUCIA CARVALHO"},{code:"8791210",name:"ANA PAULA RODRIGUES HONORIO"},{code:"8063494",name:"ANA PAULA VIANA COSTA"},{code:"8821186",name:"ANGELA MARIA DE OLIVEIRA"},{code:"8259640",name:"APARECIDA VIEIRA DA SILVA"},{code:"8171831",name:"BEATRIZ CAROLINE BISPO DIAS IBANHEZ"},{code:"8421790",name:"BEATRIZ NOGUEIRA DE SOUSA"},{code:"7822529",name:"CARLA FERNANDA BARRETO"},{code:"8495955",name:"CAROLINA LIMA ANTUNES"},{code:"8279071",name:"CELIA REGINA LUNA TOPGIAN"},{code:"8163481",name:"CLAUDIA MARIA AMADOR RUSSO"},{code:"8259011",name:"CLAUDINEI DA SILVA CRUZ"},{code:"7736835",name:"CLAUDIO VIEIRA DA SILVA"},{code:"8139539",name:"CRISTINA APARECIDA DA SILVA DE OLIVEIRA"},{code:"8469504",name:"DANIELE DE MELO OLIVEIRA DE CARVALHO"},{code:"8500860",name:"DAVI AUGUSTO DE ARAUJO MACEDO"},{code:"9229787",name:"DEBORA SEGURA PAIXAO"},{code:"9233563",name:"DIRCE MARIA ROSA DE OLIVEIRA"},{code:"7106921",name:"DORVAL DA COSTA TORRES"},{code:"7989946",name:"EDSON LIMA"},{code:"6865682",name:"ELAINE CRISTINA CARDOSO SETRINI"},{code:"8471622",name:"ELDIENE SOARES DE OLIVEIRA"},{code:"8830649",name:"ELINARDO NOGUEIRA COSTA"},{code:"9233512",name:"ELIONAI CRUZ CONCEICAO COELHO"},{code:"8815585",name:"EMERICK RANNYERY CHICOLLI AGUIAR"},{code:"8230901",name:"FABIANA ANDRADE DE LACERDA SILVA"},{code:"8257833",name:"FABIO FERREIRA RAMOS"},{code:"7871643",name:"FERNANDA DIAS DA SILVA"},{code:"9191364",name:"GABRIELA DA SILVA FERREIRA DE LIMA"},{code:"9114696",name:"HANNA TEIXEIRA DIAS"},{code:"8087539",name:"HEROS RODRIGUES DE MORAIS"},{code:"8840989",name:"IVONE SIQUEIRA LUIZ"},{code:"8428930",name:"JANAINA STEFANIE ALVARES HUBNER"},{code:"9212451",name:"JULIA AZEREDO DA SILVA"},{code:"8964327",name:"JOELMA DOS SANTOS"},{code:"8183031",name:"JOSE AUGUSTO LOPES DE ALENCAR"},{code:"8970661",name:"KAUANE SILVA SEVERINO"},{code:"8031304",name:"LAERCIO JOSE DE DEUS JUNIOR"},{code:"8514631",name:"LIGIA PERPETUO CAPELO FURUGUEM"},{code:"9156011",name:"LILIANE REGINA LIMA SILVA"},{code:"6789587",name:"LUIZ CARLOS CRISTAN"},{code:"8497036",name:"MARIA APARECIDA PACCA DA SILVA"},{code:"7487959",name:"MARIA DE FATIMA LIMA VIEIRA"},{code:"7514981",name:"NUBIA VIEIRA DE ARAUJO CERQUEIRA"},{code:"8839131",name:"OLINDA ROBERTO LEANDRO"},{code:"7176783",name:"ORLANDO NUNES DE BRITO"},{code:"7590547",name:"PAULINA APARECIDA ZEFERINO"},{code:"8482985",name:"PAULO SERGIO BRAZ"},{code:"8470634",name:"RAFAEL BELMONTE SILVA"},{code:"9239863",name:"RAFAEL DE MELO FERRAZ"},{code:"8427071",name:"REJANE BORBA SANTIAGO SILVA"},{code:"8964858",name:"RENATA DE ANDRADE ALVES"},{code:"8456542",name:"RONALDO DE OLIVEIRA"},{code:"8456054",name:"ROSANE ALEXANDRE ALVES"},{code:"7976470",name:"ROSANGELA APARECIDA FONSECA"},{code:"8251592",name:"SAMUEL FERNANDES CALDAS"},{code:"8346178",name:"SAMUEL FERREIRA DE CAMPOS"},{code:"8163111",name:"SANDRO RAMOS DOS SANTOS"},{code:"9145770",name:"SARA GOIS NASCIMENTO"},{code:"8482616",name:"SUE ELLEN CRISTINA LUZ DE MELO CADETE"},{code:"8795568",name:"TIANE MARISE RODRIGUES CHAGAS"},{code:"8821917",name:"TAUANA LOPES NEPONUCENO"},{code:"7546823",name:"VERA LUCIA AYKO TAKARA"},{code:"8044368",name:"VERONICE TAVEIRA DE MELO"},{code:"7919905",name:"VIVIANE CARVALHO DE OLIVEIRA"}];if(i){const r=new FileReader;r.onload=function(i){const r=new Uint8Array(i.target.result);pdfjsLib.getDocument(r).promise.then(function(i){const r=[];for(let n=1;n<=i.numPages;n++)r.push(i.getPage(n).then(function(n){return n.getTextContent()}));Promise.all(r).then(function(i){const u={};t.forEach(n=>{u[n.code]={name:n.name,lines:[]}});for(let n=0;n<i.length;n++){const r=i[n].items.map(n=>n.str).join("\n"),f=r.split("\n");for(const t of t){const i=t.code;for(const t of f)t.includes(i)&&u[i].lines.push({line:t,page:n+1})}}let r=`
                        <table>
                            <tr>
                                <th>RF</th>
                                <th>Nome</th>
                                <th>Páginas do D.O</th>
                            </tr>`,f=!1;for(const n of t){const i=n.code,t=u[i].lines;if(t.length>0){const n=u[i].name;r+=`
                            <tr>
                                <td>${i}</td>
                                <td>${n}</td>
                                <td>`;for(let n=0;n<t.length;n++){const i=t[n];r+=`<span class="page">Página ${i.page}</span>`;n<t.length-1&&(r+=", ")}r+=`</td></tr>`;f=!0}}r+="<span style='font-size: 20px;'> * Servidores da Unidade encontrado neste Arquivo<\/span><br><br>";r+=`</table><br>`;f||(r="<span style='font-size: 20px;'> * Nenhum Servidor da Unidade encontrado neste Arquivo<br><\/span>");n.innerHTML=r;ocultarBarraDeAguarde()})})};r.readAsArrayBuffer(i)}else n.innerHTML="<span style='font-size: 20px;'>Atenção: Selecione o arquivo PDF da Edição.<\/span><br>",ocultarBarraDeAguarde()}document.addEventListener("DOMContentLoaded",function(){function r(n,t){const i=document.createElement("li");i.textContent=`${n}: ${t}`;f.appendChild(i)}const u=document.getElementById("codeForm"),t=document.getElementById("code"),i=document.getElementById("name"),f=document.getElementById("codeList"),n=JSON.parse(localStorage.getItem("codeAndNameData"))||[];n.forEach(n=>{r(n.code,n.name)});u.addEventListener("submit",function(u){u.preventDefault();const f=t.value.trim(),e=i.value.trim();f&&e&&(r(f,e),n.push({code:f,name:e}),localStorage.setItem("codeAndNameData",JSON.stringify(n)),t.value="",i.value="")})});
