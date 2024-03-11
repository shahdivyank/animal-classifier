import Image from "next/image";

const Viewer = ({ image }) => {
  return (
    <div className="m-4">
      {image && <Image src={image} width={300} height={300} />}
      {!image && (
        <div className="text-xl italic w-[300px] h-[300px] flex items-center justify-center">
          no image uploaded
        </div>
      )}
    </div>
  );
};

export default Viewer;
