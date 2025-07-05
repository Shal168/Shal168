// DOM Elements
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const equipmentGrid = document.getElementById('equipmentGrid');
const noResults = document.getElementById('noResults');

// State
let currentCategory = 'All';
let searchQuery = '';

// Event Listeners
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    renderEquipment();
});

categoryFilter.addEventListener('click', (e) => {
    if (e.target.classList.contains('category-btn')) {
        // Update active category button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');
        
        currentCategory = e.target.dataset.category;
        renderEquipment();
    }
});

// Modal Function
function openModal(equipment) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${equipment.name}</h2>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <img src="${equipment.imageUrl}" alt="${equipment.name}" class="modal-image">
                
                <div class="modal-section">
                    <h3>Working Principle</h3>
                    <p>${equipment.workingPrinciple}</p>
                </div>
                <div class="modal-section">
                    <h3>History</h3>
                    <p>${equipment.history || 'N/A'}</p>
                </div>
                <div class="modal-section">
                    <h3>Recent Trends</h3>
                    <ul>${(equipment.recentTrends || []).map(trend => `<li>${trend}</li>`).join('')}</ul>
                </div>
                <div class="modal-section">
                    <h3>Specifications</h3>
                    <ul>${(equipment.technicalSpecs || equipment.technicalSpec || []).map(spec => `<li>${spec}</li>`).join('')}</ul>
                    <p><strong>Maintenance:</strong> ${equipment.maintenance || 'N/A'}</p>
                </div>
                <div class="modal-section">
                    <h3>Application</h3>
                    <ul>${(equipment.applications || []).map(app => `<li>${app}</li>`).join('')}</ul>
                </div>
                <div class="modal-section">
                    <h3>Advantages</h3>
                    <ul>${(equipment.advantages || []).map(adv => `<li>${adv}</li>`).join('')}</ul>
                </div>
                <div class="modal-section">
                    <h3>Limitations</h3>
                    <ul>${(equipment.limitations || []).map(limit => `<li>${limit}</li>`).join('')}</ul>
                </div>
                <div class="modal-section">
                    <h3>Certification</h3>
                    <p>${(equipment.certification || []).join(', ')}</p>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Equipment card creator
function createEquipmentCard(equipment, index) {
    return `
        <div class="equipment-card">
            <img src="${equipment.imageUrl}" alt="${equipment.name}">
            <div class="card-content">
                <div class="card-header">
                    <h3 class="card-title">${equipment.name}</h3>
                    <span class="category-badge">${equipment.category}</span>
                </div>
                <button class="view-btn" data-index="${index}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                    View Details
                </button>
            </div>
        </div>
    `;
}

// Render equipment
function renderEquipment() {
    const filteredEquipment = equipmentData.filter(equipment => {
        const matchesSearch = 
            equipment.name.toLowerCase().includes(searchQuery) ||
            (equipment.manufacturer?.toLowerCase().includes(searchQuery) || '') ||
            (equipment.model?.toLowerCase().includes(searchQuery) || '');
        
        const matchesCategory = 
            currentCategory === 'All' || 
            equipment.category === currentCategory;
        
        return matchesSearch && matchesCategory;
    });

    if (filteredEquipment.length === 0) {
        equipmentGrid.innerHTML = '';
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
        equipmentGrid.innerHTML = filteredEquipment
            .map((equipment, index) => createEquipmentCard(equipment, index))
            .join('');

        
        document.querySelectorAll('.view-btn').forEach(btn => {
            const index = btn.dataset.index;
            btn.addEventListener('click', () => {
                openModal(filteredEquipment[index]);
            });
        });
    }
}

// Initial render
renderEquipment();
