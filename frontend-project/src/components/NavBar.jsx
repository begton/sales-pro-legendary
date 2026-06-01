import { NavLink } from 'react-router-dom';

const links = [
  { path: '/customers', label: 'Customers' },
  { path: '/products', label: 'Products' },
  { path: '/sales', label: 'Sales' },
  { path: '/reports', label: 'Reports' },
];

function NavBar({ onLogout }) {
  return (
    <header className="bg-slate-800 text-white shadow-sm">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-4">
        <div className="text-xl font-semibold">SalesPro SRMS</div>
        <nav className="flex flex-wrap gap-3">
          {links.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-200 hover:bg-slate-700 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={onLogout}
            className="rounded-md bg-rose-500 px-3 py-2 text-sm font-medium text-white hover:bg-rose-600"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
