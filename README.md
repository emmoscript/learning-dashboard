# E-Learning Platform

Plataforma de e-learning con cursos de alta calidad diseñados por expertos para ayudarte a dominar nuevas tecnologías.

## Características

- Autenticación de usuarios (registro, inicio de sesión)
- Exploración de cursos
- Dashboard de cursos personales
- Videos y examenes
- Laboratorios prácticos de código
- Certificados al completar cursos
- Suscripciones y compras individuales

## Tecnologías utilizadas

- Next.js
- React
- TypeScript
- TailwindCSS
- Contexto de React para gestión de estado
- Autenticación con localStorage

## Pruebas End-to-End

Este proyecto incluye pruebas end-to-end (E2E) utilizando Cypress para garantizar la calidad y funcionamiento correcto de la plataforma.

### Configuración de pruebas

Las pruebas están configuradas con:

- Cypress para pruebas E2E
- Mochawesome Reporter para reportes visuales
- GitHub Actions para integración continua

### Ejecución de pruebas

Para ejecutar las pruebas E2E:

```bash
# Abrir Cypress en modo interactivo
npm run test:e2e

# Ejecutar pruebas en modo headless (para CI)
npm run test:ci
```

### Estructura de pruebas

Las pruebas están organizadas en los siguientes archivos:

- `auth.cy.ts`: Pruebas de autenticación (registro, login)
- `navigation.cy.ts`: Pruebas de navegación por la plataforma
- `courses.cy.ts`: Pruebas de funcionalidad de cursos
- `checkout.cy.ts`: Pruebas de flujo de checkout
- `performance.cy.ts`: Pruebas básicas de rendimiento

### Comandos personalizados

Se han implementado comandos personalizados en `commands.ts` para facilitar las pruebas:

- `loginTestUser()`: Inicia sesión con el usuario de prueba
- `visitCourse(courseId)`: Navega a un curso específico
- `verifyPriceFormat(selector)`: Verifica el formato de precios en USD
- `assertRedirectToPaymentSuccess()`: Verifica redirección exitosa después del pago
- `courseIsInUserCourses(courseId)`: Verifica si un curso está en la lista del usuario

## Configuración y ejecución

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar servidor de producción
npm start
```

## Integración Continua

El proyecto incluye configuración de GitHub Actions para ejecutar pruebas E2E automáticamente en cada push al repositorio.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# 8limpio-learning

# 8limpio-learning

# learning-dashboard

