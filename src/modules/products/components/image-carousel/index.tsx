import Image from "next/image"
import Carousel from "./carousel"
import Fancybox from "./fancybox"
type ImageProps = {
  // @ts-ignore
  images: Image[] | undefined
}

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
                  <picture>
                    <img
                      src={image.url}
                      alt={`Product image ${index}`}
                      className="rounded-rounded"
                      height={500}
                    />
                  </picture>
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
