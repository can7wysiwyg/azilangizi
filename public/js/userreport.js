const userrep = document.getElementById('userrep')
const userkey = localStorage.getItem('userKey')
const id = window.location.pathname.split("/").pop();



async function LoadUserRepo() {

try {

    userrep.innerHTML = `
         
                  <div class="loading-spinner text-center" style="margin-top: 26px">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="text-muted mt-2">Loading User's reports...</p>
            </div>
        
        `;

       
        if(!userkey) {
            window.location.href = "/"
            return;
        }

         

        const request = await fetch('/auth/user-details',  {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userkey}`
            }
        })

        
        const response = await request.json() 
        const user = response?.user 


        if(user?.role === "admin") { 

            const req = await fetch(`/admin-user-reports/${id}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userkey}`
            }
            })

            const res = await req.json()

            if(res.msg) {

                return userrep.innerHTML = `
    <p class="text-center">${res.msg} </p>
    
    `
            }


  const reports = res.reports;
  
  userrep.innerHTML = `
   <div  style="margin-top: 2.3rem; margin-bottom: 2.3rem;">
   
<div style="padding:2rem 0; border-top:1px solid #e5e5e5; margin-top:2rem;">

  <div class="row g-4">

  ${
    reports.map(item => `
    
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

        <h5 style="
          font-weight:600;
          margin-bottom:18px;
          min-height:48px;
        ">
          ${item.title}
        </h5>

        <div style="display:flex; justify-content:center; gap:10px; flex-wrap:wrap;">

          <a href="${item.rFile}" 
             download="${item.title}" 
             style="
               background:#0d6efd;
               color:#fff;
               padding:8px 16px;
               border-radius:6px;
               text-decoration:none;
               font-size:14px;
               font-weight:500;
             ">
             <i class="fas fa-download" style="margin-right:6px;"></i>
             Download/View
          </a>

        <!--  <a href="${item.rFile}" 
             target="_blank"
             style="
               border:1px solid #0d6efd;
               color:#0d6efd;
               padding:8px 16px;
               border-radius:6px;
               text-decoration:none;
               font-size:14px;
               font-weight:500;
             ">
             <i class="fas fa-eye" style="margin-right:6px;"></i>
             View
          </a> -->

        </div>

      </div>

    </div>

    `).join('')
  }

  </div>

</div>


 </div>



  
  `




        }

    
} catch (error) {
    return userrep.innerHTML = `
    <p class="text-center">${error.message} </p>
    
    `
}

}


document.addEventListener('DOMContentLoaded', LoadUserRepo)