//FUNÇÃO PARA GUARDAR OS DADOS EM LOCALSTORAGE
function saveDataLocalStorage(response) {
    // Obter a lista atual do armazenamento local
    let currentList = localStorage.getItem("list");

    // Verificar se há uma lista existente no armazenamento local
    if (currentList) {
        // Se houver uma lista existente, parseie-a de volta para um objeto JavaScript
        currentList = JSON.parse(currentList);
    } else {
        // Se não houver uma lista existente, inicialize-a como um array vazio
        currentList = [];
    }

    // Adicionar a nova tarefa à lista atual
    currentList.push(response.data);

    // Salvar a lista atualizada de volta no armazenamento local
    localStorage.setItem("list", JSON.stringify(currentList));
}

