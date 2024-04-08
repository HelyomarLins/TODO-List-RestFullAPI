// Selecionar o elemento form
const form = document.querySelector("#formPut");
const inputTask = document.querySelector("#input_task");
const descTask = document.querySelector("#desc_task");
const dateIniTask = document.querySelector("#date_ini_task");
const dateEndTask = document.querySelector("#date_end_task");
const costTask = document.querySelector("#cost_task");
const statusTask = document.querySelector("#status_task");
const ulListTasks = document.getElementById("list_tasks");

// URL da API
const apiUrl = "https://api.restful-api.dev/objects";

// Adicionar um ouvinte de evento para o envio do formulário
form.addEventListener("submit", function(event) {
    // Impedir o comportamento padrão do formulário de recarregar a página
    event.preventDefault();

    // Verificar se o campo de input não está vazio
    if (inputTask.value.trim() !== "") {
        // Construir o objeto de dados a ser enviado para a API
        const sendingData = {
            name: inputTask.value,
            data: {
                descricao: descTask.value,
                inicio: dateIniTask.value,
                fim: dateEndTask.value,
                custo: costTask.value,
                status: statusTask.value,
            },
        };

        // Enviar a requisição POST para a API
        axios
            .post(apiUrl, sendingData)
            .then((response) => {
                // Manipular a resposta da API e salvar os dados no armazenamento local
                saveDataLocalStorage(response.data);
                // Limpar o formulário após o envio bem-sucedido
                form.reset();
                // Redirecionar para a página listTasks.html
                window.location.href = "listTasks.html";
                // Atualizar a lista de tarefas na página
                showTasksFromAPI();
            })
            .catch((error) => {
                // Lidar com erros
                console.error("Erro ao enviar dados para a API:", error);
            });
    } else {
        // Se o input estiver vazio, exibir a div de erro e o parágrafo
        document.getElementById('error').innerHTML = '<h3>Por favor, insira uma tarefa válida!!</h3>';
        document.getElementById('error').style.display = 'block';
    }
});

// Função para salvar os dados no armazenamento local
function saveDataLocalStorage(data) {
    // Verificar se já há dados no armazenamento local
    let storedData = localStorage.getItem("tasks");

    // Se houver dados armazenados localmente, recuperá-los e convertê-los de JSON
    // para um array JavaScript. Se não houver dados, inicializar um array vazio.
    storedData = storedData ? JSON.parse(storedData) : [];

    // Adicionar os novos dados aos dados armazenados localmente
    storedData.push(data);

    // Salvar os dados atualizados no armazenamento local
    localStorage.setItem("tasks", JSON.stringify(storedData));
}
