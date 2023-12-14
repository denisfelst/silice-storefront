import Image from "next/image"
import Carousel from "./carousel"
import Fancybox from "./fancybox"
type ImageProps = {
  images: Image[] | undefined
}

/* eslint-disable @next/next/no-img-element */
const ImageCarousel: React.FC<ImageProps> = ({ images }) => {
  return (
    <div className="image-carousel block w-full relative">
      <Fancybox
        options={{
          Carousel: {
            infinite: false,
          },
        }}
      >
        <Carousel options={{ infinite: false }}>
          {images?.map((image: any, index: any) => {
            return (
              <div
                className="f-carousel__slide"
                data-fancybox="gallery"
                data-src={image.url}
                data-thumb-src={image.url}
                key={image.url}
              >
                <a data-fancybox="gallery" href={image.url}>
                  <img
                    src={image.url}
                    alt={`Product image ${index}`}
                    className="rounded-rounded"
                  />
                </a>
              </div>
            )
          })}
        </Carousel>
      </Fancybox>
    </div>
  )
}
export default ImageCarousel
