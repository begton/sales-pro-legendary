import { useEffect, useState } from 'react';
import { fetchDailyReport, fetchMonthlyReport, fetchSummary, fetchWeeklyReport } from '../api';

function Reports() {
  const [summary, setSummary] = useState(null);
  const [daily, setDaily] = useState([]);
  const [weekly, setWeekly] = useState([]);
  const [monthly, setMonthly] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setSummary(await fetchSummary());
    setDaily(await fetchDailyReport());
    setWeekly(await fetchWeeklyReport());
    setMonthly(await fetchMonthlyReport());
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800">Report Summary</h2>
        {summary ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Customers</div>
              <div className="mt-2 text-3xl font-semibold text-slate-800">{summary.totalCustomers}</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Products</div>
              <div className="mt-2 text-3xl font-semibold text-slate-800">{summary.totalProducts}</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Sales Records</div>
              <div className="mt-2 text-3xl font-semibold text-slate-800">{summary.totalSales}</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Total Revenue</div>
              <div className="mt-2 text-3xl font-semibold text-slate-800">RWF {Number(summary.totalRevenue ?? 0).toFixed(2)}</div>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-slate-600">Loading summary...</p>
        )}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <ReportCard title="Daily Sales" rows={daily} columns={[ 'period', 'salesCount', 'revenue' ]} />
        <ReportCard title="Weekly Sales" rows={weekly} columns={[ 'period', 'salesCount', 'revenue' ]} />
        <ReportCard title="Monthly Sales" rows={monthly} columns={[ 'period', 'salesCount', 'revenue' ]} />
      </div>
    </div>
  );
}

function ReportCard({ title, rows, columns }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[280px] divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-3 py-2">Period</th>
              <th className="px-3 py-2">Count</th>
              <th className="px-3 py-2">Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map(row => (
              <tr key={row.period}>
                <td className="px-3 py-2">{row.period}</td>
                <td className="px-3 py-2">{row.salesCount}</td>
                <td className="px-3 py-2">RWF {Number(row.revenue ?? 0).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="mt-3 text-sm text-slate-500">No report rows available.</p>}
      </div>
    </div>
  );
}

export default Reports;
