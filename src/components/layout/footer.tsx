import { VERSION } from '@/constants/VERSION'

import { Del } from '@/components/components/del'

const Footer = () => {
  return (
    <footer className="container mx-auto flex w-full max-w-3xl flex-col-reverse items-center justify-between gap-2 px-4 py-6 text-gray-200 md:flex-row md:px-1">
      <p className="dark-fit text-sm">
        © {new Date().getFullYear()} MySocialScribe | v{VERSION}
      </p>

      {process.env.NODE_ENV === 'development' && <Del />}

      <div className="dark-fit space-x-1 text-center text-xs font-normal text-gray-200">
        <span>Crafted by</span>
        <a
          href="https://www.linkedin.com/in/husamql3/"
          target="_blank"
          className="text-blue-500 transition duration-200 hover:underline"
        >
          @Hüsam
        </a>
        <span>and</span>
        <a
          href="https://www.linkedin.com/in/julienbarbier/"
          target="_blank"
          className="text-blue-500 transition duration-200 hover:underline"
        >
          @Julien
        </a>
      </div>
    </footer>
  )
}

export default Footer
