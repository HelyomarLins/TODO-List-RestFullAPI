// Definir a função para mostrar as tarefas da API
function showTasksFromAPI() {
    // Obter a lista de tarefas salvas no localStorage
    const currentList = localStorage.getItem("tasks");
        
    // Limpar o conteúdo do elemento ulListTasks
    ulListTasks.innerHTML = '';

    // Verificar se há uma lista existente no armazenamento local
    if (currentList) {
        // Parsear a lista de volta para um array JavaScript
        const tasks = JSON.parse(currentList);
      
        // Iterar sobre as tarefas da lista
        tasks.forEach((item, index) => {
           
            // Construir a representação HTML de cada tarefa
            const newTask = `
            <li id="input_task">
                <i class="bi bi-check2-circle" onclick="completedTask(${item.index})" id="i0"></i>
                <span type="text" class="mb-0">${item.name}</span>
                <i class="bi bi-eye" onclick="window.location.href = 'viewtask.html?index=${index}';" id="i1"></i>
                <i class="bi bi-trash3-fill" onclick="deleteTask('${item.id}')" id="i3"></i>
            </li>
            `;
            
            // Adicionar a nova tarefa ao HTML
            ulListTasks.insertAdjacentHTML('beforeend', newTask);
        });
    } else {
        console.log("Nenhuma tarefa encontrada no localStorage.");
    }
}

// Selecionar os elementos HTML
const ulListTasks = document.getElementById("list_tasks");

// Adicionar um ouvinte de evento para o carregamento da página
window.addEventListener("load", function() {
    // Chama a função para exibir as tarefas na página
    showTasksFromAPI();
});

