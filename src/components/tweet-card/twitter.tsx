import Image from 'next/image'

const Twitter = () => {
  return (
    <Image
      src="/x.svg"
      alt="Twitter"
      width={14}
      height={14}
      className="h-[14px] w-[14px] object-cover object-center hover:cursor-pointer"
    />
  )
}

export default Twitter
