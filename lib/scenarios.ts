export interface Scenario {
  id: number;
  description: string;
}

export const scenarios: Scenario[] = [
  {
    id: 1,
    description:
      "Two candidates are shortlisted for a Data Analyst role. Candidate A has strong quantitative skills. Candidate B has strong communication skills.",
  },
  {
    id: 2,
    description:
      "Two candidates are shortlisted for a Software Engineer role. Candidate A has higher GPA. Candidate B has more internship experience.",
  },
  {
    id: 3,
    description:
      "Two candidates are evaluated for a Product Manager role. Candidate A has more technical background. Candidate B has more leadership experience.",
  },
  {
    id: 4,
    description:
      "Two candidates are evaluated for a Finance Analyst role. Candidate A has better modeling scores. Candidate B has stronger past company brand.",
  },
  {
    id: 5,
    description:
      "Two candidates are being considered for a UX Researcher role. Candidate A has published research. Candidate B has extensive field interviews experience.",
  },
  {
    id: 6,
    description:
      "Two candidates are shortlisted for a Cybersecurity role. Candidate A has better certification scores. Candidate B has more years in the field.",
  },
  {
    id: 7,
    description:
      "Two candidates are evaluated for a Machine Learning Engineer role. Candidate A has strong theoretical background. Candidate B has production deployment experience.",
  },
  {
    id: 8,
    description:
      "Two candidates are shortlisted for a Business Analyst role. Candidate A has higher analytical test scores. Candidate B has stronger domain expertise.",
  },
];