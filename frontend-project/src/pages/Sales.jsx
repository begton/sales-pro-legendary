import { useEffect, useState } from 'react';
import { createSale, deleteSale, fetchCustomers, fetchProducts, fetchSales, updateSale } from '../api';

function Sales() {
  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ invoiceNumber: '', customerNumber: '', productCode: '', salesDate: '', paymentMethod: '', quantity: 1, totalAmountPaid: 0 });
  const [message, setMessage] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const customerData = await fetchCustomers();
      const productData = await fetchProducts();
      const salesData = await fetchSales();

      setCustomers(Array.isArray(customerData) ? customerData : []);
      setProducts(Array.isArray(productData) ? productData : []);
      setSales(Array.isArray(salesData) ? salesData : []);
    } catch (error) {
      console.error('Failed to load sales data', error);
      setCustomers([]);
      setProducts([]);
      setSales([]);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const payload = { ...form, quantity: Number(form.quantity), totalAmountPaid: Number(form.totalAmountPaid) };
    try {
      if (editing) {
        await updateSale(form.invoiceNumber, payload);
        setMessage('Sale updated successfully');
      } else {
        await createSale(payload);
        setMessage('Sale saved successfully');
      }
      setEditing(false);
      setForm({ invoiceNumber: '', customerNumber: '', productCode: '', salesDate: '', paymentMethod: '', quantity: 1, totalAmountPaid: 0 });
      loadData();
    } catch (error) {
      console.error('Failed to save sale', error);
      setMessage('Unable to save sale.');
    }
  };

  const handleEdit = sale => {
    setForm({
      invoiceNumber: sale.invoiceNumber,
      customerNumber: sale.customerNumber || '',
      productCode: sale.productCode || '',
      salesDate: sale.salesDate?.slice(0, 10) || '',
      paymentMethod: sale.paymentMethod || '',
      quantity: sale.quantity,
      totalAmountPaid: sale.totalAmountPaid,
    });
    setEditing(true);
    setMessage('');
  };

  const handleDelete = async invoiceNumber => {
    await deleteSale(invoiceNumber);
    setMessage('Sale deleted successfully');
    loadData();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800">Sales Entry</h2>
        <form onSubmit={handleSubmit} className="mt-4 grid gap-4 md:grid-cols-2">
          <input value={form.invoiceNumber} onChange={e => setForm({ ...form, invoiceNumber: e.target.value })} placeholder="Invoice Number" className="rounded-lg border border-slate-300 px-3 py-2" required />
          <select value={form.customerNumber} onChange={e => setForm({ ...form, customerNumber: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2" required>
            <option value="">Select Customer</option>
            {customers.map(c => <option key={c.customerNumber} value={c.customerNumber}>{c.customerNumber} - {c.firstName} {c.lastName}</option>)}
          </select>
          <select value={form.productCode} onChange={e => setForm({ ...form, productCode: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2" required>
            <option value="">Select Product</option>
            {products.map(p => <option key={p.productCode} value={p.productCode}>{p.productCode} - {p.productName}</option>)}
          </select>
          <input type="date" value={form.salesDate} onChange={e => setForm({ ...form, salesDate: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2" required />
          <input value={form.paymentMethod} onChange={e => setForm({ ...form, paymentMethod: e.target.value })} placeholder="Payment Method" className="rounded-lg border border-slate-300 px-3 py-2" required />
          <input type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} placeholder="Quantity" className="rounded-lg border border-slate-300 px-3 py-2" min="1" required />
          <input type="number" value={form.totalAmountPaid} onChange={e => setForm({ ...form, totalAmountPaid: e.target.value })} placeholder="Total Amount Paid" className="rounded-lg border border-slate-300 px-3 py-2" step="0.01" min="0" required />
          <button className="col-span-full rounded-lg bg-slate-800 px-4 py-2 text-white hover:bg-slate-900">{editing ? 'Update Sale' : 'Save Sale'}</button>
        </form>
        {message && <p className="mt-3 text-sm text-emerald-600">{message}</p>}
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800">Sales Records</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[900px] divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-3 py-2">Invoice</th>
                <th className="px-3 py-2">Customer</th>
                <th className="px-3 py-2">Product</th>
                <th className="px-3 py-2">Sales Date</th>
                <th className="px-3 py-2">Payment</th>
                <th className="px-3 py-2">Qty</th>
                <th className="px-3 py-2">Total Paid</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sales.map(sale => (
                <tr key={sale.invoiceNumber}>
                  <td className="px-3 py-2">{sale.invoiceNumber}</td>
                  <td className="px-3 py-2">{sale.customerFirstName} {sale.customerLastName}</td>
                  <td className="px-3 py-2">{sale.productName}</td>
                  <td className="px-3 py-2">{sale.salesDate?.slice(0, 10)}</td>
                  <td className="px-3 py-2">{sale.paymentMethod}</td>
                  <td className="px-3 py-2">{sale.quantity}</td>
                  <td className="px-3 py-2">{Number(sale.totalAmountPaid ?? 0).toFixed(2)}</td>
                  <td className="px-3 py-2 space-x-2">
                    <button onClick={() => handleEdit(sale)} className="rounded bg-amber-500 px-3 py-1 text-white hover:bg-amber-600">Edit</button>
                    <button onClick={() => handleDelete(sale.invoiceNumber)} className="rounded bg-rose-500 px-3 py-1 text-white hover:bg-rose-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Sales;
