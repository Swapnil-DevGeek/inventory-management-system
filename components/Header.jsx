import Link from 'next/link';

const Header = () => (
  <header className="bg-gray-800 text-white p-4 lg:px-36 md:px-24">
    <nav className="container mx-auto flex justify-between">
      <h1 className="text-2xl">Inventory Management System</h1>
      <div>
        <Link href="/" className="mr-4">Home</Link>
        <Link href="/orders" className="mr-4">Orders</Link>
        <Link href="/inventory">Inventory</Link>
      </div>
    </nav>
  </header>
);

export default Header;
