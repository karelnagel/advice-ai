import { Footer } from "./Footer";
import { Header } from "./Header";
import Image from "next/image";
import { Login } from "./Login";

export const Landing = () => {
  return (
    <main className=" relative flex min-h-screen w-full flex-col">
      <Header />
      <div
        className="hero relative min-h-screen"
        style={{
          backgroundImage: `url("/images/stock/photo-1507358522600-9f71e620c44e.jpg")`,
        }}
      >
        <Image alt="hero" src="/hero.jpeg" className="" fill={true} />
        <div className="hero-overlay bg-opacity-80"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="flex max-w-md flex-col items-center">
            <h1 className="mb-5 text-5xl font-bold">Chat with celebs</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <Login />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};
