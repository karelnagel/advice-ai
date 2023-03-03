import Link from "next/link";

export const Footer = () => {
  return (
    <div className="bg-base-200">
      <footer className="mx-4 md:m-auto grid max-w-screen-lg grid-cols-2 gap-6 py-10 md:grid-cols-8">
        <div className="col-span-2 flex items-center text-4xl font-bold justify-center">
          GPT Friend
        </div>
        <div className="grid gap-1">
          <p className="footer-title">About</p>
          <Link
            target={"_blank"}
            href="https://github.com/karelnagel/gpt-friend"
            className="link-hover link"
          >
            Github
          </Link>
          <Link
            href="https://twitter.com/karelETH"
            target={"_blank"}
            className="link-hover link"
          >
            Twitter
          </Link>
          <Link
            href="https://linkedin.com/in/karelnagel"
            target={"_blank"}
            className="link-hover link"
          >
            LinkedIn
          </Link>
        </div>
        <div className="grid gap-1">
          <p className="footer-title">Legal</p>
          <Link href="/" className="link-hover link">
            Terms of use
          </Link>
          <Link href="/" className="link-hover link">
            Privacy policy
          </Link>
          <Link href="/" className="link-hover link">
            Cookie policy
          </Link>
        </div>
        <div className="col-span-2">
          <span className="footer-title">Newsletter</span>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">
                Enter your email to keep up with updates
              </span>
            </label>
            <div className="flex w-full space-x-1">
              <input
                type="text"
                placeholder="username@site.com"
                className="input-bordered input w-full "
              />
              <Link
                href="mailto:nagelkarel@gmail.com"
                className="btn-primary btn "
              >
                Subscribe
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
