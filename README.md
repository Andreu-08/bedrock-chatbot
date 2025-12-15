# Bedrock AI Chatbot 🤖

Interfaz minimalista de chatbot para interactuar con tu agente de AWS Bedrock. Desarrollado con Next.js 16 y Tailwind CSS.

## 🚀 Características

- ✨ Interfaz simple y minimalista
- 🔄 Comunicación en tiempo real con AWS Bedrock
- 📱 Diseño responsive
- ⚡ Despliegue sencillo en Vercel
- 🎨 Estilo moderno con Tailwind CSS

## 📋 Requisitos Previos

- Node.js 18+ instalado
- Cuenta de AWS con acceso a Bedrock
- Agente de Bedrock creado y configurado
- Credenciales de AWS (Access Key ID y Secret Access Key)

## 🛠️ Instalación

1. Clona el repositorio o descarga los archivos

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
   - Copia el archivo `.env.example` a `.env.local`
   - Completa las variables con tus credenciales:

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=tu_access_key_id
AWS_SECRET_ACCESS_KEY=tu_secret_access_key
BEDROCK_AGENT_ID=tu_agent_id
BEDROCK_AGENT_ALIAS_ID=tu_agent_alias_id
```

## 🎯 Uso Local

Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🌐 Despliegue en Vercel

### Opción 1: Desde GitHub

1. Sube tu código a un repositorio de GitHub
2. Ve a [vercel.com](https://vercel.com) e inicia sesión
3. Haz clic en "Add New Project"
4. Importa tu repositorio
5. Agrega las variables de entorno en la configuración
6. Haz clic en "Deploy"

### Opción 2: CLI de Vercel

```bash
npm install -g vercel
vercel
```

Sigue las instrucciones y asegúrate de agregar las variables de entorno.

## ⚠️ Variables de Entorno en Vercel

Asegúrate de configurar todas las variables de entorno en Vercel:

1. Ve a tu proyecto en Vercel
2. Navega a Settings → Environment Variables
3. Agrega cada variable:
   - `AWS_REGION`
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `BEDROCK_AGENT_ID`
   - `BEDROCK_AGENT_ALIAS_ID`

## 📂 Estructura del Proyecto

```
bedrock-chatbot/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.js       # API endpoint para Bedrock
│   ├── components/
│   │   └── ChatBot.js         # Componente principal del chat
│   ├── globals.css            # Estilos globales
│   ├── layout.js              # Layout principal
│   └── page.js                # Página de inicio
├── .env.local                 # Variables de entorno (no subir a git)
├── .env.example               # Ejemplo de variables de entorno
└── package.json
```

## 🔧 Tecnologías

- **Next.js 16**: Framework de React
- **React 19**: Biblioteca de UI
- **Tailwind CSS 4**: Framework de CSS
- **AWS SDK**: Cliente de Bedrock Agent Runtime

## 🤝 Obtener Credenciales de AWS

1. Inicia sesión en AWS Console
2. Ve a IAM → Users → Tu usuario
3. Pestaña "Security credentials"
4. Crea un nuevo Access Key
5. Descarga y guarda las credenciales de forma segura

## 📝 Notas de Seguridad

- **NUNCA** subas el archivo `.env.local` a git
- Usa variables de entorno en Vercel para producción
- Mantén tus credenciales de AWS seguras
- Considera usar IAM roles en lugar de access keys cuando sea posible

## 📖 Más Información

- [Documentación de Next.js](https://nextjs.org/docs)
- [AWS Bedrock Documentation](https://docs.aws.amazon.com/bedrock/)
- [Vercel Documentation](https://vercel.com/docs)

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
