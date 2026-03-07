const userprof = document.getElementById('userprof')
const userkey = localStorage.getItem('userKey') 


async function LoadUp() {
    try {
        userprof.innerHTML = `
            <div class="loading-spinner text-center" style="margin-top: 26px">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="text-muted mt-2">LOADING USER PROFILE...</p>
            </div>
        `;

        if(!userkey) {  
            window.location.href = "/"
            return;
        }

        const request = await fetch('/auth/user-details', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userkey}`
            }
        });

        const response = await request.json();
        const user = response.user;

        const rqD = await fetch(`https://malawi-api.onrender.com/api/districts_all`);
        const rsD = await rqD.json();
        const data = rsD.districts[0].districts;

        userprof.innerHTML = `
            <div class="container mt-5">
                <p id="statusMessage" style="margin:12px 0 0; font-size:1rem; min-height:28px;"></p>

                <div style="padding:32px;">
                    <form id="uForm">

                        <div style="margin-bottom:24px;">
                            <label style="display:block; margin-bottom:8px; font-weight:600;">Name <span style="color:red;">*</span></label>
                            <input type="text" id="uName" value="${user.name}" required style="width:100%; padding:14px; border:1px solid #ddd; border-radius:8px;">  
                        </div>

                        <div style="margin-bottom:24px;">
                            <label style="display:block; margin-bottom:8px; font-weight:600;">Email <span style="color:red;">*</span></label>
                            <input type="email" id="uEmail" value="${user.email}" required style="width:100%; padding:14px; border:1px solid #ddd; border-radius:8px;">  <!-- ✅ unique id, correct type -->
                        </div>

                        <div style="margin-bottom:24px;">
                            <label style="display:block; margin-bottom:8px; font-weight:600;">My Location <span style="color:red;">*</span></label>
                            <select id="uLocation" required style="width:100%; padding:14px; border:1px solid #ddd; border-radius:8px;">
                                <option value="">Update District</option>
                                ${data.map(d => `
                                    <option value="${d._id}" ${d._id === user.location ? 'selected' : ''}>
                                        ${d.districtName}  
                                    </option>
                                `).join("")}  <!-- ✅ use d.districtName not data.find(...) -->
                            </select>
                        </div>

                        <div style="display:flex; gap:16px; justify-content:flex-end;">
                            <button type="submit" id="submitBtn" style="padding:14px 36px; background:#007bff; color:white; border:none; border-radius:8px; cursor:pointer; font-weight:600;">
                                Update Details
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        `;

    
        document.getElementById('uForm').addEventListener('submit', async(e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('submitBtn');
            const statusMessage = document.getElementById('statusMessage');

            const name = document.getElementById('uName').value;
            const email = document.getElementById('uEmail').value;
            const location = document.getElementById('uLocation').value;

            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status"></span> Updating...`;

            setTimeout(async() => {
                try {
                    const mkUp = await fetch('/auth/update-details', {
                        method: 'PUT', 
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userkey}`
                        },
                        body: JSON.stringify({ name, email, location })
                    });

                    const result = await mkUp.json();

                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Update Details';

                    if(result.msg) {
                        statusMessage.innerHTML = `<span style="color:red;">${result.msg}</span>`;
                    } else if(result.message) {
                        statusMessage.innerHTML = `<span style="color:green;">${result.message}</span>`;
                    }

                } catch(error) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Update Details';
                    statusMessage.innerHTML = `<span style="color:red;">${error.message}</span>`;
                }
            }, 0);
        });

    } catch (error) {
        return userprof.innerHTML = `<p class="text-center">${error.message}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', LoadUp);