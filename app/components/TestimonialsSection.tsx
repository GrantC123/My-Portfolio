"use client"

import type React from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface Testimonial {
  title: string
  description: string
  text: string
  author: string
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-20 bg-zinc-950 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="font-display font-bold text-[30px] leading-[36px] text-white text-center mb-9">
          What others are saying
        </h2>
        <div className="max-w-[1280px] mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-zinc-800 rounded-xl p-8 border border-zinc-500 flex flex-col h-full">
                    <p className="text-base leading-[26px] text-zinc-400 flex-grow mb-6">{testimonial.text}</p>
                    <div className="border-t border-zinc-500 pt-6 flex items-center gap-4">
                      <div className="w-12 h-12 bg-zinc-700 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src="/placeholder.svg?height=48&width=48"
                          alt={testimonial.author}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-base text-white">{testimonial.author}</div>
                        <div className="text-sm text-zinc-400">{testimonial.description}</div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 md:-left-12 border-2 border-coral-300 text-coral-300 hover:bg-coral-300 hover:text-zinc-950 bg-zinc-950 opacity-40 hover:opacity-100 transition-opacity" />
            <CarouselNext className="right-2 md:-right-12 border-2 border-coral-300 text-coral-300 hover:bg-coral-300 hover:text-zinc-950 bg-zinc-950 opacity-100 transition-opacity" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
