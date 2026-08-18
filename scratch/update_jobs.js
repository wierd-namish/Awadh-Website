const fs = require('fs');
const files = [
  '../frontend/Pages/ame-b1-1.html',
  '../frontend/Pages/ame-b1-2.html'
];

const replacementHtml = `
      <!-- Job Opportunities List -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Item 1 -->
        <div class="job-category-btn group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-[#ff4301]/50 transition-all duration-300 cursor-pointer flex justify-between items-center" data-category="Airlines">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-[#005F86]/10 flex items-center justify-center text-[#005F86] group-hover:bg-[#ff4301] group-hover:text-white transition-colors font-bold text-lg">1</div>
            <h4 class="text-sm md:text-base font-bold text-[#005F86] group-hover:text-[#ff4301] transition-colors leading-tight">Airlines</h4>
          </div>
        </div>
        <!-- Item 2 -->
        <div class="job-category-btn group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-[#ff4301]/50 transition-all duration-300 cursor-pointer flex justify-between items-center" data-category="Non Schedule Operators">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-[#005F86]/10 flex items-center justify-center text-[#005F86] group-hover:bg-[#ff4301] group-hover:text-white transition-colors font-bold text-lg">2</div>
            <h4 class="text-sm md:text-base font-bold text-[#005F86] group-hover:text-[#ff4301] transition-colors leading-tight">Non Schedule Operators</h4>
          </div>
        </div>
        <!-- Item 3 -->
        <div class="job-category-btn group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-[#ff4301]/50 transition-all duration-300 cursor-pointer flex justify-between items-center" data-category="Aircraft & Component MRO Domestic">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-[#005F86]/10 flex items-center justify-center text-[#005F86] group-hover:bg-[#ff4301] group-hover:text-white transition-colors font-bold text-lg">3</div>
            <h4 class="text-sm md:text-base font-bold text-[#005F86] group-hover:text-[#ff4301] transition-colors leading-tight">Aircraft & Component MRO (Domestic)</h4>
          </div>
        </div>
        <!-- Item 4 -->
        <div class="job-category-btn group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-[#ff4301]/50 transition-all duration-300 cursor-pointer flex justify-between items-center" data-category="Aircraft & Component MRO Foreign">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-[#005F86]/10 flex items-center justify-center text-[#005F86] group-hover:bg-[#ff4301] group-hover:text-white transition-colors font-bold text-lg">4</div>
            <h4 class="text-sm md:text-base font-bold text-[#005F86] group-hover:text-[#ff4301] transition-colors leading-tight">Aircraft & Component MRO (Foreign)</h4>
          </div>
        </div>
        <!-- Item 5 -->
        <div class="job-category-btn group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-[#ff4301]/50 transition-all duration-300 cursor-pointer flex justify-between items-center" data-category="FTO">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-[#005F86]/10 flex items-center justify-center text-[#005F86] group-hover:bg-[#ff4301] group-hover:text-white transition-colors font-bold text-lg">5</div>
            <h4 class="text-sm md:text-base font-bold text-[#005F86] group-hover:text-[#ff4301] transition-colors leading-tight">FTO (Flying Training Organization)</h4>
          </div>
        </div>
        <!-- Item 6 -->
        <div class="job-category-btn group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-[#ff4301]/50 transition-all duration-300 cursor-pointer flex justify-between items-center" data-category="AME Training Institutes">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-[#005F86]/10 flex items-center justify-center text-[#005F86] group-hover:bg-[#ff4301] group-hover:text-white transition-colors font-bold text-lg">6</div>
            <h4 class="text-sm md:text-base font-bold text-[#005F86] group-hover:text-[#ff4301] transition-colors leading-tight">AME Training Institutes</h4>
          </div>
        </div>
        <!-- Item 7 -->
        <div class="job-category-btn group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-[#ff4301]/50 transition-all duration-300 cursor-pointer flex justify-between items-center" data-category="Aircraft Manufactures">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-[#005F86]/10 flex items-center justify-center text-[#005F86] group-hover:bg-[#ff4301] group-hover:text-white transition-colors font-bold text-lg">7</div>
            <h4 class="text-sm md:text-base font-bold text-[#005F86] group-hover:text-[#ff4301] transition-colors leading-tight">Aircraft Manufactures</h4>
          </div>
        </div>
        <!-- Item 8 -->
        <div class="job-category-btn group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-[#ff4301]/50 transition-all duration-300 cursor-pointer flex justify-between items-center" data-category="Aircraft Components Manufactures">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-[#005F86]/10 flex items-center justify-center text-[#005F86] group-hover:bg-[#ff4301] group-hover:text-white transition-colors font-bold text-lg">8</div>
            <h4 class="text-sm md:text-base font-bold text-[#005F86] group-hover:text-[#ff4301] transition-colors leading-tight">Aircraft Components Manufactures</h4>
          </div>
        </div>
        <!-- Item 9 -->
        <div class="job-category-btn group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-[#ff4301]/50 transition-all duration-300 cursor-pointer flex justify-between items-center" data-category="Technical Writing Organizations">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-[#005F86]/10 flex items-center justify-center text-[#005F86] group-hover:bg-[#ff4301] group-hover:text-white transition-colors font-bold text-lg">9</div>
            <h4 class="text-sm md:text-base font-bold text-[#005F86] group-hover:text-[#ff4301] transition-colors leading-tight">Technical Writing Organizations</h4>
          </div>
        </div>
      </div>

      <!-- Job Modal Structure -->
      <div id="jobModal" class="fixed inset-0 z-[2000] hidden items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm modal-backdrop transition-opacity"></div>
        <div class="bg-white w-full md:w-[75vw] lg:w-[60vw] max-h-[75vh] rounded-2xl shadow-2xl relative z-10 flex flex-col overflow-hidden transform transition-all scale-95 opacity-0" id="jobModalInner">
          <!-- Header -->
          <div class="bg-gradient-to-r from-[#005F86] to-[#00425c] text-white p-5 flex justify-between items-center border-b border-[#005F86]">
            <h3 id="jobModalTitle" class="text-xl font-bold tracking-wide">Category Name</h3>
            <button class="modal-close text-white hover:text-[#ff4301] transition-colors text-3xl leading-none">&times;</button>
          </div>
          <!-- Body -->
          <div class="p-6 md:p-8 overflow-y-auto bg-gray-50 flex-1">
            <div id="jobModalContent" class="text-gray-700 space-y-4">
              <!-- Content will be injected here -->
            </div>
          </div>
        </div>
      </div>
      
      <style>
        /* Small animation classes for the modal */
        .modal-active #jobModalInner {
          transform: scale(1);
          opacity: 1;
        }
      </style>

      <script>
        document.addEventListener('DOMContentLoaded', () => {
          const jobButtons = document.querySelectorAll('.job-category-btn');
          const modal = document.getElementById('jobModal');
          const modalInner = document.getElementById('jobModalInner');
          const modalTitle = document.getElementById('jobModalTitle');
          const modalContent = document.getElementById('jobModalContent');
          const closeBtns = document.querySelectorAll('.modal-close, .modal-backdrop');

          // Placeholder data (user will provide the real data later)
          const jobData = {
            "Airlines": "<div class='p-4 bg-white border border-gray-200 rounded-xl shadow-sm'><p class='text-gray-600 font-medium'>List of Airlines providing job opportunities will be updated here...</p></div>",
            "Non Schedule Operators": "<div class='p-4 bg-white border border-gray-200 rounded-xl shadow-sm'><p class='text-gray-600 font-medium'>List of Non Schedule Operators providing job opportunities will be updated here...</p></div>",
            "Aircraft & Component MRO Domestic": "<div class='p-4 bg-white border border-gray-200 rounded-xl shadow-sm'><p class='text-gray-600 font-medium'>List of Domestic MROs providing job opportunities will be updated here...</p></div>",
            "Aircraft & Component MRO Foreign": "<div class='p-4 bg-white border border-gray-200 rounded-xl shadow-sm'><p class='text-gray-600 font-medium'>List of Foreign MROs providing job opportunities will be updated here...</p></div>",
            "FTO": "<div class='p-4 bg-white border border-gray-200 rounded-xl shadow-sm'><p class='text-gray-600 font-medium'>List of FTOs providing job opportunities will be updated here...</p></div>",
            "AME Training Institutes": "<div class='p-4 bg-white border border-gray-200 rounded-xl shadow-sm'><p class='text-gray-600 font-medium'>List of Training Institutes providing job opportunities will be updated here...</p></div>",
            "Aircraft Manufactures": "<div class='p-4 bg-white border border-gray-200 rounded-xl shadow-sm'><p class='text-gray-600 font-medium'>List of Aircraft Manufacturers providing job opportunities will be updated here...</p></div>",
            "Aircraft Components Manufactures": "<div class='p-4 bg-white border border-gray-200 rounded-xl shadow-sm'><p class='text-gray-600 font-medium'>List of Component Manufacturers providing job opportunities will be updated here...</p></div>",
            "Technical Writing Organizations": "<div class='p-4 bg-white border border-gray-200 rounded-xl shadow-sm'><p class='text-gray-600 font-medium'>List of Technical Writing Organizations providing job opportunities will be updated here...</p></div>"
          };

          function openModal(category) {
            modalTitle.textContent = category;
            modalContent.innerHTML = jobData[category] || "<div class='p-4 bg-white border border-gray-200 rounded-xl shadow-sm'><p class='text-gray-600 font-medium'>Data to be provided...</p></div>";
            
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            
            // Trigger animation next frame
            requestAnimationFrame(() => {
              modal.classList.add('modal-active');
            });
          }

          function closeModal() {
            modal.classList.remove('modal-active');
            setTimeout(() => {
              modal.classList.add('hidden');
              modal.classList.remove('flex');
              document.body.style.overflow = '';
            }, 300); // Wait for transition
          }

          jobButtons.forEach(btn => {
            btn.addEventListener('click', () => {
              openModal(btn.getAttribute('data-category'));
            });
          });

          closeBtns.forEach(btn => {
            btn.addEventListener('click', closeModal);
          });
        });
      </script>`;

files.forEach(file => {
  let html = fs.readFileSync(file, 'utf8');
  
  // Find the commented out table block and replace it
  const regex = /<!--\s*<div class="overflow-x-auto shadow-md rounded-xl border border-gray-200">[\s\S]*?<\/table>\s*<\/div>\s*-->/g;
  
  if (regex.test(html)) {
    html = html.replace(regex, replacementHtml);
    fs.writeFileSync(file, html);
    console.log('Updated ' + file);
  } else {
    console.log('Could not find commented table in ' + file);
  }
});
