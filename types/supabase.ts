export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      app_limits: {
        Row: {
          description: string | null
          key: string
          updated_at: string | null
          value: string
          value_type: string
        }
        Insert: {
          description?: string | null
          key: string
          updated_at?: string | null
          value: string
          value_type?: string
        }
        Update: {
          description?: string | null
          key?: string
          updated_at?: string | null
          value?: string
          value_type?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: number
          is_system: boolean | null
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          is_system?: boolean | null
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          is_system?: boolean | null
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      languages: {
        Row: {
          created_at: string
          flag: string | null
          id: number
          label: string
          value: string
        }
        Insert: {
          created_at?: string
          flag?: string | null
          id?: number
          label: string
          value: string
        }
        Update: {
          created_at?: string
          flag?: string | null
          id?: number
          label?: string
          value?: string
        }
        Relationships: []
      }
      practices: {
        Row: {
          category_id: number | null
          correct_count: number
          created_at: string
          duration: number
          id: number
          practice_type: string
          progress: number
          total_questions: number
          user_id: string
        }
        Insert: {
          category_id?: number | null
          correct_count?: number
          created_at?: string
          duration: number
          id?: number
          practice_type: string
          progress: number
          total_questions: number
          user_id: string
        }
        Update: {
          category_id?: number | null
          correct_count?: number
          created_at?: string
          duration?: number
          id?: number
          practice_type?: string
          progress?: number
          total_questions?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "practices_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_settings: {
        Row: {
          ai_fill_fields: Json
          created_at: string
          default_category_id: number | null
          default_source_lang_id: number | null
          default_target_lang_id: number | null
          id: number
          user_id: string
        }
        Insert: {
          ai_fill_fields?: Json
          created_at?: string
          default_category_id?: number | null
          default_source_lang_id?: number | null
          default_target_lang_id?: number | null
          id?: number
          user_id: string
        }
        Update: {
          ai_fill_fields?: Json
          created_at?: string
          default_category_id?: number | null
          default_source_lang_id?: number | null
          default_target_lang_id?: number | null
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_settings_default_category_id_fkey"
            columns: ["default_category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_settings_default_source_lang_id_fkey"
            columns: ["default_source_lang_id"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_settings_default_target_lang_id_fkey"
            columns: ["default_target_lang_id"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["id"]
          },
        ]
      }
      words: {
        Row: {
          antonyms: string[] | null
          category_id: number
          created_at: string
          deleted_at: string | null
          description: string | null
          example: string | null
          id: number
          part_of_speech:
            | Database["public"]["Enums"]["part_of_speech_enum"]
            | null
          score: number
          search_vector: unknown
          source_language_id: number
          synonyms: string[] | null
          target_language_id: number
          translation: string
          translation_audio: string | null
          updated_at: string | null
          user_id: string
          word: string
        }
        Insert: {
          antonyms?: string[] | null
          category_id: number
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          example?: string | null
          id?: number
          part_of_speech?:
            | Database["public"]["Enums"]["part_of_speech_enum"]
            | null
          score?: number
          search_vector?: unknown
          source_language_id: number
          synonyms?: string[] | null
          target_language_id: number
          translation: string
          translation_audio?: string | null
          updated_at?: string | null
          user_id: string
          word: string
        }
        Update: {
          antonyms?: string[] | null
          category_id?: number
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          example?: string | null
          id?: number
          part_of_speech?:
            | Database["public"]["Enums"]["part_of_speech_enum"]
            | null
          score?: number
          search_vector?: unknown
          source_language_id?: number
          synonyms?: string[] | null
          target_language_id?: number
          translation?: string
          translation_audio?: string | null
          updated_at?: string | null
          user_id?: string
          word?: string
        }
        Relationships: [
          {
            foreignKeyName: "words_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "words_source_language_id_fkey"
            columns: ["source_language_id"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "words_target_language_id_fkey"
            columns: ["target_language_id"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_category_limit: { Args: { p_user_id: string }; Returns: undefined }
      get_user_top_language_stats: {
        Args: { userid: string }
        Returns: {
          latest_created: string
          mastered_count: number
          source_language: string
          this_month_count: number
          this_week_count: number
          total_count: number
        }[]
      }
      get_user_word_score_stats: {
        Args: { userid: string }
        Returns: {
          learning: number
          mastered: number
          new_words: number
          total: number
        }[]
      }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
    }
    Enums: {
      part_of_speech_enum:
        | "noun"
        | "verb"
        | "adjective"
        | "adverb"
        | "pronoun"
        | "preposition"
        | "conjunction"
        | "interjection"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      part_of_speech_enum: [
        "noun",
        "verb",
        "adjective",
        "adverb",
        "pronoun",
        "preposition",
        "conjunction",
        "interjection",
      ],
    },
  },
} as const
