import { NextResponse } from 'next/server'


export async function GET(req: Request) {
  return NextResponse.json([
    {
      "id": "1",
      "uuid": "a7fddf5d-45bf-4ad3-a8d6-0cb72839b271",
      "created_at": "2024-09-20T10:15:30Z",
      "activity_host_id": "b1c7edbf-3fa7-4b7b-bf3a-4eeb6b1c2a4a",
      "title": "Conferencia de Tecnología",
      "description": "Evento sobre las últimas tendencias en tecnología.",
      "start_date": "2024-10-05T09:00:00Z",
      "end_date": "2024-10-05T18:00:00Z",
      "full_address": "Av. Siempre Viva 742, Springfield",
      "badge_contract_address": "0xA3b2C1D405E6D2F4a3D707DeF12048A2A12e4B8D",
      "requirements": "Registro previo"
    },
    {
      "id": "2",
      "uuid": "d8fdb792-ff4a-4d9e-9bca-3c2d7f2bf819",
      "created_at": "2024-09-21T14:22:10Z",
      "activity_host_id": "a2c0a7fe-41eb-4fae-9e8a-8ed5a6f8aaf1",
      "title": "Taller de Programación",
      "description": "Aprende las bases del desarrollo web con este taller práctico.",
      "start_date": "2024-11-01T10:00:00Z",
      "end_date": "2024-11-01T16:00:00Z",
      "full_address": "Calle Falsa 123, Ciudad Ficticia",
      "badge_contract_address": "0xC9F0a9bA67D8E89F6123D4AFeFdD8dEa290e0b10",
      "requirements": "Llevar laptop"
    },
    {
      "id": "3",
      "uuid": "af2d3f1b-e4e8-45c4-9a64-40f56e7a98c3",
      "created_at": "2024-09-22T11:33:45Z",
      "activity_host_id": "e5c2bfbd-57fb-4c5d-9e35-b9d2b8c9a5e4",
      "title": "Curso de Blockchain",
      "description": "Curso intensivo sobre el funcionamiento de las cadenas de bloques y contratos inteligentes.",
      "start_date": "2024-12-10T09:00:00Z",
      "end_date": "2024-12-15T17:00:00Z",
      "full_address": "Centro Tecnológico, Calle 45, Ciudad Digital",
      "badge_contract_address": "0xE3c0B6D497F1c4A8E29D4C7D3E8C9fD9E3B33E62",
      "requirements": "Conocimientos básicos de programación"
    },
    {
      "id": "4",
      "uuid": "fbef3e8f-a4b4-43c1-9bf2-e4b8d8e6b979",
      "created_at": "2024-09-23T16:48:27Z",
      "activity_host_id": "f9b9c0a4-4d5b-45c7-927d-c8bfb6e9a1b0",
      "title": "Seminario de Inteligencia Artificial",
      "description": "Descubre el impacto de la IA en la industria y las oportunidades que ofrece.",
      "start_date": "2024-12-20T08:00:00Z",
      "end_date": "2024-12-20T17:00:00Z",
      "full_address": "Sala de Conferencias, Universidad del Futuro",
      "badge_contract_address": "0xB4D8f9Bf9cA5D8cF9F2B8Df5F6aDd2F7B7F9aB6c",
      "requirements": "Interés en tecnología"
    }
  ]
  )
}
