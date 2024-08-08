"use client"
import "react-slidy/lib/styles.css"
import ReactSlidy from "react-slidy"
import Image from "next/image"
import { useState } from "react"

const HomeImageSlider = () => {
  const [actualSlide, setActualSlide] = useState<number>(0)
  const [showDots, setShowDots] = useState<boolean>(false)

  const updateSlide = ({ currentSlide }: { currentSlide: number }) => {
    if (!showDots) {
      setShowDots(true)
    }
    setActualSlide(currentSlide)
  }

  const MAX_HEIGHT = "450px"

  const images = [
    { url: "/foto1.jpg" },
    { url: "/foto2.jpg" },
    { url: "/foto3.jpg" },
    { url: "/foto4.jpg" },
    { url: "/foto5.jpg" },
    { url: "/foto6.jpg" },
    { url: "/foto7.jpg" },
  ]

  const createStyles = (isActive: boolean) => {
    return {
      background: "transparent",
      border: 0,
      color: isActive ? "#333" : "#ccc",
      cursor: "pointer",
      fontSize: "36px",
    }
  }

  return (
    <section className="main-image-slider-container w-full max-w-screen-xl p-4">
      <div className="react-slidy-container">
        <ReactSlidy
          keyboardNavigation
          infiniteLoop
          useFullHeight
          imageObjectFit={"contain"}
          doAfterSlide={updateSlide}
          slide={actualSlide}
        >
          {images.map((img, index) => (
            <Image
              key={index}
              src={img.url}
              alt={`Slider Photo ${index}`}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto", maxHeight: MAX_HEIGHT }}
            />
          ))}
        </ReactSlidy>

        <div className="react-slidy-dots flex justify-center max-h-[45px]">
          {images.map((_, index: number) => {
            return (
              <button key={index} style={createStyles(index === actualSlide)}>
                &bull;
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HomeImageSlider
