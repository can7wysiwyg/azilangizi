const mngCons = document.getElementById('mngCons')
const userkey = localStorage.getItem('userKey')
let reportParams = new URLSearchParams();


function ShowReports(reports, data) {
    return `
        <div style="padding:2rem 0; border-top:1px solid #e5e5e5; margin-top:2rem;">
            <div class="row g-4">
                ${reports.map(item => {

                    const district = data.find(d => d._id === item.location);
                    const districtName = district ? district.districtName : 'Unknown District';
                    const date = new Date(item.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'short', year: 'numeric'
                    });

                    return `
                    <div class="col-md-4 col-sm-6">
                        <div style="
                            border:1px solid #e6e6e6;
                            border-radius:10px;
                            padding:20px;
                            height:100%;
                            background:#fff;
                            box-shadow:0 4px 12px rgba(0,0,0,0.05);
                            text-align:center;
                        ">
                            <div style="font-size:38px; color:#6c757d; margin-bottom:10px;">
                                <i class="fas fa-file-alt"></i>
                            </div>

                            <h5 style="font-weight:600; margin-bottom:8px; min-height:48px;">
                                ${item.title}
                            </h5>

                            <div style="margin-bottom:6px;">
                                <span style="
                                    background:${item.rType === 'monthly' ? '#e7f1ff' : '#fff3cd'};
                                    color:${item.rType === 'monthly' ? '#0d6efd' : '#856404'};
                                    padding:3px 10px;
                                    border-radius:20px;
                                    font-size:12px;
                                    font-weight:600;
                                    text-transform:capitalize;
                                ">${item.rType}</span>
                            </div>

                            <div style="font-size:13px; color:#6c757d; margin-bottom:4px;">
                                <i class="fas fa-map-marker-alt" style="margin-right:4px;"></i>${districtName}
                            </div>

                            <div style="font-size:13px; color:#6c757d; margin-bottom:16px;">
                                <i class="fas fa-calendar-alt" style="margin-right:4px;"></i>${date}
                            </div>

                            <div style="font-size:13px; color:#6c757d; margin-bottom:16px;">
                                <i class="fas fa-user" style="margin-right:4px;"></i>
                                ${item.owner?.name || 'Unknown'}
                            </div>

                            <a href="/sendfile/${item._id}" 
                                
                               style="
                                   background:#0d6efd;
                                   color:#fff;
                                   padding:8px 16px;
                                   border-radius:6px;
                                   text-decoration:none;
                                   font-size:14px;
                                   font-weight:500;
                               ">
                               <i class="fas fa-envelope" style="margin-right:6px;"></i>
                               Send To Staff
                            </a>

                        </div>
                    </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}


async function MngRepos() {
    try {
        mngCons.innerHTML = `
            <div class="loading-spinner text-center" style="margin-top: 26px">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="text-muted mt-2">Loading Reports...</p>
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

        const rqD = await fetch(`https://malawi-api.onrender.com/api/districts_all`);
        const rsD = await rqD.json();
        const data = rsD.districts[0].districts;

        const response = await request.json();
        const user = response.user;

        if(user.role === "admin") {

        
            reportParams.set('district', '');
            reportParams.set('month', '');
            reportParams.set('sort', 'newest');

            const ftReports = await fetch(`/admin/all-reports?${reportParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userkey}`
                }
            });

            const resReports = await ftReports.json();

    
            mngCons.innerHTML = `
                <div class="container" style="margin-top: 2rem;">

                    <div class="row g-3 mb-4">

                        <div class="col-md-4">
                            <select id="districtReportFilter" style="width:100%; padding:14px; border:1px solid #ddd; border-radius:8px;">
                                <option value="">Filter By District</option>
                                <option value="all">All Districts</option>
                                ${data.map(d => `<option value="${d._id}">${d.districtName}</option>`).join('')}
                            </select>
                        </div>

                        <div class="col-md-4">
                            <select id="monthFilter" style="width:100%; padding:14px; border:1px solid #ddd; border-radius:8px;">
                                <option value="">Filter By Month</option>
                                <option value="all">All Months</option>
                                <option value="0">January</option>
                                <option value="1">February</option>
                                <option value="2">March</option>
                                <option value="3">April</option>
                                <option value="4">May</option>
                                <option value="5">June</option>
                                <option value="6">July</option>
                                <option value="7">August</option>
                                <option value="8">September</option>
                                <option value="9">October</option>
                                <option value="10">November</option>
                                <option value="11">December</option>
                            </select>
                        </div>

                        <div class="col-md-4">
                            <select id="sortFilter" style="width:100%; padding:14px; border:1px solid #ddd; border-radius:8px;">
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                            </select>
                        </div>

                    </div>

                    <div id="showReports">
                        ${resReports.msg 
                            ? `<p class="text-center">${resReports.msg}</p>` 
                            : ShowReports(resReports.reports, data)
                        }
                    </div>

                </div>
            `;

            
            const showReports = document.getElementById('showReports');

            document.addEventListener('change', async(e) => {
                if (!['districtReportFilter', 'monthFilter', 'sortFilter'].includes(e.target.id)) return;

                showReports.innerHTML = `
                    <div class="loading-spinner text-center" style="margin-top: 26px">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <p class="text-muted mt-2">Loading Reports...</p>
                    </div>
                `;

                reportParams.set('district', document.getElementById('districtReportFilter').value);
                reportParams.set('month', document.getElementById('monthFilter').value);
                reportParams.set('sort', document.getElementById('sortFilter').value);

                const ftReports = await fetch(`/admin/all-reports?${reportParams.toString()}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userkey}`
                    }
                });

                const resReports = await ftReports.json();

                if(resReports.msg) {
                    return showReports.innerHTML = `<p class="text-center">${resReports.msg}</p>`;
                }

                showReports.innerHTML = ShowReports(resReports.reports, data);
            });

        }

    } catch (error) {
        return mngCons.innerHTML = `
            <p class="text-center">${error.message}</p>
        `;
    }
}


document.addEventListener('DOMContentLoaded', MngRepos);