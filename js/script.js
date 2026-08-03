document.addEventListener("DOMContentLoaded", () => {
  const $ = (s) => document.querySelector(s),
    $$ = (s) => document.querySelectorAll(s);
  setTimeout(() => $(".loader")?.classList.add("hide"), 350);
  $(".nav-toggle")?.addEventListener("click", () =>
    $("nav").classList.toggle("open"),
  );
  const top = $(".to-top");
  addEventListener("scroll", () =>
    top?.classList.toggle("show", scrollY > 500),
  );
  top?.addEventListener("click", () =>
    scrollTo({ top: 0, behavior: "smooth" }),
  );
  const observer = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          if (e.target.classList.contains("counter")) {
            let n = 0,
              target = +e.target.dataset.target,
              step = Math.ceil(target / 45);
            let id = setInterval(() => {
              n += step;
              e.target.textContent = Math.min(n, target);
              if (n >= target) clearInterval(id);
            }, 24);
          }
          observer.unobserve(e.target);
        }
      }),
    { threshold: 0.25 },
  );
  $$(".reveal,.counter").forEach((e) => observer.observe(e));
  $(".newsletter-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    let input = e.currentTarget.querySelector("input"),
      msg = e.currentTarget.querySelector(".form-message");
    msg.textContent = input.checkValidity()
      ? "Thank you — your subscription is confirmed."
      : "Please enter a valid email address.";
    if (input.checkValidity()) e.currentTarget.reset();
  });
  $("#quickSearch")?.addEventListener("submit", (e) => {
    e.preventDefault();
    location.href = "properties.html";
  });
  const gallery = $("#mainImage");
  $$(".thumbs button").forEach((b) =>
    b.addEventListener("click", () => {
      gallery.src = b.querySelector("img").src;
      $$(".thumbs button").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
    }),
  );
  const filter = () => {
    let q = $("#propertySearch")?.value.toLowerCase() || "",
      t = $("#typeFilter")?.value || "",
      p = +$("#priceFilter")?.value || 0,
      shown = 0;
    $$(".listing").forEach((c) => {
      let ok =
        (!q || c.dataset.name.toLowerCase().includes(q)) &&
        (!t || c.dataset.type === t) &&
        (!p || +c.dataset.price <= p);
      c.style.display = ok ? "block" : "none";
      if (ok) shown++;
    });
    if ($("#resultsCount")) $("#resultsCount").textContent = shown;
    $(".empty-results")?.style.setProperty("display", shown ? "none" : "block");
  };
  ["#propertySearch", "#typeFilter", "#priceFilter"].forEach((s) =>
    $(s)?.addEventListener("input", filter),
  );
  $("#sortProperties")?.addEventListener("change", (e) => {
    let grid = $(".all-properties"),
      cards = [...$$(".listing")],
      v = e.target.value;
    cards
      .sort((a, b) =>
        v === "low"
          ? +a.dataset.price - +b.dataset.price
          : v === "high"
            ? +b.dataset.price - +a.dataset.price
            : 0,
      )
      .forEach((x) => grid.append(x));
  });
  $("#contactForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    let f = e.currentTarget,
      msg = f.querySelector(".form-message");
    if (!f.checkValidity()) {
      msg.textContent = "Please complete all fields with valid information.";
      f.reportValidity();
      return;
    }
    msg.textContent =
      "Thank you — your enquiry has been received. We’ll be in touch shortly.";
    f.reset();
  });
});
