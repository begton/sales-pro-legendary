import { useEffect, useState } from 'react';
import { createProduct, fetchProducts } from '../api';

function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ productCode: '', productName: '', quantitySold: 0, unitPrice: '' });
  const [message, setMessage] = useState('');

  useEffect(() => { loadProducts(); }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load products', error);
      setProducts([]);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await createProduct({ ...form, quantitySold: Number(form.quantitySold), unitPrice: Number(form.unitPrice) });
      setMessage('Product saved successfully');
      setForm({ productCode: '', productName: '', quantitySold: 0, unitPrice: '' });
      loadProducts();
    } catch (error) {
      console.error('Failed to save product', error);
      setMessage('Unable to save product.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800">Product Registration</h2>
        <form onSubmit={handleSubmit} className="mt-4 grid gap-4 md:grid-cols-2">
          <input value={form.productCode} onChange={e => setForm({ ...form, productCode: e.target.value })} placeholder="Product Code" className="rounded-lg border border-slate-300 px-3 py-2" required />
          <input value={form.productName} onChange={e => setForm({ ...form, productName: e.target.value })} placeholder="Product Name" className="rounded-lg border border-slate-300 px-3 py-2" required />
          <input type="number" value={form.quantitySold} onChange={e => setForm({ ...form, quantitySold: e.target.value })} placeholder="Quantity Sold" className="rounded-lg border border-slate-300 px-3 py-2" min="0" required />
          <input type="number" value={form.unitPrice} onChange={e => setForm({ ...form, unitPrice: e.target.value })} placeholder="Unit Price" className="rounded-lg border border-slate-300 px-3 py-2" step="0.01" min="0" required />
          <button className="col-span-full rounded-lg bg-slate-800 px-4 py-2 text-white hover:bg-slate-900">Save Product</button>
        </form>
        {message && <p className="mt-3 text-sm text-emerald-600">{message}</p>}
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800">Product List</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[700px] divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-3 py-2">Code</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Sold Qty</th>
                <th className="px-3 py-2">Unit Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map(product => (
                <tr key={product.productCode}>
                  <td className="px-3 py-2">{product.productCode}</td>
                  <td className="px-3 py-2">{product.productName}</td>
                  <td className="px-3 py-2">{product.quantitySold}</td>
                  <td className="px-3 py-2">{Number(product.unitPrice ?? 0).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Products;
