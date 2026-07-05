function ProductTable({products,onEdit,onDelete}){
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="px-6 py-3 text-left">#</th>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Category</th>
            <th className="px-6 py-3 text-left">Quantity</th>
            <th className="px-6 py-3 text-left">Price</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, index) => (
            <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50">
              <td className="px-6 py-4 text-slate-500">{index + 1}</td>
              <td className="px-6 py-4 font-medium text-slate-800">{p.name}</td>
              <td className="px-6 py-4 text-slate-600">{p.category}</td>
              <td className="px-6 py-4 text-slate-600">{p.quantity}</td>
              <td className="px-6 py-4 text-slate-600">Rs. {p.price}</td>
              <td className="px-6 py-4 flex gap-3">
                <button
                  onClick={() => onEdit(p)}
                  className="text-indigo-600 hover:underline font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(p.id)}
                  className="text-red-500 hover:underline font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable