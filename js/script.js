const criacaoQuizElemento = document.querySelector(".criacao-quiz")
const criacaoPerguntasElemento = document.querySelector(".criacao-perguntas")
const perguntasElemento = document.querySelector(".perguntas")
const criacaoNiveisElemento = document.querySelector(".criacao-niveis")
const niveisElemento = document.querySelector(".niveis")
let validacao = 0
let validacaoNiveis = 0
let informacoesBasicasQuiz = {
    title: "",
    image: "",
    questions: [],
    levels: []
}
const infoPerguntas = document.querySelector(".info-qtd-perguntas").value
const infoNiveis = document.querySelector(".info-qtd-niveis").value
const URLValidacao = /^(ftp|http|https):\/\/[^ "]+$/
const corValidacao = /^#(?:[0-9a-fA-F]{3}){1,2}$/
const homeElemento = document.querySelector(".home")
const sucessoQuiz = document.querySelector(".criacao-sucesso")
const homeElementoRespondendo = document.querySelector(".homeRespondendoQuizz")

const infoURL = document.querySelector(".info-url").value

let quizzIdData

let contadorRespostas = 0



obterQuizzes();
function obterQuizzes(){
 
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes' );

    promessa.then(renderizarquizzes)
}

function renderizarquizzes(resposta){

    const quizz = resposta.data;

    console.log(resposta.data[1].id)
    const quizzes = document.querySelector(".listaQuizzes .containerLista .C1")
    for(let i=0; i<3; i++){
        quizzes.innerHTML += `
        <div onclick="abrirQuizz(this)" class="quizz" id = "${resposta.data[i].id}">
        <img src="${quizz[i].image}">
             <div class="title">
        ${quizz[i].title}
             </div>
        </div>
        `
    }
    const quizzes2 = document.querySelector(".listaQuizzes .containerLista .C2")
    for(let i=0; i<3; i++){
        quizzes2.innerHTML += `
        <div onclick="abrirQuizz(this)" class="quizz" id = "${quizz.id}">
        <img  src="${quizz[i].image}">
        <div class="title">
        ${quizz[i].title}
        </div>
        </div>
        `
    }

    quizzIdData = resposta.data




}
function abrirQuizz(quizzIdData){
        homeElemento.classList.add("escondido");
        homeElementoRespondendo.classList.remove("escondido");

        console.log(quizzIdData)

        const promessa = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/2`);

        promessa.then(renderizarquizz);
        /* promessa.catch(console.log("erro")) */
}

function renderizarquizz(resposta){
    const quizz = resposta.data;
    console.log(quizz)
    console.log(quizz.questions)
    console.log(quizz.questions[0].answers)
   
    const enviarQuizz = document.querySelector(".homeRespondendoQuizz .tituloQuizz");
    enviarQuizz.innerHTML += `
    <div id = "${quizz.id}"class="tituloQuizz"> 
         <p> ${quizz.title}</p> 
          <img src="${quizz.image}">          
    </div>`
    // <img src="${quizz.image}">  
    // document.getElementById("1").style.backgroundImage = "url(`${quizz.image}`)";
    // document.getElementById("1").style.backgroundRepeat = "no-repeat";
    // document.getElementById("1").style.backgroundSize = "cover";

    const pergunta = document.querySelector(".homeRespondendoQuizz .containerRespondendoQuizz")
    for(let i=0; i<quizz.questions.length; i++){
        pergunta.innerHTML += `
        <div class="perguntaRespondendoQuizz${i} perguntaRespondendoQuizz" >
            <p style="background-color:${quizz.questions[i].color}">${quizz.questions[i].title}</p>

            <div class="respostas">
            
            </div>
            
        </div>


        `; 
        const respostasRandomizadas = quizz.questions[i].answers.sort(()=> Math.random()-0.5)

        for (let j = 0; j < respostasRandomizadas.length; j++) {
            const containerResposta = document.querySelector(`.perguntaRespondendoQuizz${i} .respostas`)


            console.log(containerResposta)
            containerResposta.innerHTML += `
            <div onclick="selecionarResposta(this)" class="resposta">
                <img src="${respostasRandomizadas[j].image}">
                <p>${respostasRandomizadas[j].text}</p>
            </div>
            `
        }



        /* for (let j = 0; j < quizz.questions[i].answers.length; j++) {
        pergunta.innerHTML += `
        <div class="perguntaRespondendoQuizz${i} perguntaRespondendoQuizz">
        <p>${quizz.questions[i].title}</p>

        <div class="resposta${i} respostas">
        
        </div>
        
        </div>`

        console.log(quizz.questions[i])
        console.log(quizz.questions[i].answers)
        
    
           /*  console.log(quizz.questions[i].answers.length)
    
            const resposta = document.querySelector(`.resposta${j}`)
    
            resposta.innerHTML += ` 
            <div class="containerRespostas">
                <div onclick="selecionarResposta(this)" class="respostas">
                <img src="${quizz.questions[i].answers[j].image}">
                <p>${quizz.questions[i].answers[j].text}</p>
            </div>` */
    } 
    /* for(let i=0; i<quizz.questions.length; i++) {
        
    } */

}

function selecionarResposta(resposta){
    
    resposta.classList.add("selecionado");

    contadorRespostas ++
    console.log(contadorRespostas)


    
}

function criarQuizz(){
   
    homeElemento.classList.add("escondido");
    criacaoQuizElemento.classList.remove("escondido"); 


}

function prosseguirPerguntas() {
    const infoTitulo = document.querySelector(".info-titulo").value
    const infoURL = document.querySelector(".info-url").value
    const infoNiveis = document.querySelector(".info-qtd-niveis").value
    const infoPerguntas = document.querySelector(".info-qtd-perguntas").value
    
    if ((19 > infoTitulo.length && infoTitulo.length < 65) || infoPerguntas < 1 || infoNiveis < 1 || URLValidacao.test(infoURL) !== true) {
        alert("respondeu o formulario errado doidão, lanse a braba novamente")
    } else {
        criacaoQuizElemento.classList.add("escondido")
        criacaoPerguntasElemento.classList.remove("escondido")
    }
    
    informacoesBasicasQuiz.title = infoTitulo
    informacoesBasicasQuiz.image = infoURL
    
    for(let i = 1; i <= infoPerguntas; i++) {
        perguntasElemento.innerHTML += `
        <div class="pergunta${i} pergunta">
        <h3>Pergunta ${i}</h3>
            <input class="pergunta${i}-titulo" type="text" placeholder="Texto da pergunta">
            <input class="pergunta${i}-cor" type="text" placeholder="Cor de fundo da pergunta">
            
            <h3>Resposta correta</h3>
            <input class="pergunta${i}-texto" type="text" placeholder="Resposta correta">
            <input class="pergunta${i}-imagem" type="text" placeholder="URL da imagem">
            
            <h3>Respostas incorretas</h3>
            <input class="pergunta${i}-texto2" type="text" placeholder="Resposta incorreta 1">
            <input class="pergunta${i}-imagem2 espaco" type="text" placeholder="URL da imagem">
            
            <input class="pergunta${i}-texto3" type="text" placeholder="Resposta incorreta 2">
            <input class="pergunta${i}-imagem3 espaco" type="text" placeholder="URL da imagem">
            
            <input class="pergunta${i}-texto4" type="text" placeholder="Resposta incorreta 3">
            <input class="pergunta${i}-imagem4" type="text" placeholder="URL da imagem">
        </div>`
    }
    
    console.log(informacoesBasicasQuiz)
}

function prosseguirNiveis() {

    const infoPerguntas = document.querySelector(".info-qtd-perguntas").value

    for (let i = 1; i <= infoPerguntas; i++) {
        const perguntaTitulo = document.querySelector(`.pergunta${i}-titulo`).value
        const perguntaCor = document.querySelector(`.pergunta${i}-cor`).value
        const perguntaTexto = document.querySelector(`.pergunta${i}-texto`).value
        const perguntaImagem = document.querySelector(`.pergunta${i}-imagem`).value
        const perguntaTexto2 = document.querySelector(`.pergunta${i}-texto2`).value
        const perguntaImagem2 = document.querySelector(`.pergunta${i}-imagem2`).value
        const perguntaTexto3 = document.querySelector(`.pergunta${i}-texto3`).value
        const perguntaImagem3 = document.querySelector(`.pergunta${i}-imagem3`).value
        const perguntaTexto4 = document.querySelector(`.pergunta${i}-texto4`).value
        const perguntaImagem4 = document.querySelector(`.pergunta${i}-imagem4`).value

        if (perguntaTitulo.length < 20) {
            alert("Texto da pergunta deve ter no mínimo 20 caracteres")
        } else if (corValidacao.test(perguntaCor) === false) {
            alert("cor hexadeximal inválida")
        } else if (perguntaTexto === "") {
            alert("texto resposta correta não pode estar vazio")
        } else if (URLValidacao.test(perguntaImagem) === false) {
            alert("url da imagem inválida")
        } else if (perguntaTexto2 === "") {
            alert("texto resposta errada 1 não pode estar vazio")
        } else if (URLValidacao.test(perguntaImagem2) === false) {
            alert("url da imagem 2 inválida")
        } else if (URLValidacao.test(perguntaImagem3) === false && perguntaTexto3 !== "") {
            alert("url da imagem 3 inválida")
        } else if (URLValidacao.test(perguntaImagem4) === false && perguntaTexto4 !== "") {
            alert("url da imagem 4 inválida")
        } else if (perguntaImagem3 === "" && perguntaTexto3=== "") {
            informacoesBasicasQuiz.questions.push({
                title: perguntaTitulo,
                color: perguntaCor,
                answers: [
                    {
                        text: perguntaTexto,
                        image: perguntaImagem,
                        isCorrectAnswer: true
                    },
                    {
                        text: perguntaTexto2,
                        image: perguntaImagem2,
                        isCorrectAnswer: false
                    }
                ]
            })
            validacao ++
        } else if (perguntaImagem4 === "" && perguntaTexto4 === ""){
            informacoesBasicasQuiz.questions.push({
                title: perguntaTitulo,
                color: perguntaCor,
                answers: [
                    {
                        text: perguntaTexto,
                        image: perguntaImagem,
                        isCorrectAnswer: true
                    },
                    {
                        text: perguntaTexto2,
                        image: perguntaImagem2,
                        isCorrectAnswer: false
                    },
                    {
                        text: perguntaTexto3,
                        image: perguntaImagem3,
                        isCorrectAnswer: false
                    }
                ]
            })
            validacao ++
        } else {
            informacoesBasicasQuiz.questions.push({
                title: perguntaTitulo,
                color: perguntaCor,
                answers: [
                    {
                        text: perguntaTexto,
                        image: perguntaImagem,
                        isCorrectAnswer: true
                    },
                    {
                        text: perguntaTexto2,
                        image: perguntaImagem2,
                        isCorrectAnswer: false
                    },
                    {
                        text: perguntaTexto3,
                        image: perguntaImagem3,
                        isCorrectAnswer: false
                    },
                    {
                        text: perguntaTexto4,
                        image: perguntaImagem4,
                        isCorrectAnswer: false
                    }
                ]
            })
            validacao ++
        }
        
        console.log(informacoesBasicasQuiz)



    }

    if (validacao >= infoPerguntas) {
        
        criacaoPerguntasElemento.classList.add("escondido")
        criacaoNiveisElemento.classList.remove("escondido")
    
        for(let i = 1; i <= infoNiveis; i++) {
            niveisElemento.innerHTML += `
            <div class="nivel">
                <div class="nivel-header colapsado" onclick="colapsarNivel(this)">
                    <h3>Nível ${i} </h3>
                    <ion-icon name="create-outline "></ion-icon>
                </div>
                <div class="nivel-content">
                    <input class="nivel${i}-titulo" type="text" placeholder="Título do nível">
                    <input class="nivel${i}-porcentagem" type="text" placeholder="% de acerto mínima">
                    <input class="nivel${i}-imagem" type="text" placeholder="URL da imagem do nível">
                    <input class="nivel${i}-descricao" type="text" placeholder="Descrição do nível">
                </div>
            </div>
            `
        }

    }


}

function colapsarNivel(nivel) {
    const nivelSelecionado = nivel.parentNode

    nivelSelecionado.querySelector(".nivel-header").classList.toggle("colapsado")
    nivelSelecionado.querySelector(".nivel-header").classList.toggle("colapsado")
    nivelSelecionado.querySelector(".nivel-content").classList.toggle("escondido")
}

function finalizarQuiz() {
    const infoNiveis = document.querySelector(".info-qtd-niveis").value

    
    for (let i = 1; i <= infoNiveis; i++) {
        const nivelTitulo = document.querySelector(`.nivel${i}-titulo`).value
        const nivelPorcentagem = document.querySelector(`.nivel${i}-porcentagem`).value
        const nivelImagem = document.querySelector(`.nivel${i}-imagem`).value
        const nivelDescricao = document.querySelector(`.nivel${i}-descricao`).value

        if (nivelTitulo.length < 10 || nivelPorcentagem < 0 || nivelPorcentagem > 100 || URLValidacao.test(nivelImagem) === false || nivelDescricao.length < 30) {
            alert("preencha os dados corretamente")
        } else {
            informacoesBasicasQuiz.levels.push(
                {
                    title: nivelTitulo,
                    image: nivelImagem,
                    text: nivelDescricao,
                    minValue: nivelPorcentagem
                }
            )
            validacaoNiveis ++
        }
    }

    if (validacaoNiveis >= infoNiveis) {

        axios
            .post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", informacoesBasicasQuiz)
            .then(sucessoPost)
            .catch(console.log("deu doidera"))

    }
}

function sucessoPost(resposta) {

    const infoURL = document.querySelector(".info-url").value
    


    criacaoNiveisElemento.classList.add("escondido")
    sucessoQuiz.classList.remove("escondido")

    const sucessoImagem = document.querySelector(".sucesso-imagem")

    sucessoImagem.innerHTML = `<img src="${infoURL}">`
}

function voltarHome() {
    
    sucessoQuiz.classList.add("escondido")
    homeElemento.classList.remove("escondido")

    obterQuizzes()
}

