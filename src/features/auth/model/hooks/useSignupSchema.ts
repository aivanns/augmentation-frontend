import { t } from "../../../../shared/config/localization";
import { z } from "zod";

export const useSignupSchema = () => {
  return z.object({
    email: z
      .string()
      .min(1, t.auth.validation.emailRequired)
      .email(t.auth.validation.emailInvalid),
    password: z
      .string()
      .min(1, t.auth.validation.passwordRequired)
      .min(6, t.auth.validation.passwordMin.replace("{{min}}", "6")),
  });
};

export type SignupFormValues = z.infer<ReturnType<typeof useSignupSchema>>;

export type SignupFormFields = {
  email: string;
  password: string;
  person: {
    firstName: string;
    lastName: string;
    patronymicName: string;
  };
};
