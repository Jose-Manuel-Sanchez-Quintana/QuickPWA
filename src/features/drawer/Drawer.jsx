const Drawer = ({ children, isOpen, setIsOpen }) => {
  return (
    <main
      className={
        " fixed overflow-hidden z-50 inset-0 transform lineal " +
        (isOpen
          ? "  duration-1 translate-x-0  "
          : "  duration-1 delay-700 -translate-x-full  ")
      }
    >
      <div
        className={
          "absolute w-full h-full bg-black transform lineal " +
          (isOpen ? "  duration-500 opacity-70 " : "  duration-500 opacity-0 ")
        }
        onClick={() => {
          setIsOpen(false);
        }}
      ></div>
      <section
        className={
          " w-screen max-w-72 left-0 absolute bg-white h-full shadow-xl delay-400 duration-500 lineal transition-all transform  " +
          (isOpen ? " translate-x-0 " : " -translate-x-full ")
        }
      >
        <article className="relative w-full pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          {children}
        </article>
      </section>
      <section className=" w-screen h-full cursor-pointer "></section>
    </main>
  );
};

export default Drawer;
