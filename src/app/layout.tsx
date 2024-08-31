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
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>
      <body>
        <Providers>
          <main className="relative w-full overflow-x-hidden">{children}</main>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
