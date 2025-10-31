import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    // 추후 빌드 실행 시 주석해제로 무시설정 혹은 각 에러 찾아서 처리, 팀원들과 상의 해봐야할듯.
    // rules: {
    //   "@typescript-eslint/no-explicit-any": "off",
    //   "@typescript-eslint/no-unused-vars": "warn",
    // },
  },
];

export default eslintConfig;
