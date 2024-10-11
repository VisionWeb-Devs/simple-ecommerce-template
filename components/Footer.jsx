export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
      <div className="container mx-auto px-4">
        <p>© {currentYear}, created By visionwebDevs </p>
      </div>
    </footer>
  );
};
