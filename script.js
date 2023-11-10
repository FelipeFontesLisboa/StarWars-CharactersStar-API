let currentPageUrl = "https://swapi.dev/api/people/"  // variavel Let com CurrentPageUrl ele vai armazenar endpoit da api para obter os dados carregar a api

  // criar uma funcao / Promisa // async await
window.onload = async () => { // toda a vez que a pagina recarrega ele chama essa funsao atualizar 
    try {  //try ou seja tente fazer isso se nao consegui vai e faca oque esta en catch
        await loadCharacters(currentPageUrl); // ou seja pegue a url faca um requisiçao para traser os resultados dos cardes
    } catch (error) { // se der pau no try mostre isso aqui 
        console.log(error); // no meu console voce mostre um erro de log e um alert para o usuario
        alert('Erro Ao Carregar');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage) //adicionanto eventos atividasdes dos botoes  /atividade click/ evento loadnextpage ->Proxima pagina/
    backButton.addEventListener('click', loadPreviusPage) // adiciando atividade click e pagina anteriuor
};
//corpo da loadcharacter
async function loadCharacters(url) {  // ele vai chamar e esperar como parametro uma url
    const mainContent = document.getElementById('main-content') //manipulando o dom e ele vai pegar um elemento la dentro
    mainContent.innerHTML = ''; // ele vai limpar os resultados anteriores da pagina 1 pra depois mostrar o resultado da pg 2 ou seja ele tira 10 card e mostra + 10 card

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((character) => {
            const card = document.createElement("div")  // criar uma tag html , ou div. h1 oque quiser como se tivesse sendo do html
            card.style.backgroundImage =
                `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')` //template strig para concatenar , vamos aplica o modo replase
            card.className = "card"                                    //dentro do replace vamos estrai so o id  usando espresao regular regexp(/\D/g, ""),
                                                                    //dentro dessa url estao todas as img  e usando essa metodo pegamos apenas o numero final o id 
                                                                    // https://starwars-visualguide.com/assets/img/characters/1.jpg
                                                                                                                        //    ↕ esse numero que coreponde a cada personagem
                                                                                                                   // se deixa esse id unico o backgroud img so pega uma imagen unica   

            const characterNameBG = document.createElement("div")
            characterNameBG.className = "character-name-bg"

            const characterName = document.createElement("span")
            characterName.className = "character-name"
            characterName.innerText = `${character.name}` //modifique o name do text cards

            characterNameBG.appendChild(characterName)  // pegamos a div chatacternamebg e jogamos dentro de charactername
            card.appendChild(characterNameBG) //pegamos a div chataternamebg e jogamos dentro de card

            mainContent.appendChild(card) // pegamos a div carde e jogameos aqui dentro  do maincontent

            //click do modal dos cards
            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

              //para limpar o conteudo do modal
              const modalContent = document.getElementById("modal-content")
              modalContent.innerHTML = '' // STRING VAZIA PRA LIMPA TODO O CONTEUDO DE DENTRO DO MODAL CONTENT
              
              //nova div e img do modal 
              const characterImage = document.createElement("div")
              characterImage .style.backgroundImage = 
              `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg'`
              characterImage.className = "character-image"

               //texto span modal informações
              const name = document.createElement("span")
              name.className = "character-details"
              name.innerText = `nome: ${character.name}`

              const characterHehigt = document.createElement("span")
              characterHehigt.className = "character-details"
              characterHehigt.innerText = `Altura: ${character.height}`

              const mass = document.createElement("span")
              mass.className = "character-details"
              mass.innerText = `Peso: ${character.mass}`

              const birthYear = document.createElement("span")
              birthYear.className = "character-details"
              birthYear.innerText = `Nascimento: ${character.birth_year}`

              const gender = document.createElement("span")
              gender.className = "character-details"
              gender.innerText = `Genero: ${character.gender}`

              //jogar as info dentro do modal contat //
              modalContent.appendChild(characterImage)
              modalContent.appendChild(name)
              modalContent.appendChild(characterHehigt)
              modalContent.appendChild(mass)
              modalContent.appendChild(birthYear)
              modalContent.appendChild(gender)

              
            }
        });

         //buttons
        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        // aqui vamo dizer quando vai ser true ou falso quando usar ou nao o botao
        //Operador logico ( ! )--> not ->Negação  , ELE VAI NEGAR O VALOR  se o valor eh True o operador negarar ele tornando False
        nextButton.disabled = !responseJson.next   //quando ouver o next ele vai ficar abilitado o disable vai ser falso 
        backButton.disabled = !responseJson.previous // e quando chegar no final e nao existir next  mais pagina ai  ele vai ser true

        // vamos manipular o botao e perguntar para o json se existe uma pagina anterios e ''se existir''
        backButton.style.visibility = responseJson.previous? "visible" : "hidden"  // e se existir ela vai ser visible e se  nao existir ele continua sendo hidden
                                                  

        currentPageUrl = url //


      // ANTES ERA O THEN E O CATCH - METODO MAIS ANTIGO
      //AGORA TRY E O CATCH - METODO MAIS NOVO 

      //( CATCH ) VAI SER EXECUTADO QUANDO A PROMESA FOR REJEITADA
    } catch (erro) {
        alert(' Erro ao carregar os personagem')
        console.log(erro)
    }
}

      //para proximas page
async function loadNextPage() {
    if (!currentPageUrl) return;   // uma função de prevenção , se ele tentar carrecar a proxima pagina
                                   // e nao encontrala ou seja se for inegistente ele retonar para o inicio , ou seja evidando 
    try { 
        const response = await fetch(currentPageUrl) // fazemos uma nova requisição para next
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)  //chamamos ele de novo so que pasando o next como  argumento

    } catch (erro) {           
        console .log(erro)          //se nao encontra a proxima pagina retorna esse alert para o usuario
        alert('Erro ao carregar a proxima pagina')
    }
}
       //para page anterioes
async function loadPreviusPage() {
    if (!currentPageUrl) return;   // uma função de prevenção , se ele tentar carrecar a proxima pagina
                                   // e nao encontrala ou seja se for inegistente ele retonar para o inicio , ou seja evidando 
    try { 
        const response = await fetch(currentPageUrl) // fazemos uma nova requisição para next
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)  //chamamos ele de novo so que pasando o next como  argumento

    } catch (erro) {           
        console .log(erro)          //se nao encontra a proxima pagina retorna esse alert para o usuario
        alert('Erro ao carregar a proxima Anterior')
    }
}
 
// aqui vamos criar a funsion hideodal do centro do card com informacoes do personagem
function hideModal(){
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

// traduçãp de informações da API,s de dados do modal de ingles para portugues caso queira mudar basta descomenta-las
