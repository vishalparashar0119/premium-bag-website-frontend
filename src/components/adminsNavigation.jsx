import { Link } from 'react-router-dom'

const AdminsNavigation = () => {
      return (
            <div className="w-[25%] flex h-screen flex-col items-start">
                  <div className="flex flex-col">
                        <Link className="block w-fit mb-2" to='/admin'>All Products</Link>
                        <Link className="block w-fit mb-2" to='/admin/createProduct'>Create new product</Link>
                        <Link className="block w-fit mb-2" to="/admin/orders">Orders</Link>
                  </div>
            </div>
      )
}

export default AdminsNavigation
