import Image from "next/image";
import Footer from "./components/Footer";

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex flex-col overflow-hidden rounded-sm bg-white md:flex-row">
      <div className="relative block h-[225px] w-full md:h-screen md:w-[65%]">
        <Image
          src="/images/bg-login.jpg"
          alt="Entrega de paquete"
          className="absolute inset-0 h-full w-full object-cover"
          width={1000}
          height={500}
        />

        <div className="bg-opacity-50 absolute inset-0 flex flex-col justify-center gap-5 bg-black p-8">
          <span className="block h-9 w-16 bg-gray-600"></span>
          <div>
            <h1 className="text-xl font-semibold text-white not-italic md:text-5xl md:font-extrabold">Empieza tu tienda sin inventarios</h1>
            <p className="text-medium text-white not-italic md:text-2xl md:font-semibold">
              Conecta con productos, olvídate del stock y enfócate en vender.
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center md:h-screen md:w-[35%]">
        {children}
        <Footer />
      </div>
    </section>
  );
};

export default OnboardingLayout;
