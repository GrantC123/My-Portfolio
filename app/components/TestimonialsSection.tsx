import type React from "react"
import Image from "next/image"

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
    <section className="py-24 bg-purple-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-16 flex items-center gap-4 text-white">
          What people are saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 border border-[#e0e0e0] flex flex-col h-full text-gray-900"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#f1f1f1] rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{testimonial.title}</div>
                  <div className="text-sm text-[#595959]">{testimonial.description}</div>
                </div>
              </div>
              <p className="text-[#333333] flex-grow">{testimonial.text}</p>
              <p className="text-[#595959] text-sm mt-4">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
