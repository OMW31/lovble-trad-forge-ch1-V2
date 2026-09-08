CREATE TABLE public.question_bank_part_a (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_key text NOT NULL UNIQUE,
  chapter_id text NOT NULL DEFAULT 'analyse-fondamentale',
  lesson_id text NOT NULL,
  difficulty smallint NOT NULL CHECK (difficulty BETWEEN 1 AND 3),
  prompt text NOT NULL,
  choices jsonb NOT NULL DEFAULT '[]'::jsonb,
  correct_id text NOT NULL,
  explanation text NOT NULL DEFAULT '',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.question_bank_part_a TO anon;
GRANT SELECT ON public.question_bank_part_a TO authenticated;
GRANT ALL ON public.question_bank_part_a TO service_role;

ALTER TABLE public.question_bank_part_a ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active part A questions are publicly readable"
  ON public.question_bank_part_a FOR SELECT TO anon, authenticated
  USING (is_active);

CREATE TABLE public.question_bank_part_b (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_key text NOT NULL UNIQUE,
  chapter_id text NOT NULL DEFAULT 'analyse-fondamentale',
  lesson_id text NOT NULL,
  difficulty smallint NOT NULL CHECK (difficulty BETWEEN 1 AND 3),
  prompt text NOT NULL,
  choices jsonb NOT NULL DEFAULT '[]'::jsonb,
  correct_id text NOT NULL,
  explanation text NOT NULL DEFAULT '',
  widget text,
  visual_id text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.question_bank_part_b TO anon;
GRANT SELECT ON public.question_bank_part_b TO authenticated;
GRANT ALL ON public.question_bank_part_b TO service_role;

ALTER TABLE public.question_bank_part_b ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active part B questions are publicly readable"
  ON public.question_bank_part_b FOR SELECT TO anon, authenticated
  USING (is_active);

CREATE TABLE public.question_translations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_key text NOT NULL,
  part text NOT NULL CHECK (part IN ('A','B')),
  locale text NOT NULL,
  prompt text NOT NULL,
  choices jsonb NOT NULL DEFAULT '[]'::jsonb,
  explanation text NOT NULL DEFAULT '',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (question_key, part, locale)
);

GRANT SELECT ON public.question_translations TO anon;
GRANT SELECT ON public.question_translations TO authenticated;
GRANT ALL ON public.question_translations TO service_role;

ALTER TABLE public.question_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Question translations are publicly readable"
  ON public.question_translations FOR SELECT TO anon, authenticated
  USING (true);

CREATE INDEX idx_qb_part_a_lesson ON public.question_bank_part_a (chapter_id, lesson_id, difficulty);
CREATE INDEX idx_qb_part_b_lesson ON public.question_bank_part_b (chapter_id, lesson_id, difficulty);
CREATE INDEX idx_question_translations_lookup ON public.question_translations (locale, part, question_key);

CREATE TRIGGER update_question_bank_part_a_updated_at
  BEFORE UPDATE ON public.question_bank_part_a
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_question_bank_part_b_updated_at
  BEFORE UPDATE ON public.question_bank_part_b
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_question_translations_updated_at
  BEFORE UPDATE ON public.question_translations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();