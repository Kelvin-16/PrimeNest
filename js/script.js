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
  const propertyData = {
    "azure-ridge-villa": {
      title: "Azure Ridge Villa",
      status: "For sale · Beverly Hills",
      address: "1450 Sunset Ridge, Beverly Hills, CA",
      price: "$1,850,000",
      beds: "4",
      baths: "4.5",
      parking: "3",
      area: "3,850",
      description:
        "Set above the city in one of Beverly Hills' most private enclaves, Azure Ridge Villa brings clean architectural lines together with warm, tactile materials. Expansive glazing frames garden views while connecting every living space to the outdoors.",
      features: [
        "Chef's kitchen",
        "Heated pool & spa",
        "Smart home system",
        "Wine cellar",
        "Home office",
        "Landscaped gardens",
      ],
      specs: {
        type: "Contemporary Villa",
        year: "2023",
        lot: "0.42 acres",
        nearby: "Top schools, Cedars-Sinai, Rodeo Drive",
      },
      map: "https://www.google.com/maps?q=Beverly+Hills,+CA&output=embed",
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1500&q=90",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=500&q=80",
      ],
    },
    "lumen-residence": {
      title: "The Lumen Residence",
      status: "For sale · Manhattan",
      address: "212 East 57th Street, Manhattan, NY",
      price: "$985,000",
      beds: "2",
      baths: "2",
      parking: "1",
      area: "1,420",
      description:
        "A refined sanctuary above the city with streamlined living spaces, spacious glazing, and calming views of Manhattan's skyline.",
      features: [
        "Open-plan kitchen",
        "Skyline views",
        "Concierge service",
        "Fitness amenities",
        "Private terrace",
      ],
      specs: {
        type: "Luxury Apartment",
        year: "2021",
        lot: "N/A",
        nearby: "Central Park, Fifth Avenue, Grand Central Terminal",
      },
      map: "https://www.google.com/maps?q=Manhattan,+New+York,+NY&output=embed",
      images: [
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1500&q=90",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1601961968339-d27f4f6a0a80?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=500&q=80",
      ],
    },
    "solara-estate": {
      title: "Solara Estate",
      status: "For sale · Miami Beach",
      address: "28 Oceanfront Drive, Miami Beach, FL",
      price: "$2,400,000",
      beds: "5",
      baths: "5",
      parking: "4",
      area: "4,200",
      description:
        "Coastal luxury with generous entertaining spaces, expansive glazing, and a seamless connection between indoor living and waterfront views.",
      features: [
        "Infinity pool",
        "Oceanfront terrace",
        "Home cinema",
        "Guest suite",
        "Roof deck",
      ],
      specs: {
        type: "Modern Villa",
        year: "2022",
        lot: "0.55 acres",
        nearby: "South Beach, Lincoln Road, Miami Design District",
      },
      map: "https://www.google.com/maps?q=Miami+Beach,+FL&output=embed",
      images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1500&q=90",
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1549187774-b4e9b0445b87?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=500&q=80",
      ],
    },
    "cedar-house": {
      title: "Cedar House",
      status: "For sale · Austin",
      address: "810 Barton Springs Road, Austin, TX",
      price: "$1,120,000",
      beds: "4",
      baths: "3",
      parking: "2",
      area: "2,960",
      description:
        "Warm modern architecture set within a coveted Austin enclave, featuring wood accents, generous living spaces, and tranquil private gardens.",
      features: [
        "Private courtyard",
        "Open kitchen",
        "Media room",
        "Roof terrace",
      ],
      specs: {
        type: "Modern House",
        year: "2020",
        lot: "0.30 acres",
        nearby: "Downtown Austin, Lady Bird Lake, Zilker Park",
      },
      map: "https://www.google.com/maps?q=Austin,+TX&output=embed",
      images: [
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1500&q=90",
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=500&q=80",
      ],
    },
    "pearl-house": {
      title: "Pearl House",
      status: "Lease / sale · Boston",
      address: "230 Harbor Avenue, Boston, MA",
      price: "$3,200,000",
      beds: "8",
      baths: "4",
      parking: "4",
      area: "8,600",
      description:
        "A landmark workspace and residential property designed for high performance, with dramatic city views and sophisticated finishes.",
      features: [
        "Private elevator",
        "Large conference spaces",
        "Designer finishes",
        "Rooftop deck",
      ],
      specs: {
        type: "Commercial Residence",
        year: "2024",
        lot: "0.75 acres",
        nearby: "Seaport District, Downtown Boston, Logan Airport",
      },
      map: "https://www.google.com/maps?q=Boston,+MA&output=embed",
      images: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1500&q=90",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80",
      ],
    },
    "willow-acres": {
      title: "Willow Acres",
      status: "For sale · Napa Valley",
      address: "765 Vineyard Lane, Napa Valley, CA",
      price: "$650,000",
      beds: "12 Acres",
      baths: "Views",
      parking: "Utilities",
      area: "12",
      description:
        "A rare canvas for an exceptional country retreat, offering rolling views, expansive grounds, and quiet privacy in Napa Valley.",
      features: [
        "Vineyard views",
        "Private access road",
        "Utilities available",
        "Development potential",
      ],
      specs: {
        type: "Land Property",
        year: "N/A",
        lot: "12 acres",
        nearby: "Napa Valley vineyards, gourmet dining, wine country events",
      },
      map: "https://www.google.com/maps?q=Napa+Valley,+CA&output=embed",
      images: [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1500&q=90",
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1467295376007-33d8a1f6a9bd?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1472220625704-91e1462799b2?auto=format&fit=crop&w=500&q=80",
      ],
    },
  };
  const loadPropertyDetails = () => {
    const params = new URLSearchParams(location.search);
    const propertyKey = params.get("property");
    const data = propertyKey ? propertyData[propertyKey] : null;
    if (!data) return;
    $("#detailCrumb").textContent = data.title;
    $("#detailStatus").textContent = data.status;
    $("#detailName").textContent = data.title;
    $("#detailAddress").innerHTML =
      '<i class="fa-solid fa-location-dot"></i> ' + data.address;
    $("#detailPrice").textContent = data.price;
    $("#detailBeds").textContent = data.beds;
    $("#detailBaths").textContent = data.baths;
    $("#detailParking").textContent = data.parking;
    $("#detailArea").textContent = data.area;
    $("#detailDescription").textContent = data.description;
    $("#specType").textContent = data.specs.type;
    $("#specYear").textContent = data.specs.year;
    $("#specLot").textContent = data.specs.lot;
    $("#specNearby").textContent = data.specs.nearby;
    $("#detailMap").src = data.map;
    const mainImage = $("#mainImage");
    if (mainImage) mainImage.src = data.images[0];
    const thumbButtons = $$(".thumbs button");
    thumbButtons.forEach((button, idx) => {
      const img = button.querySelector("img");
      if (img) img.src = data.images[idx + 1] || data.images[0];
      button.classList.toggle("active", idx === 0);
    });
    const featuresContainer = $("#detailFeatures");
    if (featuresContainer) {
      featuresContainer.innerHTML = data.features
        .map(
          (feature) =>
            `<span><i class="fa-solid fa-check"></i> ${feature}</span>`,
        )
        .join("");
    }
  };
  loadPropertyDetails();
  const popup = $("#successPopup");
  const openPopup = () => {
    popup?.classList.add("show");
    popup?.setAttribute("aria-hidden", "false");
  };
  const closePopup = () => {
    popup?.classList.remove("show");
    popup?.setAttribute("aria-hidden", "true");
  };
  popup?.querySelector(".popup-close")?.addEventListener("click", closePopup);
  popup?.querySelector(".popup-ok")?.addEventListener("click", closePopup);
  popup?.addEventListener("click", (e) => {
    if (e.target === popup) closePopup();
  });
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePopup();
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
    openPopup();
    f.reset();
  });
});
