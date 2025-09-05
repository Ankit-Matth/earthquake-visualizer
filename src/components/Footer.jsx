export default function Footer() {
  return (
    <footer className="text-black bg-gray-300 text-center py-4 border-t border-gray-200">
      <p>
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold">Earthquake Visualizer</span> | Powered by{" "}
        <a
          href="https://earthquake.usgs.gov/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          USGS API
        </a>
      </p>
    </footer>
  )
}
