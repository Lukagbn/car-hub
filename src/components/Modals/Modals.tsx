import LogIn from "./LogIn";
import Profile from "./Profile";
import Register from "./Register";

interface ModalProps {
  modal: string;
  overlay: boolean;
  onClose: () => void;
  onModalChange: (modal: string) => void;
  loggedIn: boolean;
}

function Modals({
  modal,
  overlay,
  onClose,
  onModalChange,
  loggedIn,
}: ModalProps) {
  if (!overlay) return null;

  return (
    <div
      className="fixed left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-10"
      onClick={onClose}
    >
      <div
        className="fixed p-4 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[10px] w-75"
        onClick={(e) => e.stopPropagation()}
      >
        {!loggedIn && modal === "login" && (
          <LogIn setModal={() => onModalChange("signup")} />
        )}
        {!loggedIn && modal === "signup" && (
          <Register setModal={() => onModalChange("login")} />
        )}
        {loggedIn && <Profile />}
      </div>
    </div>
  );
}

export default Modals;
