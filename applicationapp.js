let applianceCount = 0;

document.addEventListener('DOMContentLoaded', function() {
    initializeAppli();

    const applianceSelect = document.getElementById('applianceType');
    if (applianceSelect) {
        applianceSelect.addEventListener('change', function() {
            const otherInput = document.getElementById('otherAppliance');
            otherInput.style.display = this.value === 'Other' ? 'block' : 'none';
        });
    }

    const form = document.getElementById('applianceForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            addAppliance();
        });
    } else {
        displayAppliances();
    }
});

function initializeAppli() {
    if (localStorage.getItem('appliInitialized') === null) {
        localStorage.setItem('appliInitialized', 'true');
        localStorage.setItem('appliances', JSON.stringify([]));
    }
}

function addAppliance() {
    const typeSelect = document.getElementById('applianceType');
    const otherType = document.getElementById('otherAppliance').value;
    const energyUsed = document.getElementById('energyUsed').value;
    const applianceType = typeSelect.value === "Other" ? otherType : typeSelect.value;

    const appliances = JSON.parse(localStorage.getItem('appliances')) || [];
    appliances.push({ applianceType, energyUsed });
    localStorage.setItem('appliances', JSON.stringify(appliances));

    applianceCount ++ ;

    alert('Appliance added successfully!');

    typeSelect.selectedIndex = 0;
    document.getElementById('otherAppliance').style.display = 'none';
    document.getElementById('energyUsed').value = '';

    if (!confirm("Add another appliance?")) {
        window.location.href = 'applicahome.html';
    }
}

function displayAppliances() {
    const listDiv = document.getElementById('applianceList');
    const appliances = JSON.parse(localStorage.getItem('appliances')) || [];
    listDiv.innerHTML = '';

    const countDisplay = document.getElementById('applianceCount');
    countDisplay.textContent = `Number of appliances: ${appliances.length}`;

    appliances.forEach(appliance => {
        const div = document.createElement('div');
        div.className = 'appliance';
        div.textContent = `${appliance.applianceType}: ${appliance.energyUsed} KwH`;
        listDiv.appendChild(div);
    });
}

function resetAppliances() {
    localStorage.setItem('appliances', JSON.stringify([]));
    applianceCount = 0;
    alert("All appliances have been reset.");
    displayAppliances();
}
