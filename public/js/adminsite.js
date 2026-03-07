const adCon = document.getElementById('adCon')

async function DashA() {
    try {
        
adCon.innerHTML = `
         
                  <div class="loading-spinner text-center" style="margin-top: 26px">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="text-muted mt-2">Loading Dashboard...</p>
            </div>
        
        `;

        const userKey = localStorage.getItem('userKey')

        if(!userKey) {
            window.location.href = "/"
            return;
        }

         

        const request = await fetch('/auth/user-details',  {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userKey}`
            }
        })


        const response = await request.json() 
        const user = response.user 
  

        if(user.role === "admin") { 
            adCon.innerHTML = `
            
            <div class="container" style="margin-top:40px; max-width:1100px;">
  
  <div class="row g-4">

    <!-- Add Staff -->
    <div class="col-md-4">
      <div class="card text-center" style="border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
        <div class="card-body" style="padding:30px;">
          
          <div style="font-size:40px; color:#0d6efd; margin-bottom:10px;">
            <i class="fas fa-user-plus"></i>
          </div>

          <h5 class="card-title" style="font-weight:600;">Add Alangizi / Staff</h5>

          <p class="text-muted" style="font-size:14px;">
            Add new staff members to the system.
          </p>

          <a href="/addalangizi" class="btn btn-primary" style="margin-top:10px;">
            <i class="fas fa-plus"></i> Add Staff
          </a>

        </div>
      </div>
    </div>


    <!-- Manage Reports -->
    <div class="col-md-4">
      <div class="card text-center" style="border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
        <div class="card-body" style="padding:30px;">
          
          <div style="font-size:40px; color:#198754; margin-bottom:10px;">
            <i class="fas fa-file-alt"></i>
          </div>

          <h5 class="card-title" style="font-weight:600;">Manage Reports</h5>

          <p class="text-muted" style="font-size:14px;">
            View and manage uploaded reports.
          </p>

          <a href="/managereports" class="btn btn-success" style="margin-top:10px;">
            <i class="fas fa-folder-open"></i> View Reports
          </a>

        </div>
      </div>
    </div>


    <!-- Manage Users -->
    <div class="col-md-4">
      <div class="card text-center" style="border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
        <div class="card-body" style="padding:30px;">
          
          <div style="font-size:40px; color:#fd7e14; margin-bottom:10px;">
            <i class="fas fa-users"></i>
          </div>

          <h5 class="card-title" style="font-weight:600;">Manage Users / Alangizi</h5>

          <p class="text-muted" style="font-size:14px;">
            View and manage system users.
          </p>

          <a href="/manageusers" class="btn btn-warning" style="margin-top:10px;">
            <i class="fas fa-user-cog"></i> Manage Users
          </a>

        </div>
      </div>
    </div>

  </div>

</div>
            
            `




        }

    } catch (error) {

        return adCon.innerHTML = `
        
        <p class="text-center">${error.message} </p
        `

        
    }
}


document.addEventListener('DOMContentLoaded', DashA)