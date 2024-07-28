import Providers from "@modules/providers"
import "styles/globals.css"
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <Providers>
          <main className="relative">{children}</main>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
