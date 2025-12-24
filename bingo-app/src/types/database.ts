export interface Database {
  public: {
    Tables: {
      bolas_sorteadas: {
        Row: {
          id: number
          numero: number
          timestamp: string
        }
        Insert: {
          id?: number
          numero: number
          timestamp?: string
        }
        Update: {
          id?: number
          numero?: number
          timestamp?: string
        }
      }
      premios: {
        Row: {
          id: number
          nome: string
          tipo: string | null
          entregue: boolean
        }
        Insert: {
          id?: number
          nome: string
          tipo?: string | null
          entregue?: boolean
        }
        Update: {
          id?: number
          nome?: string
          tipo?: string | null
          entregue?: boolean
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
