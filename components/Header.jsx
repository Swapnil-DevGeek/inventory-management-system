import Link from 'next/link';

const Header = () => (
  <header className="bg-gray-800 text-white p-4 lg:px-36 md:px-24">
    <nav className="container mx-auto flex justify-between">
<<<<<<< HEAD
      <Link href='/'><h1 className="text-2xl">Inventory Management System</h1></Link>
=======
     <Link href='/'> <h1 className="text-2xl">Inventory Management System</h1></Link>
>>>>>>> e6a09cb7b56ed379b231bf2b3ec5e9a4774f5360
      <div>
        <Link href="/orders" className="mr-4">Orders</Link>
        <Link href="/inventory">Inventory</Link>
      </div>
    </nav>
  </header>
);

export default Header;
