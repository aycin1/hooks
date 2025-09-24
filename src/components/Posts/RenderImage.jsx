import { Image } from "@imagekit/react";

export default function RenderImage({ postID }) {
  return (
    <Image
      urlEndpoint="https://ik.imagekit.io/adhfejkhz"
      src={"/" + postID}
      alt="Image of users own project"
      width={300}
      height={300}
    />
  );
}
