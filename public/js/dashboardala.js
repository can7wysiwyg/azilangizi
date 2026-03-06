const dashCon = document.getElementById('dashCon')


async function LoadDashAla() {
          try {
             dashCon.innerHTML = `
         
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
  

        if(user.role === "azilangizi") {
            return dashCon.innerHTML = `
              <div class="container mt-4">
                  <div class="row justify-content-center">
                  <!-- first -->
                         <div class="col-md-6 mb-4">
                               <div class="card"
        style="background:#ffffff; border-radius:16px;
               box-shadow:0 12px 25px rgba(0,0,0,0.08);">
        <div class="card-body text-center" style="padding:40px;">
          <i class="fas fa-plus"
             style="font-size:56px; color: #e8b87d;"></i>
        
                    <a href="/addreport"
             style="display:inline-block; margin-top:15px;
                    background:#e8b87d; color: white;
                    padding:10px 26px; border-radius:24px;
                    text-decoration:none; font-weight:500;">
                Upload Report 
          </a>
        </div>
      </div>
      </div>


        <!-- second -->
                         <div class="col-md-6 mb-4">
                               <div class="card"
        style="background:#ffffff; border-radius:16px;
               box-shadow:0 12px 25px rgba(0,0,0,0.08);">
        <div class="card-body text-center" style="padding:40px;">
          <i class="fas fa-user"
             style="font-size:56px; color: #e8b87d;"></i>
        
                    <a href="/userprofile"
             style="display:inline-block; margin-top:15px;
                    background:#e8b87d; color: white;
                    padding:10px 26px; border-radius:24px;
                    text-decoration:none; font-weight:500;">
                Manage Account
          </a>
        </div>
      </div>
      </div>


      <!-- third -->

      <div class="col-md-6 mb-4">
                               <div class="card"
        style="background:#ffffff; border-radius:16px;
               box-shadow:0 12px 25px rgba(0,0,0,0.08);">
        <div class="card-body text-center" style="padding:40px;">
          <i class="fas fa-book"
             style="font-size:56px; color: #e8b87d;"></i>
        
                    <a href="/managereport"
             style="display:inline-block; margin-top:15px;
                    background:#e8b87d; color: white;
                    padding:10px 26px; border-radius:24px;
                    text-decoration:none; font-weight:500;">
                Manage & Track Reports 
          </a>
        </div>
      </div>




                         </div>



                 </div>

              </div>
            
            
            
            
            `


        }




          } catch (error) {
            dashCon.innerHTML = `
            <p class="text-center">${error.message} </p>
            `
          }

}


document.addEventListener('DOMContentLoaded', LoadDashAla)