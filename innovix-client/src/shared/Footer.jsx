import logo from "./../assets/innovix_logo.gif";

const Footer = () => {
  return (
    <footer className="footer bg-[#1E1E2F] pt-8 text-neutral-content p-10 w-full">
      <aside className="flex flex-col justify-center items-center w-full">
        <img className="sm:w-24 md:w-36" src={logo} alt="Innovix logo" />
        <p>Providing reliable tech since 2024</p>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
    </footer>
  );
};

export default Footer;
