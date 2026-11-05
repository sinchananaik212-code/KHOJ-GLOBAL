"use client";

import { useEffect, useMemo, useState } from "react";

const brands = [
  {
    id: 1,
    name: "Aara Studio",
    category: "Fashion",
    state: "Rajasthan",
    city: "Jaipur",
    tagline: "Tradition, reimagined for today.",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900",
    products: ["Handcrafted apparel", "Contemporary ethnic wear"],
    moq: 100,
    capacity: 1800,
    leadTime: 21,
    readiness: "Developing",
    customisation: true,
    samples: true,
  },
  {
    id: 2,
    name: "Nira Botanics",
    category: "Beauty",
    state: "Karnataka",
    city: "Bengaluru",
    tagline: "Rooted in nature. Made with care.",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=900",
    products: ["Botanical skincare", "Natural personal care"],
    moq: 250,
    capacity: 3000,
    leadTime: 18,
    readiness: "In progress",
    customisation: true,
    samples: true,
  },
  {
    id: 3,
    name: "Mitti Form",
    category: "Home & Living",
    state: "Tamil Nadu",
    city: "Chennai",
    tagline: "Handmade objects with a story.",
    image:
      "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=900",
    products: ["Ceramic decor", "Handmade homeware"],
    moq: 50,
    capacity: 900,
    leadTime: 14,
    readiness: "Developing",
    customisation: true,
    samples: true,
  },
  {
    id: 4,
    name: "Tantu Collective",
    category: "Craft",
    state: "Gujarat",
    city: "Kutch",
    tagline: "Woven by heritage.",
    image:
      "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=900",
    products: ["Handwoven textiles", "Traditional fabrics"],
    moq: 500,
    capacity: 2500,
    leadTime: 30,
    readiness: "In progress",
    customisation: true,
    samples: false,
  },
  {
    id: 5,
    name: "Aarvi Jewels",
    category: "Jewellery",
    state: "Rajasthan",
    city: "Jaipur",
    tagline: "Jewellery inspired by heritage.",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900",
    products: ["Handcrafted jewellery", "Traditional accessories"],
    moq: 100,
    capacity: 1200,
    leadTime: 20,
    readiness: "Developing",
    customisation: false,
    samples: true,
  },
  {
    id: 6,
    name: "Sole Stories",
    category: "Footwear",
    state: "Karnataka",
    city: "Mysuru",
    tagline: "Walk with your own story.",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=900",
    products: ["Handcrafted footwear", "Contemporary sandals"],
    moq: 200,
    capacity: 1600,
    leadTime: 25,
    readiness: "In progress",
    customisation: true,
    samples: true,
  },
  {
    id: 7,
    name: "The Loom Edit",
    category: "Accessories",
    state: "Uttarakhand",
    city: "Dehradun",
    tagline: "Little details. Lasting impressions.",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900",
    products: ["Handcrafted bags", "Textile accessories"],
    moq: 150,
    capacity: 2200,
    leadTime: 16,
    readiness: "Developing",
    customisation: true,
    samples: true,
  },
];

const categories = [
  "All Categories",
  "Fashion",
  "Beauty",
  "Home & Living",
  "Craft",
  "Jewellery",
  "Footwear",
  "Accessories",
];

const states = [
  "All States",
  "Karnataka",
  "Rajasthan",
  "Tamil Nadu",
  "Gujarat",
  "Uttarakhand",
];

