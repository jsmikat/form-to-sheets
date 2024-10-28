import { convertToDirectGoogleDriveLink } from "@/lib/utils";
import Image from "next/image";

function Cover({ link }: { link: string }) {
  const directLink = convertToDirectGoogleDriveLink(link);
  return (
    <div className="">
      <Image
        className="size-auto rounded-lg"
        src={directLink}
        priority={true}
        alt="Cover"
        height={320}
        width={820}
      />
    </div>
  );
}

export default Cover;
