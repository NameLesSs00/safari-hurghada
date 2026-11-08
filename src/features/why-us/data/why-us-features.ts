export interface WhyUsFeatureItem {
  id: string;
  iconPath: string;
  accentColor: string;
  bgCircleColor: string;
  titleKey: string;
  descriptionKey: string;
}

export const whyUsFeatures: WhyUsFeatureItem[] = [
  {
    id: "localExperts",
    iconPath: "/whyUs/group.svg",
    accentColor: "#F36F21",
    bgCircleColor: "#FDE8DA",
    titleKey: "features.localExperts.title",
    descriptionKey: "features.localExperts.description",
  },
  {
    id: "handpicked",
    iconPath: "/whyUs/star.svg",
    accentColor: "#0E8FC7",
    bgCircleColor: "#DDF1FA",
    titleKey: "features.handpicked.title",
    descriptionKey: "features.handpicked.description",
  },
  {
    id: "support",
    iconPath: "/whyUs/support.svg",
    accentColor: "#F36F21",
    bgCircleColor: "#FDE8DA",
    titleKey: "features.support.title",
    descriptionKey: "features.support.description",
  },
  {
    id: "value",
    iconPath: "/whyUs/moneyy.svg",
    accentColor: "#0E8FC7",
    bgCircleColor: "#DDF1FA",
    titleKey: "features.value.title",
    descriptionKey: "features.value.description",
  },
];

