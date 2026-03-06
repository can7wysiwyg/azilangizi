const mngCon = document.getElementById('mngCon')
const userkey = localStorage.getItem('userKey')


async function LoadManage() {

    try {

        mngCon.innerHTML = `
         
                  <div class="loading-spinner text-center" style="margin-top: 26px">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="text-muted mt-2">Awaiting...</p>
            </div>
        
        `;

       const request = await fetch('/view-reports', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userkey}`
        }
       })

    const response = await request.json() 

    if(response.msg) {
        return mngCon.innerHTML = `
        <p class="text-center">${response.msg} </p>
        
        `
    }




    mngCon.innerHTML = `
    <div class="container mt-4">
    <div class="text-center">
    <p>Manage and track reports </p>
   <p class="text-danger" id="msgBoard"> </p>

   </div>
       
   <div class="my-reports-box" style="max-width:1100px; margin:0 auto; margin-top:30px;">

<ul style="list-style:none; padding:0; margin:0; display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:20px;">

${
response.reports.map(item => `
        
<li style="
border:1px solid #e6e6e6;
border-radius:10px;
padding:20px;
background:#fff;
box-shadow:0 4px 10px rgba(0,0,0,0.05);
display:flex;
flex-direction:column;
gap:10px;
">

<div style="font-size:13px; color:#6c757d; font-weight: bold;">
<i class="fas fa-calendar"></i> Uploaded on ${new Date(item.createdAt).toLocaleDateString()}
</div>

<h5 style="margin:0; font-weight:600; color:#333;">
<i class="fas fa-file-alt" style="margin-right:6px;"></i>
${item.title}
</h5>

<p style="margin:0; color:#555; font-size:14px;">
${item.description}
</p>

<div style="font-size:13px; color:#0d6efd; font-weight:500;">
${item.rType} report
</div>

<div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:10px;">

<a href="${item.rFile}" target="_blank"
style="
background:#0d6efd;
color:#fff;
padding:7px 14px;
border-radius:6px;
text-decoration:none;
font-size:13px;
">
<i class="fas fa-eye"></i> View
</a>

<a href="/updatealareport/${item._id}"
style="
border:1px solid #0d6efd;
color:#0d6efd;
padding:7px 14px;
border-radius:6px;
text-decoration:none;
font-size:13px;
">
<i class="fas fa-edit"></i> Update
</a>

<button type="button" data-id="${item._id}" class="dltBtn"
style="
background:#dc3545;
color:#fff;
border:none;
padding:7px 14px;
border-radius:6px;
font-size:13px;
cursor:pointer;
">
<i class="fas fa-trash"></i> Delete
</button>

</div>

</li>

`).join('')
}

</ul>

</div>
    </div>
    `
   

    document.querySelectorAll('.dltBtn').forEach(btn => {

        btn.addEventListener('click', async() => {
           const msgBoard = document.getElementById('msgBoard')         
        try {

         const rId = btn.dataset.id

        

         mngCon.innerHTML = `
         
                  <div class="loading-spinner text-center" style="margin-top: 26px">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="text-muted mt-2">Processing Delete request...</p>
            </div>
        
        `;

         
         const dltRq = await fetch(`/erase-report/${rId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userkey}`
            }
         })
    
         const dltResp = await dltRq.json()

         if(dltResp.msg) {
            return msgBoard.innerHTML = `
            <span>${dltResp.msg} </span>
            `

         } else if(dltResp.message) {
            window.location.reload()
         }
                     

            
         } catch (error) {
            return msgBoard.innerHTML = `
            <span>${error.message} </span>
            `
        }


    })



    }) 
        
    } catch (error) {
        return mngCon.innerHTML = `
              <p class="text-center">${error.message} </p>
        
        
        `
    }

}


document.addEventListener('DOMContentLoaded', LoadManage)
