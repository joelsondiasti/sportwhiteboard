import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="overflow-x-hidden overflow-y-hidden touch-none">
      <body className="antialiased bg-[#62af23]">{children}</body>
    </html>
  )
}
