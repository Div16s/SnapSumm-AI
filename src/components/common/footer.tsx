
const footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} SnapSummm. All rights reserved.
        </p>

        <div className="flex items-center gap-4 text-blue-500 font-medium">
          {/* <a href="/privacy" className="hover:underline transition">Privacy</a>
          <a href="/terms" className="hover:underline transition">Terms</a> */}
          <a href="mailto:divyankarshah1602.com" className="hover:underline transition">Contact</a>
        </div>
      </div>
    </footer>
  )
}

export default footer