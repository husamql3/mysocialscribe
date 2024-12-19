import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link
      href="/"
      className="w-fit"
    >
      <Image
        src="/logo.png"
        alt="mysocialscribe logo"
        width={150}
        height={100}
        className="h-[25px] w-[150px] object-cover object-center"
      />
    </Link>
  )
}

export default Logo
