function deleteTask(taskId) {
    // Fazer a requisição DELETE para a API
    axios.delete(`https://api.restful-api.dev/objects/${taskId}`)
        .then((response) => {
            // Se a exclusão for bem-sucedida, atualizar o armazenamento local removendo a tarefa deletada
            updateLocalStorage(taskId);
            // Redirecionar para a página de listagem de tarefas
            window.location.href = "listTasks.html";
        })
        .catch((error) => {
            // Se houver um erro na solicitação, exibir uma mensagem de erro
            console.error("Erro ao excluir a tarefa:", error);
            alert("Erro ao excluir a tarefa. Por favor, tente novamente.");
        });
}

// Função para atualizar o armazenamento local removendo a tarefa deletada
function updateLocalStorage(taskId) {
    // Obter a lista de tarefas do armazenamento local
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    // Filtrar a lista de tarefas para remover a tarefa com o ID correspondente
    tasks = tasks.filter(task => task.id !== taskId);

    // Salvar a lista atualizada no armazenamento local
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
