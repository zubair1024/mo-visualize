const Footer = () => {
  const date = new Date();
  return (
    <footer className="flex items-center justify-between p-4 bg-black footer text-neutral-content">
      <p>Copyright © {date.getFullYear()} - All right reserved</p>
    </footer>
  );
};

export default Footer;
