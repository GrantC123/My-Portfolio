'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface AnimatedTextProps {
  text: string
  className?: string
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const wordAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const words = text.split(' ')

  return (
    <motion.span
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ staggerChildren: 0.05, delayChildren: 0.5 }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={wordAnimation}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {word}
          {index !== words.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default AnimatedText
