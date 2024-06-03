import { MacbookScroll } from "./components/Laptop";
import Header from "./components/Header";
import { BackgroundGradientAnimation } from "./components/Background";
import { ImageCarousel } from "./components/Components";
import { HeaderButton } from "./components/HeaderButton";
import Footer from "./components/Footer";
import { Inter, Roboto_Mono, Poppins } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col overflow-clip">
      <Header />
      <BackgroundGradientAnimation
        gradientBackgroundStart="64, 224, 208"
        gradientBackgroundEnd="112, 128, 144"
        firstColor="112, 128, 144"
        secondColor="230, 230, 250"
        thirdColor="255, 218, 185"
        fourthColor="255, 192, 203"
        fifthColor="255, 250, 205"
      >
        <div className="absolute z-40 inset-0 flex flex-col items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
          <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-black/80 to-black/80">
            codEdit
          </p>
          <p
            className={`bg-clip-text text-3xl mt-6 text-transparent drop-shadow-2xl bg-gradient-to-b from-black/80 to-black/80 font-mono`}
          >
            bringing coders togethers
          </p>
        </div>
      </BackgroundGradientAnimation>
      <h1 className={`mt-40 text-3xl ${roboto.className}`}>
        Collaborate, seek assistance, and code together with other developers
      </h1>
      <MacbookScroll showGradient={true} title="Coding together made easy" />
      <div className="bg-white w-screen flex items-center justify-center z-50 flex-col">
        <ImageCarousel />
        <div className="mt-20">
          <HeaderButton />
        </div>
        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </div>
  );
}
