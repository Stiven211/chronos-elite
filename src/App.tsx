import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import AboutSection from './components/AboutSection'
import Testimonials from './components/Testimonials'
import ProductDetail from './components/ProductDetail'
import { products } from './data/products'
import { CONTACT_WHATSAPP, WHATSAPP_MESSAGE } from './lib/config'

type View = 'home' | 'products' | 'product'

function App() {
  const [view, setView] = useState<View>('home')
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)

  const navigateToProducts = () => {
    setView('products')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateToProduct = (id: string) => {
    setSelectedProductId(id)
    setView('product')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateToHome = () => {
    setView('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const selectedProduct = products.find(p => p.id === selectedProductId)

  return (
    <div className="min-h-screen bg-dark">
      <Header 
        onHomeClick={navigateToHome}
        onProductsClick={navigateToProducts}
      />
      
      <main>
        {view === 'home' && (
          <>
            <Hero onExploreClick={navigateToProducts} />
            <ProductGrid 
              products={products} 
              onProductClick={navigateToProduct}
            />
            <AboutSection />
            <Testimonials />
          </>
        )}

        {view === 'products' && (
          <>
            <div className="pt-20">
              <ProductGrid 
                products={products} 
                onProductClick={navigateToProduct}
              />
            </div>
          </>
        )}

        {view === 'product' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct}
            allProducts={products}
            onBack={navigateToProducts}
            onProductClick={navigateToProduct}
          />
        )}
      </main>

      <Footer onHomeClick={navigateToHome} onProductsClick={navigateToProducts} />

      {/* WhatsApp Button (floating) */}
      <a
        href={`https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300"
        aria-label="Contactar por WhatsApp"
      >
        <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.044-.36-.096-.554-.139-.198-.559-.614-.774-.818-.217-.203-.43-.227-.59-.172.12.197.245.422.336.525.15.17.319.164.494.099.176-.065.414-.49.527-.592.113-.104.227-.13.42-.078.193.05.627.296.73.554.104.259.104.481-.028.625-.133.144-.313.372-.554.497-.242.125-.483.277-.208.547.274.27.611.98.778 1.315.167.335.335.289.565.172.23-.116.978-.457 1.22-.857.243-.4.243-.745-.052-.857-.297-.113-1.231-.056-2.29.27-1.057.327-1.75 1.222-1.903 2.27-.153 1.048-.768 1.315-.768 1.315-.174.297-.292.645-.056.97.237.326.522.674.785.899.264.226.535.207.82-.066.285-.273.615-.716.615-1.447 0-.731-.153-1.45-.326-2.077z"/>
        </svg>
      </a>
    </div>
  )
}

export default App
