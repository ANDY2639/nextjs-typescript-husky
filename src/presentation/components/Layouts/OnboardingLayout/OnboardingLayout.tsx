import Image from "next/image"
import Footer from "./components/Footer"

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-white flex flex-col md:flex-row rounded-sm overflow-hidden">
      <div className="w-full h-[225px] md:h-screen md:w-[65%] relative block">
        <Image
          src="/images/bg-login.jpg"
          alt="Entrega de paquete"
          className="absolute inset-0 w-full h-full object-cover"
          width={1000}
          height={500}
        />

        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center gap-5 p-8">
          <span className="block w-16 h-9 bg-gray-600"></span>
          <div>
            <h1 className="text-white text-xl not-italic font-semibold md:text-5xl md:font-extrabold">
              Empieza tu tienda sin inventarios
            </h1>
            <p className="text-white text-medium not-italic md:text-2xl md:font-semibold">
              Conecta con productos, olvídate del stock y enfócate en vender.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-[35%] flex flex-col justify-center items-center md:h-screen">
        {children}
        <Footer />
      </div>
    </section>
  )
}

export default OnboardingLayout
