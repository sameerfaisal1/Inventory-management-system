import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductTable from '../components/ProductTable';
import ProductModal from '../components/ProductModal';
import axios from '../api/axios';
import Swal from 'sweetalert2'; // Imported SweetAlert2 for premium notifications

const Dashboard = () => {
  const [products, setProducts] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const navigate = useNavigate();

  // Redirect to login if JWT token is missing in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    } else {
      fetchProducts();
    }
  }, [navigate]);

  // COMMENT: Fetch all inventory products for the logged-in user from the database
  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load products from database.',
        icon: 'error',
        confirmButtonColor: '#ef4444',
        background: '#1e293b',
        color: '#fff'
      });
    }
  }

  // COMMENT: Delete product action where database is involved
  const handleDelete = async (id) => {
    // Show confirmation dialog before executing database delete action
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5', // indigo-600
      cancelButtonColor: '#ef4444',  // red-500
      confirmButtonText: 'Yes, delete it!',
      background: '#1e293b',
      color: '#fff',
      iconColor: '#f59e0b'           // yellow-500
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Send request to delete product from database
          await axios.delete(`/api/products/${id}`);
          setProducts(products.filter((p) => p.id !== id));
          
          // COMMENT: SweetAlert2 action notification representing database deletion success
          Swal.fire({
            title: 'Deleted!',
            text: 'Product has been deleted from database.',
            icon: 'success',
            background: '#1e293b',
            color: '#fff',
            iconColor: '#10b981',
            timer: 1500,
            showConfirmButton: false
          });
        } catch (err) {
          Swal.fire({
            title: 'Error!',
            text: err.response?.data?.message || 'Failed to delete product',
            icon: 'error',
            confirmButtonColor: '#ef4444',
            background: '#1e293b',
            color: '#fff'
          });
        }
      }
    });
  }

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowModal(true);
  }

  // COMMENT: Save product action where database is involved (handles both insertion and updates)
  const handleSave = async (product) => {
    try {
      if (product.id) {
        // Send request to update product in database
        await axios.put(`/api/products/${product.id}`, product);
        
        // COMMENT: SweetAlert2 action notification representing database update success
        Swal.fire({
          title: 'Updated!',
          text: 'Product details updated in database.',
          icon: 'success',
          background: '#1e293b',
          color: '#fff',
          iconColor: '#10b981',
          timer: 1500,
          showConfirmButton: false
        });
      } else {
        // Send request to insert product in database
        await axios.post('/api/products', product);

        // COMMENT: SweetAlert2 action notification representing database insertion success
        Swal.fire({
          title: 'Added!',
          text: 'Product added successfully to database.',
          icon: 'success',
          background: '#1e293b',
          color: '#fff',
          iconColor: '#10b981',
          timer: 1500,
          showConfirmButton: false
        });
      }
      
      // Refresh inventory list from the database to synchronize UI
      fetchProducts();
      setShowModal(false);
      setEditProduct(null);
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: err.response?.data?.message || 'Failed to save product to database.',
        icon: 'error',
        confirmButtonColor: '#ef4444',
        background: '#1e293b',
        color: '#fff'
      });
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar/>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Inventory</h1>
          <button
            onClick={() => { setEditProduct(null); setShowModal(true) }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Add Product
          </button>
        </div>

        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        {showModal && (
          <ProductModal
            product={editProduct}
            onSave={handleSave}
            onClose={() => { setShowModal(false); setEditProduct(null) }}
          />
        )}
      </div>
    </div> 
  )
}

export default Dashboard
