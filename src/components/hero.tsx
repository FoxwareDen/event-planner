import { Button } from "@/components/ui/button"
import { motion } from "motion/react"
import celebration from "../assets/celebration.png"

const MotionBtn = motion.create(Button);

export function Hero() {

    //Scroll to section functionality
    const scrollToSection = () => {
      document.getElementById("target-section")?.scrollIntoView({ behavior: "smooth"});
    }
  

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      }
    }
  };

  const buttonContainerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.6,
      }
    }
  };

  return (
    <section className="relative py-10 md:py-20 overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      {/* Floating orbs in background */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance"
              variants={itemVariants}
            >
              <motion.span
                className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: "200% 200%"
                }}
              >
                Create Unforgettable Moments
              </motion.span>
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty"
              variants={itemVariants}
            >
              From intimate gatherings to grand celebrations, discover and book the perfect venue for your special
              occasion. Make every moment count.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={buttonContainerVariants}
            >
              <MotionBtn
                onClick={scrollToSection}
                size="lg"
                className="bg-primary cursor-pointer text-primary-foreground hover:bg-primary/90 px-8"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Book now
              </MotionBtn>
              <MotionBtn
                size="lg"
                variant="outline"
                className="cursor-pointer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Learn More
              </MotionBtn>
            </motion.div>
          </motion.div>

          {/* Optional: Animated decoration on the right side */}
          <motion.div
            className="hidden lg:block relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="w-full h-96 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl overflow-hidden relative"
              animate={{
                rotate: [0, 2, 0, -2, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img 
                src={celebration} 
                alt="Celebration" 
                className="w-full h-full object-cover"
              />
              {/* Optional overlay for better blend */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent mix-blend-overlay" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}