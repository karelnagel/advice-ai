import type { Session } from "next-auth";

export const App = ({ session }: { session: Session }) => {
  return (
    <div className="grid h-screen w-screen grid-cols-4">
      <Messages session={session} />
      <Message />
    </div>
  );
};

export const Messages = ({ session }: { session: Session }) => {
  return (
    <div className="space-y-3 border-r p-3">
      <div className="flex items-center justify-between ">
        <div className="flex items-center space-x-3 ">
          <img
            src={session.user.image || "/google.png"}
            alt="avatar"
            className=" aspect-square h-10 rounded-full"
          />
          <p className="text-lg font-semibold">Messages</p>
        </div>

        <svg
          viewBox="0 0 36 36"
          fill="currentColor"
          height="32"
          width="32"
          data-darkreader-inline-fill=""
        >
          <path d="M17.305 16.57a1.998 1.998 0 00-.347.467l-1.546 2.87a.5.5 0 00.678.677l2.87-1.545c.171-.093.328-.21.466-.347l8.631-8.631a1.5 1.5 0 10-2.121-2.122l-8.631 8.632z"></path>
          <path d="M18 10.5a1 1 0 001-1V9a1 1 0 00-1-1h-6a4 4 0 00-4 4v12a4 4 0 004 4h12a4 4 0 004-4v-6a1 1 0 00-1-1h-.5a1 1 0 00-1 1v6a1.5 1.5 0 01-1.5 1.5H12a1.5 1.5 0 01-1.5-1.5V12a1.5 1.5 0 011.5-1.5h6z"></path>
        </svg>
      </div>
      <div className="">
        <input type="text" placeholder="Search people" className="input" />
      </div>
      <div>
        <div className="flex items-center space-x-3">
          <img src="/google.png" className="aspect-square h-10" />
          <div>
            <p>Elon Musk</p>
            <p className="space-x-1 text-xs opacity-60">
              <span className="text-xs">How are you doing?</span>
              <span>•</span>
              <span className="">25 min ago</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export const Message = () => {
  return (
    <div className="col-span-3 flex flex-col space-x-3 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src="/google.png" className="aspect-square h-10" />
          <p className=" text-lg ">Elon Musk</p>
        </div>
      </div>
      <div className="h-full">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src="/google.png" />
            </div>
          </div>
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src="/google.png" />
            </div>
          </div>
          <div className="chat-header">
            Anakin
            <time className="text-xs opacity-50">12:46</time>
          </div>
          <div className="chat-bubble chat-bubble-primary">I hate you!</div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <input type="text" placeholder="Type a message" className="input" />
        <button>
          <svg height="24px" viewBox="0 0 24 24" width="24px">
            <path
              className="fill-primary"
              d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"
              data-darkreader-inline-fill=""
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