const readinessTasks = [
  "Business registration details are available",
  "Product specifications are documented",
  "Product pricing and cost details are prepared",
  "Minimum order quantity is defined",
  "Production capacity is estimated",
  "Packaging requirements are understood",
  "Target export markets are identified",
  "Relevant product regulations have been researched",
  "Shipping and logistics options have been explored",
  "Product samples are prepared for buyers",
];
export default function Home() {
  const [activePage, setActivePage] = useState("Home");
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [saved, setSaved] = useState([]);
  const [compareIds, setCompareIds] = useState([]);
  const [showChecker, setShowChecker] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [maxMoq, setMaxMoq] = useState("Any");
  const [readiness, setReadiness] = useState("Any");
  const [customOnly, setCustomOnly] = useState(false);

  const filteredBrands = useMemo(() => {
    return brands.filter((brand) => {
      const matchesSearch =
        brand.name.toLowerCase().includes(search.toLowerCase()) ||
        brand.tagline.toLowerCase().includes(search.toLowerCase()) ||
        brand.products.join(" ").toLowerCase().includes(search.toLowerCase());

      const matchesState =
        selectedState === "All States" || brand.state === selectedState;

      const matchesCategory =
        selectedCategory === "All Categories" ||
        brand.category === selectedCategory;

      const matchesSaved =
        activePage !== "Saved Brands" || saved.includes(brand.id);

      return matchesSearch && matchesState && matchesCategory && matchesSaved;
    });
  }, [search, selectedState, selectedCategory, activePage, saved]);

  const filteredSuppliers = useMemo(() => {
    return brands.filter((brand) => {
      const text =
        `${brand.name} ${brand.city} ${brand.state} ${brand.category} ${brand.tagline} ${brand.products.join(" ")}`.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "All Categories" ||
        brand.category === selectedCategory;
      const matchesState =
        selectedState === "All States" || brand.state === selectedState;
      const matchesMoq =
        maxMoq === "Any" || brand.moq <= Number(maxMoq);
      const matchesReadiness =
        readiness === "Any" || brand.readiness === readiness;
      const matchesCustom = !customOnly || brand.customisation;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesState &&
        matchesMoq &&
        matchesReadiness &&
        matchesCustom
      );
    });
  }, [
    search,
    selectedCategory,
    selectedState,
    maxMoq,
    readiness,
    customOnly,
  ]);

  const navigate = (page) => {
    setActivePage(page);
    setSelectedBrand(null);
    setSearch("");
    setSelectedState("All States");
    setSelectedCategory("All Categories");
    setMaxMoq("Any");
    setReadiness("Any");
    setCustomOnly(false);
    setCompareIds([]);
    setShowChecker(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSaved = (id) => {
    setSaved((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const toggleCompare = (id) => {
    setCompareIds((previous) => {
      if (previous.includes(id)) {
        return previous.filter((item) => item !== id);
      }

      if (previous.length >= 3) {
        alert("You can compare up to 3 suppliers at a time.");
        return previous;
      }

      return [...previous, id];
    });
  };

  const resetSupplierFilters = () => {
    setSearch("");
    setSelectedCategory("All Categories");
    setSelectedState("All States");
    setMaxMoq("Any");
    setReadiness("Any");
    setCustomOnly(false);
  };

  const toggleTask = (index) => {
    setCompletedTasks((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index]
    );
  };

  const readinessScore = Math.round(
    (completedTasks.length / readinessTasks.length) * 100
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const brandId = Number(params.get("brand"));

    if (brandId) {
      const brand = brands.find((item) => item.id === brandId);

      if (brand) {
        setSelectedBrand(brand);
      }
    }
  }, []);

  return (
    <main>
      <nav className="navbar">
        <button className="logo" onClick={() => navigate("Home")}>
          KHOJ<span>.</span>
          <small>GLOBAL</small>
        </button>

        <div className="nav-links">
          {[
            "Home",
            "Discover",
            "Supplier Match",
            "Brand Stories",
            "Saved Brands",
          ].map((page) => (
            <button
              key={page}
              className={activePage === page ? "nav-active" : ""}
              onClick={() => navigate(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </nav>

      {activePage === "Home" && (
        <HomePage navigate={navigate} brands={brands} />
      )}

      {activePage === "Discover" && (
        <DiscoverPage
          brands={filteredBrands}
          search={search}
          setSearch={setSearch}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          saved={saved}
          toggleSaved={toggleSaved}
          setSelectedBrand={setSelectedBrand}
        />
      )}

      {activePage === "Saved Brands" && (
        <DiscoverPage
          brands={filteredBrands}
          search={search}
          setSearch={setSearch}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          saved={saved}
          toggleSaved={toggleSaved}
          setSelectedBrand={setSelectedBrand}
          savedPage
        />
      )}

      {activePage === "Brand Stories" && (
        <BrandStoriesPage
          brands={brands}
          setSelectedBrand={setSelectedBrand}
        />
      )}

      {activePage === "Supplier Match" && (
        <SupplierPage
          suppliers={filteredSuppliers}
          search={search}
          setSearch={setSearch}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          maxMoq={maxMoq}
          setMaxMoq={setMaxMoq}
          readiness={readiness}
          setReadiness={setReadiness}
          customOnly={customOnly}
          setCustomOnly={setCustomOnly}
          resetFilters={resetSupplierFilters}
          compareIds={compareIds}
          toggleCompare={toggleCompare}
          showChecker={showChecker}
          setShowChecker={setShowChecker}
          completedTasks={completedTasks}
          toggleTask={toggleTask}
          readinessScore={readinessScore}
          setSelectedBrand={setSelectedBrand}
        />
      )}

      {selectedBrand && (
        <BrandModal
          brand={selectedBrand}
          saved={saved.includes(selectedBrand.id)}
          toggleSaved={() => toggleSaved(selectedBrand.id)}
          onClose={() => setSelectedBrand(null)}
        />
      )}

      <footer className="footer">
        <div>
          <h2>KHOJ.GLOBAL</h2>
          <p>Discover India. Connect with the world.</p>
        </div>
        <p>MADE WITH ♥ IN INDIA</p>
        <small>© 2026 KHOJ GLOBAL · DEMO PROJECT</small>
      </footer>
    </main>
  );
}
function HomePage({ navigate, brands }) {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">INDIA, DISCOVERED DIFFERENTLY</p>
          <h1>
            Discover the
            <br />
            <em>extraordinary</em> in India.
          </h1>
          <p className="hero-description">
            A gateway to India's independent brands, remarkable
            craftsmanship and stories waiting to be discovered around the
            world.
          </p>

          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={() => navigate("Discover")}
            >
              Explore Indian Brands ↗
            </button>

            <button
              className="btn-secondary"
              onClick={() => navigate("Supplier Match")}
            >
              Find a Manufacturing Partner
            </button>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200"
            alt="Indian handcrafted interior"
          />
          <div className="hero-image-label">
            <span>THE ART OF INDIA</span>
            <p>Stories behind every creation.</p>
          </div>
        </div>
      </section>

      <section className="intro-strip">
        <div>
          <span>01</span>
          <p>Independent Indian brands</p>
        </div>
        <div>
          <span>02</span>
          <p>Regional craftsmanship</p>
        </div>
        <div>
          <span>03</span>
          <p>Global opportunities</p>
        </div>
      </section>

      <section className="section home-featured">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A WORLD OF DISCOVERY</p>
            <h2>Made in India. <em>Made to be known.</em></h2>
          </div>

          <button
            className="text-link"
            onClick={() => navigate("Discover")}
          >
            View all brands ↗
          </button>
        </div>

        <div className="brand-grid">
          {brands.slice(0, 3).map((brand) => (
            <BrandCard
              key={brand.id}
              brand={brand}
              onOpen={() => navigate("Discover")}
            />
          ))}
        </div>
      </section>

      <section className="supplier-banner">
        <div>
          <p className="eyebrow">BEYOND DISCOVERY</p>
          <h2>Looking for the right manufacturing partner?</h2>
          <p>
            Explore supplier profiles, compare production capabilities and
            identify partners that may fit your business requirements.
          </p>
          <button
            className="btn-light"
            onClick={() => navigate("Supplier Match")}
          >
            Explore Supplier Match ↗
          </button>
        </div>
        <div className="banner-decoration">K</div>
      </section>
    </>
  );
}

function DiscoverPage({
  brands,
  search,
  setSearch,
  selectedState,
  setSelectedState,
  selectedCategory,
  setSelectedCategory,
  saved,
  toggleSaved,
  setSelectedBrand,
  savedPage = false,
}) {
  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="eyebrow">
          {savedPage ? "YOUR COLLECTION" : "THE DISCOVERY DIRECTORY"}
        </p>

        <h1>
          {savedPage ? (
            <>Your <em>saved brands.</em></>
          ) : (
            <>Discover <em>Indian brands.</em></>
          )}
        </h1>

        <p>
          {savedPage
            ? "Keep the brands that caught your attention close."
            : "Explore independent labels, regional makers and products shaped by Indian creativity."}
        </p>
      </div>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search brands, products or keywords..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={selectedState}
          onChange={(event) => setSelectedState(event.target.value)}
        >
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div className="results-line">
        <p>
          {brands.length} {brands.length === 1 ? "brand" : "brands"} found
        </p>
      </div>

      {brands.length > 0 ? (
        <div className="brand-grid">
          {brands.map((brand) => (
            <BrandCard
              key={brand.id}
              brand={brand}
              saved={saved.includes(brand.id)}
              toggleSaved={() => toggleSaved(brand.id)}
              onOpen={() => setSelectedBrand(brand)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No brands found</h2>
          <p>
            Try changing your search or selecting a different category or
            state.
          </p>
        </div>
      )}
    </section>
  );
}

function BrandCard({
  brand,
  saved = false,
  toggleSaved,
  onOpen,
}) {
  return (
    <article className="brand-card">
      <div className="brand-image-wrap">
        <img src={brand.image} alt={brand.name} />

        {toggleSaved && (
          <button
            className={`save-button ${saved ? "is-saved" : ""}`}
            onClick={toggleSaved}
            aria-label={saved ? "Remove saved brand" : "Save brand"}
          >
            {saved ? "♥" : "♡"}
          </button>
        )}

        <span className="brand-category">{brand.category}</span>
      </div>

      <div className="brand-card-content">
        <p className="brand-location">
          {brand.city}, {brand.state}
        </p>

        <h3>{brand.name}</h3>

        <p className="brand-tagline">{brand.tagline}</p>

        <button className="text-link" onClick={onOpen}>
          Explore brand ↗
        </button>
      </div>
    </article>
  );
}

function BrandStoriesPage({ brands, setSelectedBrand }) {
  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="eyebrow">PEOPLE · PLACES · PURPOSE</p>
        <h1>
          Every brand has a <em>story.</em>
        </h1>
        <p>
          Discover the ideas, places and craftsmanship behind independent
          Indian brands.
        </p>
      </div>

      <div className="story-feature">
        <img
          src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1200"
          alt="Artisan working on a handmade creation"
        />

        <div className="story-feature-content">
          <p className="eyebrow">BEHIND THE CRAFT</p>
          <h2>More than a product. A piece of someone's story.</h2>
          <p>
            From thoughtful design to traditional techniques, India's
            independent makers bring together creativity, culture and
            craftsmanship.
          </p>
          <button
            className="btn-primary"
            onClick={() => setSelectedBrand(brands[0])}
          >
            Discover a brand ↗
          </button>
        </div>
      </div>

      <div className="section-heading story-list-heading">
        <div>
          <p className="eyebrow">MEET THE MAKERS</p>
          <h2>Stories worth <em>sharing.</em></h2>
        </div>
      </div>

      <div className="brand-grid">
        {brands.map((brand) => (
          <BrandCard
            key={brand.id}
            brand={brand}
            onOpen={() => setSelectedBrand(brand)}
          />
        ))}
      </div>
    </section>
  );
}
function SupplierPage({
  suppliers,
  search,
  setSearch,
  selectedState,
  setSelectedState,
  selectedCategory,
  setSelectedCategory,
  maxMoq,
  setMaxMoq,
  readiness,
  setReadiness,
  customOnly,
  setCustomOnly,
  resetFilters,
  compareIds,
  toggleCompare,
  showChecker,
  setShowChecker,
  completedTasks,
  toggleTask,
  readinessScore,
  setSelectedBrand,
}) {
  const comparedSuppliers = suppliers.filter((item) =>
    compareIds.includes(item.id)
  );

  return (
    <section className="page-section supplier-page">
      <div className="page-heading">
        <p className="eyebrow">BUILD YOUR SUPPLY NETWORK</p>
        <h1>
          Find the right <em>manufacturing partner.</em>
        </h1>
        <p>
          Explore supplier profiles and compare production capabilities
          before starting a business conversation.
        </p>
      </div>

      <div className="supplier-intro">
        <div>
          <span className="supplier-intro-number">01</span>
          <h3>Discover suppliers</h3>
          <p>Explore profiles by category, location and production needs.</p>
        </div>

        <div>
          <span className="supplier-intro-number">02</span>
          <h3>Compare capabilities</h3>
          <p>Shortlist up to three suppliers side by side.</p>
        </div>

        <div>
          <span className="supplier-intro-number">03</span>
          <h3>Prepare for export</h3>
          <p>Use the readiness checklist to identify your next steps.</p>
        </div>
      </div>

      <div className="supplier-tools">
        <div>
          <p className="eyebrow">SUPPLIER DIRECTORY</p>
          <h2>Find your manufacturing fit.</h2>
        </div>

        <button
          className="btn-secondary"
          onClick={() => setShowChecker(!showChecker)}
        >
          {showChecker ? "Close checklist" : "Export readiness checklist ↗"}
        </button>
      </div>

      {showChecker && (
        <div className="readiness-panel">
          <div className="readiness-header">
            <div>
              <p className="eyebrow">YOUR EXPORT PREPARATION</p>
              <h3>Export readiness checklist</h3>
              <p>
                Mark the tasks you have completed. This is a self-assessment,
                not an official certification.
              </p>
            </div>

            <div className="readiness-score">
              <strong>{readinessScore}%</strong>
              <span>Completed</span>
            </div>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${readinessScore}%` }}
            />
          </div>

          <div className="checklist">
            {readinessTasks.map((task, index) => (
              <label key={index} className="checklist-item">
                <input
                  type="checkbox"
                  checked={completedTasks.includes(index)}
                  onChange={() => toggleTask(index)}
                />
                <span>{task}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="supplier-filters">
        <div className="filter-main">
          <input
            type="text"
            placeholder="Search suppliers, products or locations..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={selectedState}
            onChange={(event) => setSelectedState(event.target.value)}
          >
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-secondary">
          <label>
            Maximum MOQ
            <select
              value={maxMoq}
              onChange={(event) => setMaxMoq(event.target.value)}
            >
              <option value="Any">Any quantity</option>
              <option value="100">100 units</option>
              <option value="200">200 units</option>
              <option value="300">300 units</option>
              <option value="500">500 units</option>
            </select>
          </label>

          <label>
            Readiness
            <select
              value={readiness}
              onChange={(event) => setReadiness(event.target.value)}
            >
              <option value="Any">Any status</option>
              <option value="Developing">Developing</option>
              <option value="In progress">In progress</option>
            </select>
          </label>

          <label className="custom-filter">
            <input
              type="checkbox"
              checked={customOnly}
              onChange={(event) => setCustomOnly(event.target.checked)}
            />
            Customisation available
          </label>

          <button className="reset-button" onClick={resetFilters}>
            Reset filters ↺
          </button>
        </div>
      </div>

      <div className="supplier-results">
        <p>
          <strong>{suppliers.length}</strong> supplier profiles found
        </p>
        <span>Select up to 3 suppliers to compare</span>
      </div>

      {suppliers.length > 0 ? (
        <div className="supplier-grid">
          {suppliers.map((supplier) => (
            <SupplierCard
              key={supplier.id}
              supplier={supplier}
              isCompared={compareIds.includes(supplier.id)}
              onCompare={() => toggleCompare(supplier.id)}
              onOpen={() => setSelectedBrand(supplier)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No matching suppliers</h2>
          <p>Try adjusting your filters to see more results.</p>
          <button className="btn-primary" onClick={resetFilters}>
            Reset filters
          </button>
        </div>
      )}

      {compareIds.length > 0 && (
        <div className="comparison-panel">
          <div className="comparison-heading">
            <div>
              <p className="eyebrow">YOUR SHORTLIST</p>
              <h3>Supplier comparison</h3>
            </div>
            <button
              className="reset-button"
              onClick={() => compareIds.forEach((id) => toggleCompare(id))}
            >
              Clear selection
            </button>
          </div>

          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Supplier</th>
                  {comparedSuppliers.map((supplier) => (
                    <th key={supplier.id}>{supplier.name}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Location</td>
                  {comparedSuppliers.map((supplier) => (
                    <td key={supplier.id}>
                      {supplier.city}, {supplier.state}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td>Category</td>
                  {comparedSuppliers.map((supplier) => (
                    <td key={supplier.id}>{supplier.category}</td>
                  ))}
                </tr>

                <tr>
                  <td>Minimum order quantity</td>
                  {comparedSuppliers.map((supplier) => (
                    <td key={supplier.id}>{supplier.moq} units</td>
                  ))}
                </tr>

                <tr>
                  <td>Monthly capacity</td>
                  {comparedSuppliers.map((supplier) => (
                    <td key={supplier.id}>
                      {supplier.capacity.toLocaleString("en-IN")} units
                    </td>
                  ))}
                </tr>

                <tr>
                  <td>Lead time</td>
                  {comparedSuppliers.map((supplier) => (
                    <td key={supplier.id}>{supplier.leadTime} days</td>
                  ))}
                </tr>

                <tr>
                  <td>Customisation</td>
                  {comparedSuppliers.map((supplier) => (
                    <td key={supplier.id}>
                      {supplier.customisation ? "Available" : "Not listed"}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td>Samples</td>
                  {comparedSuppliers.map((supplier) => (
                    <td key={supplier.id}>
                      {supplier.samples ? "Available" : "Not listed"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="demo-disclaimer">
        <strong>Demo data:</strong> Supplier profiles and production
        information shown here are illustrative sample records created for
        demonstration. They are not verified supplier listings. Always
        independently verify business details, capacity, certifications and
        commercial terms before entering into an agreement.
      </p>
    </section>
  );
}

function SupplierCard({
  supplier,
  isCompared,
  onCompare,
  onOpen,
}) {
  return (
    <article className="supplier-card">
      <div className="supplier-card-image">
        <img
          src={supplier.image}
          alt={`${supplier.name} product category`}
        />
        <span className="supplier-category">{supplier.category}</span>
      </div>

      <div className="supplier-card-body">
        <div className="supplier-title-area">
          <p className="supplier-location">
            {supplier.city}, {supplier.state}
          </p>
          <h3>{supplier.name}</h3>
          <p className="supplier-tagline">{supplier.tagline}</p>
        </div>

        <div className="supplier-metrics">
          <div>
            <span>MINIMUM ORDER</span>
            <strong>{supplier.moq} units</strong>
          </div>
          <div>
            <span>MONTHLY CAPACITY</span>
            <strong>
              {supplier.capacity.toLocaleString("en-IN")} units
            </strong>
          </div>
          <div>
            <span>LEAD TIME</span>
            <strong>{supplier.leadTime} days</strong>
          </div>
        </div>

        <div className="supplier-tags">
          <span>{supplier.readiness}</span>
          {supplier.customisation && <span>Customisation</span>}
          {supplier.samples && <span>Samples available</span>}
        </div>

        <div className="supplier-card-actions">
          <button
            className="supplier-profile-button"
            onClick={onOpen}
          >
            View profile ↗
          </button>

          <button
            className={`compare-button ${isCompared ? "selected" : ""}`}
            onClick={onCompare}
          >
            {isCompared ? "✓ Added" : "+ Compare"}
          </button>
        </div>
      </div>
    </article>
  );
}

function BrandModal({ brand, saved, toggleSaved, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="brand-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close profile"
        >
          ×
        </button>

        <div className="modal-image">
          <img src={brand.image} alt={brand.name} />
        </div>

        <div className="modal-content">
          <p className="eyebrow">
            {brand.category} · {brand.city}, {brand.state}
          </p>

          <h2>{brand.name}</h2>
          <p className="modal-tagline">{brand.tagline}</p>

          <div className="modal-divider" />

          <h3>What they make</h3>
          <div className="product-list">
            {brand.products.map((product) => (
              <span key={product}>{product}</span>
            ))}
          </div>

          <h3>Production information</h3>

          <div className="modal-details">
            <div>
              <span>Minimum order quantity</span>
              <strong>{brand.moq} units</strong>
            </div>

            <div>
              <span>Monthly production capacity</span>
              <strong>
                {brand.capacity.toLocaleString("en-IN")} units
              </strong>
            </div>

            <div>
              <span>Estimated lead time</span>
              <strong>{brand.leadTime} days</strong>
            </div>

            <div>
              <span>Customisation</span>
              <strong>
                {brand.customisation ? "Available" : "Not listed"}
              </strong>
            </div>

            <div>
              <span>Product samples</span>
              <strong>
                {brand.samples ? "Available" : "Not listed"}
              </strong>
            </div>

            <div>
              <span>Readiness status</span>
              <strong>{brand.readiness}</strong>
            </div>
          </div>

          <button className="btn-primary modal-save" onClick={toggleSaved}>
            {saved ? "♥ Saved to your collection" : "♡ Save this brand"}
          </button>

          <p className="modal-disclaimer">
            Illustrative demo profile. Details have not been independently
            verified.
          </p>
        </div>
      </div>
    </div>
  );
}