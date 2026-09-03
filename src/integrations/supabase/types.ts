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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      chapter_progress: {
        Row: {
          cases_completed: string[]
          chapter_id: string
          completed_at: string | null
          created_at: string
          id: string
          last_section_id: string | null
          last_seen_at: string
          overall_status: Database["public"]["Enums"]["learning_status"]
          progress_percent: number
          sections_completed: string[]
          started_at: string | null
          unlocked_levels: Database["public"]["Enums"]["evaluation_level"][]
          updated_at: string
          user_id: string
        }
        Insert: {
          cases_completed?: string[]
          chapter_id: string
          completed_at?: string | null
          created_at?: string
          id?: string
          last_section_id?: string | null
          last_seen_at?: string
          overall_status?: Database["public"]["Enums"]["learning_status"]
          progress_percent?: number
          sections_completed?: string[]
          started_at?: string | null
          unlocked_levels?: Database["public"]["Enums"]["evaluation_level"][]
          updated_at?: string
          user_id: string
        }
        Update: {
          cases_completed?: string[]
          chapter_id?: string
          completed_at?: string | null
          created_at?: string
          id?: string
          last_section_id?: string | null
          last_seen_at?: string
          overall_status?: Database["public"]["Enums"]["learning_status"]
          progress_percent?: number
          sections_completed?: string[]
          started_at?: string | null
          unlocked_levels?: Database["public"]["Enums"]["evaluation_level"][]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chapter_resume_state: {
        Row: {
          chapter_id: string
          created_at: string
          evaluation_level:
            | Database["public"]["Enums"]["evaluation_level"]
            | null
          id: string
          last_route: string | null
          lesson_id: string | null
          resumed_at: string | null
          scenario_id: string | null
          scroll_anchor: string | null
          section_id: string | null
          ui_state: Json
          updated_at: string
          user_id: string
          widget_id: string | null
        }
        Insert: {
          chapter_id: string
          created_at?: string
          evaluation_level?:
            | Database["public"]["Enums"]["evaluation_level"]
            | null
          id?: string
          last_route?: string | null
          lesson_id?: string | null
          resumed_at?: string | null
          scenario_id?: string | null
          scroll_anchor?: string | null
          section_id?: string | null
          ui_state?: Json
          updated_at?: string
          user_id: string
          widget_id?: string | null
        }
        Update: {
          chapter_id?: string
          created_at?: string
          evaluation_level?:
            | Database["public"]["Enums"]["evaluation_level"]
            | null
          id?: string
          last_route?: string | null
          lesson_id?: string | null
          resumed_at?: string | null
          scenario_id?: string | null
          scroll_anchor?: string | null
          section_id?: string | null
          ui_state?: Json
          updated_at?: string
          user_id?: string
          widget_id?: string | null
        }
        Relationships: []
      }
      evaluation_attempts: {
        Row: {
          chapter_id: string
          created_at: string
          feedback: Json
          id: string
          lesson_id: string | null
          level: Database["public"]["Enums"]["evaluation_level"]
          max_score: number | null
          part_a_answers: Json
          part_b_answers: Json
          part_c_answers: Json
          passed: boolean | null
          score: number | null
          started_at: string
          status: Database["public"]["Enums"]["attempt_status"]
          submitted_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          chapter_id: string
          created_at?: string
          feedback?: Json
          id?: string
          lesson_id?: string | null
          level: Database["public"]["Enums"]["evaluation_level"]
          max_score?: number | null
          part_a_answers?: Json
          part_b_answers?: Json
          part_c_answers?: Json
          passed?: boolean | null
          score?: number | null
          started_at?: string
          status?: Database["public"]["Enums"]["attempt_status"]
          submitted_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          chapter_id?: string
          created_at?: string
          feedback?: Json
          id?: string
          lesson_id?: string | null
          level?: Database["public"]["Enums"]["evaluation_level"]
          max_score?: number | null
          part_a_answers?: Json
          part_b_answers?: Json
          part_c_answers?: Json
          passed?: boolean | null
          score?: number | null
          started_at?: string
          status?: Database["public"]["Enums"]["attempt_status"]
          submitted_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          locale: string
          onboarding_completed: boolean
          preferences: Json
          theme: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
          locale?: string
          onboarding_completed?: boolean
          preferences?: Json
          theme?: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          locale?: string
          onboarding_completed?: boolean
          preferences?: Json
          theme?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      question_bank_part_a: {
        Row: {
          chapter_id: string
          choices: Json
          correct_id: string
          created_at: string
          difficulty: number
          explanation: string
          id: string
          is_active: boolean
          lesson_id: string
          prompt: string
          question_key: string
          updated_at: string
        }
        Insert: {
          chapter_id?: string
          choices?: Json
          correct_id: string
          created_at?: string
          difficulty: number
          explanation?: string
          id?: string
          is_active?: boolean
          lesson_id: string
          prompt: string
          question_key: string
          updated_at?: string
        }
        Update: {
          chapter_id?: string
          choices?: Json
          correct_id?: string
          created_at?: string
          difficulty?: number
          explanation?: string
          id?: string
          is_active?: boolean
          lesson_id?: string
          prompt?: string
          question_key?: string
          updated_at?: string
        }
        Relationships: []
      }
      question_bank_part_b: {
        Row: {
          chapter_id: string
          choices: Json
          correct_id: string
          created_at: string
          difficulty: number
          explanation: string
          id: string
          is_active: boolean
          lesson_id: string
          prompt: string
          question_key: string
          updated_at: string
          visual_id: string | null
          widget: string | null
        }
        Insert: {
          chapter_id?: string
          choices?: Json
          correct_id: string
          created_at?: string
          difficulty: number
          explanation?: string
          id?: string
          is_active?: boolean
          lesson_id: string
          prompt: string
          question_key: string
          updated_at?: string
          visual_id?: string | null
          widget?: string | null
        }
        Update: {
          chapter_id?: string
          choices?: Json
          correct_id?: string
          created_at?: string
          difficulty?: number
          explanation?: string
          id?: string
          is_active?: boolean
          lesson_id?: string
          prompt?: string
          question_key?: string
          updated_at?: string
          visual_id?: string | null
          widget?: string | null
        }
        Relationships: []
      }
      question_translations: {
        Row: {
          choices: Json
          created_at: string
          explanation: string
          id: string
          locale: string
          part: string
          prompt: string
          question_key: string
          updated_at: string
        }
        Insert: {
          choices?: Json
          created_at?: string
          explanation?: string
          id?: string
          locale: string
          part: string
          prompt: string
          question_key: string
          updated_at?: string
        }
        Update: {
          choices?: Json
          created_at?: string
          explanation?: string
          id?: string
          locale?: string
          part?: string
          prompt?: string
          question_key?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      attempt_status: "in_progress" | "submitted" | "graded"
      evaluation_level: "standard" | "high" | "premium"
      learning_status: "not_started" | "in_progress" | "completed"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      app_role: ["admin", "moderator", "user"],
      attempt_status: ["in_progress", "submitted", "graded"],
      evaluation_level: ["standard", "high", "premium"],
      learning_status: ["not_started", "in_progress", "completed"],
    },
  },
} as const
