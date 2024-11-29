export const getCopticWord = (index: number) => {
  const copticWords = [
    { coptic: "ⲁⲅⲁⲡⲏ", pronunciation: "agape (love)" }, // Alpha
    { coptic: "ⲃⲉⲛⲛⲟⲩ", pronunciation: "bennu (palm)" }, // Vida
    { coptic: "ⲅⲁⲗⲁⲥ", pronunciation: "galas (milk)" }, // Gamma
    { coptic: "ⲇⲁⲕⲣⲩ", pronunciation: "dakru (tear)" }, // Delta
    { coptic: "ⲉⲧⲁⲛ", pronunciation: "etan (bread)" }, // Epsilon
    { coptic: "", pronunciation: "Number 6" }, // Epsilon
    { coptic: "ⲍⲉⲱⲣⲅⲟⲥ", pronunciation: "zeorgos (farmer)" }, // Zeta
    { coptic: "ⲏⲡⲓ", pronunciation: "epi (horse)" }, // Eta
    { coptic: "ⲑⲩⲟⲥ", pronunciation: "thuos (son)" }, // Theta
    { coptic: "ⲓⲱⲧⲁ", pronunciation: "iota (jota)" }, // Iota
    { coptic: "ⲕⲁⲗⲁ", pronunciation: "kala (good)" }, // Kappa
    { coptic: "ⲗⲩⲥⲙⲟⲥ", pronunciation: "lusmos (perfume)" }, // Laula
    { coptic: "ⲙⲉⲛⲉⲧ", pronunciation: "menet (water)" }, // Mi
    { coptic: "ⲛⲓⲙⲁ", pronunciation: "nima (wind)" }, // Ni
    { coptic: "ⲝⲓⲣⲁⲧⲟⲥ", pronunciation: "ksiratos (noble)" }, // Ksi
    { coptic: "ⲟⲓⲕⲟⲥ", pronunciation: "oikos (house)" }, // O
    { coptic: "ⲡⲁⲡⲁⲥ", pronunciation: "papas (pope)" }, // Pi
    { coptic: "ⲣⲉⲙⲙⲉ", pronunciation: "remme (man)" }, // Ro
    { coptic: "ⲥⲟⲫⲓⲁ", pronunciation: "sofia (wisdom)" }, // Sigma
    { coptic: "ⲧⲉⲙⲛⲟⲛ", pronunciation: "temnon (temple)" }, // Tav
    { coptic: "ⲟⲩⲉⲛⲛⲉ", pronunciation: "ouenne (heaven)" }, // Oou
    { coptic: "ⲫⲉⲧⲣⲟⲟⲩ", pronunciation: "phetroou (watch)" }, // Fai
    { coptic: "ⲭⲉⲩⲁⲃ", pronunciation: "kheouab (holy)" }, // Khi
    { coptic: "ⲯⲩⲡⲣⲟⲩⲗⲟⲥ", pronunciation: "psiproulos (servant)" }, // Psi
    { coptic: "ⲱⲥⲓⲥ", pronunciation: "osis (sun)" }, // Omega
    { coptic: "ϣⲁⲓⲉⲣⲓⲁⲛⲟⲥ", pronunciation: "shairianos (saviour)" }, // Shai
    { coptic: "ϥⲉⲓⲥ", pronunciation: "feis (father)" }, // Fai
    { coptic: "ϧⲁⲛⲉⲩⲟⲥ", pronunciation: "khaneuos (cross)" }, // Ganga
    { coptic: "ϩⲁⲙⲟⲟⲩ", pronunciation: "hamou (sea)" }, // Hori
    { coptic: "ϫⲓⲙⲙⲁ", pronunciation: "jimme (time)" }, // Janja
    { coptic: "ϭⲓⲛⲓ", pronunciation: "chini (ring)" }, // Cheema
    { coptic: "ϯⲁⲓⲟⲥ", pronunciation: "tiai-os (saint)" }, // Tee
  ];

  if (index < 0 || index >= copticWords.length) {
    throw new Error("Invalid index: must be between 0 and 31.");
  }

  return copticWords[index];
};
