// v5 — build trigger
document.addEventListener("DOMContentLoaded", () => {
  // Detect current directory level to construct correct relative path prefix
  const isSubPage = window.location.pathname.includes("/Pages/") || window.location.pathname.includes("/pages/");
  const prefix = isSubPage ? "../" : "";

  // 1. Inject Preloader (if container is present)
  const preloaderContainer = document.getElementById("preloader-container");
  if (preloaderContainer) {
    preloaderContainer.innerHTML = `
      <div id="preloader">
        <div class="loader">
          <div></div>
          <div><span class="cifra">0</span>%</div>
        </div>
        <h1 class="loader-text text-[#ff4301]">
          <span class="char">T</span> <span class="char">H</span> <span class="char">E</span>
          &nbsp;&nbsp;&nbsp;
          <span class="char">F</span> <span class="char">U</span> <span class="char">T</span> <span class="char">U</span> <span class="char">R</span> <span class="char">E</span>
          <br />
          <span class="char">O</span> <span class="char">F</span>
          &nbsp;&nbsp;&nbsp;
          <span class="char">A</span> <span class="char">V</span> <span class="char">I</span> <span class="char">A</span> <span class="char">T</span> <span class="char">I</span> <span class="char">O</span> <span class="char">N</span>
        </h1>
      </div>
    `;
  }

  // 2. Inject Navbar Header
  const headerContainer = document.getElementById("header-container");
  if (headerContainer) {
    headerContainer.innerHTML = `
      <header class="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[1400px] bg-white/75 backdrop-blur-md border border-white/20 shadow-md py-3 px-6 xl:px-8 rounded-full flex items-center justify-between z-50 transition-all duration-300">
        <!-- Logo / Branding -->
        <div class="logo flex items-center space-x-3">
          <a class="flex items-center space-x-2" href="${prefix}index.html">
            <img src="${prefix}Assets/Images/WhatsApp_Image_2026-07-04_at_11.13.29_PM-removebg-preview.png" class="w-[71px] h-[71px] object-contain" alt="Awadh Logo">
            <div class="flex flex-col leading-tight font-semibold">
              <span class="text-[21px] sm:text-[23px] font-black tracking-tight text-[#ff4301]">Awadh Aero</span>
              <span class="text-[14px] sm:text-[16px] font-bold text-[#7405bc] tracking-wider">ADVENTURES ASSOCIATIONS</span>
            </div>
          </a>
        </div>

        <!-- Desktop Navigation links -->
        <nav class="hidden lg:block lg:mx-auto">
          <ul class="flex space-x-8 xl:space-x-12 text-sm font-bold">
            <li><a class="text-[#1f2937] hover:text-[#5d58ef] transition" href="${prefix}index.html">Home</a></li>
            
            <!-- About dropdown -->
            <li class="relative group">
              <a class="text-[#1f2937] hover:text-[#5d58ef] transition flex items-center" href="${prefix}Pages/about.html">
                About Us
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </a>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="${prefix}Pages/about.html">Overview</a>
                <a class="dropdown-item" href="${prefix}Pages/vision-mission.html">Our Vision & Mission</a>
                <a class="dropdown-item" href="${prefix}Pages/leadership.html">Our Leadership</a>
              </div>
            </li>

            <!-- Courses Dropdown -->
            <li class="relative group">
              <a class="text-[#1f2937] hover:text-[#5d58ef] transition flex items-center" href="#">
                Courses
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </a>

                  <div class="dropdown-menu w-72">
                    <div class="dropdown-submenu">
                      <a class="dropdown-item py-3 text-sm font-semibold flex justify-between items-center" href="#">
                        (AME)Aircraft Maintenance Engineering
                        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                      </a>
                      <div class="dropdown-menu w-64">
                        <a class="dropdown-item py-2 text-sm" href="${prefix}Pages/ame-b1-1.html">B1.1 (Aeroplanes Turbine)</a>
                        <!-- <a class="dropdown-item py-2 text-sm" href="${prefix}Pages/ame-b1-2-mechanical.html">B1.2 (Mechanical)</a> -->
                        <a class="dropdown-item py-2 text-sm" href="${prefix}Pages/ame-b1-2.html">B2 (Avionics)</a>
                      </div>
                    </div>
                    
                    <a class="dropdown-item py-3 text-sm font-semibold" href="${prefix}Pages/hangglider.html">Power Hang Glider Training</a>
                    
                    <!--
                    <div class="dropdown-submenu">
                      <a class="dropdown-item py-3 text-sm font-semibold flex justify-between items-center" href="#">
                        Drone Pilot Training
                        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                      </a>
                      <div class="dropdown-menu w-64">
                        <a class="dropdown-item py-2 text-sm" href="${prefix}Pages/dronepilot-small.html">Small Class Drone</a>
                        <a class="dropdown-item py-2 text-sm" href="${prefix}Pages/dronepilot-medium.html">Medium Class Drone</a>
                      </div>
                    </div>

                    <a class="dropdown-item py-3 text-sm font-semibold" href="${prefix}Pages/dronemaintenance.html">Drone Maintenance Training</a>
                    -->

                  </div>
                </div>
              </div>
            </li>

            <!-- Gallery Dropdown -->
            <li class="relative group">
              <a class="text-[#1f2937] hover:text-[#5d58ef] transition flex items-center" href="#">
                Gallery
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </a>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="${prefix}Pages/gallery-photos.html">Photos</a>
                <a class="dropdown-item" href="${prefix}Pages/gallery-videos.html">Videos</a>
              </div>
            </li>

            <!-- Admission Dropdown -->
            <li class="relative group">
              <a class="text-[#1f2937] hover:text-[#5d58ef] transition flex items-center" href="#">
                Admission
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </a>
              <div class="dropdown-menu">
                <div class="relative group/reg">
                  <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#5d58ef] transition" href="#">
                    Registration
                  </a>
                  <div class="absolute right-full top-0 hidden group-hover/reg:block bg-white shadow-xl rounded-xl py-2 w-48 border border-gray-100 z-50">
                    <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#5d58ef] transition" href="${prefix}Pages/admission.html">AME</a>
                    <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#5d58ef] transition" href="${prefix}Pages/registration-hangglider.html">Power Hang Glider</a>
                  </div>
                </div>
                <a class="dropdown-item" href="${prefix}Pages/admission-procedure.html">Admission Procedure</a>
                <a class="dropdown-item" href="${prefix}Pages/fee-structure.html">Fee Structure</a>
                <a class="dropdown-item" href="${prefix}Pages/admission-form.html">Application Form</a>
                <a class="dropdown-item" href="${prefix}Assets/Images/broschure/aadaa%20Brochure%2007.26-27.pdf" target="_blank">Brochure</a>
              </div>
            </li>

            <li><a class="text-[#1f2937] hover:text-[#5d58ef] transition" href="${prefix}Pages/contact.html">Contact Us</a></li>
          </ul>
        </nav>

        <!-- CTA Button on Right -->
        <!--
        <div class="hidden lg:block">
          <a href="${prefix}Pages/admission-form.html" class="px-6 py-2 bg-[#ff4301] text-white font-bold rounded-full hover:bg-[#5d58ef] transition duration-300 btn-premium flex items-center shadow-md text-sm">
            Apply Now <i class="fas fa-arrow-right text-xs ml-2"></i>
          </a>
        </div>
        -->

        <!-- Burger Toggle (Mobile Only) -->
        <button id="mobile-menu-toggle" class="lg:hidden text-gray-700 focus:outline-none" aria-label="Toggle Navigation">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path id="menu-icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        <!-- Mobile Drawer menu structure -->
        <div id="mobile-nav" class="hidden absolute top-[110%] left-0 w-full bg-white/95 backdrop-blur-md border border-gray-100 shadow-xl z-40 flex flex-col p-6 space-y-4 lg:hidden max-h-[70vh] overflow-y-auto rounded-3xl">
          <a class="text-lg font-semibold hover:text-[#5d58ef]" href="${prefix}index.html">Home</a>
          
          <div class="flex flex-col">
            <span class="text-lg font-semibold text-gray-400 border-b pb-1 mb-1">About</span>
            <a class="pl-4 py-1 text-base hover:text-[#5d58ef]" href="${prefix}Pages/about.html">Overview</a>
            <a class="pl-4 py-1 text-base hover:text-[#5d58ef]" href="${prefix}Pages/vision-mission.html">Our Vision & Mission</a>
            <a class="pl-4 py-1 text-base hover:text-[#5d58ef]" href="${prefix}Pages/leadership.html">Our Leadership</a>
          </div>

          <div class="flex flex-col">
            <span class="text-lg font-semibold text-gray-400 border-b pb-1 mb-1">Campus</span>
            <span class="pl-2 text-base font-semibold text-gray-500 mt-1">AWADH AERO DAC AVIATION ACADEMY(AADAA)</span>
            <span class="pl-4 text-sm font-semibold text-gray-500 mt-1">(AME)Aircraft Maintenance Engineering</span>
            <a class="pl-8 py-1 text-sm hover:text-[#5d58ef]" href="${prefix}Pages/ame-b1-1.html">B1.1 Aeroplanes Turbine</a>
            <!-- <a class="pl-8 py-1 text-sm hover:text-[#5d58ef]" href="${prefix}Pages/ame-b1-2-mechanical.html">B1.2 (Mechanical)</a> -->
            <a class="pl-8 py-1 text-sm hover:text-[#5d58ef]" href="${prefix}Pages/ame-b1-2.html">B2 (Avionics)</a>
            <a class="pl-4 py-1 text-sm font-semibold text-gray-500 hover:text-[#5d58ef] mt-2" href="${prefix}Pages/hangglider.html">Power Hang Glider Training</a>
            <!--
            <span class="pl-4 text-sm font-semibold text-gray-500 mt-2">Drone Pilot Training</span>
            <a class="pl-8 py-1 text-sm hover:text-[#5d58ef]" href="${prefix}Pages/dronepilot-small.html">Small Class Drone</a>
            <a class="pl-8 py-1 text-sm hover:text-[#5d58ef]" href="${prefix}Pages/dronepilot-medium.html">Medium Class Drone</a>
            <a class="pl-6 py-2 text-base font-semibold hover:text-[#5d58ef]" href="${prefix}Pages/dronemaintenance.html">Drone Maintenance Training</a>
            -->

          </div>

          <div class="flex flex-col">
            <span class="text-lg font-semibold text-gray-400 border-b pb-1 mb-1">Gallery</span>
            <a class="pl-4 py-1 text-base hover:text-[#5d58ef]" href="${prefix}Pages/gallery-photos.html">Photos</a>
            <a class="pl-4 py-1 text-base hover:text-[#5d58ef]" href="${prefix}Pages/gallery-videos.html">Videos</a>
          </div>

          <div class="flex flex-col">
            <span class="text-lg font-semibold text-gray-400 border-b pb-1 mb-1">Admission</span>
            <a class="pl-4 py-1 text-base hover:text-[#5d58ef]" href="${prefix}Pages/admission.html">Registration</a>
            <a class="pl-4 py-1 text-base hover:text-[#5d58ef]" href="${prefix}Pages/admission-procedure.html">Admission Procedure</a>
            <a class="pl-4 py-1 text-base hover:text-[#5d58ef]" href="${prefix}Pages/fee-structure.html">Fee Structure</a>
            <a class="pl-4 py-1 text-base hover:text-[#5d58ef]" href="${prefix}Pages/admission-form.html">Application Form</a>
            <a class="pl-4 py-1 text-base hover:text-[#5d58ef]" href="${prefix}Assets/Images/broschure/aadaa%20Brochure%2007.26-27.pdf" target="_blank">Brochure</a>
          </div>

          <a class="text-lg font-semibold hover:text-[#5d58ef]" href="${prefix}Pages/contact.html">Contact Us</a>
        </div>
      </header>



      <!-- Floating Left Buttons (Enquire & Registration) -->
      <div class="fixed left-0 top-[45%] -translate-y-1/2 z-[99999] flex flex-col gap-2 transition-all duration-300">
        <a href="${prefix}Pages/contact.html" class="inline-block py-6 px-3.5 bg-[#ff4301] hover:bg-[#5d58ef] text-white text-xs sm:text-sm font-black uppercase tracking-widest rounded-r-3xl shadow-[4px_4px_15px_rgba(255,67,1,0.4)] hover:shadow-[4px_4px_20px_rgba(93,88,239,0.5)] hover:translate-x-1.5 transform transition-all duration-300 [writing-mode:vertical-rl] text-center">
          ENQUIRE NOW
        </a>
        <a href="${prefix}Pages/admission.html" class="inline-block py-6 px-3.5 bg-[#005F86] hover:bg-[#5d58ef] text-white text-xs sm:text-sm font-black uppercase tracking-widest rounded-r-3xl shadow-[4px_4px_15px_rgba(0,95,134,0.4)] hover:shadow-[4px_4px_20px_rgba(93,88,239,0.5)] hover:translate-x-1.5 transform transition-all duration-300 [writing-mode:vertical-rl] text-center">
          ONLINE REGISTRATION
        </a>
      </div>
    `;

    // Interactive Toggle logic for Mobile viewports
    const toggleBtn = document.getElementById("mobile-menu-toggle");
    const mobileNav = document.getElementById("mobile-nav");
    const menuIcon = document.getElementById("menu-icon");

    if (toggleBtn && mobileNav) {
      toggleBtn.addEventListener("click", () => {
        const isHidden = mobileNav.classList.contains("hidden");
        if (isHidden) {
          mobileNav.classList.remove("hidden");
          menuIcon.setAttribute("d", "M6 18L18 6M6 6l12 12"); // X shape
        } else {
          mobileNav.classList.add("hidden");
          menuIcon.setAttribute("d", "M4 6h16M4 12h16M4 18h16"); // Hamburger lines
        }
      });
    }
  }

  // 3. Inject Footer Section
  const footerContainer = document.getElementById("footer-container");
  if (footerContainer) {
    footerContainer.innerHTML = `
      <footer id="footer" class="relative bg-[#005F86] text-white pt-6">
        <div class="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
          <!-- Column 1: Info -->
          <div class="footer-col space-y-4">
            <h4 class="text-xl font-bold mb-4 border-b border-white/30 pb-2">Registered office</h4>
            <p class="text-sm text-gray-200">
              Mankapur Kot, Mankapur, Gonda,<br>
              Uttar Pradesh - 271302, India
            </p>
            <h4 class="text-xl font-bold mb-4 border-b border-white/30 pb-2">AADAA campus</h4>
            <p class="text-sm text-gray-200 mb-6">
              Kanpur - Lucknow Rd, Daroga Khera, Lucknow,<br>
              Banthra Sikander Pur, Uttar Pradesh 226401
            </p>
            <!-- Social Buttons Placeholders (Moved to floating container) -->
          </div>

          <!-- Column 2: Quick Links -->
          <div class="footer-col">
            <h4 class="text-xl font-bold mb-4 border-b border-white/30 pb-2">Quick Links</h4>
            <ul class="space-y-2 text-sm text-gray-200">
              <li><a href="${prefix}index.html" class="hover:text-white flex items-center"><i class="fas fa-caret-right mr-2 text-xs"></i>Home</a></li>
              <li><a href="${prefix}Pages/about.html" class="hover:text-white flex items-center"><i class="fas fa-caret-right mr-2 text-xs"></i>About Us</a></li>
              <li><a href="#" class="hover:text-white flex items-center"><i class="fas fa-caret-right mr-2 text-xs"></i>Courses</a></li>
              <li><a href="#" class="hover:text-white flex items-center"><i class="fas fa-caret-right mr-2 text-xs"></i>Gallery</a></li>
              <li><a href="${prefix}Pages/admission.html" class="hover:text-white flex items-center"><i class="fas fa-caret-right mr-2 text-xs"></i>Admission</a></li>
              <li><a href="${prefix}Pages/contact.html" class="hover:text-white flex items-center"><i class="fas fa-caret-right mr-2 text-xs"></i>Contact Us</a></li>
              <li><a href="https://www.dgca.gov.in/digigov-portal/" target="_blank" class="hover:text-white flex items-center"><i class="fas fa-caret-right mr-2 text-xs"></i>DGCA website</a></li>
            </ul>
          </div>



          <!-- Column 4: Contact -->
          <div class="footer-col space-y-4">
            <h4 class="text-xl font-bold mb-4 border-b border-white/30 pb-2">Contact Academy</h4>
            <p class="text-sm text-gray-200">Feel free to reach out to learn more about admissions and training schedules.</p>
            <ul class="space-y-2 text-sm text-gray-200">
              <li class="flex items-center"><i class="far fa-envelope mr-3 text-xs"></i><span>am@awadhaero.com</span></li>
              <li class="flex items-center"><i class="fas fa-phone mr-3 text-xs"></i><span>+91 95198 46758</span></li>
              <li class="flex items-center"><i class="fas fa-phone mr-3 text-xs"></i><span>+91 70808 46758</span></li>
              <li class="flex items-center"><i class="fas fa-phone mr-3 text-xs"></i><span>+91 80907 46758</span></li>
            </ul>
          </div>
        </div>

        <!-- Copyright -->
        <div class="bg-black/20 py-4 text-center text-xs text-gray-300">
          &copy; 2026 Awadh Aero DAC Aviation Academy. All Rights Reserved.
        </div>
      </footer>
    `;
  }

  const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || !window.location.pathname.includes('.html');

  // 4. Inject Floating Social Icons
  const floatingSocial = document.createElement("div");
  floatingSocial.id = "floatingSocialIcons";
  floatingSocial.className = isHomePage ? "state-horizontal" : "state-vertical";
  
  floatingSocial.innerHTML = `
    <a href="https://www.facebook.com/profile.php?id=61574279999787" target="_blank" rel="noopener noreferrer" class="w-11 h-11 text-white rounded-2xl flex items-center justify-center hover:scale-110 shadow-lg premium-card" style="background:#1877F2;">
      <i class="fab fa-facebook-f"></i>
    </a>
    <a href="https://youtube.com/@awadhaero?si=vMYKU8eupjwThuPH" target="_blank" rel="noopener noreferrer" class="w-11 h-11 bg-white rounded-2xl flex items-center justify-center hover:scale-110 premium-card group transition-all shadow-[0_5px_15px_rgba(0,0,0,0.08)]">
      <div class="w-[30px] h-[22px] bg-gradient-to-tr from-[#ff0000] to-[#ff4d4d] rounded-[7px] flex items-center justify-center transition-all duration-300" style="box-shadow: 0 4px 15px rgba(255, 0, 0, 0.5), inset 0 2px 4px rgba(255,255,255,0.4);">
        <i class="fas fa-play text-white text-[10px] ml-[2px]" style="filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));"></i>
      </div>
    </a>
    <a href="https://www.instagram.com/awadh_aero?igsh=Ym04NHNwaHNwdm01" target="_blank" rel="noopener noreferrer" class="w-11 h-11 text-white rounded-2xl flex items-center justify-center hover:scale-110 premium-card transition-all" style="background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%); box-shadow: inset 0 2px 4px rgba(255,255,255,0.3), 0 4px 15px rgba(0,0,0,0.2);">
      <i class="fab fa-instagram text-[26px]" style="filter: drop-shadow(0 2px 3px rgba(0,0,0,0.4));"></i>
    </a>
    <a href="https://www.linkedin.com/company/awadh-aero-adventures-association/" target="_blank" rel="noopener noreferrer" class="w-11 h-11 text-white rounded-2xl flex items-center justify-center hover:scale-110 shadow-lg premium-card" style="background:#0A66C2;">
      <i class="fab fa-linkedin-in"></i>
    </a>
    <a href="https://x.com/i/status/2063277029316038840" target="_blank" rel="noopener noreferrer" class="w-11 h-11 text-white rounded-2xl flex items-center justify-center hover:scale-110 shadow-lg premium-card" style="background:#000000;">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    </a>
    <a href="https://wa.me/919519846758?text=hey" target="_blank" rel="noopener noreferrer" class="w-11 h-11 text-white rounded-2xl flex items-center justify-center hover:scale-110 shadow-lg premium-card transition-all" style="background:#25D366; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);">
      <i class="fab fa-whatsapp text-[26px]" style="filter: drop-shadow(0 2px 3px rgba(0,0,0,0.3));"></i>
    </a>
  `;
  document.body.appendChild(floatingSocial);

  // Only apply the scroll transition on the homepage
  if (isHomePage) {
    window.addEventListener("scroll", () => {
      const social = document.getElementById("floatingSocialIcons");
      if (!social) return;
      if (window.scrollY > 200) {
        social.classList.remove("state-horizontal");
        social.classList.add("state-vertical");
      } else {
        social.classList.remove("state-vertical");
        social.classList.add("state-horizontal");
      }
    });
  }

  // 5. Replace Scroll to Top with Brochure Button
  const oldScrollBtn = document.getElementById("scrollTopBtn");
  if (oldScrollBtn) oldScrollBtn.remove();

  // 6. Inject Breadcrumb Text below navbar
  const pageTitleParts = document.title.split('|')[0].split('—')[0].trim();
  const isHome = pageTitleParts.toLowerCase() === 'home' || pageTitleParts === '';
  
  if (!isHome) {
    const breadcrumb = document.createElement("div");
    breadcrumb.className = "absolute top-[120px] md:top-[125px] left-[6%] max-w-[1400px] xl:left-[calc(50%-660px)] z-[40] text-sm md:text-base font-semibold text-gray-500 pointer-events-none flex items-center";
    breadcrumb.innerHTML = `
      <a href="${prefix}index.html" class="hover:text-[#5d58ef] transition pointer-events-auto">Home</a>
      <span class="mx-2 text-gray-400">/</span>
      <span class="text-[#ff4301] pointer-events-auto">${pageTitleParts}</span>
    `;
    document.body.appendChild(breadcrumb);
  }

  // 7. Inject Global Admission Popup & Time Tracking Logic
  if (!document.getElementById("admissionPopup")) {
    const popupHTML = `
      <div id="admissionPopup" class="fixed inset-0 z-[1000] hidden items-center justify-center p-4">
        <!-- Backdrop with blur -->
        <div id="popupBackdrop" class="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 transition-opacity duration-300"></div>
        
        <!-- Modal Card -->
        <div id="popupCard" class="bg-white w-full max-w-lg rounded-[2rem] overflow-hidden shadow-2xl relative z-10 transform scale-90 opacity-0 transition-all duration-300 border border-gray-100 flex flex-col md:flex-row">
          <!-- Decorative Side Panel -->
          <div class="bg-[#005F86] md:w-1/3 flex flex-col justify-center items-center p-6 text-white text-center relative overflow-hidden">
            <!-- Radial Gradient Highlight -->
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,67,1,0.25),transparent_70%)]"></div>
            <!-- Plane icon in white circle -->
            <div class="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4 backdrop-blur-md relative z-10">
              <i class="fas fa-paper-plane text-xl text-[#ff4301]"></i>
            </div>
            <span class="text-[10px] uppercase tracking-widest text-orange-200 font-extrabold relative z-10">Awadh Aero</span>
            <h4 class="text-base font-black mt-1 relative z-10">ADMISSIONS</h4>
            <span class="text-[10px] bg-[#ff4301] text-white px-3 py-1 rounded-full font-bold mt-3 shadow-md relative z-10">OPEN NOW</span>
          </div>
          
          <!-- Content Panel -->
          <div class="p-8 md:w-2/3 flex flex-col justify-between relative bg-white">
            <!-- Close Button -->
            <button id="closePopupBtn" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-xl p-1 focus:outline-none" aria-label="Close popup">
              <i class="fas fa-times"></i>
            </button>
            
            <div>
              <span class="text-[#ff4301] font-bold text-xs uppercase tracking-wider block mb-1">Launch Your Aviation Journey</span>
              <h3 class="text-xl font-black text-gray-800 leading-snug mb-3">
                Secure Your Seat Today!
              </h3>
              <p class="text-gray-500 text-xs leading-relaxed mb-6">
                Enroll in our industry-leading <strong>Aircraft Maintenance Engineering (AME)</strong> or <strong>UAV Drone Pilot</strong> courses. Hands-on learning in premium facilities.
              </p>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-2.5">
              <a href="${prefix}Pages/admission-form.html" class="flex-1 text-center py-2.5 bg-[#ff4301] hover:bg-[#5d58ef] text-white font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 btn-premium text-xs">
                Apply Now <i class="fas fa-arrow-right text-[10px]"></i>
              </a>
              <button id="closePopupBtnSecondary" class="px-4 py-2.5 border border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-700 font-semibold rounded-full transition-all duration-300 text-xs bg-gray-50">
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    const popupContainer = document.createElement("div");
    popupContainer.innerHTML = popupHTML;
    document.body.appendChild(popupContainer.firstElementChild);
  }

  // Time Tracking and Popup Logic
  const popup = document.getElementById("admissionPopup");
  const backdrop = document.getElementById("popupBackdrop");
  const card = document.getElementById("popupCard");
  const closeBtns = [
    document.getElementById("closePopupBtn"),
    document.getElementById("closePopupBtnSecondary"),
    backdrop
  ];

  function showPopup() {
    
    popup.classList.remove("hidden");
    popup.classList.add("flex");

    // Force a reflow for transition
    void popup.offsetWidth;

    backdrop.classList.remove("opacity-0");
    backdrop.classList.add("opacity-100");
    card.classList.remove("scale-90", "opacity-0");
    card.classList.add("scale-100", "opacity-100");

    document.body.classList.add("no-scroll");
  }

  function hidePopup() {
    backdrop.classList.remove("opacity-100");
    backdrop.classList.add("opacity-0");
    card.classList.remove("scale-100", "opacity-100");
    card.classList.add("scale-90", "opacity-0");

    document.body.classList.remove("no-scroll");
    
    // Remember that the user closed the popup in this session
    setTimeout(() => {
      popup.classList.remove("flex");
      popup.classList.add("hidden");
    }, 300);
  }

  if (popup) {
    closeBtns.forEach(btn => {
      if (btn) btn.addEventListener("click", hidePopup);
    });

    if (isHomePage) {
      const whyChooseUsSection = document.getElementById('why-choose-us');
      if (whyChooseUsSection) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              showPopup();
            }
          });
        }, { threshold: 0.2 });
        observer.observe(whyChooseUsSection);
      }
    }
  }

  // 8. Inject Top-Middle Form Notification (Counsellor Callback)
  if (!document.getElementById("counsellorNotification")) {
    const notifHTML = `
      <div id="counsellorNotification" class="fixed top-[-150%] left-1/2 transform -translate-x-1/2 z-[2000] w-[90%] max-w-sm bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-gray-100 transition-all duration-700 ease-out p-5">
        <div class="flex justify-between items-start mb-3">
          <div>
            <h4 class="font-bold text-gray-800 text-base flex items-center gap-2">
              <i class="fas fa-comment-dots text-[#ff4301]"></i> Quick Enquiry
            </h4>
            <p class="text-xs text-gray-500 mt-1">Our counsellor will connect with you soon</p>
          </div>
          <button id="closeCounsellorNotif" class="text-gray-400 hover:text-gray-600 transition bg-gray-50 hover:bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center">
            <i class="fas fa-times text-xs"></i>
          </button>
        </div>
        
        <form id="counsellorForm" class="space-y-3">
          <div>
            <input type="text" placeholder="Name" class="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5d58ef]" required>
          </div>
          <div>
            <input type="tel" placeholder="Mobile Number" class="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5d58ef]" required>
          </div>
          <div>
            <select class="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5d58ef] text-gray-600 bg-white" required>
              <option value="" disabled selected>Select Course</option>
              <option value="ame_b1_1">AME - B1.1 (Aeroplanes Turbine)</option>
              <option value="ame_b2">AME - B2 (Avionics)</option>
              <option value="hangglider">Power Hang Glider</option>
            </select>
          </div>
          <button type="submit" class="w-full bg-[#ff4301] hover:bg-[#5d58ef] text-white font-bold py-2 rounded-lg text-xs transition shadow-md">
            Request Callback
          </button>
        </form>
      </div>
    `;
    const notifContainer = document.createElement("div");
    notifContainer.innerHTML = notifHTML;
    document.body.appendChild(notifContainer.firstElementChild);
  }

  const counsellorNotif = document.getElementById("counsellorNotification");
  const closeNotifBtn = document.getElementById("closeCounsellorNotif");
  const counsellorForm = document.getElementById("counsellorForm");

  function showCounsellorNotif() {
    counsellorNotif.classList.remove("top-[-150%]");
    counsellorNotif.classList.add("top-4", "md:top-6");
  }

  function hideCounsellorNotif() {
    counsellorNotif.classList.remove("top-4", "md:top-6");
    counsellorNotif.classList.add("top-[-150%]");
  }

  if (counsellorNotif) {
    closeNotifBtn.addEventListener("click", hideCounsellorNotif);
    
    counsellorForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Simulate form submission
      const btn = counsellorForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Request Sent!';
        btn.classList.remove('bg-[#ff4301]', 'hover:bg-[#5d58ef]');
        btn.classList.add('bg-green-500', 'hover:bg-green-600');
        
        setTimeout(() => {
          hideCounsellorNotif();
        }, 1500);
      }, 1000);
    });

    // Trigger the enquiry notification after 150 seconds on all pages
    setTimeout(showCounsellorNotif, 150000);
  }

  // Set global components Loaded state flag and dispatch event
  window.componentsLoaded = true;
  window.dispatchEvent(new CustomEvent("componentsLoaded"));
});
