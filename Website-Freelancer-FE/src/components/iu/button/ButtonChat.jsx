import scss from "./ButtonChat.module.scss";
const ButtonChat = ({ text, onClick }) => {
  return (
    <>
      <div onClick={onClick} className={scss.csbuttonContainer}>
        <button className={scss.csbutton}>
          {text}
        </button>
      </div>
    </>
  );
};

export default ButtonChat;
