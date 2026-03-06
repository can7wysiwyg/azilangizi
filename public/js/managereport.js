const mngCon = document.getElementById('mngCon')
const userKey = localStorage.getItem('userKey')


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
        
    } catch (error) {
        return mngCon.innerHTML = `
              <p class="text-center">${error.message} </p>
        
        
        `
    }

}


document.addEventListener('DOMContentLoaded', LoadManage)
