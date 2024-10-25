let turnNumber = 1; 
const queue = []; 

const addClientModal = document.getElementById('addClientModal');
const waitTimeModal = document.getElementById('waitTimeModal');
const closeButtons = document.getElementsByClassName('close');

function showAddClientModal(turn, name, movement, arrivalTime) {
    document.getElementById('modalTurn').textContent = turn;
    document.getElementById('modalName').textContent = name;
    document.getElementById('modalMovement').textContent = movement;
    document.getElementById('modalArrivalTime').textContent = arrivalTime;
    addClientModal.style.display = 'block'; l
}

function showWaitTimeModal(clientName, waitTime) {
    document.getElementById('attendedClient').textContent = clientName;
    document.getElementById('waitTime').textContent = waitTime;
    waitTimeModal.style.display = 'block'; 
}

Array.from(closeButtons).forEach(button => {
    button.onclick = function() {
        addClientModal.style.display = 'none'; 
        waitTimeModal.style.display = 'none'; 
    };
});

window.onclick = function(event) {
    if (event.target == addClientModal || event.target == waitTimeModal) {
        addClientModal.style.display = 'none';
        waitTimeModal.style.display = 'none';
    }
};

document.getElementById('addButton').addEventListener('click', function() {
    const clientName = document.getElementById('clientName').value.trim();
    const movementType = document.getElementById('movementType').value;
    const arrivalTime = new Date(); 

    if (!/^[a-zA-Z\s]+$/.test(clientName)) {
        alert("Por favor, ingresa un nombre válido (solo letras y espacios).");
        return;
    }

    if (clientName === '') {
        alert("Por favor, ingresa el nombre del cliente.");
        return;
    }

    const client = {
        turn: turnNumber++, 
        name: clientName,
        movementType: movementType,
        arrivalTime: arrivalTime 
    };

    queue.push(client); 
    updateQueueTable(); 

    showAddClientModal(client.turn, client.name, client.movementType, arrivalTime.toLocaleTimeString());

    document.getElementById('clientName').value = '';
    document.getElementById('movementType').value = 'Pago de servicio';
});

document.getElementById('attendButton').addEventListener('click', function() {
    if (queue.length === 0) {
        alert("No hay clientes en la cola.");
        return;
    }

    const attendedClient = queue.shift(); 
    const waitTime = calculateWaitTime(attendedClient.arrivalTime); 

    updateQueueTable(); 

    showWaitTimeModal(attendedClient.name, waitTime);
});

function calculateWaitTime(arrivalTime) {
    const currentTime = new Date(); 
    const waitTimeInSeconds = Math.floor((currentTime - arrivalTime) / 1000); 
    return waitTimeInSeconds; 
}

function updateQueueTable() {
    const queueBody = document.getElementById('queueBody');
    queueBody.innerHTML = ''; 

    queue.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client.turn}</td>
            <td>${client.name}</td>
            <td>${client.movementType}</td>
            <td>${client.arrivalTime.toLocaleTimeString()}</td> <!-- Display formatted time -->
        `;
        queueBody.appendChild(row); 
    });
}

document.getElementById('acceptButton').onclick = function() {
    addClientModal.style.display = 'none'; 
};

document.getElementById('acceptButton2').onclick = function() {
    waitTimeModal.style.display = 'none'; 
};

document.getElementById('clientName').addEventListener('input', function(event) {
    this.value = this.value.replace(/[^a-zA-Z\s]/g, ''); 
});
