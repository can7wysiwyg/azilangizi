const reportsContainer = document.getElementById('reportsContainer')
let page = 1;
let limit = 20
let params = new URLSearchParams();
let isLoading = false;   
let hasMore = true;  


async function LoadReports() {

 try {

    reportsContainer.innerHTML = `
         
                  <div class="loading-spinner text-center" style="margin-top: 26px">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="text-muted mt-2">Loading Reports...</p>
            </div>
        
        `;

            const msg = window.msg || "";
            const repoDocs = window.repoDocs || {};

         const reqUsers = await fetch('/users')
         const resUsers = await reqUsers.json()
         const users = resUsers?.users
 
                       
            if(msg) {
                return reportsContainer.innerHTML = `
                
                <p class="text-center"> ${msg} </p>
                `
            }

            if (page >= repoDocs.totalPages) hasMore = false;
    page += 1; 


            


         reportsContainer.innerHTML = `
        <div style="max-width:1200px; margin-top: 2.3rem; margin:0 auto;">
        <div class="filter container">
         <div style="margin-bottom:24px;">
              
              <select id="rType" required style="width:100%; padding:14px; border:1px solid #ddd; border-radius:8px;">
                <option value="">Filter Reports By Type</option>
               <option value="all">All</option>
               <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>


              </select>
            </div>

        
        </div>

 <div id="showreports" style="margin-top: 2.3rem; margin-bottom: 2.3rem;">
   ${MyReports(repoDocs)}

 </div>
         
         </div>
         `
                
const showreports = document.getElementById('showreports')

document.addEventListener('change', async(e) => {
            if (e.target.id === "rType") {
          const val = e.target.value;
          console.log(val)

          if(!val) {
            return showreports.innerHTML = `
                        <div class="text-center" style="padding: 40px;">
                <i class="fas fa-spinner fa-spin" style="font-size: 40px; color: #53d318ff;"></i>
                <p style="color: #f01d1dff; margin-top: 15px;">Loading reports...</p>
            </div>
            
            `
          }
       
        window.location.search = `?rType=${val}&page=1&limit=20`
        if (page >= repoDocs.totalPages) hasMore = false;
    page += 1; 


          showreports.innerHTML = `
                        <div class="text-center" style="padding: 40px;">
                <i class="fas fa-spinner fa-spin" style="font-size: 40px; color: #53d318ff;"></i>
                <p style="color: #f01d1dff; margin-top: 15px;">Loading reports...</p>
            </div>
            
            `



          

        showreports.innerHTML = `
        ${MyReports(repoDocs)}

        
        `    

            
        
        
        }     

})




         function MyReports(report) {

      return `
<div style="padding:2rem 0; border-top:1px solid #e5e5e5; margin-top:2rem;">

  <div class="row g-4">

  ${
    report?.reports.map(item => `
    
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
          ${item.title} by ${users.find(per => per._id === item.owner).name}
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
`
         }
       


    
 } catch (error) {
    return reportsContainer.innerHTML = `
    <p class="text-center">${error.message} </p>
    `
 }

}


window.addEventListener("scroll", async () => {

 if (isLoading || !hasMore) return;

 if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {

    isLoading = true;
    page++;

    const rType = new URLSearchParams(window.location.search).get("rType") || "all";

    const res = await fetch(`/reports?rType=${rType}&page=${page}&limit=${limit}`, {
        headers: { "X-Requested-With": "XMLHttpRequest" }
    });

    const data = await res.json();

    if (!data.reports.length) {
        hasMore = false;
        return;
    }

    const showreports = document.getElementById("showreports");

    showreports.insertAdjacentHTML(
        "beforeend",
        MyReports({ reports: data.reports })
    );

    isLoading = false;
 }

});



document.addEventListener('DOMContentLoaded', LoadReports)