import { BsUpload } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import Button from "./Button";

const Input = ({ type, onChange, accept, image, onClick }) => {
  return (
    <>
      <label
        htmlFor="dropzone-file"
        className="flex flex-col w-full items-center justify-center h-fit rounded-lg cursor-pointer bg-gray-50 hover:opacity-70"
      >
        {!image && (
          <>
            <div className="flex items-center justify-center p-3">
              <BsUpload className="text-xl text-black mx-2" />
              <p className="text-sm text-black font-semibold">
                Upload from my computer
              </p>
            </div>
            <div className="w-full">
              <input
                id="dropzone-file"
                onChange={onChange}
                type={type}
                className="hidden"
                accept={accept}
              />
            </div>
          </>
        )}
      </label>

      {image && (
        <Button text="Clear Selection" Icon={FaTimes} onClick={onClick} />
      )}
    </>
  );
};

export default Input;
