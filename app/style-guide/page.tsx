import Link from "next/link"

export default function StyleGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">Grant Crowder Design System</h1>
          <Link href="/" className="text-purple-600 hover:text-purple-800 transition-colors">
            Back to Home
          </Link>
        </div>

        {/* Typography Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 pb-2 border-b">Typography</h2>

          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Font Family</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="mb-2 text-sm text-gray-500">Inter (Variable Font)</p>
              <p className="text-lg">The quick brown fox jumps over the lazy dog. 0123456789 !@#$%^&*()</p>
            </div>
          </div>

          {/* Responsive Typography Section */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Responsive Typography</h3>
            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2 text-sm text-gray-500">Heading 1</p>
                <div className="border-l-4 border-purple-600 pl-4">
                  <p className="text-sm text-gray-500 mb-2">Desktop: text-6xl/text-8xl font-bold</p>
                  <h1 className="text-6xl font-bold mb-6">Heading 1</h1>

                  <p className="text-sm text-gray-500 mb-2">Tablet: text-5xl/text-7xl font-bold</p>
                  <h1 className="text-5xl font-bold mb-6">Heading 1</h1>

                  <p className="text-sm text-gray-500 mb-2">Mobile: text-4xl/text-6xl font-bold</p>
                  <h1 className="text-4xl font-bold">Heading 1</h1>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2 text-sm text-gray-500">Body Text</p>
                <div className="border-l-4 border-purple-600 pl-4">
                  <p className="text-sm text-gray-500 mb-2">Desktop: text-lg</p>
                  <p className="text-lg mb-6">
                    I aim to create impactful solutions with my creativity and technical expertise.
                  </p>

                  <p className="text-sm text-gray-500 mb-2">Tablet: text-base</p>
                  <p className="text-base mb-6">
                    I aim to create impactful solutions with my creativity and technical expertise.
                  </p>

                  <p className="text-sm text-gray-500 mb-2">Mobile: text-sm</p>
                  <p className="text-sm">
                    I aim to create impactful solutions with my creativity and technical expertise.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Responsive Font Sizes Reference</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-3 px-4 border-b text-left">Element</th>
                    <th className="py-3 px-4 border-b text-left">Desktop (≥1024px)</th>
                    <th className="py-3 px-4 border-b text-left">Tablet (≥768px)</th>
                    <th className="py-3 px-4 border-b text-left">Mobile (&lt;768px)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-4 border-b">Heading 1</td>
                    <td className="py-3 px-4 border-b">text-8xl (6rem)</td>
                    <td className="py-3 px-4 border-b">text-7xl (4.5rem)</td>
                    <td className="py-3 px-4 border-b">text-6xl (3.75rem)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b">Heading 2</td>
                    <td className="py-3 px-4 border-b">text-3xl (1.875rem)</td>
                    <td className="py-3 px-4 border-b">text-2xl (1.5rem)</td>
                    <td className="py-3 px-4 border-b">text-xl (1.25rem)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b">Heading 3</td>
                    <td className="py-3 px-4 border-b">text-2xl (1.5rem)</td>
                    <td className="py-3 px-4 border-b">text-xl (1.25rem)</td>
                    <td className="py-3 px-4 border-b">text-lg (1.125rem)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b">Body Large</td>
                    <td className="py-3 px-4 border-b">text-lg (1.125rem)</td>
                    <td className="py-3 px-4 border-b">text-base (1rem)</td>
                    <td className="py-3 px-4 border-b">text-base (1rem)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b">Body Regular</td>
                    <td className="py-3 px-4 border-b">text-base (1rem)</td>
                    <td className="py-3 px-4 border-b">text-sm (0.875rem)</td>
                    <td className="py-3 px-4 border-b">text-sm (0.875rem)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b">Small Text</td>
                    <td className="py-3 px-4 border-b">text-sm (0.875rem)</td>
                    <td className="py-3 px-4 border-b">text-xs (0.75rem)</td>
                    <td className="py-3 px-4 border-b">text-xs (0.75rem)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Headings</h3>
            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2 text-sm text-gray-500">H1 - text-6xl font-bold</p>
                <h1 className="text-6xl font-bold">Heading 1</h1>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2 text-sm text-gray-500">H2 - text-3xl font-bold</p>
                <h2 className="text-3xl font-bold">Heading 2</h2>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2 text-sm text-gray-500">H3 - text-2xl font-bold</p>
                <h3 className="text-2xl font-bold">Heading 3</h3>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2 text-sm text-gray-500">H4 - text-xl font-bold</p>
                <h4 className="text-xl font-bold">Heading 4</h4>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Body Text</h3>
            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2 text-sm text-gray-500">Large - text-lg text-[#595959]</p>
                <p className="text-lg text-[#595959]">
                  I aim to create impactful solutions with my creativity and technical expertise, consistently
                  delivering top-notch work aligned with my clients' objectives.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2 text-sm text-gray-500">Regular - text-base text-[#333333]</p>
                <p className="text-base text-[#333333]">
                  A comprehensive data management solution for Bankrate, streamlining financial data analysis and
                  reporting.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2 text-sm text-gray-500">Small - text-sm text-[#595959]</p>
                <p className="text-sm text-[#595959]">PRODUCT DESIGN</p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Font Weights</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2 text-sm text-gray-500">font-light (300)</p>
                <p className="text-xl font-light">The quick brown fox jumps over the lazy dog.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2 text-sm text-gray-500">font-normal (400)</p>
                <p className="text-xl font-normal">The quick brown fox jumps over the lazy dog.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2 text-sm text-gray-500">font-medium (500)</p>
                <p className="text-xl font-medium">The quick brown fox jumps over the lazy dog.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2 text-sm text-gray-500">font-bold (700)</p>
                <p className="text-xl font-bold">The quick brown fox jumps over the lazy dog.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Colors Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 pb-2 border-b">Color Palette</h2>

          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Primary Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200">
                <div className="h-24 bg-purple-600"></div>
                <div className="p-3 bg-white">
                  <p className="font-medium">Purple 600</p>
                  <p className="text-sm text-gray-500">#450BEC</p>
                </div>
              </div>

              <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200">
                <div className="h-24 bg-purple-900"></div>
                <div className="p-3 bg-white">
                  <p className="font-medium">Purple 900</p>
                  <p className="text-sm text-gray-500">#030022</p>
                </div>
              </div>

              <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200">
                <div className="h-24 bg-purple-300"></div>
                <div className="p-3 bg-white">
                  <p className="font-medium">Purple 300</p>
                  <p className="text-sm text-gray-500">#A0AEFF</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Text Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200">
                <div className="h-24 bg-[#151515]"></div>
                <div className="p-3 bg-white">
                  <p className="font-medium">Text Primary</p>
                  <p className="text-sm text-gray-500">#151515</p>
                </div>
              </div>

              <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200">
                <div className="h-24 bg-[#333333]"></div>
                <div className="p-3 bg-white">
                  <p className="font-medium">Text Secondary</p>
                  <p className="text-sm text-gray-500">#333333</p>
                </div>
              </div>

              <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200">
                <div className="h-24 bg-[#595959]"></div>
                <div className="p-3 bg-white">
                  <p className="font-medium">Text Tertiary</p>
                  <p className="text-sm text-gray-500">#595959</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Background Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200">
                <div className="h-24 bg-white border"></div>
                <div className="p-3 bg-white">
                  <p className="font-medium">Background White</p>
                  <p className="text-sm text-gray-500">#FFFFFF</p>
                </div>
              </div>

              <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200">
                <div className="h-24 bg-purple-50"></div>
                <div className="p-3 bg-white">
                  <p className="font-medium">Background Light Purple</p>
                  <p className="text-sm text-gray-500">#F5F7FF</p>
                </div>
              </div>

              <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200">
                <div className="h-24 bg-[#f1f1f1]"></div>
                <div className="p-3 bg-white">
                  <p className="font-medium">Background Gray</p>
                  <p className="text-sm text-gray-500">#f1f1f1</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Full Purple Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: "purple-50", value: "#F5F7FF" },
                { name: "purple-100", value: "#EBF0FF" },
                { name: "purple-200", value: "#BFD1FF" },
                { name: "purple-300", value: "#A0AEFF" },
                { name: "purple-400", value: "#7A7AFF" },
                { name: "purple-500", value: "#5D43FF" },
                { name: "purple-600", value: "#450BEC" },
                { name: "purple-700", value: "#2D00A5" },
                { name: "purple-800", value: "#15005D" },
                { name: "purple-900", value: "#030022" },
              ].map((color) => (
                <div key={color.name} className="flex flex-col overflow-hidden rounded-lg border border-gray-200">
                  <div className="h-16" style={{ backgroundColor: color.value }}></div>
                  <div className="p-2 bg-white">
                    <p className="font-medium text-sm">{color.name}</p>
                    <p className="text-xs text-gray-500">{color.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* UI Components Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 pb-2 border-b">UI Components</h2>

          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Buttons</h3>
            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-4 text-sm text-gray-500">Primary Button</p>
                <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  Primary Button
                </button>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-4 text-sm text-gray-500">Secondary Button</p>
                <button className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                  Secondary Button
                </button>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-4 text-sm text-gray-500">Text Button with Icon</p>
                <button className="text-purple-600 font-medium flex items-center hover:underline transition-colors">
                  View My Work
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2 w-5 h-5"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <div className="bg-[#f1f1f1] aspect-video rounded-2xl mb-4"></div>
                <div className="text-sm text-[#595959] mb-2">PRODUCT DESIGN</div>
                <h3 className="text-2xl font-bold mb-4">Project Title</h3>
                <p className="text-[#333333]">A brief description of the project and its key features.</p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <div className="bg-[#f1f1f1] aspect-video rounded-2xl mb-4"></div>
                <div className="text-sm text-[#595959] mb-2">VISUAL DESIGN</div>
                <h3 className="text-2xl font-bold mb-4">Another Project</h3>
                <p className="text-[#333333]">A brief description of the project and its key features.</p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Labels & Badges</h3>
            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-4 text-sm text-gray-500">Category Label</p>
                <span className="bg-[#151515] text-white px-4 py-2 rounded-lg text-sm font-medium tracking-[2px] inline-block">
                  CASE STUDY
                </span>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-4 text-sm text-gray-500">Tag</p>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                  UX Design
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Spacing & Layout Section */}
        <section>
          <h2 className="text-2xl font-bold mb-8 pb-2 border-b">Spacing & Layout</h2>

          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Spacing Scale</h3>
            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-4 text-sm text-gray-500">Spacing Examples</p>
                <div className="flex flex-wrap gap-4">
                  {[1, 2, 3, 4, 6, 8, 12, 16].map((size) => (
                    <div key={size} className="flex flex-col items-center">
                      <div className="bg-purple-600" style={{ width: `${size * 4}px`, height: `${size * 4}px` }}></div>
                      <span className="text-xs mt-2">{size}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Border Radius</h3>
            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-4 text-sm text-gray-500">Border Radius Examples</p>
                <div className="flex flex-wrap gap-8">
                  {[
                    { name: "sm", value: "0.125rem" },
                    { name: "md", value: "0.375rem" },
                    { name: "lg", value: "0.5rem" },
                    { name: "xl", value: "0.75rem" },
                    { name: "2xl", value: "1rem" },
                    { name: "3xl", value: "1.5rem" },
                    { name: "full", value: "9999px" },
                  ].map((radius) => (
                    <div key={radius.name} className="flex flex-col items-center">
                      <div className="bg-purple-600 w-16 h-16" style={{ borderRadius: radius.value }}></div>
                      <span className="text-xs mt-2">{radius.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Responsive Design Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 pb-2 border-b">Responsive Design</h2>

          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Breakpoints</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-3 px-4 border-b text-left">Name</th>
                    <th className="py-3 px-4 border-b text-left">Screen Width</th>
                    <th className="py-3 px-4 border-b text-left">Tailwind Class</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-4 border-b">Mobile (Default)</td>
                    <td className="py-3 px-4 border-b">&lt; 640px</td>
                    <td className="py-3 px-4 border-b">No prefix</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b">Small</td>
                    <td className="py-3 px-4 border-b">≥ 640px</td>
                    <td className="py-3 px-4 border-b">sm:</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b">Medium</td>
                    <td className="py-3 px-4 border-b">≥ 768px</td>
                    <td className="py-3 px-4 border-b">md:</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b">Large</td>
                    <td className="py-3 px-4 border-b">≥ 1024px</td>
                    <td className="py-3 px-4 border-b">lg:</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b">Extra Large</td>
                    <td className="py-3 px-4 border-b">≥ 1280px</td>
                    <td className="py-3 px-4 border-b">xl:</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b">2X Large</td>
                    <td className="py-3 px-4 border-b">≥ 1536px</td>
                    <td className="py-3 px-4 border-b">2xl:</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Responsive Layout Examples</h3>
            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-4 text-sm text-gray-500">Desktop Layout (≥1024px)</p>
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-purple-200 p-4 rounded">Sidebar</div>
                  <div className="bg-purple-300 p-4 rounded col-span-3">Main Content</div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-4 text-sm text-gray-500">Tablet Layout (≥768px, &lt;1024px)</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-purple-200 p-4 rounded">Sidebar</div>
                  <div className="bg-purple-300 p-4 rounded col-span-2">Main Content</div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-4 text-sm text-gray-500">Mobile Layout (&lt;768px)</p>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-purple-300 p-4 rounded">Main Content</div>
                  <div className="bg-purple-200 p-4 rounded">Sidebar</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
