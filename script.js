// script.js
const internsData = [
    {
        internId: "SWPAAM2001",
        name: "B.Anusha",
        email: "anushab8619@gmail.com",
        year: "4th Year",
        department: "Computer Science and Engineering",
        college: "JNTUA College of Engineering, Kalikiri.",
        phone: "+91 9392763609",
        duration: "4 Months",
        domain: "Ai / Machine Learning",
        fromDate: "2025-12-05", // fixed 2015 typo to 2025 based on toDate
        toDate: "2026-04-05",
        mode: "Online",
        status: "Verified",

    },
    {
        internId: "SWPAAM2002",
        name: "Bandi Priyadharshini",
        email: "priyadarshinibandi7@gmail.com",
        year: "4th Year",
        department: "Computer Science and Engineering",
        college: "JNTUA college of engineering kalikiri",
        phone: "+91 7981992064",
        duration: "4 Months",
        domain: "Ai / Machine Learning",
        fromDate: "2025-12-06",
        toDate: "2026-04-06",
        mode: "Online",
        status: "Verified"
    },
];

const grid = document.getElementById('internsGrid');
const searchInput = document.getElementById('searchInput');
const domainFilter = document.getElementById('domainFilter');
const dashboardControls = document.getElementById('dashboardControls');

function getStatusClass(status) {
    return status.toLowerCase() === 'verified' ? 'status-verified' : 'status-pending';
}

function getStatusIcon(status) {
    return status.toLowerCase() === 'verified' ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-solid fa-clock"></i>';
}

function formatDate(dateStr) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
}

function renderInterns(data) {
    grid.innerHTML = '';
    
    if (data.length === 0) {
        grid.innerHTML = '<div class="no-results"><i class="fa-solid fa-triangle-exclamation fa-3x"></i><p style="margin-top: 1.5rem;">No Verification Record Found.</p></div>';
        return;
    }

    data.forEach(intern => {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <div class="card-header">
                <div class="intern-meta">
                    <span class="intern-id">#${intern.internId}</span>
                    <span class="intern-name">${intern.name}</span>
                </div>
                <span class="intern-status ${getStatusClass(intern.status)}">${getStatusIcon(intern.status)} ${intern.status}</span>
            </div>
            
            <div class="card-body">
                <div class="info-group full-width">
                    <span class="info-label">Email Address</span>
                    <span class="info-value"><i class="fa-solid fa-envelope"></i> ${intern.email}</span>
                </div>
                
                <div class="info-group">
                    <span class="info-label">College / University</span>
                    <span class="info-value"><i class="fa-solid fa-building-columns"></i> <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px;" title="${intern.college}">${intern.college}</span></span>
                </div>
                
                <div class="info-group">
                    <span class="info-label">Department & Year</span>
                    <span class="info-value"><i class="fa-solid fa-graduation-cap"></i> <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px;" title="${intern.department}, ${intern.year}">${intern.department}, ${intern.year}</span></span>
                </div>
                
                <div class="info-group">
                    <span class="info-label">Training Program</span>
                    <span class="info-value"><i class="fa-solid fa-laptop-code"></i> ${intern.domain}</span>
                </div>
                
                <div class="info-group">
                    <span class="info-label">Phone Number</span>
                    <span class="info-value"><i class="fa-solid fa-phone"></i> ${intern.phone}</span>
                </div>
                
                <div class="info-group">
                    <span class="info-label">Internship Slot</span>
                    <span class="info-value"><i class="fa-regular fa-calendar-check"></i> ${formatDate(intern.fromDate)} to ${formatDate(intern.toDate)}</span>
                </div>
                
                <div class="info-group">
                    <span class="info-label">Duration & Mode</span>
                    <span class="info-value"><i class="fa-regular fa-clock"></i> ${intern.duration} | ${intern.mode}</span>
                </div>
                
                ${intern.projectLink ? `
                <div class="info-group full-width">
                    <span class="info-label">Certificate / Drive Link</span>
                    <span class="info-value"><i class="fa-solid fa-link"></i> <a href="${intern.projectLink}" target="_blank" style="color: var(--primary); font-weight: 700; text-decoration: underline;">View Document</a></span>
                </div>
                ` : ''}
            </div>
            
            <div class="card-footer">
                <div class="official-stamp">
                    <i class="fa-solid fa-shield-halved"></i> Officially Verified by Saredufy WPA
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function filterData() {
    const searchTerm = searchInput.value.toLowerCase();
    const domain = domainFilter.value;
    
    const filtered = internsData.filter(intern => {
        const matchesSearch = intern.name.toLowerCase().includes(searchTerm) || 
                              intern.email.toLowerCase().includes(searchTerm) || 
                              intern.internId.toLowerCase().includes(searchTerm);
        const matchesDomain = domain === 'all' || intern.domain === domain;
        
        return matchesSearch && matchesDomain;
    });
    
    renderInterns(filtered);
}

// Event Listeners for controls
if(searchInput) searchInput.addEventListener('input', filterData);
if(domainFilter) domainFilter.addEventListener('change', filterData);

// Routing Logic
function initializeApp() {
    // Handling URLs like /index.html/SWPA101
    const pathName = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check if ID is passed as ?id=SWPA101
    let requestedId = urlParams.get('id');

    // If not, check if it's appended to the path like /index.html/SWPA101
    if (!requestedId) {
        const urlParts = pathName.split('/');
        const lastPart = urlParts[urlParts.length - 1];
        if (lastPart && lastPart.toLowerCase() !== 'index.html' && lastPart.trim() !== '') {
            requestedId = lastPart;
        }
    }

    if (requestedId) {
        // Direct Verification Mode (from URL)
        if(dashboardControls) dashboardControls.style.display = 'none';
        grid.classList.add('single-view');
        
        // Find exact match for the ID
        const exactMatch = internsData.filter(intern => intern.internId.toLowerCase() === requestedId.toLowerCase());
        renderInterns(exactMatch);
    } else {
        // Full Dashboard Mode
        renderInterns(internsData);
    }
}

// Start application
initializeApp();
