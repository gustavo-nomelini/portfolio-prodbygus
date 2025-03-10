import Hero from '@/components/sections/Hero';

export default function Home() {
  return (
    <>
      <Hero />
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Featured Projects
          </h2>
          {/* Add your ProjectList component here */}
        </div>
      </section>
    </>
  );
}