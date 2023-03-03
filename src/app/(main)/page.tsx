import { Footer } from "./Footer";
import { Header } from "./Header";
import { Login } from "./Login";

export default function Landing() {
  return (
    <main className=" relative flex min-h-screen w-full flex-col">
      <Header />
      <div className="m-auto flex w-full max-w-screen-lg flex-col-reverse justify-between py-10 md:flex-row">
        <div className="col-span-2 flex flex-col items-center mx-3 justify-center space-y-6 md:space-y-10 py-8 text-center md:max-w-2xl md:items-start md:text-left">
          <p className="text-4xl font-extrabold leading-[1.3] text-primary md:text-6xl">
            Chat With Anyone You Want To
          </p>
          <p>
            Use AI to get advice, have fun or just spend time with talking to AI
            generated celebrities or other people.
          </p>
          <Login />
        </div>
        <div className=" flex items-center justify-center">
          <div className="relative">
            <div className="absolute top-0 h-full w-full bg-primary blur-xl"></div>

            <video
              className="relative h-72 rounded-lg md:h-96"
              src="/video.mov"
              autoPlay
              loop
              muted
              disablePictureInPicture
            />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
