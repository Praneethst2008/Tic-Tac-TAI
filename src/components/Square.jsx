import React from 'react'
import { motion } from 'motion/react'

const Square = ({value,onClick}) => {
  return (
    <motion.button className='w-[90px] h-[90px] bg-[#1E293B] flex items-center justify-center text-4xl font-bold text-white'
    whileTap={{scale:0.9}}
    onClick={onClick}>
        {value}
    </motion.button>
  )
}

export default Square
