import Image from "next/image"

export default function ResumePage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-[400px_1fr] gap-8">
          {/* Left Sidebar */}
          <div className="bg-purple-900 text-white p-8 rounded-xl">
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Me.jpg-CqWEFIxHmyfL4r5Wy26hPc406zTrvn.jpeg"
                  alt="Grant Crowder"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-3xl font-bold mb-1">GRANT</h1>
              <h1 className="text-3xl font-bold">CROWDER</h1>
            </div>

            <div className="space-y-2 mb-8">
              <p>grantcrowderdesign@gmail.com</p>
              <p>336.991.2524</p>
              <p>grantcrowderdesign.com</p>
            </div>

            <p className="text-sm mb-12">
              Highly motivated, collaborative, and results-driven Senior Product Designer with seven years of diverse
              design experience, including two years in a managerial role. Seeking to leverage my expertise in design
              strategy, technical expertise, team leadership, and project management to drive innovation and deliver
              exceptional creative value. Dedicated to fostering a collaborative environment that encourages inclusivity
              and exceeds expectations.
            </p>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">EDUCATION</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold">University of South Carolina</h3>
                  <p className="text-sm">Bachelor of Fine Arts - Graphic Design</p>
                  <p className="text-sm">2019</p>
                </div>
                <div>
                  <h3 className="font-bold">Surry Community College</h3>
                  <p className="text-sm">Associate of Arts - Graphic Design</p>
                  <p className="text-sm">2012 - 2014</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">SKILLS</h2>
              <ul className="space-y-2">
                <li>Design Leadership/Management</li>
                <li>Coaching, Career Growth</li>
                <li>Project Management</li>
                <li>Design Thinking</li>
                <li>Workshopping</li>
                <li>Agile Methodologies</li>
                <li>Visual Design</li>
                <li>Design Systems</li>
                <li>Prototyping</li>
                <li>Illustration</li>
                <li>User Research</li>
                <li>Data-backed Design</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">TOOLS</h2>
              <ul className="space-y-2">
                <li>Figma, Figjam, Figma Slides</li>
                <li>Miro, Mural</li>
                <li>Adobe Photoshop, Illustrator, InDesign</li>
                <li>Userlytics, UserTesting</li>
                <li>Asana</li>
                <li>Jira</li>
                <li>Clickup</li>
                <li>Notion</li>
              </ul>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-12">
            <section>
              <h2 className="text-3xl font-bold mb-8">EXPERIENCE</h2>

              <div className="mb-12">
                <h3 className="text-xl font-bold">Red Ventures | Full Time</h3>

                <div className="mb-8">
                  <h4 className="text-lg font-bold">Senior Product Designer</h4>
                  <p className="text-[#595959] mb-2">Oct 2024 - Present</p>
                  <p>Works on the most complex design tasks for Bankrate</p>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-bold">Creative Manager</h4>
                  <p className="text-[#595959] mb-2">March 2023 - October 2024</p>
                  <p>Managed three different designers. Voice of the design team. Hired designer.</p>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-bold">Product Designer</h4>
                  <p className="text-[#595959] mb-2">June 2021 - March 2023</p>
                  <p>
                    Key designer leading projects. Developed an internal design system. Established and advocated UXR.
                    Mentored two other designer.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold">Associate Digital Designer</h4>
                  <p className="text-[#595959] mb-2">Feb 2020 - June 2021</p>
                  <p>Contributed illustrations and imagery to national brands TPG and NextAdvisor.</p>
                </div>
              </div>

              <div className="mb-12">
                <h3 className="text-xl font-bold">Homeplace Group</h3>
                <h4 className="text-lg font-bold">Junior Graphic Designer</h4>
                <p className="text-[#595959] mb-2">High Point, NC / March 2016–May 2017</p>
                <p>
                  Produced web designs for various e-commerce websites. Provided art direction of photography, layout,
                  usability and functionality for company websites.
                </p>
              </div>

              <div className="mb-12">
                <h3 className="text-xl font-bold">Shift Inc.</h3>
                <h4 className="text-lg font-bold">Production Graphic Designer</h4>
                <p className="text-[#595959] mb-2">Greensboro, NC / May 2015–February 2016</p>
                <p>
                  Followed brand guidelines for national brands including Audi, BMW, Honda, Ford, Infiniti, Lexus, and
                  Hyundai to create digital and print ads.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold">Grant Crowder Design</h3>
                <h4 className="text-lg font-bold">Owner/Designer</h4>
                <p className="text-[#595959] mb-2">May 2015–Present</p>
                <p>
                  Created solutions for clients in need of graphic and web design. Offered consultations for clients on
                  marketing campaign goals and creative projects.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-8">Design Internships</h2>

              <div className="mb-8">
                <h3 className="text-xl font-bold">TREVETT'S: Design. Print. Mail.</h3>
                <p className="text-[#595959] mb-2">Columbia, SC - May 2019 - Dec. 2019</p>
                <p>Produced graphics for various clients.</p>
                <p>Worked with a team of designers to complete projects.</p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold">U of SC Women's Soccer/Alumni Association</h3>
                <p className="text-[#595959] mb-2">Columbia, SC - Jan. 2019 - Dec. 2019</p>
                <p>
                  Produced various designs for the USC women's soccer team including social media graphics, T-shirt
                  designs, banner designs, stickers, postcard designs, etc.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold">The Promotion Lady</h3>
                <p className="text-[#595959] mb-2">Columbia, SC - May 2018 - Dec. 2018</p>
                <p>Designed logos, fliers, and websites for various clients.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
