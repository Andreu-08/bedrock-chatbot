import { BedrockAgentRuntimeClient, InvokeAgentCommand } from '@aws-sdk/client-bedrock-agent-runtime';
import { NextResponse } from 'next/server';

// Configuración del cliente de Bedrock
const client = new BedrockAgentRuntimeClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'El mensaje es requerido' },
        { status: 400 }
      );
    }

    // Validar variables de entorno
    if (!process.env.BEDROCK_AGENT_ID || !process.env.BEDROCK_AGENT_ALIAS_ID) {
      return NextResponse.json(
        { error: 'Configuración de Bedrock incompleta' },
        { status: 500 }
      );
    }

    // Crear comando para invocar el agente
    const command = new InvokeAgentCommand({
      agentId: process.env.BEDROCK_AGENT_ID,
      agentAliasId: process.env.BEDROCK_AGENT_ALIAS_ID,
      sessionId: process.env.SESSION_ID || 'default-session',
      inputText: message,
    });

    // Invocar el agente
    const response = await client.send(command);

    // Procesar la respuesta del stream
    let fullResponse = '';
    
    if (response.completion) {
      for await (const chunk of response.completion) {
        if (chunk.chunk && chunk.chunk.bytes) {
          const text = new TextDecoder().decode(chunk.chunk.bytes);
          fullResponse += text;
        }
      }
    }

    return NextResponse.json({ 
      response: fullResponse || 'Sin respuesta del agente' 
    });

  } catch (error) {
    console.error('Error al invocar Bedrock:', error);
    return NextResponse.json(
      { error: error.message || 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
