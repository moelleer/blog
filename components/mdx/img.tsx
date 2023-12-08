import Image, { ImageProps } from "next/image";

export default function Img(props: ImageProps) {
  return (
    <figure className="relative aspect-video lg:-mx-24">
      <Image
        className="lg:rounded-lg object-cover"
        {...props}
        alt={props.alt}
        fill
      />
    </figure>
  );
}
