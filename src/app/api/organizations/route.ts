import { NextResponse } from 'next/server'



export async function GET(req: Request) {
  return NextResponse.json(
    [
        {
          "id": "1",
          "uuid": "b7a8c0ed-39e5-4d7d-9fb3-9f7ad6df7d12",
          "created_at": "2024-09-20T09:45:10Z",
          "name": "Tech Innovators",
          "location": "Silicon Valley, California",
          "website": "https://www.techinnovators.com",
          "email": "info@techinnovators.com",
          "description": "Organización dedicada a impulsar la innovación tecnológica a través de eventos y conferencias.",
          "commitment": "Fomentar el crecimiento de la tecnología en todo el mundo.",
          "logo": "https://s3.amazon.com/xxxxxxx.png"
        },
        {
          "id": "2",
          "uuid": "d1b3e8e9-98f5-4c8e-bd0b-2a4b8d9e6b3f",
          "created_at": "2024-09-21T14:12:55Z",
          "name": "Green Future",
          "location": "Berlin, Alemania",
          "website": "https://www.greenfuture.org",
          "email": "contact@greenfuture.org",
          "description": "ONG comprometida con la protección del medio ambiente y la promoción de energías renovables.",
          "commitment": "Luchar contra el cambio climático y promover un futuro más verde.",
          "logo": "https://s3.amazon.com/xxxxxxx.png"
        },
        {
          "id": "3",
          "uuid": "f9a5c7e1-4cbf-4871-9b76-cf2b8d6a1c8e",
          "created_at": "2024-09-22T16:30:45Z",
          "name": "Health First",
          "location": "Londres, Reino Unido",
          "website": "https://www.healthfirst.org",
          "email": "support@healthfirst.org",
          "description": "Fundación que proporciona acceso a servicios de salud en comunidades desatendidas.",
          "commitment": "Mejorar la salud y el bienestar de las personas en todo el mundo.",
          "logo": "https://s3.amazon.com/xxxxxxx.png"
        }
      ]
      
  )
}
