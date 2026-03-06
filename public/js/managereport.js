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
   </div>


    </div>
    `

        
    } catch (error) {
        return mngCon.innerHTML = `
              <p class="text-center">${error.message} </p>
        
        
        `
    }

}


document.addEventListener('DOMContentLoaded', LoadManage)
