import React from 'react';

export const Home: React.FC = () => {
  return (
    <div className="container mx-auto text-center mt-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Car Inventory</h1>
      <p>Select a section from the header to view cars in that section.</p>
    </div>
  );
};

export default Home;
