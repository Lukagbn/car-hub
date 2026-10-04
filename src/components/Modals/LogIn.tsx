interface LogInProps {
  setModal: () => void;
  // onClose: () => void;
}

function LogIn({ setModal }: LogInProps) {
  function handleClick() {
    setModal();
    // onClose();
  }
  return (
    <div>
      <h2 className="text-center font-bold">Log In</h2>
      <form>
        <div>
          <input
            className="h-10 border-b-blue-500 border-b-2 outline-none w-full"
            type="email"
            placeholder="Email"
          />
          <span className="h-4.75 block my-2 text-red-500">error</span>
        </div>
        <div>
          <input
            className="h-10 border-b-blue-500 border-b-2 outline-none w-full"
            type="password"
            placeholder="Password"
          />
          <span className="h-4.75 block my-2 text-red-500">Error</span>
        </div>
        <button
          className="flex items-center justify-center mx-auto bg-blue-700 text-white rounded-sm w-32 h-12 hover:bg-blue-600 transition-all duration-200 cursor-pointer"
          type="submit"
        >
          Log In
        </button>
        <p className="text-[14px] text-center my-2" onClick={handleClick}>
          Don't have an account? Sign Up
        </p>
      </form>
    </div>
  );
}

export default LogIn;
