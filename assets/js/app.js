/* =========================
   Jazl Site - App JS
   - Mobile menu
   - Active nav
   - WhatsApp forms
   - Auto year in footer
   ========================= */

const PHONE_NUMBER = "0592974414";      // 0590277710
const WHATSAPP_NUMBER = "966592974414";   // 0592974414

function qs(sel, parent=document){ return parent.querySelector(sel); }
function qsa(sel, parent=document){ return [...parent.querySelectorAll(sel)]; }

function setActiveNav(){
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  qsa(".nav a, .mobile-panel a").forEach(a=>{
    const href = (a.getAttribute("href") || "").toLowerCase();
    if(href === path) a.classList.add("active");
    else a.classList.remove("active");
  });
}

function setupMobileMenu(){
  const burger = qs("#burger");
  const panel = qs("#mobilePanel");
  if(!burger || !panel) return;

  burger.addEventListener("click", ()=>{
    panel.classList.toggle("open");
    burger.setAttribute("aria-expanded", panel.classList.contains("open") ? "true" : "false");
  });

  // غلق عند الضغط خارج
  document.addEventListener("click", (e)=>{
    if(!panel.classList.contains("open")) return;
    const inside = panel.contains(e.target) || burger.contains(e.target);
    if(!inside){
      panel.classList.remove("open");
      burger.setAttribute("aria-expanded","false");
    }
  });

  // غلق عند اختيار لينك
  qsa("a", panel).forEach(a=>{
    a.addEventListener("click", ()=>{
      panel.classList.remove("open");
      burger.setAttribute("aria-expanded","false");
    });
  });
}

function bindContactLinks(){
  // روابط الاتصال والواتساب في الهيدر/الفوتر/الأزرار
  qsa("[data-phone]").forEach(a=>{
    a.setAttribute("href", `tel:+${PHONE_NUMBER}`);
  });
  qsa("[data-wa]").forEach(a=>{
    a.setAttribute("href", `https://wa.me/${WHATSAPP_NUMBER}`);
    a.setAttribute("target","_blank");
    a.setAttribute("rel","noopener noreferrer");
  });
}

function setupWhatsAppForms(){
  qsa("form[data-wa-form]").forEach(form=>{
    form.addEventListener("submit", (e)=>{
      e.preventDefault();

      const name = (qs('[name="name"]', form)?.value || "").trim();
      const phone = (qs('[name="phone"]', form)?.value || "").trim();
      const city = (qs('[name="city"]', form)?.value || "").trim();
      const service = (qs('[name="service"]', form)?.value || "").trim();
      const msg = (qs('[name="message"]', form)?.value || "").trim();

      const lines = [
        "طلب تواصل من الموقع",
        name ? `الاسم: ${name}` : "",
        phone ? `رقم الجوال: ${phone}` : "",
        city ? `المدينة: ${city}` : "",
        service ? `الخدمة المطلوبة: ${service}` : "",
        msg ? `تفاصيل: ${msg}` : "",
      ].filter(Boolean);

      const text = encodeURIComponent(lines.join("\n"));
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
      form.reset();
    });
  });
}

function setYear(){
  const y = new Date().getFullYear();
  qsa("[data-year]").forEach(el=> el.textContent = y);
}

// تشغيل
document.addEventListener("DOMContentLoaded", ()=>{
  document.body.classList.add("has-fixed-header");
  setActiveNav();
  setupMobileMenu();
  bindContactLinks();
  setupWhatsAppForms();
  setYear();
});
