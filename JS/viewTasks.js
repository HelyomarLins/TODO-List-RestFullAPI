// Extrair o índice da tarefa da URL
const urlParams = new URLSearchParams(window.location.search);
const taskIndex = parseInt(urlParams.get('index'));


// Buscar os detalhes da tarefa no armazenamento local com base no índice
const storedData = JSON.parse(localStorage.getItem("tasks")) || [];
console.log("Dados armazenados localmente:", storedData);

const taskDetails = storedData[taskIndex];
console.log("Detalhes da tarefa encontrada:", taskDetails);

// Preencher os campos do formulário com os detalhes da tarefa
if (taskDetails) {
    document.getElementById("id_task").value = taskDetails.id;
    document.getElementById("input_task").value = taskDetails.name;
    document.getElementById("desc_task").value = taskDetails.data.descricao;
    document.getElementById("date_ini_task").value = taskDetails.data.inicio;
    document.getElementById("date_end_task").value = taskDetails.data.fim;
    document.getElementById("cost_task").value = taskDetails.data.custo;
    document.getElementById("status_task").value = taskDetails.data.status;
} else {
    console.error("Tarefa não encontrada com o índice fornecido na URL.");
}

// Selecionar o botão "Editar Tarefa"
const editButton = document.querySelector("#edit_task_button");

// Adicionar um ouvinte de evento para o clique no botão "Editar Tarefa"
editButton.addEventListener("click", function(event) {
    // Impedir o comportamento padrão do botão
    event.preventDefault();

    // Extrair os valores atualizados dos campos do formulário
    const id = document.getElementById("id_task").value;
    const name = document.getElementById("input_task").value;
    const descricao = document.getElementById("desc_task").value;
    const inicio = document.getElementById("date_ini_task").value;
    const fim = document.getElementById("date_end_task").value;
    const custo = document.getElementById("cost_task").value;
    const status = document.getElementById("status_task").value;

    // Construir o objeto de dados atualizados
    const updatedData = {
        id: id,
        name: name,
        data: {
            descricao: descricao,
            inicio: inicio,
            fim: fim,
            custo: custo,
            status: status
        }
    };

    // Enviar a solicitação PUT para a API
    axios.put(`https://api.restful-api.dev/objects/${id}`, updatedData)
        .then((response) => {
            // Se a tarefa editada já existe na lista local, atualize seus dados
            const existingTaskIndex = storedData.findIndex(task => task.id === id);
            if (existingTaskIndex !== -1) {
                storedData[existingTaskIndex] = response.data;
            } else {
                // Caso contrário, adicione a tarefa editada à lista local
                storedData.push(response.data);
            }
            
            // Salvar os dados atualizados no armazenamento local
            localStorage.setItem("tasks", JSON.stringify(storedData));
            
            // Limpar o formulário após o envio bem-sucedido
            document.getElementById("formPut").reset();
            
            alert("Tarefa editada com sucesso!");
            
            // Redirecionar para a página listTasks.html
            window.location.href = "listTasks.html";
        })
        .catch((error) => {
            // Se houver um erro na solicitação, exibir uma mensagem de erro
            console.error("Erro ao editar a tarefa:", error);
            alert("Erro ao editar a tarefa. Por favor, tente novamente.");
        });
});
