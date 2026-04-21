import React, { useMemo, useState } from "react";
import "./App.css";

const initialBrands = [
  { id: 1, name: "Toyota", description: "Japanese automotive manufacturer", code: "TOYOTA", slug: "toyota", founded: 1937, order: 1 },
  { id: 2, name: "Honda", description: "Japanese manufacturer of cars, motorcycles, and power equipment", code: "HONDA", slug: "honda", founded: 1948, order: 2 },
  { id: 3, name: "Nissan", description: "Japanese automobile manufacturer", code: "NISSAN", slug: "nissan", founded: 1933, order: 3 },
  { id: 4, name: "Suzuki", description: "Japanese automotive and motorcycle manufacturer", code: "SUZUKI", slug: "suzuki", founded: 1909, order: 4 },
  { id: 5, name: "Mazda", description: "Japanese automotive manufacturer", code: "MAZDA", slug: "mazda", founded: 1920, order: 5 },
  { id: 6, name: "Subaru", description: "Japanese automotive manufacturer known for AWD", code: "SUBARU", slug: "subaru", founded: 1953, order: 6 },
  { id: 7, name: "Mitsubishi", description: "Japanese automotive manufacturer", code: "MITSUBISHI", slug: "mitsubishi", founded: 1970, order: 7 },
  { id: 8, name: "Lexus", description: "Japanese luxury vehicle division of Toyota", code: "LEXUS", slug: "lexus", founded: 1989, order: 8 },
  { id: 9, name: "Isuzu", description: "Japanese commercial vehicle manufacturer", code: "ISUZU", slug: "isuzu", founded: 1916, order: 9 },
  { id: 10, name: "Daihatsu", description: "Japanese compact manufacturer", code: "DAIHATSU", slug: "daihatsu", founded: 1907, order: 10 }
];

function App() {
  const [brands, setBrands] = useState(initialBrands);
  const [query, setQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 8;

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return brands.filter(b =>
      b.name.toLowerCase().includes(q) ||
      b.code.toLowerCase().includes(q)
    );
  }, [query, brands]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const pageData = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const openDrawer = (brand) => {
    setSelectedBrand(brand);
    setDrawerOpen(true);
  };

  return (
    <div className="app-shell">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>AutoNext</h2>
        <p className="subtitle">Backoffice Platform</p>

        <div className="profile">
          <div className="avatar">👤</div>
          <div>
            <div>Admin User</div>
            <small>admin@autonext.com</small>
          </div>
        </div>

        <div className="nav active">Brands</div>
        <div className="nav">Products</div>
        <div className="nav">Orders</div>
      </aside>

      {/* MAIN */}
      <main className="content">

        {/* TOPBAR */}
        <div className="topbar">
          <input
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="top-icons">
            <span>🔔</span>
            <span>✉️</span>
            <span>👤</span>
          </div>
        </div>

        {/* TABLE */}
        <div className="card">
          <div className="card-header">
            <h3>Brands</h3>
            <button className="new-btn">+ New Brand</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Slug</th>
                <th>Founded</th>
                <th>Order</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {pageData.map(b => (
                <tr key={b.id} onClick={() => openDrawer(b)}>
                  <td>
                    <div className="brand">
                      <div className="logo">{b.name[0]}</div>
                      <div>
                        <b>{b.name}</b>
                        <div className="desc">{b.description}</div>
                      </div>
                    </div>
                  </td>
                  <td>{b.code}</td>
                  <td className="slug">{b.slug}</td>
                  <td>{b.founded}</td>
                  <td>{b.order}</td>
                  <td><span className="status">Active</span></td>
                  <td>2026-04-11</td>
                  <td>
                    <button className="edit">✏️</button>
                    <button className="delete">🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="pagination">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button key={i}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </button>
            ))}

            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>
              Next
            </button>
          </div>
        </div>
      </main>

      {/* DRAWER */}
      {drawerOpen && (
        <>
          <div className="overlay" onClick={() => setDrawerOpen(false)} />
          <div className="drawer">
            <div className="drawer-header">
              <h3>Edit Brand</h3>
              <button onClick={() => setDrawerOpen(false)}>✖</button>
            </div>

            <div className="drawer-body">
              <input value={selectedBrand.name} readOnly />
              <input value={selectedBrand.code} readOnly />
              <input value={selectedBrand.slug} readOnly />
              <textarea value={selectedBrand.description} readOnly />
            </div>

            <div className="drawer-footer">
              <button onClick={() => setDrawerOpen(false)}>Cancel</button>
              <button className="save">Update</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
