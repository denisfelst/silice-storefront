import Image from "next/image"
import Carousel from "./carousel"
import Fancybox from "./fancybox"
type ImageProps = {
  // @ts-ignore
  images: any[] | undefined
  infinite?: boolean | undefined
  height?: number | undefined
}

const ImageCarousel: React.FC<ImageProps> = ({ images, infinite, height }) => {
  return (
    <div className="image-carousel block w-full relative">
      <Fancybox
        options={{
          Carousel: {
            infinite: infinite ?? false,
          },
        }}
      >
        <Carousel options={{ infinite: infinite ?? false }}>
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
                      height={height ?? 500}
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
