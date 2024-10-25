import Image from "next/image";

function Cover() {
  return (
    <div className="">
      <Image
        className="rounded-lg"
        src="/cover.jpg"
        alt="Cover"
        height={320}
        width={820}
        objectFit="cover"
      />
    </div>
  );
}

export default Cover;
