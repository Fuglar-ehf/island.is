import React from 'react'
import cn from 'classnames'

interface LogoProps {
  className?: string
}

const LogoHfj: React.FC<LogoProps> = ({ className }) => {
  return (
    <a
      href="https://www.hafnarfjordur.is/"
      target="_blank"
      className={cn({ [`${className}`]: true })}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 33 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32.6601 38.9509V41.4462C30.8902 43.3214 26.2491 43.156 24.7384 41.1004C24.7384 41.1004 23.4006 42.7727 20.6122 42.7727C17.9516 42.7727 16.3282 41.1004 16.3282 41.1004C16.3282 41.1004 14.7085 42.7727 12.0479 42.7727C9.25953 42.7727 7.92171 41.1004 7.92171 41.1004C6.41102 43.156 1.76998 43.3214 0 41.4462V38.9509C1.29273 40.191 5.81351 41.1267 7.92171 38.282C7.92171 38.282 12.4688 43.1072 16.3282 38.282C20.1913 43.1072 24.7384 38.282 24.7384 38.282C26.8466 41.123 31.3674 40.191 32.6601 38.9509ZM32.6601 44.1782V46.6734C30.8902 48.5486 26.2491 48.3833 24.7384 46.3277C24.7384 46.3277 23.4006 48 20.6122 48C17.9516 48 16.3282 46.3277 16.3282 46.3277C16.3282 46.3277 14.7085 48 12.0479 48C9.25953 48 7.92171 46.3277 7.92171 46.3277C6.41102 48.3833 1.76998 48.5486 0 46.6734V44.1782C1.29273 45.4183 5.81351 46.354 7.92171 43.5093C7.92171 43.5093 12.4688 48.3344 16.3282 43.5093C20.1913 48.3344 24.7384 43.5093 24.7384 43.5093C26.8466 46.354 31.3674 45.4183 32.6601 44.1782Z"
          fill="#4363A9"
        />
        <path
          d="M8.77468 41.0967L8.11328 40.1009L11.5142 37.8423L13.2917 7.91797L14.483 7.98561L12.6716 38.5075L8.77468 41.0967ZM23.8891 41.0967L24.5505 40.1009L21.1495 37.8423L19.372 7.91797L18.1808 7.98561L19.9921 38.5075L23.8891 41.0967ZM15.7344 25.336H16.9294V27.3652H15.7344V25.336ZM15.7344 17.8351H16.9294V19.8644H15.7344V17.8351ZM15.7344 10.3343H16.9294V12.3636H15.7344V10.3343Z"
          fill="#4363A9"
        />
        <path
          d="M11.7998 6.36597H20.8639V8.28627H11.7998V6.36597Z"
          fill="#4363A9"
        />
        <path
          d="M14.487 6.67418H13.292V3.00269H14.487V6.67418ZM19.3686 6.67418H18.1735V3.00269H19.3686V6.67418Z"
          fill="#4363A9"
        />
        <path
          d="M13.3445 4.46442L1.41684 1.20254L1.41309 1.21757V1.75871L9.78951 4.73123L1.41309 7.64738V8.20356L13.3445 5.01683V4.46442ZM19.3159 4.46442L31.2473 1.20254L31.251 1.21757V1.75871L22.8746 4.73123L31.251 7.64738V8.20356L19.3159 5.01683V4.46442ZM16.3471 0L11.8 2.49902V3.31825H20.8641V2.49902L16.3471 0Z"
          fill="#4363A9"
        />
      </svg>
    </a>
  )
}

export default LogoHfj
