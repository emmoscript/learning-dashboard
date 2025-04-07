"use client";

import Link from 'next/link';
import CourseCarousel from '@/components/CourseCarousel';
import { CourseCard } from '@/components/CourseCard';
import { Button } from '@/components/ui/button';
import { CourseFacade } from '@/lib/facade/CourseFacade';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const { user } = useContext(AuthContext);
  const featuredCourses = CourseFacade.getFeaturedCourses();
  const allCourses = CourseFacade.getCourses();
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">8limpio Learning</h1>
            <p className="text-xl mb-8">
              Plataforma de e-learning con cursos de alta calidad diseñados por expertos para ayudarte a dominar nuevas tecnologías.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/courses/my-courses">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                  {user ? 'Mis Cursos' : 'Explorar Cursos'}
                </Button>
              </Link>
              {!user && (
                <Link href="/login">
                  <Button variant="outline" className="border-white text-white bg-blue-600/30 hover:bg-white/10">
                    Iniciar Sesión
                  </Button>
                </Link>
              )}
            </div>
          </div>
      </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Cursos Destacados</h2>
          <CourseCarousel 
            courses={featuredCourses} 
            title="Cursos mejor calificados"
          />
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Explora Todos Nuestros Cursos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allCourses.map((course) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                isEnrolled={user?.cursosInscritos?.includes(course.id) || false}
                progress={user?.cursosInscritos?.includes(course.id) 
                  ? CourseFacade.getUserCourseProgress(user.id, course.id) 
                  : 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Partners Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-8">Empresas que confían en nosotros</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            <div className="grayscale hover:grayscale-0 transition-all duration-300">
              <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-center h-[60px] w-[160px]">
                <svg className="h-8 w-8 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path fill="currentColor" d="M0 32h214.6v214.6H0V32zm233.4 0H448v214.6H233.4V32zM0 265.4h214.6V480H0V265.4zm233.4 0H448V480H233.4V265.4z"/>
                </svg>
                <span className="font-bold text-gray-700">Microsoft</span>
              </div>
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300">
              <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-center h-[60px] w-[160px]">
                <svg className="h-8 w-8 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                </svg>
                <span className="font-bold text-gray-700">Google</span>
              </div>
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300">
              <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-center h-[60px] w-[160px]">
                <svg className="h-8 w-8 text-yellow-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path fill="currentColor" d="M257.2 162.7c-48.7 1.8-169.5 15.5-169.5 117.5 0 109.5 138.3 114 183.5 43.2 6.5 10.2 35.4 37.5 45.3 46.8l56.8-56S341 288.9 341 261.4V114.3C341 89 316.5 32 228.7 32 140.7 32 94 87 94 136.3l73.5 6.8c16.3-49.5 54.2-49.5 54.2-49.5 40.7-.1 35.5 29.8 35.5 69.1zm0 86.8c0 80-84.2 68-84.2 17.2 0-47.2 50.5-56.7 84.2-57.8v40.6zm136 163.5c-7.7 10-70 67-174.5 67S34.2 408.5 9.7 379c-6.8-7.7 1-11.3 5.5-8.3C88.5 415.2 203 488.5 387.7 401c7.5-3.7 13.3 2 5.5 12zm39.8 2.2c-6.5 15.8-16 26.8-21.2 31-5.5 4.5-9.5 2.7-6.5-3.8s19.3-46.5 12.7-55c-6.5-8.3-37-4.3-48-3.2-10.8 1-13 2-14-.3-2.3-5.7 21.7-15.5 37.5-17.5 15.7-1.8 41-.8 46 5.7 3.7 5.1 0 27.1-6.5 43.1z"/>
                </svg>
                <span className="font-bold text-gray-700">Amazon</span>
              </div>
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300">
              <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-center h-[60px] w-[160px]">
                <svg className="h-8 w-8 text-blue-600 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path fill="currentColor" d="M640 317.9C640 409.2 600.6 466.4 529.7 466.4C467.1 466.4 433.9 431.8 372.8 329.8L341.4 277.2C333.1 264.7 326.9 253 320.2 242.2C300.1 276 273.1 325.2 273.1 325.2C206.1 441.8 168.5 466.4 116.2 466.4C43.3 466.4 0 409.1 0 320.5C0 177.5 79.8 42.4 183.7 42.4C234.5 42.4 277.3 67.4 350.9 229.6L359.8 243.5C360.1 243.9 360.4 244.3 360.7 244.7C431.8 127.1 468.1 42.4 529.7 42.4C608.5 42.4 640 116.2 640 193V317.9z"/>
                </svg>
                <span className="font-bold text-gray-700">Meta</span>
              </div>
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300">
              <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-center h-[60px] w-[160px]">
                <svg className="h-8 w-8 text-blue-700 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path fill="currentColor" d="M448 73.143v45.714C448 159.143 347.667 192 224 192S0 159.143 0 118.857V73.143C0 32.857 100.333 0 224 0s224 32.857 224 73.143zM448 176v102.857C448 319.143 347.667 352 224 352S0 319.143 0 278.857V176c48.125 33.143 136.208 48.572 224 48.572S399.874 209.143 448 176zm0 160v102.857C448 479.143 347.667 512 224 512S0 479.143 0 438.857V336c48.125 33.143 136.208 48.572 224 48.572S399.874 369.143 448 336z"/>
                </svg>
                <span className="font-bold text-gray-700">IBM</span>
              </div>
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300">
              <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-center h-[60px] w-[160px]">
                <svg className="h-8 w-8 text-red-600 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path fill="currentColor" d="M240.5 224H352C365.3 224 377.3 232.3 381.1 244.7C386.6 257.2 383.1 271.3 373.1 280.1L117.1 504.1C105.8 513.9 89.27 514.7 77.19 505.9C65.1 497.1 60.7 481.1 66.59 467.4L143.5 288H32C18.67 288 6.65 279.7 2.01 267.3C-2.64 254.8 .919 240.7 10.89 231.9L266.9 7.918C278.2-1.92 294.7-2.669 306.8 6.114C318.9 14.9 323.3 30.87 317.4 44.61L240.5 224z"/>
                </svg>
                <span className="font-bold text-gray-700">Oracle</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros estudiantes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-lg font-bold text-blue-600">ML</span>
                </div>
                <div>
                  <h3 className="font-semibold">María López</h3>
                  <p className="text-sm text-gray-500">Estudiante de Desarrollo Web</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600">La calidad de los cursos es excelente. He aprendido más en 2 meses que en un año en la universidad. ¡Los laboratorios prácticos son geniales!</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-lg font-bold text-blue-600">JR</span>
                </div>
                <div>
                  <h3 className="font-semibold">Juan Ramírez</h3>
                  <p className="text-sm text-gray-500">Desarrollador Full Stack</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600">Estos cursos me ayudaron a cambiar de carrera. La estructura progresiva y los certificados reconocidos en la industria marcaron la diferencia.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-lg font-bold text-blue-600">AS</span>
                </div>
                <div>
                  <h3 className="font-semibold">Ana Sánchez</h3>
                  <p className="text-sm text-gray-500">Estudiante de Ciencia de Datos</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(4)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
                <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <p className="text-gray-600">El contenido está muy bien estructurado y actualizado. Los profesores explican de manera clara. Me gustaría que hubiera más ejercicios prácticos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegirnos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Calidad Garantizada</h3>
              <p className="text-gray-600">Todos nuestros cursos son diseñados por expertos en la industria y actualizados constantemente.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Aprende a Tu Ritmo</h3>
              <p className="text-gray-600">Accede a los cursos cuando quieras y donde quieras, con acceso ilimitado al contenido.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Certificados Reconocidos</h3>
              <p className="text-gray-600">Obtén certificados verificables al completar los cursos para mejorar tu currículum.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Planes de Precios</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades. Todos incluyen acceso completo a nuestra plataforma.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-gray-900">Plan Básico</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">Gratis</span>
                </div>
                <p className="mt-2 text-gray-600">Para principiantes</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Acceso a 3 cursos básicos</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Acceso a foros de comunidad</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Certificado básico</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => router.push('/checkout?plan=basic')}
                  >
                    Comenzar Gratis
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-blue-500 transform scale-105">
              <div className="bg-blue-500 text-white text-center py-1 text-sm font-semibold">
                Más Popular
              </div>
              <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-gray-900">Plan Profesional</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">$19.99</span>
                  <span className="ml-1 text-xl text-gray-500">/mes</span>
                </div>
                <p className="mt-2 text-gray-600">Para estudiantes dedicados</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Acceso a todos los cursos</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Laboratorios prácticos</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Certificados profesionales</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Descarga de material</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => router.push('/checkout?plan=premium')}
                  >
                    Suscribirse Ahora
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Enterprise Plan */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-gray-900">Plan Familiar</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">$49.99</span>
                  <span className="ml-1 text-xl text-gray-500">/mes</span>
                </div>
                <p className="mt-2 text-gray-600">Para equipos y empresas</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Todo del plan profesional</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Acceso para 5 usuarios</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Soporte prioritario</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Cursos personalizados</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => router.push('/checkout?plan=premium')}
                  >
                    Obtener Plan Familiar
                  </Button>
                </div>
              </div>
            </div>
      </div>
    </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar tu viaje de aprendizaje?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Únete a nuestra comunidad de estudiantes y da el primer paso hacia el dominio de nuevas habilidades.
          </p>
          <Link href={user ? "/courses/my-courses" : "/register"}>
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              {user ? 'Ver mis cursos' : 'Regístrate Gratis'}
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
