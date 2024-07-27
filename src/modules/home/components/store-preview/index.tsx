import Image from "next/image"


const StorePreview = () => {
  return (
    <section className="main-store-preview-container max-w-screen-xl h-[45vh] overflow-hidden">
        <div className="image-container inset-0 z-0 min-h-[30vh] h-full min-w-[400px] max-w-screen-xl 2xl:max-w-screen-2xl">
          <Image src={"/from_side.jpg"} quality="100" alt="store preview image" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
        </div>
    </section>
  )
}

export default StorePreview
