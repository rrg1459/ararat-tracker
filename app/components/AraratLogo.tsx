import Image from "next/image";
import araratLogo from "../../public/ararat.png";

interface AraratLogoProps {
  size?: number;
  priority?: boolean;
  alt?: string;
  className?: string;
}

export default function AraratLogo({
  size = 60,
  priority = false,
  alt = "Logo Iglesia Ararat",
  className = "",
}: AraratLogoProps) {
  return (
    <Image
      src={araratLogo}
      alt={alt}
      width={araratLogo.width}
      height={araratLogo.height}
      priority={priority}
      placeholder="blur"
      style={{ width: `${size}px`, height: "auto" }}
      className={`object-contain flex-shrink-0 ${className}`.trim()}
      sizes={`${size}px`}
    />
  );
}
