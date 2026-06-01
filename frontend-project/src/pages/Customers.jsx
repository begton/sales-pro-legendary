import { useEffect, useState } from 'react';
import { createCustomer, fetchCustomers } from '../api';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ customerNumber: '', firstName: '', lastName: '', telephone: '', address: '' });
  const [message, setMessage] = useState('');

  useEffect(() => { loadCustomers(); }, []);

  const loadCustomers = async () => {
    const data = await fetchCustomers();
    setCustomers(data);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    await createCustomer(form);
    setMessage('Customer saved successfully');
    setForm({ customerNumber: '', firstName: '', lastName: '', telephone: '', address: '' });
    loadCustomers();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800">Customer Registration</h2>
        <form onSubmit={handleSubmit} className="mt-4 grid gap-4 md:grid-cols-2">
          <input value={form.customerNumber} onChange={e => setForm({ ...form, customerNumber: e.target.value })} placeholder="Customer Number" className="rounded-lg border border-slate-300 px-3 py-2" required />
          <input value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} placeholder="First Name" className="rounded-lg border border-slate-300 px-3 py-2" required />
          <input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} placeholder="Last Name" className="rounded-lg border border-slate-300 px-3 py-2" required />
          <input value={form.telephone} onChange={e => setForm({ ...form, telephone: e.target.value })} placeholder="Telephone" className="rounded-lg border border-slate-300 px-3 py-2" />
          <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="Address" className="col-span-full rounded-lg border border-slate-300 px-3 py-2" />
          <button className="col-span-full rounded-lg bg-slate-800 px-4 py-2 text-white hover:bg-slate-900">Save Customer</button>
        </form>
        {message && <p className="mt-3 text-sm text-emerald-600">{message}</p>}
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800">Customer List</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[700px] divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-3 py-2">Number</th>
                <th className="px-3 py-2">First Name</th>
                <th className="px-3 py-2">Last Name</th>
                <th className="px-3 py-2">Telephone</th>
                <th className="px-3 py-2">Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map(customer => (
                <tr key={customer.customerNumber}>
                  <td className="px-3 py-2">{customer.customerNumber}</td>
                  <td className="px-3 py-2">{customer.firstName}</td>
                  <td className="px-3 py-2">{customer.lastName}</td>
                  <td className="px-3 py-2">{customer.telephone}</td>
                  <td className="px-3 py-2">{customer.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Customers;
