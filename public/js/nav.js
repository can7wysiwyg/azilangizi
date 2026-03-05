 const userKey = localStorage.getItem('userKey')

const mynav = document.querySelector("#mynav");

async function LoadMenu() {
  try {
    mynav.innerHTML = `
             <nav class="ps-navbar" id="mainNav">
  <div class="ps-navbar__inner">

    <!-- Brand -->
    <a class="ps-navbar__brand" href="/" onclick="showSection('home')">
      <div class="ps-navbar__brand-icon"><i class="fas fa-atlas"></i></div>
      <span class="ps-navbar__wordmark">Azilangizi</span>
    </a>

    <!-- Mobile toggle -->
    <button class="ps-navbar__toggler" id="navToggler" aria-label="Toggle navigation">
      <i class="fas fa-bars"></i>
    </button>

    <!-- Nav links -->
    <div class="ps-navbar__collapse" id="navbarNav">
      <ul class="ps-navbar__nav">

        <li class="ps-navbar__item">
          <a class="ps-navbar__link active" href="/" onclick="setActive(this); showSection('home')">
            <i class="fas fa-home"></i> Home
          </a>
        </li>

        <li class="nav-item ps-navbar__item" id="authCont">
                       
                    </li>


        <li class="ps-navbar__item">
          <a class="ps-navbar__link" href="/reports" onclick="setActive(this); showSection('builder')">
            <i class="fas fa-book"></i> Reports
          </a>
        </li>

        
        
        <li class="ps-navbar__divider" role="separator"></li>

        <!-- Account — injected dynamically -->
        <li class="ps-navbar__item" id="authLnk">
                  </li>

      </ul>
    </div>
  </div>
</nav>
        
        
        `;

    document
      .getElementById("navToggler")
      .addEventListener("click", function () {
        var collapse = document.getElementById("navbarNav");
        var icon = this.querySelector("i");
        collapse.classList.toggle("open");
        icon.className = collapse.classList.contains("open")
          ? "fas fa-xmark"
          : "fas fa-bars";
      });

    function setActive(el) {
      document.querySelectorAll(".ps-navbar__link").forEach(function (l) {
        l.classList.remove("active");
      });
      el.classList.add("active");
    }


        if(!userKey) {
        
        return;

    } else if(userKey) {

        setInterval(() => {

       const renew = async() => {
           try {
            
             await fetch(`/auth/check-session?userKey=${userKey}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            
           } catch (error) {
            console.log("there was an error while renewing token", error.message)
           }
        


       }

       renew()

        // 900000

    }, 60000)



    }




  } catch (error) {
    return (mynav.innerHTML = `
        <p class="text-center">${error.message}, while loading menu. </p>
        
        `);
  }
}


document.addEventListener('DOMContentLoaded', LoadMenu)